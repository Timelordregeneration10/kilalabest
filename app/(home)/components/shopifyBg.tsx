"use client";

import { useEffect, useRef, useContext } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import useWindow from "@/app/hooks/useWindow";
import useScroll from "@/app/hooks/useScroll";
import { loadingContext } from "@/app/providers/loadingVanishLayout";

export default function ProjectScene() {
  const { loading } = useContext(loadingContext);
  const { scrollTop } = useScroll();
  const { height: kilaInnerHeight } = useWindow();
  /** genAI_feature_task_490709_moto_start */
  const scrollProgressRef = useRef(0);
  /** genAI_feature_task_490709_moto_end */

  const threeRef = useRef<HTMLDivElement>(null);

  /** genAI_feature_task_490709_moto_start */
  useEffect(() => {
    if (loading) {
      return;
    }
    const denom = kilaInnerHeight || window.innerHeight;
    scrollProgressRef.current = scrollTop / denom;
  }, [loading, scrollTop, kilaInnerHeight]);
  /** genAI_feature_task_490709_moto_end */

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!threeRef.current) {
      return;
    }

    /** genAI_feature_task_490709_moto_start */
    let rafId = 0;
    let w = threeRef.current.clientWidth;
    let h = threeRef.current.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, w / h, 0.01, 2000);
    camera.position.set(0, 0, 350);
    camera.lookAt(new THREE.Vector3());

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    threeRef.current.appendChild(renderer.domElement);

    // Bloom 仅写入 EffectComposer 内部缓冲，避免全屏覆盖背景；最后以加法混合叠到已绘制的背景上
    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.setPixelRatio(renderer.getPixelRatio());
    bloomComposer.setSize(w, h);
    bloomComposer.renderToScreen = false;

    const bloomRenderPass = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 0.1, 0.0, 1);

    bloomComposer.addPass(bloomRenderPass);
    bloomComposer.addPass(bloomPass);

    const overlayScene = new THREE.Scene();
    const overlayCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    overlayCamera.position.z = 1;
    const bloomOverlayMaterial = new THREE.MeshBasicMaterial({
      map: bloomComposer.readBuffer.texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
    });
    // 这里的 2, 2 是平面在 X、Y 方向上的宽高（世界单位），用来和正交相机的视锥范围对齐，铺满整个屏幕
    const bloomOverlayMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      bloomOverlayMaterial,
    );
    overlayScene.add(bloomOverlayMesh);

    const vertex = /* GLSL */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

    const fragmentFire = /* GLSL */ `
  varying vec2 vUv;
  uniform float uProgress;
  uniform sampler2D uNoise;
  uniform sampler2D uNoiseOverlay;
  uniform float yWeight;
  uniform float noiseWeight;
  uniform float overlayWeight;
  uniform float uTime;
  uniform float timeSpeed;

  float setOpacity(float r, float g, float b, float tonethreshold) {
    float tone = (r + g + b) / 3.0;
    float alpha = 1.0;
    if(tone<tonethreshold) {
        alpha = 0.0;
    }
    return alpha;
  }

  void main() {
    vec2 noiseUv = vUv + vec2(0., uTime*timeSpeed);
    vec3 noiseTexOrigin = texture2D(uNoise, noiseUv).rgb;
    vec3 noiseTexOriginOverlay = texture2D(uNoiseOverlay, noiseUv).rgb;
    vec3 noiseTex = (noiseTexOrigin*noiseWeight + noiseTexOriginOverlay*overlayWeight + vUv.y*yWeight)/(yWeight + noiseWeight + overlayWeight);
    float opacity1 = setOpacity(noiseTex.r, noiseTex.g, noiseTex.b, uProgress*1.0401-0.04);
    if (opacity1 == 0.){
        discard;
    }
    float opacity2 = setOpacity(noiseTex.r, noiseTex.g, noiseTex.b, uProgress*1.0401);
    if (opacity2 == 0.){
        gl_FragColor = vec4(1., 1., 1., 1.0)*1.5;
        return;
    }
    discard;
  }
`;

    const fragmentBg = /* GLSL */ `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform sampler2D uTextureNext;
  uniform float uProgress;
  uniform sampler2D uNoise;
  uniform sampler2D uNoiseOverlay;
  uniform float yWeight;
  uniform float noiseWeight;
  uniform float overlayWeight;
  uniform float uTime;
  uniform float timeSpeed;

  float setOpacity(float r, float g, float b, float tonethreshold) {
    float tone = (r + g + b) / 3.0;
    float alpha = 1.0;
    if(tone<tonethreshold) {
        alpha = 0.0;
    }
    return alpha;
  }

  void main() {
    vec4 tex = texture2D(uTexture, vUv);
    vec4 texNext = texture2D(uTextureNext, vUv);
    vec2 noiseUv = vUv + vec2(0., uTime*timeSpeed);
    vec3 noiseTexOrigin = texture2D(uNoise, noiseUv).rgb;
    vec3 noiseTexOriginOverlay = texture2D(uNoiseOverlay, noiseUv).rgb;
    vec3 noiseTex = (noiseTexOrigin*noiseWeight + noiseTexOriginOverlay*overlayWeight + vUv.y*yWeight)/(yWeight + noiseWeight + overlayWeight);
    float opacity1 = setOpacity(noiseTex.r, noiseTex.g, noiseTex.b, uProgress*1.0401-0.04);
    if (opacity1 == 0.){
        float finalNextr = texNext.r;
        float finalNextg = texNext.g;
        float finalNextb = texNext.b;
        gl_FragColor = vec4(finalNextr*1.0, finalNextg*1.0, finalNextb*1.0, 1.0);
        return;
    }
    float opacity2 = setOpacity(noiseTex.r, noiseTex.g, noiseTex.b, uProgress*1.0401);
    if (opacity2 == 0.){
        gl_FragColor = vec4(1., 1., 1., 1.);
        return;
    }
    float finalr = tex.r;
    float finalg = tex.g;
    float finalb = tex.b;
    gl_FragColor = vec4(finalr*1.0, finalg*1.0, finalb*1.0, 1.0);
  }
`;

    const materialFire = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragmentFire,
      uniforms: {
        uProgress: { value: 0 },
        uNoise: {
          value: new THREE.TextureLoader().load(
            "https://cdn.jsdelivr.net/gh/Timelordregeneration10/kilala-img-bed/distort.png",
          ),
        },
        uNoiseOverlay: {
          value: new THREE.TextureLoader().load(
            "https://cdn.jsdelivr.net/gh/Timelordregeneration10/kilala-img-bed/waterturbulence.png",
          ),
        },
        yWeight: {
          value: 10,
        },
        noiseWeight: {
          value: 2.5,
        },
        overlayWeight: {
          value: 1.5,
        },
        uTime: {
          value: 0,
        },
        timeSpeed: {
          value: 0.2,
        },
      },
      side: THREE.DoubleSide,
    });
    materialFire.uniforms.uNoise.value.wrapS = THREE.MirroredRepeatWrapping;
    materialFire.uniforms.uNoise.value.wrapT = THREE.MirroredRepeatWrapping;
    materialFire.uniforms.uNoiseOverlay.value.wrapS = THREE.MirroredRepeatWrapping;
    materialFire.uniforms.uNoiseOverlay.value.wrapT = THREE.MirroredRepeatWrapping;

    const materialBg = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragmentBg,
      uniforms: {
        uTexture: {
          value: new THREE.TextureLoader().load(
            "https://cdn.jsdelivr.net/gh/Timelordregeneration10/kilala-img-bed/kilalabest-assets-musedash-anime.webp",
          ),
        },
        uTextureNext: {
          value: new THREE.TextureLoader().load(
            "https://cdn.jsdelivr.net/gh/Timelordregeneration10/kilala-img-bed/kilalabest-assets-musedash-rmt.webp",
          ),
        },
        uProgress: { value: 0 },
        uNoise: {
          value: new THREE.TextureLoader().load(
            "https://cdn.jsdelivr.net/gh/Timelordregeneration10/kilala-img-bed/distort.png",
          ),
        },
        uNoiseOverlay: {
          value: new THREE.TextureLoader().load(
            "https://cdn.jsdelivr.net/gh/Timelordregeneration10/kilala-img-bed/waterturbulence.png",
          ),
        },
        uTime: {
          value: 0,
        },
        yWeight: {
          value: 10,
        },
        noiseWeight: {
          value: 2.5,
        },
        overlayWeight: {
          value: 1.5,
        },
        timeSpeed: {
          value: 0.2,
        },
      },
      side: THREE.DoubleSide,
    });
    materialBg.uniforms.uNoise.value.wrapS = THREE.MirroredRepeatWrapping;
    materialBg.uniforms.uNoise.value.wrapT = THREE.MirroredRepeatWrapping;
    materialBg.uniforms.uNoiseOverlay.value.wrapS = THREE.MirroredRepeatWrapping;
    materialBg.uniforms.uNoiseOverlay.value.wrapT = THREE.MirroredRepeatWrapping;

    const meshFire = new THREE.Mesh(
      new THREE.PlaneGeometry(750, 500),
      materialFire,
    );
    meshFire.layers.set(1);
    scene.add(meshFire);
    const meshBg = new THREE.Mesh(new THREE.PlaneGeometry(750, 500), materialBg);
    meshBg.layers.set(0);
    scene.add(meshBg);

    const clock = new THREE.Clock();

    function updateFromScrollProgress(progress: number) {
      const p = progress;
      materialFire.uniforms.uProgress.value = p;
      materialBg.uniforms.uProgress.value = p;
    }

    function renderFrame() {
      updateFromScrollProgress(scrollProgressRef.current);
      materialFire.uniforms.uTime.value = clock.getElapsedTime();
      materialBg.uniforms.uTime.value = clock.getElapsedTime();

      renderer.setRenderTarget(null);
      renderer.autoClear = true;
      renderer.setClearColor(0x000000, 1);
      renderer.clear(true, true, true);

      camera.layers.set(0);
      renderer.render(scene, camera);

      camera.layers.set(1);
      bloomComposer.render();

      bloomOverlayMaterial.map = bloomComposer.readBuffer.texture;

      renderer.autoClear = false;
      renderer.clearDepth();
      renderer.render(overlayScene, overlayCamera);
      renderer.autoClear = true;

      rafId = requestAnimationFrame(renderFrame);
    }

    renderFrame();

    function resize() {
      if (!threeRef.current) {
        return;
      }
      w = threeRef.current.clientWidth;
      h = threeRef.current.clientHeight;
      renderer.setSize(w, h);
      bloomComposer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }

    window.addEventListener("resize", resize);
    /** genAI_feature_task_490709_moto_end */

    return () => {
      /** genAI_feature_task_490709_moto_start */
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      /** genAI_feature_task_490709_moto_end */
      const host = threeRef.current;
      if (host && renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
      /** genAI_feature_task_490709_moto_start */
      meshFire.geometry.dispose();
      meshBg.geometry.dispose();
      materialFire.dispose();
      materialBg.dispose();
      bloomOverlayMesh.geometry.dispose();
      bloomOverlayMaterial.dispose();
      bloomComposer.dispose();
      renderer.dispose();
      /** genAI_feature_task_490709_moto_end */
    };
  }, [loading]);

  return (
    <div
      className="fixed top-0 left-0 w-full h-screen z-[1]"
      ref={threeRef}
    ></div>
  );
}

"use client";

import { useEffect, useRef, useContext } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import useWindow from "@/app/hooks/useWindow";
import useScroll from "@/app/hooks/useScroll";
import { loadingContext } from "@/app/providers/loadingVanishLayout";

interface NaviItem {
  id: string;
  url: string;
  height: number;
}

/**
 * 场景配置：可直接替换为外部传入的数据源。
 * height 的单位是“屏高倍数”，1 表示 100vh，3.7 表示 370vh。
 */
const naviItems: NaviItem[] = [
  { id: "kilala", url: "/", height: 1 },
  { id: "RMT", url: "/RMT", height: 3.7 },
  { id: "Project", url: "/project", height: 1 },
  { id: "Application", url: "/application", height: 3 },
  { id: "Attempt", url: "/attempt", height: 1 },
  {
    id: "Music",
    url: "https://music.163.com/#/user/home?id=479983448",
    height: 1,
  },
  {
    id: "Anime",
    url: "https://anilist.co/user/NicholasBurkhardt/animelist",
    height: 1,
  },
  { id: "Game", url: "https://space.bilibili.com/515016084", height: 1 },
  { id: "Drawing", url: "/drawing", height: 1 },
];

/**
 * 背景切换图列表：场景索引与该列表索引一一对应，不够时循环使用。
 */
const transitionImageList: string[] = [
  "https://cdn.jsdelivr.net/gh/Timelordregeneration10/kilala-img-bed/kilalabest-assets-musedash-anime.webp",
  "https://cdn.jsdelivr.net/gh/Timelordregeneration10/kilala-img-bed/kilalabest-assets-musedash-rmt.webp",
  "https://cdn.jsdelivr.net/gh/Timelordregeneration10/kilala-img-bed/kilalabest-assets-musedash-project.webp",
  "https://cdn.jsdelivr.net/gh/Timelordregeneration10/kilala-img-bed/kilalabest-assets-musedash-application.webp",
  "https://cdn.jsdelivr.net/gh/Timelordregeneration10/kilala-img-bed/kilalabest-assets-musedash-attempt.webp",
  "https://cdn.jsdelivr.net/gh/Timelordregeneration10/kilala-img-bed/kilalabest-assets-musedash-music.webp",
  "https://cdn.jsdelivr.net/gh/Timelordregeneration10/kilala-img-bed/kilalabest-assets-musedash-anime.webp",
  "https://cdn.jsdelivr.net/gh/Timelordregeneration10/kilala-img-bed/kilalabest-assets-musedash-game.webp",
  "https://cdn.jsdelivr.net/gh/Timelordregeneration10/kilala-img-bed/kilalabest-assets-musedash-drawing.webp",
  "https://cdn.jsdelivr.net/gh/Timelordregeneration10/kilala-img-bed/black.png"
];

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
    // 全屏平面几何基准尺寸：使用 1x1，后续通过 scale 按相机视锥动态放大到全屏
    const FULL_SCREEN_PLANE_BASE_SIZE = 1;
    // 角度转弧度系数，避免在计算中出现魔法数字
    const DEGREE_TO_RADIAN = Math.PI / 180;
    // 通用 1/2 系数，避免在计算中出现魔法数字
    const HALF_FACTOR = 0.5;
    // 背景平面所在的 z 位置（与 mesh 默认位置保持一致）
    const PLANE_Z_POSITION = 0;

    const camera = new THREE.PerspectiveCamera(75, w / h, 0.01, 2000);
    camera.position.set(0, 0, 330);
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
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 0.4, 0.2, 0.2);

    bloomComposer.addPass(bloomRenderPass);
    bloomComposer.addPass(bloomPass);

    const overlayScene = new THREE.Scene();
    const overlayCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    overlayCamera.position.z = 1;
    const bloomOverlayMaterial = new THREE.MeshBasicMaterial({
      map: bloomComposer.readBuffer.texture,
      transparent: true,
      // 透明画布场景下，为避免受源 alpha 影响导致辉光变弱/消失，使用纯加法混合
      blending: THREE.CustomBlending,
      blendEquation: THREE.AddEquation,
      blendSrc: THREE.OneFactor,
      blendDst: THREE.OneFactor,
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
        gl_FragColor = vec4(1., 0.2, 1., 1.0)*1.5;
        return;
    }
    discard;
  }
`;

    const fragmentBg = /* GLSL */ `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform sampler2D uTextureNext;
  uniform vec2 uResolution;
  uniform vec2 uTextureResolution;
  uniform vec2 uTextureNextResolution;
  uniform float uProgress;
  uniform float uCurrentTextureAlpha;
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

  vec2 getCoverUv(vec2 uv, vec2 resolution, vec2 textureResolution) {
    if (resolution.x <= 0.0 || resolution.y <= 0.0 || textureResolution.x <= 0.0 || textureResolution.y <= 0.0) {
      return uv;
    }

    float screenRatio = resolution.x / resolution.y;
    float textureRatio = textureResolution.x / textureResolution.y;
    vec2 coverUv = uv;

    if (screenRatio < textureRatio) {
      float scaleX = screenRatio / textureRatio;
      coverUv.x = uv.x * scaleX + (1.0 - scaleX) * 0.5;
    } else {
      float scaleY = textureRatio / screenRatio;
      coverUv.y = uv.y * scaleY + (1.0 - scaleY) * 0.5;
    }

    return coverUv;
  }

  void main() {
    vec2 coverUv = getCoverUv(vUv, uResolution, uTextureResolution);
    vec2 coverUvNext = getCoverUv(vUv, uResolution, uTextureNextResolution);
    vec4 tex = texture2D(uTexture, coverUv);
    vec4 texNext = texture2D(uTextureNext, coverUvNext);
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
    gl_FragColor = vec4(finalr*1.0, finalg*1.0, finalb*1.0, uCurrentTextureAlpha);
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
      transparent: true,
    });
    materialFire.uniforms.uNoise.value.wrapS = THREE.MirroredRepeatWrapping;
    materialFire.uniforms.uNoise.value.wrapT = THREE.MirroredRepeatWrapping;
    materialFire.uniforms.uNoiseOverlay.value.wrapS = THREE.MirroredRepeatWrapping;
    materialFire.uniforms.uNoiseOverlay.value.wrapT = THREE.MirroredRepeatWrapping;

    const textureLoader = new THREE.TextureLoader();
    const preloadedTransitionTextures = transitionImageList.map((imageUrl) =>
      textureLoader.load(imageUrl),
    );

    /**
     * 获取循环图片索引：
     * 当场景数大于图片数时，通过取模循环使用图片。
     */
    function getLoopedImageIndex(sceneIndex: number, imageCount: number): number {
      if (imageCount <= 0) {
        return 0;
      }
      const loopedIndex = sceneIndex % imageCount;
      if (loopedIndex < 0) {
        return loopedIndex + imageCount;
      }
      return loopedIndex;
    }

    /**
     * 根据滚动进度（单位：屏）定位当前场景，并计算当前场景内过渡进度。
     */
    function getSceneStateByProgress(progressInScreen: number): {
      sceneIndex: number;
      sceneInnerProgress: number;
    } {
      const safeNaviItems =
        naviItems.length > 0 ? naviItems : [{ id: "Default", url: "/", height: 1 }];
      const defaultSceneHeight = 1;
      // 单个场景用于执行过渡动画的固定窗口高度：1 屏（100vh）
      const transitionWindowHeight = 1;
      const totalSceneHeight = safeNaviItems.reduce((sum, item) => {
        const validHeight = item.height > 0 ? item.height : defaultSceneHeight;
        return sum + validHeight;
      }, 0);
      if (totalSceneHeight <= 0) {
        return {
          sceneIndex: 0,
          sceneInnerProgress: 0,
        };
      }

      const clampedProgress = Math.max(
        0,
        Math.min(progressInScreen, totalSceneHeight),
      );
      let sceneStart = 0;
      const lastSceneIndex = safeNaviItems.length - 1;

      for (let index = 0; index < safeNaviItems.length; index += 1) {
        const rawSceneHeight = safeNaviItems[index].height;
        const sceneHeight =
          rawSceneHeight > 0 ? rawSceneHeight : defaultSceneHeight;
        const sceneEnd = sceneStart + sceneHeight;
        const isLastScene = index === lastSceneIndex;
        if (clampedProgress < sceneEnd || isLastScene) {
          const sceneOffset = clampedProgress - sceneStart;
          const actualTransitionHeight = Math.min(
            transitionWindowHeight,
            sceneHeight,
          );
          // 当场景高度大于 1 屏时，前半段保持静止，只在最后 1 屏执行切换
          const stableHeight = Math.max(sceneHeight - actualTransitionHeight, 0);
          const innerProgressRaw =
            actualTransitionHeight > 0
              ? (sceneOffset - stableHeight) / actualTransitionHeight
              : 0;
          const sceneInnerProgress = Math.max(0, Math.min(innerProgressRaw, 1));
          return {
            sceneIndex: index,
            sceneInnerProgress,
          };
        }
        sceneStart = sceneEnd;
      }

      return {
        sceneIndex: 0,
        sceneInnerProgress: 0,
      };
    }

    const initialTextureIndex = getLoopedImageIndex(
      0,
      preloadedTransitionTextures.length,
    );
    const initialTextureNextIndex = getLoopedImageIndex(
      1,
      preloadedTransitionTextures.length,
    );

    const materialBg = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragmentBg,
      uniforms: {
        uTexture: {
          value: preloadedTransitionTextures[initialTextureIndex],
        },
        uTextureNext: {
          value: preloadedTransitionTextures[initialTextureNextIndex],
        },
        uResolution: {
          value: new THREE.Vector2(w, h),
        },
        uTextureResolution: {
          value: new THREE.Vector2(1, 1),
        },
        uTextureNextResolution: {
          value: new THREE.Vector2(1, 1),
        },
        uProgress: { value: 0 },
        uCurrentTextureAlpha: { value: 0 },
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
      transparent: true,
      depthWrite: false
    });
    materialBg.uniforms.uNoise.value.wrapS = THREE.MirroredRepeatWrapping;
    materialBg.uniforms.uNoise.value.wrapT = THREE.MirroredRepeatWrapping;
    materialBg.uniforms.uNoiseOverlay.value.wrapS = THREE.MirroredRepeatWrapping;
    materialBg.uniforms.uNoiseOverlay.value.wrapT = THREE.MirroredRepeatWrapping;

    const meshFire = new THREE.Mesh(
      new THREE.PlaneGeometry(
        FULL_SCREEN_PLANE_BASE_SIZE,
        FULL_SCREEN_PLANE_BASE_SIZE,
      ),
      materialFire,
    );
    meshFire.layers.set(1);
    scene.add(meshFire);
    const meshBg = new THREE.Mesh(
      new THREE.PlaneGeometry(
        FULL_SCREEN_PLANE_BASE_SIZE,
        FULL_SCREEN_PLANE_BASE_SIZE,
      ),
      materialBg,
    );
    meshBg.layers.set(0);
    scene.add(meshBg);

    const clock = new THREE.Clock();

    /**
     * 依据透视相机参数，把 1x1 平面缩放为“正好铺满当前视口”的尺寸。
     * 计算逻辑：
     * 1. 根据相机 fov 和相机到平面的距离求出可视高度；
     * 2. 结合相机宽高比得到可视宽度；
     * 3. 将两个平面统一缩放到该可视宽高，实现几何层面的全屏覆盖。
     */
    function syncPlaneToFullscreen() {
      const cameraDistance = Math.abs(camera.position.z - PLANE_Z_POSITION);
      const fovInRadian = camera.fov * DEGREE_TO_RADIAN;
      const visibleHeight =
        2 * Math.tan(fovInRadian * HALF_FACTOR) * cameraDistance;
      const visibleWidth = visibleHeight * camera.aspect;
      meshFire.scale.set(visibleWidth, visibleHeight, FULL_SCREEN_PLANE_BASE_SIZE);
      meshBg.scale.set(visibleWidth, visibleHeight, FULL_SCREEN_PLANE_BASE_SIZE);
    }
    syncPlaneToFullscreen();

    let activeSceneIndex = -1;

    function updateFromScrollProgress(progress: number) {
      // 首屏（第一个场景）隐藏当前背景图，进入第二屏后再恢复为完全不透明
      materialBg.uniforms.uCurrentTextureAlpha.value = progress >= 1 ? 1 : 0;
      const sceneState = getSceneStateByProgress(progress);
      materialFire.uniforms.uProgress.value = sceneState.sceneInnerProgress;
      materialBg.uniforms.uProgress.value = sceneState.sceneInnerProgress;
      if (sceneState.sceneIndex !== activeSceneIndex) {
        const currentTextureIndex = getLoopedImageIndex(
          sceneState.sceneIndex,
          preloadedTransitionTextures.length,
        );
        const nextTextureIndex = getLoopedImageIndex(
          sceneState.sceneIndex + 1,
          preloadedTransitionTextures.length,
        );
        materialBg.uniforms.uTexture.value =
          preloadedTransitionTextures[currentTextureIndex];
        materialBg.uniforms.uTextureNext.value =
          preloadedTransitionTextures[nextTextureIndex];
        activeSceneIndex = sceneState.sceneIndex;
      }
    }

    function renderFrame() {
      updateFromScrollProgress(scrollProgressRef.current);
      materialFire.uniforms.uTime.value = clock.getElapsedTime();
      materialBg.uniforms.uTime.value = clock.getElapsedTime();
      const currentTextureImage = materialBg.uniforms.uTexture.value.image as
        | { width?: number; height?: number }
        | undefined;
      if (currentTextureImage?.width && currentTextureImage?.height) {
        materialBg.uniforms.uTextureResolution.value.set(
          currentTextureImage.width,
          currentTextureImage.height,
        );
      }
      const nextTextureImage = materialBg.uniforms.uTextureNext.value.image as
        | { width?: number; height?: number }
        | undefined;
      if (nextTextureImage?.width && nextTextureImage?.height) {
        materialBg.uniforms.uTextureNextResolution.value.set(
          nextTextureImage.width,
          nextTextureImage.height,
        );
      }

      renderer.setRenderTarget(null);
      renderer.autoClear = true;
      renderer.setClearColor(0x000000, 0);
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
      materialBg.uniforms.uResolution.value.set(w, h);
      syncPlaneToFullscreen();
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
      preloadedTransitionTextures.forEach((texture) => {
        texture.dispose();
      });
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

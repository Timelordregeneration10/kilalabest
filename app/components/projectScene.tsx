"use client";

import { useEffect, useRef } from "react";
//@ts-ignore
import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";

export default function ProjectScene() {
  const threeCubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window != undefined) {
      window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    }
    const scene = new THREE.Scene();
    scene.background = null;
    const texloader = new THREE.TextureLoader();
    const materialforlook = new THREE.MeshBasicMaterial();
    const geoforlook = new THREE.SphereGeometry(20, 20, 20);
    const meshforlook = new THREE.Mesh(geoforlook, materialforlook);
    meshforlook.position.set(0, 0, 0);

    const groupGFD = new THREE.Group();
    const material1 = [];
    for (let i = 0; i < 3; i++) {
      material1[i] = new THREE.MeshBasicMaterial({
        map: texloader.load(`/three/gfd/${i + 1}.webp`),
      });
    }

    for (let i = 0; i < 100; i++) {
      const size = Math.random() * 40 + 10;
      const geometry = new THREE.BoxGeometry(size, size, size);
      const mesh = new THREE.Mesh(geometry, [
        material1[0],
        material1[0],
        material1[2],
        material1[1],
        material1[1],
        material1[2],
      ]);
      mesh.rotateX(2 * Math.PI * Math.random());
      mesh.rotateY(2 * Math.PI * Math.random());
      mesh.rotateZ(2 * Math.PI * Math.random());
      groupGFD.add(mesh);
      const x = 300 * (Math.random() - 0.5);
      const y = 200 * (Math.random() - 0.5);
      const z = 300 * (Math.random() - 0.5);
      let offset = 30;
      mesh.position.set(
        x > 0 ? x + offset : x - offset,
        y,
        z > 0 ? z + offset : z - offset
      );
    }
    scene.add(groupGFD);
    groupGFD.visible = true;
    meshforlook.position.set(0, 0, 0);

    const camera = new THREE.PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      100,
      3000
    );
    const R = 100; //相机圆周运动的半径
    function circleMove() {
      new TWEEN.Tween({ angle: 0 })
        .to({ angle: Math.PI * 2 }, 16000)
        .onUpdate(function (obj) {
          camera.position.set(
            R * Math.cos(obj.angle),
            0,
            R * Math.sin(obj.angle)
          );
          camera.lookAt(meshforlook.position);
        })
        .start();
    }
    circleMove();
    setInterval(circleMove, 16000);

    const renderer = new THREE.WebGLRenderer({
      //抗锯齿属性，WebGLRenderer常用的一个属性
      antialias: true,
      //透明度alpha，用来使背景透明
      alpha: true,
    });
    renderer.setClearAlpha(0); //设置alpha
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera); //每次scene或者camera改变都需要重新render

    if (threeCubeRef.current)
      threeCubeRef.current.appendChild(renderer.domElement);
    function render() {
      //官方的
      groupGFD.children.forEach((mesh: any) => {
        mesh.rotateX(mesh.scale.x * 0.01);
        mesh.rotateY(mesh.scale.y * 0.01);
        mesh.rotateZ(mesh.scale.z * 0.01);
      });

      TWEEN.update();
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
    render();
  }, []);

  return (
    <div className="h-screen w-screen bg-project bg-cover bg-center lg:bg-[length:100vw_100vh] bg-fixed relative">
      {/* mainScene */}
      <div
        className=" absolute top-0 left-0 w-screen h-screen"
        ref={threeCubeRef}
      ></div>
      {/* title and context */}
      <div className="pl-6 sm:pl-10 lg:pl-20 relative text-start h-screen w-screen flex flex-col justify-center gap-10 sm:gap-2">
        <div className="relative">
          <a
            className="block text-[5vh] sm:text-[12.4vmax]  cursor-pointer text-white [text-shadow:_0.5vmax_0.5vmax_0.2vmax_#91bef0]"
            href="/project"
          >
            PROJECT
          </a>
          <a
            className="absolute top-0 left-0 block text-[5vh] sm:text-[12.4vmax]  cursor-pointer  text-transparent bg-clip-text  bg-gradient-to-r from-[white] to-[#d6e9ff]  "
            href="/project"
          >
            PROJECT
          </a>
        </div>

        <div className=" text-white text-[5.5vw] sm:text-[4vmax]">
          <p>从niivue到sorapix</p>
          <p>从html到tsx</p>
          <p>从手写js到nextjs</p>
          <p>从text-shadow到text-transparent</p>
        </div>
      </div>
    </div>
  );
}

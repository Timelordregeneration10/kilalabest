"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";
import { useRouter } from "next/navigation";
import useWindow from "../../hooks/useWindow";
import { motion } from "framer-motion";

export default function DrawingScene() {
  const threeRainRef = useRef<HTMLDivElement>(null);
  const isMobile = useWindow().width < 640;
  const [isHover, setIsHover] = useState(isMobile);
  const router = useRouter();

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
    const textures2 = [];
    for (let i = 0; i < 3; i++) {
      textures2[i] = texloader.load(`/three/gfd/${i + 1}.webp`);
    }

    for (let i = 0; i < 1000; i++) {
      const texture = textures2[i % 3];
      const spritematerial = new THREE.SpriteMaterial({
        map: texture,
      });
      const mesh = new THREE.Sprite(spritematerial);
      groupGFD.add(mesh);
      const size = Math.random() * 40 + 10;
      mesh.scale.set(size, size, size);
      const x = 1000 * (Math.random() - 0.5);
      const y = 300 * Math.random() - 150;
      const z = 1000 * (Math.random() - 0.5);
      mesh.position.set(x, y, z);
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

    if (threeRainRef.current)
      threeRainRef.current.appendChild(renderer.domElement);
    const clock = new THREE.Clock();
    function render() {
      //官方的
      const t = clock.getDelta();
      groupGFD.children.forEach((mesh: any) => {
        mesh.position.y -= t * 30;
        if (mesh.position.y < -150) {
          mesh.position.y = 150;
        }
      });

      TWEEN.update();
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
    render();
  }, []);

  return (
    <div className="h-screen w-screen bg-drawing bg-cover bg-center lg:bg-[length:100vw_100vh] bg-fixed relative">
      {/* mainScene */}
      <div
        className=" absolute top-0 left-0 w-screen h-screen overflow-hidden"
        ref={threeRainRef}
      ></div>
      {/* title and context */}
      <div className="px-6 sm:px-10 lg:px-20 h-screen w-screen flex flex-col sm:flex-row justify-center items-center sm:gap-[8vw]">
        <div
          className="relative text-white h-[40vh] flex justify-center items-center cursor-pointer "
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
          onClick={() => {
            router.push("/drawing");
          }}
        >
          <div
            className={`text-[20vw] sm:text-[9.4vmax] ${
              isHover ? "opacity-100" : "opacity-0"
            } transition-opacity  text-transparent bg-clip-text  bg-gradient-to-r from-[white] via-[#f1b4f1] to-[#65adffbe]  `}
          >
            Drawing
          </div>
          <div
            className={`absolute flex justify-center items-center h-[40vh] text-[40vw] sm:text-[22.4vmax] [clip-path:inset(_0_0_50%_0)] ${
              isHover
                ? "-translate-y-[8vw] sm:-translate-y-[3.8vmax]"
                : "translate-y-1"
            } transition-transform text-transparent bg-clip-text  bg-gradient-to-r from-[white] via-[#f1b4f1] to-[#65adffbe]  `}
          >
            画
          </div>
          <div
            className={`absolute flex justify-center items-center h-[40vh] text-[40vw] sm:text-[22.4vmax] [clip-path:inset(_50%_0_0_0)] ${
              isHover
                ? "translate-y-[8vw] sm:translate-y-[3.8vmax]"
                : "translate-y-0"
            } transition-transform text-transparent bg-clip-text  bg-gradient-to-r from-[white] via-[#f1b4f1] to-[#65adffbe]  `}
          >
            画
          </div>
        </div>

        <div className=" relative text-white text-[12.5vw] sm:text-[7vmax] [text-shadow:_0.5vw_0.5vw_0.2vw_violet] ">
          <motion.p
            initial={{ transform: "skewX(45deg)", opacity: 0 }}
            whileInView={{ transform: "skewY(0)", opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
              type: "tween",
            }}
          >
            + JC MAZE +
          </motion.p>
          <motion.p
            initial={{ transform: "skewX(-45deg)", opacity: 0 }}
            whileInView={{ transform: "skewY(0)", opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
              type: "tween",
            }}
          >
            + 绘画与生活 +
          </motion.p>
          <motion.p
            initial={{ transform: "skewX(45deg)", opacity: 0 }}
            whileInView={{ transform: "skewY(0)", opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
              type: "tween",
            }}
          >
            + 初中草稿纸 +
          </motion.p>
          <motion.p
            initial={{ transform: "skewX(-45deg)", opacity: 0 }}
            whileInView={{ transform: "skewY(0)", opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
              type: "tween",
            }}
          >
            + 概率论涂鸦 +
          </motion.p>
        </div>
      </div>
    </div>
  );
}

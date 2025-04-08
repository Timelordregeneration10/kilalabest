"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";
import { useRouter } from "next/navigation";
import useWindow from "../../hooks/useWindow";
import { motion } from "framer-motion";

const projects = [
  {
    name: "Code-Web: 模型应用管理平台",
    url: "https://timelordregeneration10.github.io/CodeWeb/login",
  },
  { name: "选课系统", url: "https://timelord.cn/courseSelectionSystem" },
  {
    name: "今何啖兮: 智能膳食推荐系统",
    url: "https://timelordregeneration10.github.io/Nutrition_Recommendation/login",
  },
  {
    name: "旅行物语",
    url: "https://timelordregeneration10.github.io/notimetotravel/",
  },
  {
    name: "教务管理系统",
    url: "https://timelordregeneration10.github.io/Educational-administration-management-system/",
  },
  {
    name: "admintest",
    url: "https://timelordregeneration10.github.io/admintest/",
  },
];

export default function ProjectScene() {
  const threeCubeRef = useRef<HTMLDivElement>(null);
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
    const tw = new TWEEN.Tween({ angle: 0 })
      .to({ angle: Math.PI * 2 }, 16000)
      .onUpdate(function (obj) {
        camera.position.set(
          R * Math.cos(obj.angle),
          0,
          R * Math.sin(obj.angle)
        );
        camera.lookAt(meshforlook.position);
      });
    const group = new TWEEN.Group();
    group.add(tw);
    function circleMove() {
      tw.start();
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

      group.update();
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
      <div className="px-6 sm:px-10 lg:px-20 h-screen w-screen flex flex-col sm:flex-row justify-center items-center sm:gap-[8vw]">
        <div
          className="order-1 sm:order-2 relative text-white h-[40vh] flex justify-center items-center "
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
        >
          <div
            className={`text-[20vw] sm:text-[9.4vmax] ${
              isHover ? "opacity-100" : "opacity-0"
            } transition-opacity  text-transparent bg-clip-text  bg-gradient-to-r from-[white] via-[#b4f1d1] to-[#fffb87db]  `}
          >
            <h2>Project</h2>
          </div>
          <div
            className={`absolute flex justify-center items-center h-[40vh] text-[30vw] sm:text-[11.2vmax] [clip-path:inset(_0_0_50%_0)] ${
              isHover
                ? "-translate-y-[8vw] sm:-translate-y-[3.8vmax]"
                : "translate-y-1"
            } transition-transform text-transparent bg-clip-text  bg-gradient-to-r from-[white] via-[#b4f1d1] to-[#fffb87db]  `}
          >
            <p>项目</p>
          </div>
          <div
            className={`absolute flex justify-center items-center h-[40vh] text-[30vw] sm:text-[11.2vmax] [clip-path:inset(_50%_0_0_0)] ${
              isHover
                ? "translate-y-[8vw] sm:translate-y-[3.8vmax]"
                : "translate-y-0"
            } transition-transform text-transparent bg-clip-text  bg-gradient-to-r from-[white] via-[#b4f1d1] to-[#fffb87db]  `}
          >
            <p>项目</p>
          </div>
        </div>

        <div className="order-2 sm:order-1 relative text-white text-[5.5vw] sm:text-[3vmax] [text-shadow:_0.5vw_0.5vw_0.2vw_violet] text-start sm:text-end">
          {projects.map((pro, index) => (
            <motion.p
              key={pro.name}
              initial={{
                transform:
                  index % 2 === 0 ? "translateX(-50%)" : "translateX(50%)",
                opacity: 0,
              }}
              whileInView={{ transform: "translateX(0%)", opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
                type: "tween",
              }}
            >
              <a href={pro.url} target="_blank">
                - {pro.name} -
              </a>
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
}

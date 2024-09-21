"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";
// import IaiyiRems from "@/app/constants/aiyiRem";
import getImageSizeByUrl from "@/app/utils/getImageSizeByUrl";

export default function DrawingScene() {
  // const initialAiyiRems = IaiyiRems;
  
  const initialAiyiRems = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 9; i++) {
      temp.push("/aiyiRemPublic/" + String(i + 1) + ".webp");
    }
    return temp;
  }, []);

  const [aiyiRems, setAiyiRems] = useState(initialAiyiRems);

  useEffect(() => {
    setAiyiRems([...initialAiyiRems].sort(() => Math.random() - 0.5));
  }, [initialAiyiRems]);
  const threeRainRef = useRef<HTMLDivElement>(null);

  const aiyiRemSizes = useRef<
    Array<{ width: number; height: number; src: string }>
  >([]);
  const [finished, setFinished] = useState(false);
  async function getResult(url: string) {
    let result = await getImageSizeByUrl(url);
    aiyiRemSizes.current.push({
      width: result.width,
      height: result.height,
      src: url,
    });
    console.log(
      "aiyiRemSizes getting (" +
        aiyiRemSizes.current.length +
        "/" +
        aiyiRems.length +
        ")"
    );
    if (aiyiRemSizes.current.length === aiyiRems.length) {
      setFinished(true);
      console.log(
        "%cGetting aiyiRemSizes finished",
        "color:#91bef0; font-size:20px;"
      );
    }
  }
  const firstRender = useRef(true);
  useEffect(() => {
    if (!firstRender.current) {
      return;
    }
    firstRender.current = false;
    for (let i = 0; i < aiyiRems.length; i++) {
      getResult(aiyiRems[i]);
    }
  }, [aiyiRems]);

  useEffect(() => {
    if (!finished) {
      return;
    }
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
    for (let i = 0; i < aiyiRems.length; i++) {
      textures2[i] = texloader.load(aiyiRemSizes.current[i].src);
    }

    for (let i = 0; i < 2000; i++) {
      const texture = textures2[i % textures2.length];
      const spritematerial = new THREE.SpriteMaterial({
        map: texture,
      });
      const mesh = new THREE.Sprite(spritematerial);
      groupGFD.add(mesh);
      const scale = Math.random() * 20 + 40;
      mesh.scale.set(
        (scale * aiyiRemSizes.current[i % textures2.length].width) /
          aiyiRemSizes.current[i % textures2.length].height,
        scale,
        scale
      );
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
        .to({ angle: Math.PI * 2 }, 64000)
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
    setInterval(circleMove, 64000);

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
        mesh.position.y -= t * 10;
        if (mesh.position.y < -150) {
          mesh.position.y = 150;
        }
      });

      TWEEN.update();
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
    render();
  }, [finished, aiyiRems]);

  return (
    <div className="fixed z-[100] h-screen w-screen left-0 top-0 bg-[#91bef0]">
      {/* mainScene */}
      <div
        className=" absolute top-0 left-0 w-screen h-screen overflow-hidden"
        ref={threeRainRef}
      ></div>
    </div>
  );
}

import * as THREE from "three";
import { useAnimations, useGLTF, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

function Dog() {
  const model = useGLTF("/model/dog.glb");
  const modelRef = useRef(model);

  const { actions } = useAnimations(model.animations, model.scene);

  gsap.registerPlugin(ScrollTrigger);

  const [normalMap] = useTexture(["/dog_normals.jpg"]).map((texture) => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });

  const [branchesNormal, branchesDiffuse] = useTexture([
    "/branches_normals.jpeg",
    "/branches_diffuse.jpeg",
  ]).map((texture) => {
    texture.flipY = true;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });

  const [mat1, mat2, mat8, mat9, mat10, mat13, mat18, mat19] = useTexture([
    "/matcap/mat-1.png",
    "/matcap/mat-2.png",
    "/matcap/mat-8.png",
    "/matcap/mat-9.png",
    "/matcap/mat-10.png",
    "/matcap/mat-13.png",
    "/matcap/mat-18.png",
    "/matcap/mat-19.png",
  ]).map((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });

  const material = useRef({
    uMatcap1: { value: mat1 },
    uMatcap2: { value: mat2 },
    uProgress: { value: 1.0 },
  });

  useThree(({ camera, gl }) => {
    camera.position.set(-0.5, 0, 0.5);
    gl.toneMapping = THREE.ReinhardToneMapping;
    gl.outputColorSpace = THREE.SRGBColorSpace;
    // gl.shadowMap.enabled = true
    // gl.shadowMap.type = THREE.PCFSoftShadowMap
  });

  // const textures = useTexture({
  //     normalMap: "/dog_normals.jpg",
  //     sampleMateCap: "/matcap/mat-1.png"
  // })

  useEffect(() => {
    if (actions["Take 001"]) {
      actions["Take 001"].play();
    }
  }, [actions]);

  useEffect(() => {
    // const normalMap = textures.normalMap.clone()
    // const matcap = textures.sampleMateCap.clone()
    // normalMap.flipY = false
    // matcap.colorSpace = THREE.SRGBColorSpace

    const dogMaterial = new THREE.MeshMatcapMaterial({
      normalMap: normalMap,
      matcap: mat1,
    });

    const branchesMaterial = new THREE.MeshStandardMaterial({
      normalMap: branchesNormal,
      map: branchesDiffuse,
    });

    function onBeforeCompile(shader) {
      shader.uniforms.uMatcapTexture1 = material.current.uMatcap1;
      shader.uniforms.uMatcapTexture2 = material.current.uMatcap2;
      shader.uniforms.uProgress = material.current.uProgress;

      // Store reference to shader uniforms for GSAP animation

      shader.fragmentShader = shader.fragmentShader.replace(
        "void main() {",
        `
        uniform sampler2D uMatcapTexture1;
        uniform sampler2D uMatcapTexture2;
        uniform float uProgress;

        void main() {
        `,
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        "vec4 matcapColor = texture2D( matcap, uv );",
        `
          vec4 matcapColor1 = texture2D( uMatcapTexture1, uv );
          vec4 matcapColor2 = texture2D( uMatcapTexture2, uv );
          float transitionFactor  = 0.2;
          
          float progress = smoothstep(uProgress - transitionFactor,uProgress, (vViewPosition.x+vViewPosition.y)*0.5 + 0.5);

          vec4 matcapColor = mix(matcapColor2, matcapColor1, progress );
        `,
      );
    }

    dogMaterial.onBeforeCompile = onBeforeCompile;

    model.scene.traverse((child) => {
      if (child.isMesh && child.name.includes("DOG")) {
        child.material = dogMaterial;
        // child.material.normalMap = normalMap
        // child.material.needsUpdate = true
        // child.material.matCap = textures.sampleMateCap
      } else {
        child.material = branchesMaterial;
      }
    });
  }, [model, normalMap, branchesNormal, branchesDiffuse, mat1]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#sectoin-1",
        endTrigger: "#sectoin-3",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        markers: true,
      },
    });

    tl.to(modelRef?.current?.scene?.position, {
      z: -0.75,
      ease: "none",
    })
      .to(modelRef?.current?.scene?.rotation, {
        x: Math.PI / 10,
        ease: "none",
      })
      .to(
        modelRef?.current?.scene?.rotation,
        {
          y: -Math.PI / 1.25,
          ease: "none",
        },
        "third",
      )
      .to(
        modelRef?.current?.scene?.position,
        {
          x: -0.7,
          z: -0.25,
        },
        "third",
      );

    return () => tl.kill();
  }, []);

  const triggerTransition = (newMatcap) => {
    const mat = material.current;
    gsap.killTweensOf(mat.uProgress);

    if (mat.uMatcap1.value === newMatcap) return;

    mat.uMatcap2.value = mat.uMatcap1.value;
    mat.uMatcap1.value = newMatcap;
    mat.uProgress.value = 1.0;

    gsap.to(mat.uProgress, {
      value: 0.0,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        mat.uMatcap2.value = mat.uMatcap1.value;
        mat.uProgress.value = 1.0;
      },
    });
  };

  useEffect(() => {
    const el1 = document.querySelector(".title[img-title='image-1']");
    const el2 = document.querySelector(".title[img-title='image-2']");
    const el3 = document.querySelector(".title[img-title='image-3']");
    const el4 = document.querySelector(".title[img-title='image-4']");
    const el5 = document.querySelector(".title[img-title='image-5']");
    const el6 = document.querySelector(".title[img-title='image-6']");
    const el7 = document.querySelector(".title[img-title='image-7']");

    const handler1 = () => triggerTransition(mat19);
    const handler2 = () => triggerTransition(mat8);
    const handler3 = () => triggerTransition(mat9);
    const handler4 = () => triggerTransition(mat18);
    const handler5 = () => triggerTransition(mat10);
    const handler6 = () => triggerTransition(mat8);
    const handler7 = () => triggerTransition(mat13);
    const leave = () => triggerTransition(mat2);

    el1.addEventListener("mouseenter", handler1);
    el2.addEventListener("mouseenter", handler2);
    el3.addEventListener("mouseenter", handler3);
    el4.addEventListener("mouseenter", handler4);
    el5.addEventListener("mouseenter", handler5);
    el6.addEventListener("mouseenter", handler6);
    el7.addEventListener("mouseenter", handler7);
    el1.addEventListener("mouseleave", leave);
    el2.addEventListener("mouseleave", leave);
    el3.addEventListener("mouseleave", leave);
    el4.addEventListener("mouseleave", leave);
    el5.addEventListener("mouseleave", leave);
    el6.addEventListener("mouseleave", leave);
    el7.addEventListener("mouseleave", leave);

    return () => {
      el1.removeEventListener("mouseenter", handler1);
      el2.removeEventListener("mouseenter", handler2);
      el3.removeEventListener("mouseenter", handler3);
      el4.removeEventListener("mouseenter", handler4);
      el5.removeEventListener("mouseenter", handler5);
      el6.removeEventListener("mouseenter", handler6);
      el7.removeEventListener("mouseenter", handler7);
      el1.removeEventListener("mouseleave", leave);
      el2.removeEventListener("mouseleave", leave);
      el3.removeEventListener("mouseleave", leave);
      el4.removeEventListener("mouseleave", leave);
      el5.removeEventListener("mouseleave", leave);
      el6.removeEventListener("mouseleave", leave);
      el7.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <>
      <primitive
        object={model.scene}
        position={[-0.35, -0.5, -0.25]}
        rotation={[0, Math.PI / 4, 0]}
      />
      <directionalLight position={[0, 5, 5]} intensity={10} />
      {/* <OrbitControls /> */}
    </>
  );
}

export default Dog;

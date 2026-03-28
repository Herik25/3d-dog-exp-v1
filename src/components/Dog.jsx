import * as THREE from "three";
import { useAnimations, useGLTF, useTexture } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

function Dog() {
    const model = useGLTF("/model/dog.glb")
    const modelRef = useRef(model)
    const { actions } = useAnimations(model.animations, model.scene)
    
    gsap.registerPlugin(ScrollTrigger)

    const [ normalMap, matcap ] = useTexture([
        "/dog_normals.jpg",
        "/matcap/mat-1.png",
    ]).map((texture) => {
        texture.flipY = false
        texture.colorSpace = THREE.SRGBColorSpace
        return texture
    })

    const [ branchesNormal, branchesDiffuse ] = useTexture([
        "/branches_normals.jpeg",
        "/branches_diffuse.jpeg"
    ]).map((texture) => {
        texture.flipY = true
        texture.colorSpace = THREE.SRGBColorSpace
        return texture
    })
    
    useThree(({ camera, gl }) => {
        camera.position.set(-0.5, 0, 0.5)
        gl.toneMapping = THREE.ReinhardToneMapping
        gl.outputColorSpace = THREE.SRGBColorSpace
        // gl.shadowMap.enabled = true
        // gl.shadowMap.type = THREE.PCFSoftShadowMap
    })

    // const textures = useTexture({
    //     normalMap: "/dog_normals.jpg",
    //     sampleMateCap: "/matcap/mat-1.png"
    // })


    useEffect(() => {
        if (actions["Take 001"]) {
            actions["Take 001"].play()
        }
    }, [actions])

     useEffect(() => {
        // const normalMap = textures.normalMap.clone()
        // const matcap = textures.sampleMateCap.clone()
        // normalMap.flipY = false
        // matcap.colorSpace = THREE.SRGBColorSpace

        const dogMaterial = new THREE.MeshMatcapMaterial({
            normalMap: normalMap,
            matcap: matcap
        })

        const branchesMaterial = new THREE.MeshStandardMaterial({
            normalMap: branchesNormal,
            map: branchesDiffuse
        })


        model.scene.traverse((child) => {
            if (child.isMesh && child.name.includes("DOG")) {
                 child.material = dogMaterial
                // child.material.normalMap = normalMap
                // child.material.needsUpdate = true
                // child.material.matCap = textures.sampleMateCap
            } else {
                child.material = branchesMaterial
            }
        })
    }, [model, normalMap, matcap, branchesNormal, branchesDiffuse])

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#sectoin-1",
                endTrigger: "#sectoin-3",
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                markers: true,
            }
        })

        tl.to(modelRef?.current?.scene?.position, {
            z: -0.75,
            ease: "none"
        })
        .to(modelRef?.current?.scene?.rotation, {
            x: Math.PI / 10,
            ease: "none"
        })
        .to(modelRef?.current?.scene?.rotation, {
            y: -Math.PI / 1.25,
            ease: "none"
        }, "third")
        .to(modelRef?.current?.scene?.position, {
            x: -0.70,
            z: -0.25
        }, "third")

        return () => tl.kill();
    }, [])

  return (
    <>
        <primitive object={model.scene} position={[-0.35, -0.5, -0.25]} rotation={[0, Math.PI / 4, 0]} />
        <directionalLight position={[0, 5, 5]} intensity={10} />
        {/* <OrbitControls /> */}
    </>
  )
}

export default Dog
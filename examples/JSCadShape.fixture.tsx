import React from "react"
import { createJSCADRenderer, Cube, Sphere } from "../lib"
import * as jscad from "@jscad/modeling"
import * as THREE from "three"
// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const { createJSCADRoot } = createJSCADRenderer(jscad)

function Scene() {
  return (
    <>
      <Cube size={10} />
      <Sphere radius={5} />
    </>
  )
}

export default function JSCadShapeFixture() {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (containerRef.current) {
      const container: any[] = []
      const root = createJSCADRoot(container)
      root.render(<Scene />)

      // Here, you would typically use the container to render the 3D shape
      // For this example, we'll just log the result
      console.log("JSCad objects:", container)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )

      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)

      // Add directional light
      const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.5)
      directionalLight1.position.set(100, 100, 100)
      scene.add(directionalLight1)

      const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.2)
      directionalLight2.position.set(0, -100, 100)
      scene.add(directionalLight2)

      const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.1)
      directionalLight3.position.set(-100, 100, 100)
      scene.add(directionalLight3)

      const geometry = new THREE.BoxGeometry(1, 1, 1)
      const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
      const cube = new THREE.Mesh(geometry, material)
      scene.add(cube)

      camera.position.z = 5

      const renderer = new THREE.WebGLRenderer()
      renderer.setSize(window.innerWidth, window.innerHeight)

      containerRef.current.appendChild(renderer.domElement)

      // Add OrbitControls
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.25
      controls.enableZoom = true

      // Animation loop
      function animate() {
        requestAnimationFrame(animate)
        controls.update()
        renderer.render(scene, camera)
      }
      animate()
    }
  }, [])

  return (
    <div ref={containerRef} style={{ width: "100%", minHeight: "400px" }} />
  )
}

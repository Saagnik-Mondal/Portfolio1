import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { scrollStore } from '../lib/scroll-store'

function ReactiveBlob() {
  const group = useRef<THREE.Group>(null)
  const mat = useRef<any>(null)
  const wire = useRef<THREE.Mesh>(null)
  const distort = useRef(0.3)

  useFrame(({ mouse }, delta) => {
    const { progress, velocity } = scrollStore
    const absV = Math.min(Math.abs(velocity) * 0.012, 0.5)

    // distortion eases toward a scroll-velocity-driven target
    const targetDistort = 0.28 + absV
    distort.current += (targetDistort - distort.current) * 0.08
    if (mat.current) mat.current.distort = distort.current

    if (group.current) {
      // continuous spin + extra spin from scroll velocity
      group.current.rotation.y += delta * 0.18 + velocity * 0.0006
      group.current.rotation.z += delta * 0.04
      // gentle parallax toward cursor
      group.current.rotation.x += (-mouse.y * 0.25 - group.current.rotation.x) * 0.04

      // drift + shrink as the page scrolls
      const s = 1.6 - progress * 0.55
      group.current.scale.setScalar(s)
      group.current.position.x = progress * 1.6
      group.current.position.y = progress * 0.4
    }
    if (wire.current) wire.current.rotation.y -= delta * 0.05
  })

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1, 14]} />
        <MeshDistortMaterial
          ref={mat}
          color="#4F46E5"
          roughness={0.2}
          metalness={0.15}
          distort={0.3}
          speed={2}
        />
      </mesh>
      <mesh ref={wire} scale={1.04}>
        <icosahedronGeometry args={[1, 3]} />
        <meshBasicMaterial color="#A5B4FC" wireframe transparent opacity={0.14} />
      </mesh>
    </group>
  )
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 4.6], fov: 50 }} gl={{ alpha: true, antialias: true }} dpr={[1, 2]}>
        <ambientLight intensity={0.75} />
        <directionalLight position={[3, 4, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-4, -2, 1]} intensity={0.6} color="#A5B4FC" />
        <ReactiveBlob />
      </Canvas>
    </div>
  )
}

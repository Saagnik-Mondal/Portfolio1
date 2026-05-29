import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'
import { scrollStore } from '../lib/scroll-store'

function Knot() {
  const group = useRef<THREE.Group>(null)
  const mat = useRef<any>(null)
  const halo = useRef<THREE.Mesh>(null)
  const distort = useRef(0.32)

  useFrame(({ mouse, clock }, delta) => {
    const { progress, velocity } = scrollStore
    const absV = Math.min(Math.abs(velocity) * 0.012, 0.55)

    const targetDistort = 0.3 + absV
    distort.current += (targetDistort - distort.current) * 0.07
    if (mat.current) mat.current.distort = distort.current

    if (group.current) {
      group.current.rotation.y += delta * 0.16 + velocity * 0.0005
      group.current.rotation.z += delta * 0.03
      group.current.rotation.x += (-mouse.y * 0.3 - group.current.rotation.x) * 0.04

      // drift across + down, shrinking on scroll
      const s = 1.55 - progress * 0.5
      group.current.scale.setScalar(s)
      group.current.position.x = 1.05 + progress * 1.4 + mouse.x * 0.25
      group.current.position.y = 0.1 - progress * 0.8 + Math.sin(clock.elapsedTime * 0.4) * 0.06
    }
    if (halo.current) halo.current.rotation.y -= delta * 0.06
  })

  return (
    <group ref={group} position={[1.05, 0.1, 0]}>
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh>
          <icosahedronGeometry args={[1, 18]} />
          <MeshDistortMaterial
            ref={mat}
            color="#3A2BFF"
            roughness={0.22}
            metalness={0.18}
            distort={0.32}
            speed={1.8}
          />
        </mesh>
        <mesh ref={halo} scale={1.16}>
          <icosahedronGeometry args={[1, 2]} />
          <meshBasicMaterial color="#FF5A2C" wireframe transparent opacity={0.1} />
        </mesh>
      </Float>
    </group>
  )
}

export default function Scene3D() {
  const reduce = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )
  if (reduce) return null

  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.8]}
      >
        <ambientLight intensity={0.85} />
        <directionalLight position={[3, 4, 5]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-4, -2, 1]} intensity={0.9} color="#FF8A66" />
        <pointLight position={[2, -3, 2]} intensity={0.6} color="#6C5CFF" />
        <Knot />
      </Canvas>
    </div>
  )
}

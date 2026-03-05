import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function UrbanScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const shapesRef = useRef<THREE.Mesh[]>([])
  const particlesRef = useRef<THREE.Points | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = null // Transparent background
    sceneRef.current = scene

    // Get container dimensions
    const width = containerRef.current.clientWidth || window.innerWidth
    const height = containerRef.current.clientHeight || window.innerHeight

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 5
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0'
    renderer.domElement.style.left = '0'
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lighting - enhanced for green palette
    const ambientLight = new THREE.AmbientLight(0xf0f8f4, 0.7)  // Green-tinted ambient light
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xf0f8f4, 0.9)
    directionalLight.position.set(5, 10, 7)
    scene.add(directionalLight)

    // Add greenish point light for depth
    const pointLight = new THREE.PointLight(0x8ba89f, 0.5)
    pointLight.position.set(-3, 2, 3)
    scene.add(pointLight)

    // Create urban geometric shapes - 60/30/10 color scheme (Green palette)
    // 60% Dominant: Light green-tinted white, 30% Secondary: Sage/green, 10% Accent: Warm peach
    const colors = [
      0xf5fbf7, // 60% - Dominant light green-white
      0xf5fbf7, // 60% - Dominant light green-white
      0xf5fbf7, // 60% - Dominant light green-white
      0x8ba89f, // 30% - Secondary light sage green
      0x6b8e7f, // 30% - Secondary sage green
      0xe8a66f, // 10% - Accent warm peach
    ]

    const shapes: THREE.Mesh[] = []

    // Create buildings (varied boxes)
    // Shape slowdown: much slower rotation for large volumes
    const SHAPE_ROTATION_SLOWDOWN = 0.2 // 80% slower rotation

    for (let i = 0; i < 8; i++) {
      const width = Math.random() * 0.8 + 0.3
      const height = Math.random() * 2 + 1.5
      const depth = Math.random() * 0.8 + 0.3

      const geometry = new THREE.BoxGeometry(width, height, depth)
      const colorIdx = i % colors.length
      const material = new THREE.MeshStandardMaterial({
        color: colors[colorIdx],
        metalness: 0.4,
        roughness: 0.6,
        emissive: colors[colorIdx],
        emissiveIntensity: colorIdx === colors.length - 1 ? 0.15 : 0.05,  // Slightly emit accent color
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.x = (Math.random() - 0.5) * 8
      mesh.position.y = (Math.random() - 0.5) * 4
      mesh.position.z = (Math.random() - 0.5) * 3
      mesh.rotation.x = Math.random() * 0.3
      mesh.rotation.y = Math.random() * 0.3

      mesh.userData = {
        originalRotation: { x: mesh.rotation.x, y: mesh.rotation.y, z: mesh.rotation.z },
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.01 * SHAPE_ROTATION_SLOWDOWN,
          y: (Math.random() - 0.5) * 0.01 * SHAPE_ROTATION_SLOWDOWN,
          z: (Math.random() - 0.5) * 0.01 * SHAPE_ROTATION_SLOWDOWN,
        },
      }

      scene.add(mesh)
      shapes.push(mesh)
    }

    shapesRef.current = shapes

    // Create pyramids (tetrahedrons)
    for (let i = 0; i < 5; i++) {
      const geometry = new THREE.TetrahedronGeometry(0.6)
      const material = new THREE.MeshStandardMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        metalness: 0.5,
        roughness: 0.5,
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.x = (Math.random() - 0.5) * 8
      mesh.position.y = (Math.random() - 0.5) * 4
      mesh.position.z = (Math.random() - 0.5) * 3
      mesh.rotation.x = Math.random() * Math.PI
      mesh.rotation.y = Math.random() * Math.PI

      mesh.userData = {
        originalRotation: { x: mesh.rotation.x, y: mesh.rotation.y, z: mesh.rotation.z },
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.015 * SHAPE_ROTATION_SLOWDOWN,
          y: (Math.random() - 0.5) * 0.015 * SHAPE_ROTATION_SLOWDOWN,
          z: (Math.random() - 0.5) * 0.015 * SHAPE_ROTATION_SLOWDOWN,
        },
      }

      scene.add(mesh)
      shapes.push(mesh)
    }

    // Create particles with Perlin-like noise animation
    const particleCount = 250
    const particleGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const initialPositions = new Float32Array(particleCount * 3)
    const particleSizes = new Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 10
      const y = (Math.random() - 0.5) * 6
      const z = (Math.random() - 0.5) * 5

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      initialPositions[i * 3] = x
      initialPositions[i * 3 + 1] = y
      initialPositions[i * 3 + 2] = z

      // Random sizes between 0.125 and 0.25
      particleSizes[i] = Math.random() * 0.125 + 0.125
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xe8a66f,  // Accent warm peach from 60/30/10 scheme
      size: 0.25,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
    })

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)
    particlesRef.current = particles

    // Store data for animation
    particles.userData.initialPositions = initialPositions
    particles.userData.particleSizes = particleSizes
    particles.userData.time = 0

    // Mouse tracking
    const onMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', onMouseMove)


    // Handle window resize
    const onWindowResize = () => {
      const width = containerRef.current?.clientWidth || window.innerWidth
      const height = containerRef.current?.clientHeight || window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', onWindowResize)

    // Animation loop
    let animationId: number

    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Rotate shapes
      shapes.forEach((shape) => {
        const speed = shape.userData.rotationSpeed
        shape.rotation.x += speed.x
        shape.rotation.y += speed.y
        shape.rotation.z += speed.z
      })

      // Interactive rotation based on mouse
      camera.position.x = mouseRef.current.x * 2
      camera.position.y = mouseRef.current.y * 1.5

      // Animate particles with Perlin-like noise
      if (particles) {
        const positions = particleGeometry.attributes.position.array as Float32Array
        const initialPositions = particles.userData.initialPositions as Float32Array

        particles.userData.time += 0.005 // Slow animation
        const time = particles.userData.time

        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3

          // Perlin-like noise using sine/cosine combinations
          const noiseX = Math.sin(time + initialPositions[idx] * 0.5) * 0.3 + Math.cos(time * 0.7 + initialPositions[idx + 1] * 0.3) * 0.2
          const noiseY = Math.cos(time + initialPositions[idx + 1] * 0.5) * 0.3 + Math.sin(time * 0.7 + initialPositions[idx + 2] * 0.3) * 0.2
          const noiseZ = Math.sin(time * 0.8 + initialPositions[idx + 2] * 0.5) * 0.2 + Math.cos(time * 0.6 + initialPositions[idx] * 0.3) * 0.15

          positions[idx] = initialPositions[idx] + noiseX
          positions[idx + 1] = initialPositions[idx + 1] + noiseY
          positions[idx + 2] = initialPositions[idx + 2] + noiseZ
        }

        particleGeometry.attributes.position.needsUpdate = true
      }

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onWindowResize)
      cancelAnimationFrame(animationId)

      if (containerRef.current && renderer.domElement.parentElement === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }

      particleGeometry.dispose()
      shapes.forEach((shape) => {
        if (shape.geometry) shape.geometry.dispose()
        if (shape.material && 'dispose' in shape.material) shape.material.dispose()
      })
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  )
}

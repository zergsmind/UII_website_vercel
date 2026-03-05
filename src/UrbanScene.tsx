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
  const scrollRef = useRef({ position: 0, velocity: 0, lastPosition: 0 })

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

    // Create particles with damping
    const particleCount = 200
    const particleGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    const PARTICLE_SLOWDOWN = 0.4 * 1.1 // 60% slower + 10% faster = 50% slower overall
    const DAMPING = 0.98 // Smooth damping factor for organic motion

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10
      positions[i + 1] = (Math.random() - 0.5) * 6
      positions[i + 2] = (Math.random() - 0.5) * 5

      velocities[i] = (Math.random() - 0.5) * 0.02 * PARTICLE_SLOWDOWN
      velocities[i + 1] = (Math.random() - 0.5) * 0.02 * PARTICLE_SLOWDOWN
      velocities[i + 2] = (Math.random() - 0.5) * 0.02 * PARTICLE_SLOWDOWN
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xe8a66f,  // Accent warm peach from 60/30/10 scheme
      size: 0.1,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
    })

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)
    particlesRef.current = particles

    // Store velocities for animation
    particles.userData.velocities = velocities

    // Mouse tracking
    const onMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', onMouseMove)

    // Scroll tracking for particle interaction
    const onScroll = () => {
      scrollRef.current.lastPosition = scrollRef.current.position
      scrollRef.current.position = window.scrollY
      scrollRef.current.velocity = scrollRef.current.position - scrollRef.current.lastPosition
    }

    window.addEventListener('scroll', onScroll)

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

      // Animate particles with damping and scroll interaction
      if (particles) {
        const positions = particleGeometry.attributes.position.array as Float32Array
        const velocities = particles.userData.velocities as Float32Array

        // Scroll influence on particles
        const scrollInfluence = scrollRef.current.velocity * 0.0001

        for (let i = 0; i < positions.length; i += 3) {
          // Apply scroll-based velocity influence (creates wave-like effect)
          velocities[i] += scrollInfluence * (Math.sin(positions[i + 1] * 2) * 0.5)
          velocities[i + 1] += scrollInfluence * 0.3
          velocities[i + 2] += scrollInfluence * (Math.cos(positions[i] * 2) * 0.5)

          // Apply damping to velocities for organic deceleration
          velocities[i] *= DAMPING
          velocities[i + 1] *= DAMPING
          velocities[i + 2] *= DAMPING

          positions[i] += velocities[i]
          positions[i + 1] += velocities[i + 1]
          positions[i + 2] += velocities[i + 2]

          // Bounce particles off boundaries with dampening
          if (Math.abs(positions[i]) > 5) {
            velocities[i] *= -0.9 // Energy loss on bounce
          }
          if (Math.abs(positions[i + 1]) > 3) {
            velocities[i + 1] *= -0.9
          }
          if (Math.abs(positions[i + 2]) > 2.5) {
            velocities[i + 2] *= -0.9
          }
        }

        particleGeometry.attributes.position.needsUpdate = true
      }

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
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

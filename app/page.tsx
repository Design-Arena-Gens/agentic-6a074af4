'use client'

import { useEffect, useRef } from 'react'

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const animationDuration = 6000 // 6 seconds
    let startTime = Date.now()

    // Particle system for neon swirls
    class Particle {
      x: number = 0
      y: number = 0
      angle: number = 0
      radius: number = 0
      speed: number = 0
      color: string = ''
      size: number = 0
      phase: number = 0

      constructor() {
        this.reset()
      }

      reset() {
        this.x = canvas!.width * 0.7
        this.y = canvas!.height * 0.4
        this.angle = Math.random() * Math.PI * 2
        this.radius = Math.random() * 150 + 50
        this.speed = Math.random() * 0.02 + 0.01
        this.phase = Math.random() * Math.PI * 2
        this.size = Math.random() * 4 + 2

        const colors = [
          'rgba(255, 0, 255, 0.8)',   // Magenta
          'rgba(0, 255, 255, 0.8)',   // Cyan
          'rgba(255, 100, 255, 0.8)', // Pink
          'rgba(100, 200, 255, 0.8)', // Light Blue
          'rgba(200, 100, 255, 0.8)', // Purple
          'rgba(255, 200, 0, 0.8)',   // Gold
        ]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update(time: number) {
        this.angle += this.speed
        this.phase += 0.05

        const spiralFactor = Math.sin(time / 500 + this.phase) * 0.3
        this.x = canvas!.width * 0.7 + Math.cos(this.angle) * (this.radius + spiralFactor * 50)
        this.y = canvas!.height * 0.4 + Math.sin(this.angle) * (this.radius + spiralFactor * 50) * 0.8
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.shadowBlur = 20
        ctx.shadowColor = this.color
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const particles: Particle[] = []
    for (let i = 0; i < 80; i++) {
      particles.push(new Particle())
    }

    // Cat drawing function
    function drawCat(ctx: CanvasRenderingContext2D, time: number) {
      const catX = canvas!.width * 0.25
      const catY = canvas!.height * 0.5
      const bobAmount = Math.sin(time / 300) * 3

      ctx.shadowBlur = 15
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'

      // Body
      ctx.fillStyle = '#f5f5f5'
      ctx.beginPath()
      ctx.ellipse(catX, catY + 40 + bobAmount, 60, 70, 0, 0, Math.PI * 2)
      ctx.fill()

      // Head
      ctx.beginPath()
      ctx.arc(catX, catY + bobAmount, 50, 0, Math.PI * 2)
      ctx.fill()

      // Ears
      ctx.beginPath()
      ctx.moveTo(catX - 35, catY - 20 + bobAmount)
      ctx.lineTo(catX - 45, catY - 50 + bobAmount)
      ctx.lineTo(catX - 20, catY - 30 + bobAmount)
      ctx.closePath()
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(catX + 35, catY - 20 + bobAmount)
      ctx.lineTo(catX + 45, catY - 50 + bobAmount)
      ctx.lineTo(catX + 20, catY - 30 + bobAmount)
      ctx.closePath()
      ctx.fill()

      // Inner ears (pink)
      ctx.fillStyle = '#ffb6c1'
      ctx.beginPath()
      ctx.moveTo(catX - 32, catY - 22 + bobAmount)
      ctx.lineTo(catX - 38, catY - 40 + bobAmount)
      ctx.lineTo(catX - 25, catY - 28 + bobAmount)
      ctx.closePath()
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(catX + 32, catY - 22 + bobAmount)
      ctx.lineTo(catX + 38, catY - 40 + bobAmount)
      ctx.lineTo(catX + 25, catY - 28 + bobAmount)
      ctx.closePath()
      ctx.fill()

      // Eyes (watching the neon swirls)
      const eyeFollow = Math.sin(time / 500) * 3
      ctx.shadowBlur = 0
      ctx.fillStyle = '#000'
      ctx.beginPath()
      ctx.ellipse(catX - 18 + eyeFollow, catY - 5 + bobAmount, 8, 12, 0, 0, Math.PI * 2)
      ctx.fill()

      ctx.beginPath()
      ctx.ellipse(catX + 18 + eyeFollow, catY - 5 + bobAmount, 8, 12, 0, 0, Math.PI * 2)
      ctx.fill()

      // Eye shine
      ctx.fillStyle = '#fff'
      ctx.beginPath()
      ctx.arc(catX - 16 + eyeFollow, catY - 8 + bobAmount, 3, 0, Math.PI * 2)
      ctx.fill()

      ctx.beginPath()
      ctx.arc(catX + 20 + eyeFollow, catY - 8 + bobAmount, 3, 0, Math.PI * 2)
      ctx.fill()

      // Nose
      ctx.fillStyle = '#ffb6c1'
      ctx.beginPath()
      ctx.moveTo(catX, catY + 10 + bobAmount)
      ctx.lineTo(catX - 5, catY + 5 + bobAmount)
      ctx.lineTo(catX + 5, catY + 5 + bobAmount)
      ctx.closePath()
      ctx.fill()

      // Mouth
      ctx.strokeStyle = '#000'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(catX - 8, catY + 15 + bobAmount, 8, 0, Math.PI / 2)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(catX + 8, catY + 15 + bobAmount, 8, Math.PI / 2, Math.PI)
      ctx.stroke()

      // Whiskers
      ctx.lineWidth = 1.5
      ctx.strokeStyle = '#888'

      // Left whiskers
      ctx.beginPath()
      ctx.moveTo(catX - 50, catY + bobAmount)
      ctx.lineTo(catX - 30, catY - 2 + bobAmount)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(catX - 50, catY + 8 + bobAmount)
      ctx.lineTo(catX - 30, catY + 6 + bobAmount)
      ctx.stroke()

      // Right whiskers
      ctx.beginPath()
      ctx.moveTo(catX + 50, catY + bobAmount)
      ctx.lineTo(catX + 30, catY - 2 + bobAmount)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(catX + 50, catY + 8 + bobAmount)
      ctx.lineTo(catX + 30, catY + 6 + bobAmount)
      ctx.stroke()

      // Fluffy details (small circles for texture)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
      for (let i = 0; i < 15; i++) {
        const angle = (i / 15) * Math.PI * 2
        const fluffX = catX + Math.cos(angle) * 52
        const fluffY = catY + bobAmount + Math.sin(angle) * 52
        ctx.beginPath()
        ctx.arc(fluffX, fluffY, 3, 0, Math.PI * 2)
        ctx.fill()
      }

      // Tail
      ctx.fillStyle = '#f5f5f5'
      ctx.shadowBlur = 10
      ctx.shadowColor = 'rgba(0, 0, 0, 0.2)'
      const tailWag = Math.sin(time / 200) * 15
      ctx.beginPath()
      ctx.ellipse(catX - 70 + tailWag, catY + 60 + bobAmount, 25, 60, -0.5, 0, Math.PI * 2)
      ctx.fill()
    }

    function animate() {
      if (!ctx || !canvas) return

      const currentTime = Date.now()
      const elapsed = currentTime - startTime

      // Loop the animation every 6 seconds
      if (elapsed >= animationDuration) {
        startTime = currentTime
      }

      const time = elapsed % animationDuration

      // Soft gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, '#1a1a2e')
      gradient.addColorStop(0.5, '#16213e')
      gradient.addColorStop(1, '#0f3460')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw particles (neon swirls)
      particles.forEach(particle => {
        particle.update(time)
        particle.draw(ctx)
      })

      // Draw connecting lines between nearby particles for swirl effect
      ctx.shadowBlur = 0
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 80) {
            ctx.strokeStyle = `rgba(150, 150, 255, ${0.15 * (1 - distance / 80)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })
      })

      // Draw the cat
      drawCat(ctx, time)

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        width: '100vw',
        height: '100vh',
        background: '#1a1a2e'
      }}
    />
  )
}

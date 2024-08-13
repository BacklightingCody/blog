<template>
  <div class="loader-container" v-if="globalStore.loading">
    <canvas ref="canvas" :width="width * pixelRatio" :height="height * pixelRatio"
      :style="{ width: width + 'px', height: height + 'px' }"></canvas>
      <p>{{ globalStore.loading }}</p> 
  </div>
</template>

<script setup lang="ts">

import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
import { watch } from 'vue'
import { useGlobalStore } from '@/stores'
const globalStore = useGlobalStore()

// State variables
let canvas = ref<HTMLCanvasElement | null>(null)
const width = 300
const height = 300
const pixelRatio = window.devicePixelRatio || 1
let ctx: CanvasRenderingContext2D | null = null
const particles: Particle[] = []
let globalAngle = 0
let globalRotation = 0
let tick = 0
const PI = Math.PI
const TWO_PI = PI * 2
const min = width * 0.5
let animationFrameId: number

// Particle class definition
class Particle {
  radius: number
  x: number
  y: number
  angle: number
  speed: number
  accel: number
  decay: number
  life: number

  constructor(opt: { x: number; y: number; angle: number; speed: number; accel: number }) {
    this.radius = 7
    this.x = opt.x
    this.y = opt.y
    this.angle = opt.angle
    this.speed = opt.speed
    this.accel = opt.accel
    this.decay = 0.01
    this.life = 1
  }

  step(i: number) {
    this.speed += this.accel
    this.x += Math.cos(this.angle) * this.speed
    this.y += Math.sin(this.angle) * this.speed
    this.angle += PI / 64
    this.accel *= 1.01
    this.life -= this.decay

    if (this.life <= 0) {
      particles.splice(i, 1)
    }
  }

  draw(i: number) {
    if (!ctx) return

    ctx.fillStyle = ctx.strokeStyle = `hsla(${tick + this.life * 120}, 100%, 60%, ${this.life})`
    ctx.beginPath()
    if (particles[i - 1]) {
      ctx.moveTo(this.x, this.y)
      ctx.lineTo(particles[i - 1].x, particles[i - 1].y)
    }
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(this.x, this.y, Math.max(0.001, this.life * this.radius), 0, TWO_PI)
    ctx.fill()

    const size = Math.random() * 1.25
    ctx.fillRect(
      ~~(this.x + (Math.random() - 0.5) * 35 * this.life),
      ~~(this.y + (Math.random() - 0.5) * 35 * this.life),
      size,
      size
    )
  }
}

// Animation functions
function step() {
  particles.push(
    new Particle({
      x: width / 2 + Math.cos(tick / 20) * min / 2,
      y: height / 2 + Math.sin(tick / 20) * min / 2,
      angle: globalRotation + globalAngle,
      speed: 0,
      accel: 0.01,
    })
  )

  particles.forEach((elem, index) => elem.step(index))

  globalRotation += PI / 6
  globalAngle += PI / 6
}

function draw() {
  if (!ctx) return
  ctx.clearRect(0, 0, width, height)
  particles.forEach((elem, index) => elem.draw(index))
}

function loop() {
  animationFrameId = requestAnimationFrame(loop)
  step()
  draw()
  tick++
}

// Watch for loading state changes
watch(() => globalStore.loading, async (newVal) => {
  if (newVal) {
    console.log(newVal,'1111')
    await nextTick() // Ensure the DOM has been updated
    // Initialize canvas context
    ctx = canvas.value?.getContext('2d') || null
    if (ctx) {
      ctx.scale(pixelRatio, pixelRatio)
      ctx.globalCompositeOperation = 'lighter'
      particles.length = 0 // Clear particles array
      tick = 0 // Reset tick
      loop() // Start the loop
    }
  } else {
    cancelAnimationFrame(animationFrameId)
  }
})

// Lifecycle hooks
onMounted(() => {
  console.log('lxxxxx')
  // If the component is mounted and loading is true, start the animation
  ctx = canvas.value?.getContext('2d') || null
  if (ctx) {
    ctx.scale(pixelRatio, pixelRatio)
    ctx.globalCompositeOperation = 'lighter'
    particles.length = 0 // 清空粒子数组
    tick = 0 // 重置 tick
    loop() // 启动画循环
  }
})


// // Lifecycle hooks
// onMounted(() => {
//   ctx = canvas.value?.getContext('2d') || null
//   console.log(canvas.value)
//   if (ctx) {
//     ctx.scale(pixelRatio, pixelRatio)
//     ctx.globalCompositeOperation = 'lighter'
//     particles.length = 0 // 清空粒子数组
//     tick = 0 // 重置 tick
//     loop()
//   }
// })

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId)
  particles.length = 0 // 清空粒子数组
  tick = 0 // 重置 tick
})

</script>

<style>
.loader-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0);
  /* Optional: Dark background */
  z-index: 9999;
  /* Ensure it's above all other elements */
  display: flex;
  align-items: center;
  justify-content: center;

}
</style>

'use client'

import { useEffect, useRef } from 'react'

const VERTEX_SHADER = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`

const FRAGMENT_SHADER = `precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = v_texCoord;
    
    // Glitch offsets
    float glitch = step(0.9, random(vec2(u_time * 0.1, floor(uv.y * 10.0))));
    uv.x += glitch * sin(u_time * 10.0) * 0.05;
    
    // Scanlines
    float scanline = sin(uv.y * 200.0 + u_time * 5.0) * 0.1;
    
    // Colors from design system
    vec3 color1 = vec3(0.74, 0.0, 1.0); // Purple (#bd00ff)
    vec3 color2 = vec3(0.76, 0.96, 0.0); // Neon Green (#c3f400)
    vec3 color3 = vec3(0.07, 0.07, 0.07); // Surface (#131313)
    
    // Grid pattern
    vec2 grid = fract(uv * 20.0);
    float line = step(0.95, grid.x) + step(0.95, grid.y);
    
    // Dynamic mixing
    float pattern = sin(uv.x * 3.0 + u_time) * cos(uv.y * 4.0 - u_time);
    vec3 color = mix(color1, color2, step(0.0, pattern));
    color = mix(color, color3, line * 0.5);
    
    gl_FragColor = vec4(color + scanline, 1.0);
}`

export function ShaderCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Sync the WebGL drawing-buffer size with the CSS-driven layout size.
    function syncSize() {
      if (!canvas) return
      const w = canvas.clientWidth || 1280
      const h = canvas.clientHeight || 720
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
    }

    let resizeObserver: ResizeObserver | undefined
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(syncSize)
      resizeObserver.observe(canvas)
    }
    syncSize()

    const gl = (canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null
    if (!gl) return

    function cs(type: number, src: string) {
      const s = gl!.createShader(type)!
      gl!.shaderSource(s, src)
      gl!.compileShader(s)
      return s
    }

    const prog = gl.createProgram()!
    gl.attachShader(prog, cs(gl.VERTEX_SHADER, VERTEX_SHADER))
    gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, FRAGMENT_SHADER))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    )
    const pos = gl.getAttribLocation(prog, 'a_position')
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uRes = gl.getUniformLocation(prog, 'u_resolution')

    let frame = 0
    let running = false

    function draw(t: number) {
      if (typeof ResizeObserver === 'undefined') syncSize()
      gl!.viewport(0, 0, canvas!.width, canvas!.height)
      if (uTime) gl!.uniform1f(uTime, t * 0.001)
      if (uRes) gl!.uniform2f(uRes, canvas!.width, canvas!.height)
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)
    }

    function render(t: number) {
      draw(t)
      frame = requestAnimationFrame(render)
    }

    function start() {
      if (running) return
      running = true
      frame = requestAnimationFrame(render)
    }

    function stop() {
      if (!running) return
      running = false
      cancelAnimationFrame(frame)
    }

    // Reduced motion: paint a single static frame and stop.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      draw(0)
    } else {
      // Pause the animation loop whenever the hero scrolls out of view.
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) start()
          else stop()
        },
        { threshold: 0.01 },
      )
      observer.observe(canvas)

      const onVisibility = () => {
        if (document.hidden) stop()
      }
      document.addEventListener('visibilitychange', onVisibility)

      return () => {
        observer.disconnect()
        document.removeEventListener('visibilitychange', onVisibility)
        resizeObserver?.disconnect()
        stop()
      }
    }

    return () => {
      resizeObserver?.disconnect()
      stop()
    }
  }, [])

  return (
    <div className={className} style={{ display: 'block' }} aria-hidden="true">
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  )
}

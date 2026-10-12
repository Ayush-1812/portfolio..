"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A (2,3) torus knot rendered as a drifting particle cloud, with a sphere of
 * ambient dust behind it. Hand-written WebGL so the hero costs no extra
 * dependency weight — the whole effect is a few hundred bytes of shader.
 *
 * Perspective, rotation and depth attenuation all happen on the GPU; the only
 * per-frame JS is the pointer easing and two uniform writes.
 *
 * The component renders nothing on its own if WebGL is unavailable; callers
 * gate it on pointer type, viewport width, reduced-motion and save-data.
 */

const KNOT_POINTS = 2600;
const DUST_POINTS = 900;

const VERT = `
precision mediump float;

attribute vec3 aPos;
attribute float aSeed;
attribute float aKind;

uniform float uTime;
uniform float uRotX;
uniform float uRotY;
uniform float uAspect;
uniform float uDpr;

varying float vDepth;
varying float vKind;
varying float vSeed;

vec3 rotY(vec3 p, float a) {
  float c = cos(a), s = sin(a);
  return vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z);
}

vec3 rotX(vec3 p, float a) {
  float c = cos(a), s = sin(a);
  return vec3(p.x, c * p.y - s * p.z, s * p.y + c * p.z);
}

void main() {
  vec3 p = aPos;

  // Gentle per-particle breathing so the form never looks frozen.
  float wobble = sin(uTime * 0.6 + aSeed * 6.2831) * 0.035;
  p *= 1.0 + wobble;

  p = rotY(p, uRotY);
  p = rotX(p, uRotX);

  // Push the cloud away from the camera, then project by hand.
  p.z += 3.4;
  float persp = 2.0 / max(p.z, 0.1);

  gl_Position = vec4(p.x * persp / uAspect, p.y * persp, 0.0, 1.0);

  vDepth = clamp((p.z - 2.1) / 2.8, 0.0, 1.0);
  vKind = aKind;
  vSeed = aSeed;

  float base = mix(2.6, 1.3, aKind);
  gl_PointSize = base * persp * uDpr * (1.0 - 0.4 * vDepth);
}
`;

const FRAG = `
precision mediump float;

uniform vec3 uNear;
uniform vec3 uFar;
uniform float uTime;

varying float vDepth;
varying float vKind;
varying float vSeed;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;

  float alpha = smoothstep(0.5, 0.0, d);

  // Far particles recede; dust is fainter than knot particles.
  alpha *= mix(0.95, 0.10, vDepth);
  alpha *= mix(1.0, 0.33, vKind);

  // Slow twinkle, offset per particle.
  alpha *= 0.75 + 0.25 * sin(uTime * 1.1 + vSeed * 12.566);

  vec3 col = mix(uNear, uFar, vDepth);
  gl_FragColor = vec4(col * alpha, alpha);
}
`;

function warn(message: string) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(`[ParticleKnot] ${message}`);
  }
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    warn(`shader compile failed: ${gl.getShaderInfoLog(shader) ?? "unknown"}`);
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/** Builds interleaved position/seed/kind data for the knot and its dust. */
function buildGeometry() {
  const total = KNOT_POINTS + DUST_POINTS;
  const positions = new Float32Array(total * 3);
  const seeds = new Float32Array(total);
  const kinds = new Float32Array(total);

  const p = 2;
  const q = 3;

  for (let i = 0; i < KNOT_POINTS; i++) {
    const t = (i / KNOT_POINTS) * Math.PI * 2;
    const r = 2 + Math.cos(q * t);

    // Point on the knot curve, normalised to roughly unit radius.
    const cx = (r * Math.cos(p * t)) / 3;
    const cy = (r * Math.sin(p * t)) / 3;
    const cz = -Math.sin(q * t) / 3;

    // Scatter into a tube around the curve.
    const a = Math.random() * Math.PI * 2;
    const b = Math.acos(2 * Math.random() - 1);
    const tube = 0.075 * Math.cbrt(Math.random());

    positions[i * 3] = cx * 1.25 + tube * Math.sin(b) * Math.cos(a);
    positions[i * 3 + 1] = cy * 1.25 + tube * Math.sin(b) * Math.sin(a);
    positions[i * 3 + 2] = cz * 1.25 + tube * Math.cos(b);

    seeds[i] = Math.random();
    kinds[i] = 0;
  }

  for (let i = KNOT_POINTS; i < total; i++) {
    // Fibonacci-ish shell of ambient dust well outside the knot.
    const u = Math.random() * 2 - 1;
    const theta = Math.random() * Math.PI * 2;
    const radius = 1.5 + Math.random() * 0.9;
    const s = Math.sqrt(1 - u * u);

    positions[i * 3] = radius * s * Math.cos(theta);
    positions[i * 3 + 1] = radius * s * Math.sin(theta);
    positions[i * 3 + 2] = radius * u;

    seeds[i] = Math.random();
    kinds[i] = 1;
  }

  return { positions, seeds, kinds, total };
}

export default function ParticleKnot({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  /* Any setup failure unmounts the canvas rather than leaving an
     uninitialised drawing buffer on the page, which some drivers present
     as an opaque white rectangle. */
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext("webgl", {
        alpha: true,
        antialias: false,
        premultipliedAlpha: true,
        powerPreference: "low-power",
      }) as WebGLRenderingContext | null) ?? null;

    if (!gl) {
      warn("no WebGL context available");
      setFailed(true);
      return;
    }

    /* Clear to transparent straight away, before anything below can fail. */
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const bail = (reason: string) => {
      warn(reason);
      setFailed(true);
    };

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return bail("shader compilation failed");

    const program = gl.createProgram();
    if (!program) return bail("could not create program");
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      return bail(`link failed: ${gl.getProgramInfoLog(program) ?? "unknown"}`);
    }
    gl.useProgram(program);

    const { positions, seeds, kinds, total } = buildGeometry();

    const bind = (name: string, data: Float32Array, size: number) => {
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(program, name);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
      return buffer;
    };

    const posBuffer = bind("aPos", positions, 3);
    const seedBuffer = bind("aSeed", seeds, 1);
    const kindBuffer = bind("aKind", kinds, 1);

    const uTime = gl.getUniformLocation(program, "uTime");
    const uRotX = gl.getUniformLocation(program, "uRotX");
    const uRotY = gl.getUniformLocation(program, "uRotY");
    const uAspect = gl.getUniformLocation(program, "uAspect");
    const uDpr = gl.getUniformLocation(program, "uDpr");

    // Brand accents: indigo in front, cyan receding.
    gl.uniform3f(gl.getUniformLocation(program, "uNear"), 0.506, 0.549, 0.972);
    gl.uniform3f(gl.getUniformLocation(program, "uFar"), 0.482, 0.816, 1.0);

    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      const w = Math.max(1, Math.floor(clientWidth * dpr));
      const h = Math.max(1, Math.floor(clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform1f(uAspect, clientHeight === 0 ? 1 : clientWidth / clientHeight);
      gl.uniform1f(uDpr, dpr);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Pointer parallax, eased toward the target each frame.
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onPointerMove = (event: PointerEvent) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 0.7;
      targetY = (event.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let visible = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);

    const onVisibilityChange = () => {
      if (document.hidden) {
        start = null;
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    let frame = 0;
    let start: number | null = null;
    let elapsed = 0;
    let cleared = false;

    const render = (now: number) => {
      frame = requestAnimationFrame(render);

      // Skip entirely when scrolled away or backgrounded.
      if (!visible || document.hidden) {
        start = null;
        if (!cleared) {
          gl.clear(gl.COLOR_BUFFER_BIT);
          cleared = true;
        }
        return;
      }
      cleared = false;

      if (start === null) start = now;
      elapsed += Math.min(now - start, 50) / 1000;
      start = now;

      currentX += (targetY - currentX) * 0.045;
      currentY += (targetX - currentY) * 0.045;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(uTime, elapsed);
      gl.uniform1f(uRotX, currentX + 0.35);
      gl.uniform1f(uRotY, elapsed * 0.16 + currentY);

      gl.drawArrays(gl.POINTS, 0, total);
    };

    frame = requestAnimationFrame(render);

    const onContextLost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(frame);
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      gl.deleteBuffer(posBuffer);
      gl.deleteBuffer(seedBuffer);
      gl.deleteBuffer(kindBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      /* Deliberately NOT calling WEBGL_lose_context here. A canvas hands back
         the same context object on every getContext call, so losing it would
         leave a dead context behind for any remount — including Strict Mode's
         double-invoke in development, where every later compile fails. The
         context is released with the canvas element when this unmounts. */
    };
  }, []);

  if (failed) return null;

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}

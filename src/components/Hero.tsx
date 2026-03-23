'use client';

import { motion } from 'framer-motion';
import { PersonalInfo } from '@/types';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useHydrated } from '@/utils/useHydrated';

interface HeroProps { personal: PersonalInfo; }

const SHADER_SRC = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
float rnd(vec2 p){p=fract(p*vec2(12.9898,78.233));p+=dot(p,p+34.56);return fract(p.x*p.y);}
float noise(in vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);float a=rnd(i),b=rnd(i+vec2(1,0)),c=rnd(i+vec2(0,1)),d=rnd(i+1.);return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);}
float fbm(vec2 p){float t=.0,a=1.;mat2 m=mat2(1.,-.5,.2,1.2);for(int i=0;i<5;i++){t+=a*noise(p);p*=2.*m;a*=.5;}return t;}
float clouds(vec2 p){float d=1.,t=.0;for(float i=.0;i<3.;i++){float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);t=mix(t,d,a);d=a;p*=2./(i+1.);}return t;}
void main(void){
  vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for(float i=1.;i<12.;i++){
    uv+=.1*cos(i*vec2(.1+.01*i,.8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;float d=length(p);
    col+=.00125/d*(cos(sin(i)*vec3(1,2,3))+1.);
    float b=noise(i+p+bg*1.731);
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d);
  }
  O=vec4(col,1);
}`;

const VERTEX_SRC = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

const SPECIALISMS = [
  'Cloud & DevOps Engineer',
  'AI Automation Architect',
  'Workflow Systems Specialist',
  'Infrastructure-as-Code Expert',
  'Container Orchestration Pro',
];

const STATS = [
  { value: '60%', label: 'Pipeline Downtime Reduced' },
  { value: '3+',  label: 'AI Systems Built' },
  { value: '5+',  label: 'Cloud Projects Delivered' },
];

export function Hero({ personal }: HeroProps) {
  const hydrated = useHydrated();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const glRef     = useRef<WebGL2RenderingContext | null>(null);
  const progRef   = useRef<WebGLProgram | null>(null);
  const bufRef    = useRef<WebGLBuffer | null>(null);
  const uRes      = useRef<WebGLUniformLocation | null>(null);
  const uTime     = useRef<WebGLUniformLocation | null>(null);

  const [specIdx, setSpecIdx]     = useState(0);
  const [displayText, setDisplay] = useState('');
  const [isDeleting, setDeleting] = useState(false);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── WebGL setup – fully self-contained, no external component ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2');
    if (!gl) return;
    glRef.current = gl;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER,   VERTEX_SRC);
    const fs = compile(gl.FRAGMENT_SHADER, SHADER_SRC);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs); gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { console.error(gl.getProgramInfoLog(prog)); return; }
    progRef.current = prog;

    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,1,-1,-1,1,1,1,-1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    bufRef.current = buf;
    uRes.current  = gl.getUniformLocation(prog, 'resolution');
    uTime.current = gl.getUniformLocation(prog, 'time');

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const loop = (now: number) => {
      if (!glRef.current || !progRef.current) return;
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.uniform2f(uRes.current, canvas.width, canvas.height);
      gl.uniform1f(uTime.current, now * 1e-3);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
      // Safe cleanup – only delete if context still valid
      try {
        gl.deleteProgram(prog);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteBuffer(buf);
      } catch (_) { /* ignore cleanup errors */ }
      glRef.current = null;
      progRef.current = null;
    };
  }, []);

  // ── Typewriter ──
  useEffect(() => {
    const full  = SPECIALISMS[specIdx];
    const speed = isDeleting ? 30 : 60;
    typingRef.current = setTimeout(() => {
      if (!isDeleting) {
        setDisplay(full.slice(0, displayText.length + 1));
        if (displayText.length + 1 === full.length) setTimeout(() => setDeleting(true), 1800);
      } else {
        setDisplay(full.slice(0, displayText.length - 1));
        if (displayText.length === 0) { setDeleting(false); setSpecIdx(s => (s + 1) % SPECIALISMS.length); }
      }
    }, speed);
    return () => { if (typingRef.current) clearTimeout(typingRef.current); };
  }, [displayText, isDeleting, specIdx]);

  const handleDownload = useCallback((href: string, name: string) => {
    const a = document.createElement('a');
    a.href = href; a.download = name; a.rel = 'noopener noreferrer';
    document.body.appendChild(a); a.click();
    setTimeout(() => { if (document.body.contains(a)) document.body.removeChild(a); }, 100);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden" style={{ background: '#0A0F1E' }}>
      {/* WebGL canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full touch-none pointer-events-none"
        aria-hidden="true"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, rgba(10,15,30,0.50) 0%, rgba(10,15,30,0.68) 55%, rgba(10,15,30,0.96) 100%)',
      }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20 pb-16 text-center">
        <motion.div
          className="max-w-5xl mx-auto w-full"
          initial={hydrated ? { opacity: 0, y: 30 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Availability badge */}
          <motion.div
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-sm font-medium"
            style={{ background: 'rgba(16,185,129,0.10)', border: '1px solid rgba(16,185,129,0.30)', color: '#34d399' }}
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          >
            <span className="pulse-dot" style={{ width: 8, height: 8 }} />
            Open to Opportunities · Harare & Johannesburg · 100% Remote
          </motion.div>

          {/* Name */}
          <motion.h1
            className="leading-tight mb-4"
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #ffffff 0%, #00D4FF 40%, #7C3AED 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              letterSpacing: '-0.02em',
              filter: 'drop-shadow(0 0 30px rgba(0,212,255,0.2))',
            }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          >
            {personal.name}
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            className="h-10 md:h-12 flex items-center justify-center mb-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.40 }}
          >
            <p className="text-xl md:text-2xl font-mono font-semibold" style={{ color: '#00D4FF', letterSpacing: '0.02em' }}>
              {displayText}
              <span className="ml-0.5 animate-pulse" style={{ borderRight: '2px solid #00D4FF' }}>&nbsp;</span>
            </p>
          </motion.div>

          {/* Summary */}
          <motion.p
            className="max-w-3xl mx-auto text-base md:text-lg leading-loose mb-10"
            style={{ color: 'rgba(203,213,225,0.82)', fontWeight: 400 }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.50 }}
          >
            {personal.summary}
          </motion.p>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-3 md:gap-6 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.58 }}
          >
            {STATS.map(s => (
              <div key={s.label} className="glass-card p-4 text-center" style={{ borderRadius: 12 }}>
                <div className="text-3xl md:text-4xl font-extrabold mb-1"
                  style={{ background: 'linear-gradient(135deg, #00D4FF, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {s.value}
                </div>
                <div className="text-xs" style={{ color: '#64748b' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Tech badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
          >
            {['Cloud Platform', 'DevOps & CI/CD', 'AI Automation', 'n8n Workflows', 'Kubernetes', 'Terraform', 'AWS'].map(tag => (
              <span key={tag} className="tech-badge">{tag}</span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.74 }}
          >
            <a href="/projects" className="btn-primary px-6 py-3 rounded-lg text-sm font-bold">
              View Projects
            </a>
            <button
              onClick={() => handleDownload(personal.documents.cv, 'Tafara-Rugara-CV.pdf')}
              className="btn-glass px-6 py-3 rounded-lg text-sm font-bold"
              aria-label="Download CV"
            >
              ↓ Download CV
            </button>
            <button
              onClick={() => handleDownload(personal.documents.reference, 'Tafara-Rugara-Reference.pdf')}
              className="btn-glass px-6 py-3 rounded-lg text-sm font-bold"
              style={{ borderColor: 'rgba(124,58,237,0.35)', color: '#a78bfa', background: 'rgba(124,58,237,0.08)' }}
              aria-label="Download Reference Letter"
            >
              ↓ Reference Letter
            </button>
            <a href={personal.socialLinks.github} target="_blank" rel="noopener noreferrer"
              className="btn-glass px-6 py-3 rounded-lg text-sm font-bold">
              GitHub
            </a>
            <a href={personal.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
              className="btn-glass px-6 py-3 rounded-lg text-sm font-bold">
              LinkedIn
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          style={{ color: 'rgba(0,212,255,0.45)' }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
            <path d="M7 3v14M7 17l-4-4M7 17l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
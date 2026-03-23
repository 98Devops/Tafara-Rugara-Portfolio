'use client';

import React, { useRef, useEffect } from 'react';

// Types for component props
interface HeroProps {
  trustBadge?: {
    text: string;
    icons?: string[];
  };
  headline: {
    line1: string;
    line2: string;
  };
  subtitle: string;
  buttons?: {
    primary?: {
      text: string;
      onClick?: () => void;
    };
    secondary?: {
      text: string;
      onClick?: () => void;
    };
  };
  className?: string;
}

// ---------- WebGL Renderer ----------
const defaultShaderSource = `#version 300 es
/*********
* made by Matthias Hurrle (@atzedent)
*/
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float
  a=rnd(i),
  b=rnd(i+vec2(1,0)),
  c=rnd(i+vec2(0,1)),
  d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}
float clouds(vec2 p) {
  float d=1., t=.0;
  for (float i=.0; i<3.; i++) {
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a);
    d=a;
    p*=2./(i+1.);
  }
  return t;
}
void main(void) {
  vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for (float i=1.; i<12.; i++) {
    uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    col+=.00125/d*(cos(sin(i)*vec3(1,2,3))+1.);
    float b=noise(i+p+bg*1.731);
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d);
  }
  O=vec4(col,1);
}`;

// ---------- Custom Hook: Shader Background ----------
const useShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2');
    if (!gl) return;

    // Helper: create & compile a shader
    const compileShader = (type: number, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

    const vs = compileShader(gl.VERTEX_SHADER, vertexSrc);
    const fs = compileShader(gl.FRAGMENT_SHADER, defaultShaderSource);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    const vertices = new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, 'resolution');
    const uTime = gl.getUniformLocation(program, 'time');

    // Pointer state
    let touchX = 0, touchY = 0;
    const onPointerMove = (e: PointerEvent) => {
      touchX = e.clientX;
      touchY = canvas.height - e.clientY;
    };
    canvas.addEventListener('pointermove', onPointerMove);

    // Resize handler
    const resize = () => {
      const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    // Render loop
    let raf: number;
    const loop = (now: number) => {
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, now * 1e-3);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', onPointerMove);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return canvasRef;
};

// ---------- Hero Component ----------
const AnimatedShaderHero: React.FC<HeroProps> = ({
  trustBadge,
  headline,
  subtitle,
  buttons,
  className = '',
}) => {
  const canvasRef = useShaderBackground();

  return (
    <div className={`relative w-full h-screen overflow-hidden bg-black ${className}`}>
      {/* Keyframe styles — injected via a plain <style> tag, compatible with App Router */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes shader-fade-in-down {
            from { opacity: 0; transform: translateY(-20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes shader-fade-in-up {
            from { opacity: 0; transform: translateY(30px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes shader-gradient-shift {
            0%   { background-position: 0% 50%; }
            50%  { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .shader-fade-in-down { animation: shader-fade-in-down 0.8s ease-out forwards; }
          .shader-fade-in-up   { animation: shader-fade-in-up 0.8s ease-out forwards; opacity: 0; }
          .shader-delay-200  { animation-delay: 0.2s; }
          .shader-delay-400  { animation-delay: 0.4s; }
          .shader-delay-600  { animation-delay: 0.6s; }
          .shader-delay-800  { animation-delay: 0.8s; }
          .shader-animate-gradient {
            background-size: 200% 200%;
            animation: shader-gradient-shift 3s ease infinite;
          }
        `,
        }}
      />

      {/* WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full touch-none"
        style={{ background: 'black' }}
      />

      {/* Hero Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
        {/* Trust Badge */}
        {trustBadge && (
          <div className="mb-8 shader-fade-in-down">
            <div className="flex items-center gap-2 px-6 py-3 rounded-full border text-sm"
              style={{
                background: 'rgba(249,115,22,0.10)',
                backdropFilter: 'blur(12px)',
                borderColor: 'rgba(253,186,116,0.30)',
              }}
            >
              {trustBadge.icons?.map((icon, i) => (
                <span key={i} className="text-yellow-300">{icon}</span>
              ))}
              <span className="text-orange-100">{trustBadge.text}</span>
            </div>
          </div>
        )}

        {/* Heading */}
        <div className="text-center space-y-6 max-w-5xl mx-auto px-4">
          <div className="space-y-2">
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent shader-fade-in-up shader-delay-200 shader-animate-gradient"
              style={{ backgroundImage: 'linear-gradient(135deg, #fdba74, #fbbf24, #f59e0b)' }}
            >
              {headline.line1}
            </h1>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent shader-fade-in-up shader-delay-400 shader-animate-gradient"
              style={{ backgroundImage: 'linear-gradient(135deg, #fde68a, #fb923c, #ef4444)' }}
            >
              {headline.line2}
            </h1>
          </div>

          {/* Subtitle */}
          <div className="max-w-3xl mx-auto shader-fade-in-up shader-delay-600">
            <p className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed"
              style={{ color: 'rgba(254,215,170,0.90)' }}
            >
              {subtitle}
            </p>
          </div>

          {/* CTA Buttons */}
          {buttons && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 shader-fade-in-up shader-delay-800">
              {buttons.primary && (
                <button
                  onClick={buttons.primary.onClick}
                  className="px-8 py-4 rounded-full font-semibold text-lg text-black transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{
                    background: 'linear-gradient(135deg, #f97316, #eab308)',
                    boxShadow: '0 4px 24px rgba(249,115,22,0.25)',
                  }}
                  onMouseOver={e => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(249,115,22,0.45)')}
                  onMouseOut={e => (e.currentTarget.style.boxShadow = '0 4px 24px rgba(249,115,22,0.25)')}
                >
                  {buttons.primary.text}
                </button>
              )}
              {buttons.secondary && (
                <button
                  onClick={buttons.secondary.onClick}
                  className="px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'rgba(249,115,22,0.10)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(253,186,116,0.30)',
                    color: '#fed7aa',
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.background = 'rgba(249,115,22,0.20)';
                    e.currentTarget.style.borderColor = 'rgba(253,186,116,0.50)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.background = 'rgba(249,115,22,0.10)';
                    e.currentTarget.style.borderColor = 'rgba(253,186,116,0.30)';
                  }}
                >
                  {buttons.secondary.text}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimatedShaderHero;

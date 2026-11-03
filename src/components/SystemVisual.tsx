const scenes = [
  {
    label: 'AI WORKFLOW',
    input: 'VOICE NOTE',
    ingress: 'TRANSCRIBE',
    core: 'AI ROUTER',
    output: 'STRUCTURED DATA',
    last: 'CRM / KNOWLEDGE',
    lower: 'HUMAN REVIEW',
    type: 'wave',
    tools: 'n8n / Whisper / LLMs / APIs',
  },
  {
    label: 'APPLICATION SYSTEM',
    input: 'INTERFACE',
    ingress: 'API REQUEST',
    core: 'APP LOGIC',
    output: 'VALIDATED RECORD',
    last: 'POSTGRESQL',
    lower: 'ACCESS CONTROL',
    type: 'screen',
    tools: 'React / TypeScript / Supabase',
  },
  {
    label: 'DELIVERY PIPELINE',
    input: 'GIT COMMIT',
    ingress: 'BUILD + TEST',
    core: 'DEPLOY',
    output: 'CONTAINER',
    last: 'CLOUD SERVICE',
    lower: 'LOGS + RECOVERY',
    type: 'git',
    tools: 'GitHub Actions / Docker / AWS',
  },
];

function Symbol({ type, x, y }: { type: string; x: number; y: number }) {
  return (
    <g
      transform={'translate(' + x + ' ' + y + ')'}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      {type === 'wave' ? (
        <>
          {[8, 18, 30, 22, 12].map((h, i) => (
            <path key={i} d={'M' + (i * 7 - 14) + ' ' + -h / 2 + 'v' + h} />
          ))}
        </>
      ) : type === 'screen' ? (
        <>
          <rect x="-19" y="-14" width="38" height="27" rx="3" />
          <path d="M-19-6h38M-10 0h8M-10 6h18M-6 19h12M0 13v6" />
        </>
      ) : type === 'git' ? (
        <>
          <circle cx="-10" cy="-13" r="4" />
          <circle cx="-10" cy="15" r="4" />
          <circle cx="12" cy="-8" r="4" />
          <path d="M-10-9v20M12-4c0 16-22 4-22 15" />
        </>
      ) : type === 'data' ? (
        <>
          <ellipse cx="0" cy="-12" rx="19" ry="6" />
          <path d="M-19-12v25c0 8 38 8 38 0v-25M-19 0c0 8 38 8 38 0" />
        </>
      ) : (
        <>
          <rect x="-15" y="-15" width="30" height="30" rx="5" />
          <path d="M-7-22v7M0-22v7M7-22v7M-7 15v7M0 15v7M7 15v7M-22-7h7M-22 0h7M-22 7h7M15-7h7M15 0h7M15 7h7M-6-6h12v12H-6Z" />
        </>
      )}
    </g>
  );
}

export function SystemVisual({
  active = 0,
  compact = false,
}: {
  active?: number;
  compact?: boolean;
}) {
  const scene = scenes[active];
  return (
    <div
      className={
        compact
          ? 'system-blueprint signal-blueprint compact-blueprint'
          : 'system-blueprint signal-blueprint'
      }
    >
      <div className="blueprint-top">
        <span>{scene.label}</span>
        <span>0{active + 1} / 03</span>
      </div>
      <div
        className="signal-canvas"
        role="img"
        aria-label={
          scene.input +
          ' passes through ' +
          scene.ingress +
          ' to ' +
          scene.core +
          ', producing ' +
          scene.output +
          ' for ' +
          scene.last +
          ', with ' +
          scene.lower +
          '.'
        }
      >
        <svg viewBox="0 0 560 430" fill="none" aria-hidden="true">
          <g stroke="#343437" strokeWidth="1">
            <path
              d="M0 110H560M0 215H560M0 320H560M100 0V430M280 0V430M460 0V430"
              strokeDasharray="2 8"
            />
            <path d="M100 157V185Q100 215 130 215H212M348 215H430Q460 215 460 245V268M280 278V330" />
          </g>
          <g
            className="signal-stream"
            stroke="#f18453"
            strokeWidth="2"
            strokeDasharray="8 120"
          >
            <path d="M100 157V185Q100 215 130 215H212" />
            <path d="M348 215H430Q460 215 460 245V268" />
            <path d="M280 278V330" />
          </g>
          <g className="signal-input">
            <rect
              x="38"
              y="50"
              width="124"
              height="108"
              rx="10"
              fill="#202124"
              stroke="#505156"
            />
            <Symbol type={scene.type} x={100} y={88} />
            <text x="100" y="132" textAnchor="middle">
              {scene.input}
            </text>
          </g>
          <text className="signal-note" x="126" y="191">
            {scene.ingress}
          </text>
          <g className="signal-processor">
            <rect
              x="207"
              y="148"
              width="146"
              height="134"
              rx="18"
              stroke="#a95a37"
              fill="#2b211d"
            />
            <rect
              x="217"
              y="158"
              width="126"
              height="114"
              rx="12"
              stroke="#f18453"
              fill="#36251c"
            />
            <Symbol type="chip" x={280} y={203} />
            <text
              className="signal-core-label"
              x="280"
              y="251"
              textAnchor="middle"
            >
              {scene.core}
            </text>
          </g>
          <text className="signal-note" x="357" y="197">
            {scene.output}
          </text>
          <g className="signal-output">
            <rect
              x="398"
              y="268"
              width="124"
              height="110"
              rx="10"
              fill="#202124"
              stroke="#505156"
            />
            <Symbol type={active === 2 ? 'screen' : 'data'} x={460} y={306} />
            <text x="460" y="351" textAnchor="middle">
              {scene.last}
            </text>
          </g>
          <rect
            x="207"
            y="330"
            width="146"
            height="38"
            rx="5"
            fill="#18191b"
            stroke="#525345"
          />
          <text x="280" y="353" textAnchor="middle" className="signal-review">
            {scene.lower}
          </text>
          <path
            d="m64 302 7 7 13-15M64 327l7 7 13-15M64 352l7 7 13-15"
            stroke="#bac6a5"
            strokeWidth="2"
          />
          <text x="97" y="309" className="signal-note">
            VALIDATE
          </text>
          <text x="97" y="334" className="signal-note">
            CONNECT
          </text>
          <text x="97" y="359" className="signal-note">
            RECOVER
          </text>
        </svg>
      </div>
      <div className="blueprint-bottom">
        <span>{scene.tools}</span>
        <span>↗</span>
      </div>
      <p className="blueprint-disclaimer">
        ILLUSTRATIVE ARCHITECTURE · BUILT AROUND REAL WORK
      </p>
    </div>
  );
}

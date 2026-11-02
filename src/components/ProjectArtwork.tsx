export function ProjectArtwork({
  id,
  category,
  title,
}: {
  id: string;
  category?: string;
  title: string;
}) {
  const isFarm = id === 'munda';
  const isHousing = id === 'trevis-property-management';
  const isVoice = id.includes('voice') || id === 'synapse';
  const isFlow = category === 'automation';
  const name = title.split(' — ')[0].split(' – ')[0];
  return (
    <div
      className={
        'project-art art-' +
        (isFarm
          ? 'farm'
          : isHousing
            ? 'housing'
            : isVoice
              ? 'voice'
              : category || 'platform')
      }
      aria-hidden="true"
    >
      <div className="art-meta">
        <span>
          {isFarm
            ? 'FIELD TO LEDGER'
            : isHousing
              ? 'ONE SOURCE OF TRUTH'
              : isVoice
                ? 'SPEECH TO STRUCTURE'
                : isFlow
                  ? 'SIGNAL TO ACTION'
                  : category === 'website'
                    ? 'DESIGN TO EXPERIENCE'
                    : 'BUILD TO DEPLOY'}
        </span>
        <span>↗</span>
      </div>
      <svg viewBox="0 0 520 230" fill="none">
        {isFarm ? (
          <g>
            <path
              d="m90 145 130-75 210 68-130 75Z"
              fill="#426d48"
              stroke="#8ba87c"
            />
            <path
              d="m110 155 130-75M145 168l130-75M180 180l130-75M215 190l130-75M250 202l130-75"
              stroke="#91b581"
              strokeWidth="5"
            />
            <path
              d="M306 54v103M306 56c-44-27-49 11 0 20M306 79c41-33 54 0 0 19"
              stroke="#d5e5aa"
              strokeWidth="4"
            />
            <rect x="60" y="45" width="118" height="54" rx="7" fill="#dbe7c8" />
            <text x="76" y="68" fill="#355338">
              OFFLINE CAPTURE
            </text>
            <path
              d="m78 81 5 5 11-13M107 82h51"
              stroke="#355338"
              strokeWidth="2"
            />
          </g>
        ) : isHousing ? (
          <g>
            <rect
              x="80"
              y="30"
              width="360"
              height="180"
              rx="9"
              fill="#edf1e4"
            />
            <path d="M80 60h360M157 60v150" stroke="#c1cdb0" />
            <circle cx="97" cy="45" r="3" fill="#658058" />
            <circle cx="109" cy="45" r="3" fill="#a8b994" />
            <path
              d="M96 84h42M96 106h29M96 128h35"
              stroke="#81986c"
              strokeWidth="5"
            />
            <rect
              x="178"
              y="82"
              width="104"
              height="40"
              rx="4"
              fill="#d7e1ca"
            />
            <rect
              x="296"
              y="82"
              width="120"
              height="40"
              rx="4"
              fill="#d7e1ca"
            />
            <path
              d="M180 182v-30M213 182v-45M246 182v-32M279 182v-60M312 182v-40M345 182v-70M378 182v-55M411 182v-75"
              stroke="#688158"
              strokeWidth="16"
            />
          </g>
        ) : isVoice ? (
          <g stroke="currentColor">
            <circle cx="180" cy="115" r="72" opacity=".2" />
            <circle cx="180" cy="115" r="52" opacity=".3" />
            {[23, 45, 65, 85, 65, 45, 23].map((h, i) => (
              <path
                key={i}
                d={'M' + (144 + i * 12) + ' ' + (115 - h / 2) + 'v' + h}
                strokeWidth="5"
                strokeLinecap="round"
              />
            ))}
            <path d="M265 115h45M310 115l45-50M310 115l45 50" opacity=".6" />
            {[
              [370, 65],
              [385, 115],
              [370, 165],
            ].map(([x, y]) => (
              <g key={y}>
                <circle
                  cx={x}
                  cy={y}
                  r="17"
                  fill="currentColor"
                  fillOpacity=".15"
                />
                <circle cx={x} cy={y} r="4" fill="currentColor" />
              </g>
            ))}
          </g>
        ) : isFlow ? (
          <g stroke="currentColor">
            <path
              className="art-flow"
              d="M115 115h120M285 115h120"
              strokeDasharray="6 7"
            />
            {[105, 260, 415].map((x, i) => (
              <g key={x}>
                <rect
                  x={x - 48}
                  y="67"
                  width="96"
                  height="96"
                  rx="13"
                  fill="currentColor"
                  fillOpacity={i === 1 ? '.22' : '.06'}
                />
                <text
                  x={x}
                  y="116"
                  textAnchor="middle"
                  stroke="none"
                  fill="currentColor"
                >
                  {['INPUT', 'AI + LOGIC', 'ACTION'][i]}
                </text>
                <circle cx={x} cy="139" r="3" fill="currentColor" />
              </g>
            ))}
          </g>
        ) : category === 'website' ? (
          <g>
            <rect
              x="90"
              y="28"
              width="340"
              height="182"
              rx="7"
              stroke="currentColor"
            />
            <path d="M90 54h340" stroke="currentColor" />
            <circle cx="104" cy="41" r="3" fill="currentColor" />
            <path
              d="M113 80h133M113 99h103M113 122h115M113 151h55"
              stroke="currentColor"
              strokeWidth="7"
            />
            <path
              d="m313 83 69 32-27 64-68-32Z"
              fill="currentColor"
              fillOpacity=".3"
            />
            <circle cx="329" cy="131" r="35" stroke="currentColor" />
          </g>
        ) : (
          <g stroke="currentColor">
            {[60, 100, 140].map((y, i) => (
              <g key={y}>
                <path
                  d={'M180 ' + y + 'h175v42H180Z'}
                  fill="currentColor"
                  fillOpacity={'.' + (i + 1)}
                />
                <circle cx="199" cy={y + 21} r="3" fill="currentColor" />
                <path d={'M217 ' + (y + 21) + 'h100'} />
              </g>
            ))}
            <path
              className="art-flow"
              d="M100 120h80M355 120h65"
              strokeDasharray="5 6"
            />
            <circle cx="100" cy="120" r="15" />
            <path d="m414 113 8 7-8 7" />
          </g>
        )}
      </svg>
      <p>{name}</p>
      <small>CONCEPT VISUAL</small>
    </div>
  );
}

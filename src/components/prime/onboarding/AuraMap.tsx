import React from 'react';
import type { SightsVector } from './SynthesisEngine';

interface LegacyVectorInput {
  dimension: string;
  current: number;
  sovereign?: number;
  label?: string;
}

interface AuraMapProps {
  vectors?: SightsVector[];
  currentData?: LegacyVectorInput[];
  sovereignData?: Array<{ dimension: string; current: number }>;
}

function clamp(value: number): number {
  return Math.max(0, Math.min(10, value));
}

function normalizeVectors({
  vectors,
  currentData,
  sovereignData
}: AuraMapProps): SightsVector[] {
  if (vectors && vectors.length > 0) {
    return vectors.map((vector) => ({
      ...vector,
      current: clamp(vector.current),
      sovereign: clamp(vector.sovereign)
    }));
  }

  if (currentData && currentData.length > 0) {
    const sovereignByDimension = new Map(
      (sovereignData ?? []).map((entry) => [entry.dimension, clamp(entry.current)])
    );
    return currentData.map((entry) => ({
      dimension: entry.dimension,
      label: entry.label ?? entry.dimension,
      current: clamp(entry.current),
      sovereign: sovereignByDimension.get(entry.dimension) ?? clamp(entry.sovereign ?? 10),
      trajectory: 'STABLE',
      shock: 0
    }));
  }

  return [
    { dimension: 'S', label: 'Spirit', current: 5, sovereign: 10, trajectory: 'UP', shock: 0 },
    { dimension: 'I', label: 'Integrity', current: 5, sovereign: 10, trajectory: 'UP', shock: 0 },
    { dimension: 'G', label: 'Growth', current: 5, sovereign: 10, trajectory: 'UP', shock: 0 },
    { dimension: 'H', label: 'Health', current: 5, sovereign: 10, trajectory: 'UP', shock: 0 },
    { dimension: 'T', label: 'Time', current: 5, sovereign: 10, trajectory: 'UP', shock: 0 },
    { dimension: 'S_', label: 'Synergy', current: 5, sovereign: 10, trajectory: 'UP', shock: 0 }
  ];
}

export const AuraMap: React.FC<AuraMapProps> = (props) => {
  const vectors = normalizeVectors(props);
  const size = 320;
  const center = size / 2;
  const radius = (size / 2) - 50;
  const total = Math.max(vectors.length, 1);

  const getPoint = (score: number, index: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const r = (score / 10) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  const currentPath = vectors.map((v, i) => {
    const p = getPoint(v.current, i);
    return `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`;
  }).join(' ') + ' Z';

  const targetPath = vectors.map((v, i) => {
    const p = getPoint(v.sovereign, i);
    return `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`;
  }).join(' ') + ' Z';

  return (
    <div className="aura-container">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="aura-svg">
        <defs>
          <linearGradient id="aura-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--p-gold)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--p-blue)" stopOpacity="0.1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Grid Circles */}
        {[2, 4, 6, 8, 10].map((l) => (
          <circle 
            key={l} cx={center} cy={center} r={(l / 10) * radius} 
            fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" 
          />
        ))}

        {/* Target Path (Sovereign) */}
        <path d={targetPath} fill="none" stroke="rgba(0, 255, 163, 0.2)" strokeWidth="1" strokeDasharray="5 5" />

        {/* Current Trajectory Path */}
        <path 
          d={currentPath} 
          fill="url(#aura-grad)" 
          stroke="var(--p-gold)" 
          strokeWidth="3" 
          strokeLinejoin="round" 
          filter="url(#glow)"
          className="trajectory-path"
        />

        {/* Labels & Data Points */}
        {vectors.map((v, i) => {
          const p = getPoint(10, i);
          const lp = getPoint(12, i);
          const isGrowth = v.current >= 7.5;

          return (
            <g key={i}>
              <line x1={center} y1={center} x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.05)" />
              <text 
                x={lp.x} y={lp.y} textAnchor="middle" 
                className="dim-label"
              >
                {(v.label ?? v.dimension).toUpperCase()}
              </text>
              <text 
                x={lp.x} y={lp.y + 12} textAnchor="middle" 
                className={`dim-score ${isGrowth ? 'growth' : 'decay'}`}
              >
                {v.current.toFixed(1)}
              </text>
            </g>
          );
        })}
      </svg>

      <style jsx>{`
        .aura-container {
          padding: 2rem;
          background: radial-gradient(circle at center, rgba(212, 168, 67, 0.05) 0%, transparent 70%);
          border-radius: 50%;
        }
        .aura-svg { overflow: visible; }
        .trajectory-path { transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
        .dim-label { fill: var(--p-t3); font-size: 8px; font-weight: 800; letter-spacing: 0.1em; }
        .dim-score { font-size: 7px; font-weight: 700; }
        .growth { fill: #00ffa3; }
        .decay { fill: rgba(255,255,255,0.3); }
      `}</style>
    </div>
  );
};

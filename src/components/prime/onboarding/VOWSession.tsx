import React, { useState, useEffect } from 'react';

const ARCHETYPES = [
  { id: 'guardian', name: 'The Guardian', icon: '🛡️', intent: 'Protection, Service, Values' },
  { id: 'catalyst', name: 'The Catalyst', icon: '⚡', intent: 'Innovation, Transformation, Change' },
  { id: 'anchor', name: 'The Anchor', icon: '⚓', intent: 'Stability, Grounding, Resilience' },
  { id: 'weaver', name: 'The Weaver', icon: '🕸️', intent: 'Integration, Connection, Synthesis' },
  { id: 'sovereign', name: 'The Sovereign', icon: '👑', intent: 'Leadership, Authority, Excellence' },
];

const SHADOW_PATTERNS = [
  'Outcast', 'Minimizer', 'Risk Averse', 'Math Genius', 'Elder Brother', 'Low Self-Esteem', 'High Stakes', 'Comparison'
];

interface VOWSessionProps {
  auditData: Record<string, number>;
  onComplete: (data: any) => void;
}

export const VOWSession: React.FC<VOWSessionProps> = ({ auditData, onComplete }) => {
  const [step, setStep] = useState(0);
  const [selectedArchetype, setSelectedArchetype] = useState('');
  const [selectedShadow, setSelectedShadow] = useState('');
  const [reflection, setReflection] = useState('');

  const nextStep = () => setStep(step + 1);

  return (
    <div className="vow-container">
      <div className="vow-avatar">
        <div className="vow-glow"></div>
        <svg viewBox="0 0 100 100" width="80" height="80">
          <circle cx="50" cy="50" r="45" fill="none" stroke="var(--p-gold)" strokeWidth="2" strokeDasharray="10 5" />
          <path d="M50 20 L80 50 L50 80 L20 50 Z" fill="var(--p-gold)" opacity="0.3" />
        </svg>
      </div>

      <div className="vow-content">
        {step === 0 && (
          <div className="vow-message glass-card active">
            <p className="vow-voice">VOW: I see the territory of your life. Based on your audit, your sense of <strong>PORUL (Work/Career)</strong> is vibrant, but a shadow exists in some layers.</p>
            <p className="vow-voice">To begin the excavation, tell me: Which **Purpose Archetype** is the true intent of your Soul?</p>
            
            <div className="archetype-grid">
              {ARCHETYPES.map((a) => (
                <button 
                  key={a.id} 
                  className={`archetype-btn ${selectedArchetype === a.id ? 'active' : ''}`}
                  onClick={() => { setSelectedArchetype(a.id); nextStep(); }}
                >
                  <span className="a-icon">{a.icon}</span>
                  <div className="a-info">
                    <span className="a-name">{a.name}</span>
                    <span className="a-intent">{a.intent}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="vow-message glass-card active">
            <p className="vow-voice">VOW: {ARCHETYPES.find(a => a.id === selectedArchetype)?.name}. A powerful intent. But every Sovereign or Catalyst has a **Shadow** that blocks their flight.</p>
            <p className="vow-voice">Which of these 'Shells' did you build to survive your past?</p>
            
            <div className="shadow-grid">
              {SHADOW_PATTERNS.map((p) => (
                <button 
                  key={p} 
                  className={`shadow-btn ${selectedShadow === p ? 'active' : ''}`}
                  onClick={() => { setSelectedShadow(p); nextStep(); }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="vow-message glass-card active">
            <p className="vow-voice">VOW: The <strong>{selectedShadow}</strong> shell. It protected you once, but now it is the very thing holding you back from your 1.3M Legacy.</p>
            <p className="vow-voice">In one sentence, what is the 'Stagnation Cost' of keeping this shell? (Be brutally honest).</p>
            
            <textarea 
              className="vow-input"
              placeholder="The cost is..."
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
            />
            
            <button 
              className="prime-btn"
              onClick={() => onComplete({ selectedArchetype, selectedShadow, reflection })}
            >
              Complete the Excavation
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .vow-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2.5rem;
          max-width: 600px;
          margin: 0 auto;
        }
        .vow-avatar { position: relative; margin-bottom: 1rem; }
        .vow-glow {
          position: absolute; width: 120%; height: 120%;
          top: -10%; left: -10%;
          background: radial-gradient(circle, rgba(212,168,67,0.2) 0%, transparent 70%);
          filter: blur(15px);
          animation: pulse 4s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        
        .vow-voice {
          font-size: 1.15rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          color: var(--p-t1);
        }
        .vow-voice strong { color: var(--p-gold); font-weight: 700; }
        
        .archetype-grid { 
          display: grid; grid-template-columns: 1fr; gap: 1rem; margin-top: 2rem;
        }
        .archetype-btn {
          display: flex; align-items: center; gap: 1rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px; padding: 1.25rem;
          cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          color: var(--p-t2); text-align: left;
        }
        .archetype-btn:hover { background: rgba(255,255,255,0.06); border-color: var(--p-gold); }
        .archetype-btn.active { background: rgba(212,168,67,0.1); border-color: var(--p-gold); color: #fff; }
        .a-icon { font-size: 2rem; }
        .a-info { display: flex; flex-direction: column; }
        .a-name { font-weight: 700; font-size: 1.1rem; }
        .a-intent { font-size: 0.8rem; color: var(--p-t3); margin-top: 2px; }
        
        .shadow-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;
        }
        .shadow-btn {
          padding: 1rem; border-radius: 12px;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
          color: var(--p-t2); font-weight: 500; cursor: pointer; transition: all 0.2s;
        }
        .shadow-btn:hover, .shadow-btn.active { border-color: var(--p-gold); color: #fff; background: rgba(212,168,67,0.1); }
        
        .vow-input {
          width: 100%; min-height: 120px;
          background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px; padding: 1.25rem;
          color: #fff; font-family: inherit; font-size: 1.05rem;
          margin-bottom: 2rem; outline: none;
        }
        .vow-input:focus { border-color: var(--p-gold); box-shadow: 0 0 0 1px var(--p-gold); }
        
        .prime-btn {
          width: 100%; padding: 1.25rem; border-radius: 16px;
          background: var(--p-gold); color: #000;
          font-weight: 800; font-size: 1.1rem; border: none; cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .prime-btn:hover { transform: translateY(-3px); box-shadow: 0 8px 30px rgba(212,168,67,0.4); }
      `}</style>
    </div>
  );
};

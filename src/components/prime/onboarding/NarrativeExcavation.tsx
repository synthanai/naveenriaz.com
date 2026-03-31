import React, { useState, useEffect } from 'react';

interface MatrixVector {
  past: number;
  present: number;
  future: number;
  why: string;
}

interface NarrativeExcavationProps {
  auditData: Record<string, MatrixVector>;
  onComplete: (data: Record<string, string>) => void;
}

export const NarrativeExcavation: React.FC<NarrativeExcavationProps> = ({ auditData, onComplete }) => {
  const [narratives, setNarratives] = useState<Record<string, string>>({});
  const [triageKeys, setTriageKeys] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    // Triage Logic: Calculate 'Shock' scores (Deltas between Past/Present/Future)
    const keys = Object.keys(auditData).sort((a, b) => {
      const vecA = auditData[a];
      const vecB = auditData[b];
      const shockA = Math.abs(vecA.present - vecA.past) + Math.abs(vecA.future - vecA.present);
      const shockB = Math.abs(vecB.present - vecB.past) + Math.abs(vecB.future - vecB.present);
      return shockB - shockA;
    }).slice(0, 9); // With 9 dimensions, we can show them all or top shards.

    const labelMap: Record<string, string> = {
      body_resource: 'Body: Financial Capital',
      body_capacity: 'Body: Vitality Capacity',
      body_stability: 'Body: Environmental Stability',
      mind_resource: 'Mind: Temporal Autonomy',
      mind_capacity: 'Mind: Deep Focus',
      mind_stability: 'Mind: Skill Arbitrage',
      soul_resource: 'Soul: Relational Depth',
      soul_capacity: 'Soul: Identity Alignment',
      soul_stability: 'Soul: Legacy Ripples'
    };

    setTriageKeys(keys);
    setLabelMapping(labelMap);
  }, [auditData]);

  const [labelMapping, setLabelMapping] = useState<Record<string, string>>({});

  const handleNext = () => {
    if (activeStep < triageKeys.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      onComplete(narratives);
    }
  };

  if (triageKeys.length === 0) return <div className="loading">Calculating Trajectory Shocks...</div>;

  const currentKey = triageKeys[activeStep];
  const vector = auditData[currentKey];
  const progress = ((activeStep + 1) / triageKeys.length) * 100;

  return (
    <div className="excavation-container">
      <div className="vow-header">
        <span className="vow-badge">ACT 2: DEEP EXCAVATION</span>
        <div className="progress-mini">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="vow-content glass-card">
        <div className="vow-context">
          <p className="vow-trace-header">SHADOW TRACE: {(labelMapping[currentKey] || currentKey).toUpperCase()}</p>
          <div className="trajectory-row">
            <span className="t-val">{vector.past}</span>
            <span className="t-arrow">➔</span>
            <span className="t-val gold">{vector.present}</span>
            <span className="t-arrow">➔</span>
            <span className="t-val green">{vector.future}</span>
          </div>
          <div className="act1-why-stack">
            {vector.whyPast && <div className="why-item past">PAST: "{vector.whyPast}"</div>}
            {vector.whyPresent && <div className="why-item present">PRESENT: "{vector.whyPresent}"</div>}
            {vector.whyFuture && <div className="why-item future">FUTURE: "{vector.whyFuture}"</div>}
            {vector.why && <div className="why-item">{vector.why}</div>}
          </div>
        </div>
        
        <h3 className="vow-question">You mentioned the truth above. Now, go deeper. What is the *cost* of this trajectory if nothing changes?</h3>
        
        <textarea 
          className="vow-input"
          placeholder="Peel back the final layer..."
          value={narratives[currentKey] || ''}
          onChange={(e) => setNarratives({ ...narratives, [currentKey]: e.target.value })}
          autoFocus
        />

        <button 
          className="prime-btn" 
          disabled={!narratives[currentKey]?.trim() || narratives[currentKey].length < 10}
          onClick={handleNext}
        >
          {activeStep === triageKeys.length - 1 ? 'Seal the Monday Chronicle' : 'Continue Excavation'}
        </button>
      </div>

      <style jsx>{`
        .excavation-container { width: 100%; max-width: 600px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem; }
        .vow-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
        .vow-badge {
          background: rgba(212, 168, 67, 0.1); color: var(--p-gold);
          font-size: 0.65rem; font-weight: 900; padding: 6px 16px; border-radius: 100px; letter-spacing: 0.15em;
        }
        .progress-mini { width: 120px; height: 2px; background: rgba(255,255,255,0.05); border-radius: 2px; overflow: hidden; }
        .progress-fill { height: 100%; background: var(--p-gold); transition: width 0.4s ease; }
        
        .vow-content {
          padding: 3.5rem; background: rgba(255,255,255,0.01);
          border: 1px solid rgba(255,255,255,0.08); border-radius: 40px; backdrop-filter: blur(40px);
        }
        
        .vow-context { margin-bottom: 3rem; padding: 2rem; background: rgba(0,0,0,0.2); border-radius: 24px; border: 1px solid rgba(255,255,255,0.03); }
        .vow-trace-header { font-size: 0.6rem; font-weight: 900; letter-spacing: 0.1em; color: var(--p-t3); margin-bottom: 1rem; }
        
        .trajectory-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
        .t-val { font-size: 1.2rem; font-weight: 900; color: rgba(255,255,255,0.4); }
        .t-val.gold { color: var(--p-gold); }
        .t-val.green { color: #00ffa3; }
        .t-arrow { font-size: 0.8rem; opacity: 0.2; }

        .act1-why-stack { 
          display: flex; flex-direction: column; gap: 0.75rem;
          padding-left: 1rem; border-left: 2px solid var(--p-gold);
        }
        .why-item { font-size: 0.85rem; line-height: 1.4; color: #fff; font-style: italic; opacity: 0.7; }
        .why-item.past { opacity: 0.4; }
        .why-item.present { opacity: 0.9; font-weight: 700; color: var(--p-gold); }
        .why-item.future { opacity: 0.6; color: #00ffa3; }

        .vow-question { font-size: 1.6rem; font-weight: 900; margin-bottom: 2.5rem; color: #fff; line-height: 1.3; letter-spacing: -0.01em; }
        
        .vow-input {
          width: 100%; min-height: 200px;
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px; padding: 1.75rem;
          color: #fff; font-family: inherit; font-size: 1.1rem;
          line-height: 1.6; margin-bottom: 3rem; resize: none; outline: none;
          transition: all 0.3s ease;
        }
        .vow-input:focus { border-color: var(--p-gold); background: rgba(212, 168, 67, 0.05); }
        
        .prime-btn {
          width: 100%; padding: 1.75rem; border-radius: 20px;
          background: #fff; color: #000; font-weight: 950; font-size: 1rem; border: none; cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .prime-btn:hover:not(:disabled) { background: var(--p-gold); transform: translateY(-4px); box-shadow: 0 10px 40px rgba(212, 168, 67, 0.4); }
        .prime-btn:disabled { opacity: 0.2; cursor: not-allowed; }
      `}</style>
    </div>
  );
};

import React, { useState } from 'react';

const CATEGORIES = [
  // ACT 1: BODY (உடல்)
  { 
    id: 'body_resource', layer: 'BODY', dimension: 'Financial Capital', icon: '💰',
    probes: {
      layman: 'Is your money working for you, or are you working for your money?',
      professional: 'Is your capital deployment serving your growth, or just covering overhead?',
      philosophical: 'Is your wealth a tool that serves your expansion, or a master you serve?'
    }
  },
  { 
    id: 'body_capacity', layer: 'BODY', dimension: 'Vitality Capacity', icon: '⚡',
    probes: {
      layman: 'Do you wake up full of energy, or do you feel tired most days?',
      professional: 'Is your health a competitive advantage, or a drag on your performance?',
      philosophical: 'Is your body a fast vessel for your intent, or a heavy anchor?'
    }
  },
  { 
    id: 'body_stability', layer: 'BODY', dimension: 'Environmental Stability', icon: '🏠',
    probes: {
      layman: 'Do you feel safe and comfortable in your current living space?',
      professional: 'Does your environment optimize your high-output routines, or create friction?',
      philosophical: 'Does your home feel like a sanctuary for your soul, or a transient camp?'
    }
  },
  { 
    id: 'mind_resource', layer: 'MIND', dimension: 'Temporal Autonomy', icon: '⏳',
    probes: {
      layman: 'Do you have time to do what you love, or is your calendar full of "have-to"s?',
      professional: 'Do you own your schedule, or does "the business" own you?',
      philosophical: 'Do you have the freedom to say "No" to anything that isn\'t a "Hell Yes"?'
    }
  },
  { 
    id: 'mind_capacity', layer: 'MIND', dimension: 'Deep Focus', icon: '🧠',
    probes: {
      layman: 'Can you focus on one thing for an hour, or is your mind always jumping?',
      professional: 'Is your attention bandwidth protected from noise, or is it fractured?',
      philosophical: 'If your mind were a lens, would it be focused on truth, or blurred by distraction?'
    }
  },
  { 
    id: 'mind_stability', layer: 'MIND', dimension: 'Skill Arbitrage', icon: '🛠️',
    probes: {
      layman: 'Are you learning new things that make your life easier or better?',
      professional: 'Is your unique edge compounding daily, or is it becoming obsolete?',
      philosophical: 'Is your mind growing new branches of wisdom, or just shedding old leaves?'
    }
  },
  { 
    id: 'soul_resource', layer: 'SOUL', dimension: 'Relational Depth', icon: '🤝',
    probes: {
      layman: 'Do the people closest to you make you feel supported and happy?',
      professional: 'Do your primary collaborators increase your leverage, or diminish your focus?',
      philosophical: 'Do your 3 AM friends lift your ceiling, or reinforce your floor?'
    }
  },
  { 
    id: 'soul_capacity', layer: 'SOUL', dimension: 'Identity Alignment', icon: '🔮',
    probes: {
      layman: 'Are you being your true self, or are you pretending to be someone else?',
      professional: 'Is your professional persona integrated with your values, or is it a mask?',
      philosophical: 'Are you becoming who you are meant to be, or who others want you to be?'
    }
  },
  { 
    id: 'soul_stability', layer: 'SOUL', dimension: 'Legacy Ripples', icon: '🌊',
    probes: {
      layman: 'Will the work you do today still matter a year from now?',
      professional: 'Are you building an enterprise that outlasts your labor, or just a job?',
      philosophical: 'Who will remember your name when you are gone?'
    }
  }
];

interface AuditGridProps {
  onComplete: (data: Record<string, any>) => void;
  onPartialSave?: (data: Record<string, any>) => void;
  tone?: 'layman' | 'professional' | 'philosophical';
}

export const AuditGrid: React.FC<AuditGridProps> = ({ onComplete, onPartialSave, tone = 'layman' }) => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [matrix, setMatrix] = useState<Record<string, { past: number, present: number, future: number, whyPast: string, whyPresent: string, whyFuture: string }>>({});
  
  const current = CATEGORIES[activeCategory];
  const currentData = matrix[current.id] || { past: 5, present: 5, future: 5, whyPast: '', whyPresent: '', whyFuture: '' };

  const updateVal = (field: 'past' | 'present' | 'future' | 'whyPast' | 'whyPresent' | 'whyFuture', val: any) => {
    const nextMatrix = {
      ...matrix,
      [current.id]: { ...currentData, [field]: val }
    };
    setMatrix(nextMatrix);
    onPartialSave?.(nextMatrix);
  };

  const handleNext = () => {
    if (activeCategory < CATEGORIES.length - 1) {
      setActiveCategory(activeCategory + 1);
    } else {
      onComplete(matrix);
    }
  };

  return (
    <div className="chronicle-container">
      <div className="chronicle-card glass-card">
        <div className="card-top">
          <span className="card-icon">{current.icon}</span>
          <span className="card-index">{current.layer} • CHAPTER {activeCategory + 1} / 9</span>
        </div>

        <h2 className="card-probe">{current.probes[tone]}</h2>
        <p className="card-label">{current.dimension.toUpperCase()}</p>

        <div className="trajectory-sliders">
          <div className="slider-group">
            <div className="slider-header">
              <span className="s-time">⚓ PAST (3Y AGO)</span>
              <span className="s-val">{currentData.past}</span>
            </div>
            <input 
              type="range" min="1" max="10" step="1" 
              value={currentData.past} 
              onChange={(e) => updateVal('past', parseInt(e.target.value))}
            />
            <input 
              className="micro-why-input"
              placeholder="Why this score then?"
              value={currentData.whyPast || ''}
              onChange={(e) => updateVal('whyPast', e.target.value)}
            />
          </div>

          <div className="slider-group active">
            <div className="slider-header">
              <span className="s-time gold">🎯 PRESENT (REALITY)</span>
              <span className="s-val">{currentData.present}</span>
            </div>
            <input 
              type="range" min="1" max="10" step="1" 
              value={currentData.present} 
              onChange={(e) => updateVal('present', parseInt(e.target.value))}
            />
            <input 
              className="micro-why-input"
              placeholder="The truth of your reality now..."
              value={currentData.whyPresent || ''}
              onChange={(e) => updateVal('whyPresent', e.target.value)}
            />
          </div>

          <div className="slider-group">
            <div className="slider-header">
              <span className="s-time green">⭐ FUTURE (LEGACY)</span>
              <span className="s-val">{currentData.future}</span>
            </div>
            <input 
              type="range" min="1" max="10" step="1" 
              value={currentData.future} 
              onChange={(e) => updateVal('future', parseInt(e.target.value))}
            />
            <input 
              className="micro-why-input"
              placeholder="What makes this the target?"
              value={currentData.whyFuture || ''}
              onChange={(e) => updateVal('whyFuture', e.target.value)}
            />
          </div>
        </div>

        <button 
          className="next-chapter-btn" 
          onClick={handleNext}
          disabled={!currentData.whyPresent || currentData.whyPresent.length < 3}
        >
          {activeCategory === CATEGORIES.length - 1 ? 'Seal the Chronicle' : 'Next Chapter'}
        </button>
      </div>

      <style jsx>{`
        .chronicle-container { max-width: 550px; margin: 0 auto; perspective: 1000px; }
        .chronicle-card {
          padding: 3.5rem; border-radius: 40px; background: rgba(255,255,255,0.015);
          border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(40px);
          animation: card-in 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes card-in { from { opacity: 0; transform: translateY(20px) rotateX(-5deg); } }

        .card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .card-icon { font-size: 2.5rem; }
        .card-index { font-size: 0.65rem; font-weight: 900; letter-spacing: 0.15em; color: var(--p-t3); }

        .card-probe { font-size: 1.7rem; font-weight: 800; line-height: 1.3; color: #fff; margin-bottom: 0.5rem; }
        .card-label { font-size: 0.65rem; font-weight: 900; letter-spacing: 0.2em; color: var(--p-gold); margin-bottom: 3rem; }

        .trajectory-sliders { display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 2.5rem; }
        .slider-group { 
          padding: 1.25rem 1.75rem; 
          background: rgba(255,255,255,0.02); 
          border-radius: 20px; 
          border: 1px solid rgba(255,255,255,0.03); 
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .slider-group.active { background: rgba(212, 168, 67, 0.05); border-color: rgba(212, 168, 67, 0.2); }
        
        .slider-header { display: flex; justify-content: space-between; align-items: center; }
        .s-time { font-size: 0.6rem; font-weight: 900; letter-spacing: 0.1em; color: rgba(255,255,255,0.4); }
        .s-time.gold { color: var(--p-gold); }
        .s-time.green { color: #00ffa3; }
        .s-val { font-size: 1.1rem; font-weight: 900; color: #fff; font-family: var(--p-font-outfit); }

        input[type='range'] {
          width: 100%; -webkit-appearance: none; background: rgba(255,255,255,0.1);
          height: 3px; border-radius: 2px; outline: none; margin: 0.5rem 0;
        }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none; width: 22px; height: 22px;
          background: #fff; border-radius: 50%; cursor: pointer;
          box-shadow: 0 0 15px rgba(255,255,255,0.3); transition: all 0.2s ease;
        }

        .micro-why-input {
          background: transparent; border: none; border-bottom: 1px solid rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.8); font-size: 0.85rem; padding: 0.5rem 0;
          outline: none; transition: all 0.3s ease;
        }
        .micro-why-input:focus { border-bottom-color: var(--p-gold); color: #fff; }

        .next-chapter-btn {
          width: 100%; padding: 1.5rem; border-radius: 20px; background: #fff; color: #000;
          font-weight: 900; font-size: 1rem; border: none; cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .next-chapter-btn:hover:not(:disabled) { background: var(--p-gold); transform: translateY(-4px); box-shadow: 0 10px 40px rgba(212, 168, 67, 0.4); }
        .next-chapter-btn:disabled { opacity: 0.3; cursor: not-allowed; }
      `}</style>
    </div>
  );
};

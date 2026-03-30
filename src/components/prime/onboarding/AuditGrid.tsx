import React, { useState } from 'react';

const CATEGORIES = [
  { id: 'self', label: 'Relationship with Self', icon: '👤', probe: "Are you the lead actor in your life, or just a background extra?" },
  { id: 'partner', label: 'Relationship with Partner', icon: '💑', probe: "Does your relationship feel like a home or a waiting room?" },
  { id: 'children', label: 'Relationship with Children', icon: '👶', probe: "Are you building a bridge for them, or a wall?" },
  { id: 'friends', label: 'Relationship with Friends', icon: '🤝', probe: "Do your friends lift your ceiling, or reinforce your floor?" },
  { id: 'health', label: 'Physical Health', icon: '🏥', probe: "Does your body feel like a fast car, or a heavy anchor?" },
  { id: 'energy', label: 'Energy, Vitality', icon: '⚡', probe: "At the end of the day, are you 'good-tired' or 'bad-tired'?" },
  { id: 'career', label: 'Career', icon: '💼', probe: "Do you own your work, or does your work own you?" },
  { id: 'finances', label: 'Finances', icon: '💰', probe: "Is your money a tool that serves you, or a master you serve?" },
  { id: 'purpose', label: 'Sense of purpose at work', icon: '🎯', probe: "If you stopped working today, would the world miss your 'Why'?" },
  { id: 'accomplishments', label: 'Sense of Accomplishments', icon: '🏆', probe: "Are you collecting trophies, or building a legacy?" },
  { id: 'experiences', label: 'Experiences in life', icon: '🌍', probe: "Are you collecting moments, or just checking boxes?" },
  { id: 'time', label: 'Time', icon: '⏳', probe: "Do you have the freedom to say 'No', or only the obligation to say 'Yes'?" },
  { id: 'presence', label: 'Being Present in moments', icon: '🧘', probe: "When you are with people, are you actually there, or somewhere else?" },
  { id: 'social_circle', label: 'Social Circle Depth', icon: '🕸️', probe: "Is your network a safety net, or a spider web?" },
  { id: 'community', label: 'Community & Collective', icon: '🏛️', probe: "Are you a contributing member, or just a quiet spectator?" },
  { id: 'hobby', label: 'Creative Play & Hobbies', icon: '🎨', probe: "When was the last time you did something just for the 'Joy' of it?" },
  { id: 'intellectual', label: 'Intellectual & Mind Layer', icon: '🧠', probe: "Is your mind growing new branches, or just shedding leaves?" },
  { id: 'spiritual', label: 'Spiritual & Soul Layer', icon: '✨', probe: "Do you feel connected to something bigger, or just lost in the small stuff?" },
  { id: 'origin', label: 'Family of Origin', icon: '🌳', probe: "Are your roots feeding you, or holding you back?" },
  { id: 'growth', label: 'Personal Growth & Legacy', icon: '📈', probe: "Are you becoming who you want to be, or who they want you to be?" },
  { id: 'routine', label: 'Body Routine & Rituals', icon: '🕒', probe: "Does your daily schedule feel like a rhythm, or a prison?" },
];

interface AuditGridProps {
  onComplete: (data: Record<string, any>) => void;
}

export const AuditGrid: React.FC<AuditGridProps> = ({ onComplete }) => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [matrix, setMatrix] = useState<Record<string, { past: number, present: number, future: number, why: string }>>({});
  
  const current = CATEGORIES[activeCategory];
  const currentData = matrix[current.id] || { past: 5, present: 5, future: 5, why: '' };

  const updateVal = (time: 'past' | 'present' | 'future' | 'why', val: any) => {
    setMatrix({
      ...matrix,
      [current.id]: { ...currentData, [time]: val }
    });
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
          <span className="card-index">CHAPTER {activeCategory + 1} / 21</span>
        </div>

        <h2 className="card-probe">{current.probe}</h2>
        <p className="card-label">{current.label.toUpperCase()}</p>

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
          </div>
        </div>

        <div className="narrative-anchor">
          <label className="anchor-label">The "Why" (One Sentence Trace)</label>
          <textarea 
            className="anchor-input"
            placeholder={`One sentence on the truth of your ${current.label.toLowerCase()}...`}
            value={currentData.why}
            onChange={(e) => updateVal('why', e.target.value)}
          />
        </div>

        <button 
          className="next-chapter-btn" 
          onClick={handleNext}
          disabled={!currentData.why || currentData.why.length < 5}
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
        .slider-group { padding: 1rem 1.5rem; background: rgba(255,255,255,0.02); border-radius: 16px; border: 1px solid rgba(255,255,255,0.03); transition: all 0.3s ease; }
        .slider-group.active { background: rgba(212, 168, 67, 0.05); border-color: rgba(212, 168, 67, 0.2); }
        
        .slider-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
        .s-time { font-size: 0.6rem; font-weight: 900; letter-spacing: 0.1em; color: rgba(255,255,255,0.4); }
        .s-time.gold { color: var(--p-gold); }
        .s-time.green { color: #00ffa3; }
        .s-val { font-size: 1.1rem; font-weight: 900; color: #fff; font-family: var(--p-font-outfit); }

        input[type='range'] {
          width: 100%; -webkit-appearance: none; background: rgba(255,255,255,0.1);
          height: 3px; border-radius: 2px; outline: none;
        }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none; width: 20px; height: 20px;
          background: #fff; border-radius: 50%; cursor: pointer;
          box-shadow: 0 0 10px rgba(255,255,255,0.3); transition: all 0.2s ease;
        }

        .narrative-anchor { margin-bottom: 3rem; text-align: left; }
        .anchor-label { display: block; font-size: 0.65rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; color: var(--p-t3); margin-bottom: 1rem; }
        .anchor-input {
          width: 100%; height: 80px; padding: 1.25rem; background: rgba(0,0,0,0.2);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 16px;
          color: #fff; font-size: 1rem; line-height: 1.5; outline: none; resize: none;
          transition: all 0.3s ease;
        }
        .anchor-input:focus { border-color: var(--p-gold); background: rgba(212, 168, 67, 0.05); }

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

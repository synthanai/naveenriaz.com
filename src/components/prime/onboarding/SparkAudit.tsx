import React, { useState } from 'react';

const SPARK_DIMENSIONS = [
  { 
    id: 'body_capacity', layer: 'BODY', dimension: 'Vitality', icon: '⚡',
    probe: 'Do you wake up full of energy, or do you feel tired most days?'
  },
  { 
    id: 'mind_resource', layer: 'MIND', dimension: 'Temporal Freedom', icon: '⏳',
    probe: 'Do you have time to do what you love, or is your calendar full of "have-to"s?'
  },
  { 
    id: 'soul_capacity', layer: 'SOUL', dimension: 'Identity Alignment', icon: '🔮',
    probe: 'Are you being your true self, or are you pretending to be someone else?'
  }
];

const LABEL_MAP: Record<string, string> = {
  body_capacity: 'Vitality',
  mind_resource: 'Temporal Freedom',
  soul_capacity: 'Identity Alignment'
};

type SparkStage = 'intro' | 'scan' | 'result';

interface SparkResult {
  topLeak: string;
  leakLabel: string;
  shock: number;
  present: number;
  future: number;
}

export const SparkAudit: React.FC = () => {
  const [stage, setStage] = useState<SparkStage>('intro');
  const [activeIdx, setActiveIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, { present: number; future: number }>>({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<SparkResult | null>(null);

  const current = SPARK_DIMENSIONS[activeIdx];
  const currentData = scores[current?.id] || { present: 5, future: 8 };

  const updateScore = (field: 'present' | 'future', val: number) => {
    setScores({ ...scores, [current.id]: { ...currentData, [field]: val } });
  };

  const handleNext = () => {
    if (activeIdx < SPARK_DIMENSIONS.length - 1) {
      setActiveIdx(activeIdx + 1);
    } else {
      // Calculate shock and find top leak
      let topKey = '';
      let maxShock = 0;
      Object.entries(scores).forEach(([key, val]) => {
        const shock = Math.abs(val.future - val.present);
        if (shock > maxShock) {
          maxShock = shock;
          topKey = key;
        }
      });
      const topVal = scores[topKey] || { present: 5, future: 8 };
      setResult({
        topLeak: topKey,
        leakLabel: LABEL_MAP[topKey] || topKey,
        shock: maxShock,
        present: topVal.present,
        future: topVal.future
      });
      setStage('result');
    }
  };

  return (
    <div className="spark-page">
      <div className="spark-container">
        {stage === 'intro' && (
          <div className="spark-intro">
            <span className="spark-badge">THE MIRROR</span>
            <h1 className="spark-title">See Your Blind Spot</h1>
            <p className="spark-sub">3 questions. 2 minutes. 1 truth you can't unsee.</p>
            <div className="spark-name-field">
              <input 
                type="text" 
                className="spark-input" 
                placeholder="Your first name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <button 
              className="spark-btn" 
              disabled={!name.trim()}
              onClick={() => setStage('scan')}
            >
              Look in the Mirror
            </button>
          </div>
        )}

        {stage === 'scan' && current && (
          <div className="spark-scan">
            <div className="scan-header">
              <span className="scan-layer">{current.layer}</span>
              <span className="scan-progress">{activeIdx + 1} / 3</span>
            </div>

            <h2 className="scan-probe">{current.probe}</h2>
            <p className="scan-dim">{current.dimension.toUpperCase()}</p>

            <div className="slider-pair">
              <div className="slider-block">
                <div className="slider-label">
                  <span>🎯 RIGHT NOW</span>
                  <span className="slider-val gold">{currentData.present}</span>
                </div>
                <input 
                  type="range" min="1" max="10" step="1"
                  value={currentData.present}
                  onChange={(e) => updateScore('present', parseInt(e.target.value))}
                />
              </div>

              <div className="slider-block">
                <div className="slider-label">
                  <span>⭐ WHERE YOU WANT TO BE</span>
                  <span className="slider-val green">{currentData.future}</span>
                </div>
                <input 
                  type="range" min="1" max="10" step="1"
                  value={currentData.future}
                  onChange={(e) => updateScore('future', parseInt(e.target.value))}
                />
              </div>
            </div>

            <button className="spark-btn" onClick={handleNext}>
              {activeIdx === SPARK_DIMENSIONS.length - 1 ? 'Reveal the Leak' : 'Next'}
            </button>
          </div>
        )}

        {stage === 'result' && result && (
          <div className="spark-result">
            <div className="result-icon">{SPARK_DIMENSIONS.find(d => d.id === result.topLeak)?.icon || '🔍'}</div>
            <h2 className="result-title">{name}, your critical leak is:</h2>
            <div className="result-leak-card glass-card">
              <span className="leak-label">{result.leakLabel}</span>
              <div className="leak-trajectory">
                <span className="leak-now">{result.present}</span>
                <span className="leak-arrow">→</span>
                <span className="leak-target">{result.future}</span>
              </div>
              <p className="leak-gap">Gap: {result.shock} points of unrealized potential</p>
            </div>

            <p className="result-msg">
              This gap is costing you every day. The longer it stays open, the more compound momentum you lose.
            </p>

            <div className="spark-cta">
              <p className="cta-label">Want the full 9-dimension excavation?</p>
              <div className="email-capture">
                <input 
                  type="email"
                  className="spark-input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <a 
                  href="/prime/onboarding/flame" 
                  className="spark-btn cta-btn"
                  onClick={() => {
                    localStorage.setItem('synthai_spark_lead', JSON.stringify({ name, email, result, timestamp: new Date().toISOString() }));
                  }}
                >
                  Enter the Full Initiation
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .spark-page { min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: 4rem 1.5rem; }
        .spark-container { width: 100%; max-width: 500px; animation: fadeIn 0.8s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .spark-badge {
          display: inline-block; font-size: 0.6rem; font-weight: 900; letter-spacing: 0.2em;
          color: var(--p-gold); background: rgba(212, 168, 67, 0.1); padding: 6px 18px;
          border-radius: 100px; margin-bottom: 1.5rem;
        }
        .spark-title {
          font-size: clamp(2.5rem, 8vw, 3.5rem); font-weight: 950; letter-spacing: -0.04em;
          background: linear-gradient(135deg, #fff 0%, var(--p-gold) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          margin-bottom: 0.75rem; line-height: 1.1;
        }
        .spark-sub { color: var(--p-t3); font-size: 1.1rem; margin-bottom: 3rem; line-height: 1.5; }

        .spark-name-field { margin-bottom: 2rem; }
        .spark-input {
          width: 100%; padding: 1.25rem; background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08); border-radius: 14px;
          color: #fff; font-size: 1.05rem; outline: none; transition: all 0.3s;
        }
        .spark-input:focus { border-color: var(--p-gold); background: rgba(212, 168, 67, 0.05); }

        .spark-btn {
          width: 100%; padding: 1.5rem; border-radius: 18px;
          background: var(--p-gold); color: #000; font-weight: 900; font-size: 1.05rem;
          border: none; cursor: pointer; text-decoration: none; text-align: center; display: block;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .spark-btn:hover:not(:disabled) { background: #fff; transform: translateY(-3px); box-shadow: 0 12px 40px rgba(212, 168, 67, 0.35); }
        .spark-btn:disabled { opacity: 0.2; cursor: not-allowed; }

        /* Scan */
        .spark-scan { animation: fadeIn 0.5s ease-out; }
        .scan-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .scan-layer { font-size: 0.65rem; font-weight: 900; letter-spacing: 0.15em; color: var(--p-gold); }
        .scan-progress { font-size: 0.65rem; font-weight: 800; color: var(--p-t3); letter-spacing: 0.1em; }
        .scan-probe { font-size: 1.6rem; font-weight: 800; color: #fff; line-height: 1.3; margin-bottom: 0.5rem; }
        .scan-dim { font-size: 0.65rem; font-weight: 900; letter-spacing: 0.2em; color: var(--p-t3); margin-bottom: 2.5rem; }

        .slider-pair { display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 2.5rem; }
        .slider-block { padding: 1.25rem 1.5rem; background: rgba(255,255,255,0.02); border-radius: 16px; border: 1px solid rgba(255,255,255,0.05); }
        .slider-label { display: flex; justify-content: space-between; align-items: center; font-size: 0.6rem; font-weight: 800; letter-spacing: 0.1em; color: rgba(255,255,255,0.5); margin-bottom: 0.75rem; }
        .slider-val { font-size: 1.1rem; font-weight: 900; }
        .slider-val.gold { color: var(--p-gold); }
        .slider-val.green { color: #00ffa3; }

        input[type='range'] {
          width: 100%; -webkit-appearance: none; background: rgba(255,255,255,0.1);
          height: 3px; border-radius: 2px; outline: none; margin: 0.25rem 0;
        }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none; width: 22px; height: 22px;
          background: #fff; border-radius: 50%; cursor: pointer;
          box-shadow: 0 0 15px rgba(255,255,255,0.3);
        }

        /* Result */
        .spark-result { text-align: center; animation: fadeIn 0.8s ease-out; }
        .result-icon { font-size: 3rem; margin-bottom: 1rem; }
        .result-title { font-size: 1.5rem; font-weight: 800; color: #fff; margin-bottom: 2rem; }

        .result-leak-card {
          padding: 2.5rem; border-radius: 24px; margin-bottom: 2rem;
          border: 1px solid rgba(255, 107, 107, 0.3); background: rgba(255, 107, 107, 0.05);
        }
        .leak-label { display: block; font-size: 0.7rem; font-weight: 900; letter-spacing: 0.2em; color: #ff6b6b; margin-bottom: 1rem; text-transform: uppercase; }
        .leak-trajectory { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 1rem; }
        .leak-now { font-size: 2.5rem; font-weight: 950; color: var(--p-gold); }
        .leak-arrow { font-size: 1.2rem; color: rgba(255,255,255,0.3); }
        .leak-target { font-size: 2.5rem; font-weight: 950; color: #00ffa3; }
        .leak-gap { font-size: 0.85rem; color: var(--p-t3); }

        .result-msg { font-size: 1.1rem; color: var(--p-t2); line-height: 1.6; margin-bottom: 3rem; }

        .spark-cta { padding: 2rem; background: rgba(255,255,255,0.02); border-radius: 20px; border: 1px solid rgba(255,255,255,0.08); }
        .cta-label { font-size: 0.7rem; font-weight: 900; letter-spacing: 0.1em; color: var(--p-gold); text-transform: uppercase; margin-bottom: 1.5rem; }
        .email-capture { display: flex; flex-direction: column; gap: 1rem; }
        .cta-btn { margin-top: 0.5rem; }
      `}</style>
    </div>
  );
};

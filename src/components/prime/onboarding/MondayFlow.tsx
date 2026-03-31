import React, { useState } from 'react';
import { AuditGrid } from './AuditGrid';
import { NarrativeExcavation } from './NarrativeExcavation';
import { ExternalCodes } from './ExternalCodes';

type MatrixValue = { past: number; present: number; future: number; why: string };

type MondayStage = 'intro' | 'audit' | 'excavation' | 'codes' | 'complete';

interface ChronicleData {
  matrix: Record<string, MatrixValue> | null;
  narratives: Record<string, string> | null;
  codes: Record<string, string> | null;
  timestamp: string;
}

function buildChroniclePayload(data: ChronicleData) {
  const codes = data.codes || {};
  return {
    matrix: data.matrix || {},
    narratives: data.narratives || {},
    codes,
    external: {
      mbti: codes.mbti || '',
      high5: codes.high5 || '',
      hdType: codes.hdType || '',
      hdAuthority: codes.hdAuthority || '',
      hdProfile: codes.hdProfile || ''
    },
    timestamp: data.timestamp
  };
}

export const MondayFlow: React.FC = () => {
  const [stage, setStage] = useState<MondayStage>('intro');
  const [chronicleData, setChronicleData] = useState<ChronicleData>({
    matrix: null,
    narratives: null,
    codes: null,
    timestamp: new Date().toISOString()
  });

  const saveToVault = (nextData: ChronicleData) => {
    const payload = buildChroniclePayload(nextData);
    localStorage.setItem('synthai_prime_chronicle', JSON.stringify(payload));
    localStorage.setItem('synthai_onboarding_monday', JSON.stringify(payload));
  };

  const handleMatrixComplete = (matrix: Record<string, MatrixValue>) => {
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
    setLabelMapping(labelMap);
    const nextData = { ...chronicleData, matrix };
    setChronicleData(nextData);
    saveToVault(nextData);
    setStage('excavation');
  };

  const handleNarrativesComplete = (narratives: Record<string, string>) => {
    const nextData = { ...chronicleData, narratives };
    setChronicleData(nextData);
    saveToVault(nextData);
    setStage('codes');
  };

  const handleCodesComplete = (codes: Record<string, string>) => {
    const nextData = { ...chronicleData, codes };
    setChronicleData(nextData);
    saveToVault(nextData);
    setStage('complete');
  };

  return (
    <div className="onboarding-page">
      <div id="onboarding-container">
        {stage === 'intro' && (
          <div className="stage active">
            <h1 className="revelatory-title">Day 1: RECALL</h1>
            <p className="revelatory-subtitle">
              We begin the total mapping of your trajectory. 3 Acts. 9 Dimensions. Past, Present, and Legacy Target.
            </p>
            <button className="prime-btn" onClick={() => setStage('audit')}>
              Enter the Initiation
            </button>
          </div>
        )}

        {stage === 'audit' && (
          <div className="stage active">
            <AuditGrid onComplete={handleMatrixComplete} />
          </div>
        )}

        {stage === 'excavation' && chronicleData.matrix && (
          <div className="stage active">
            <NarrativeExcavation auditData={chronicleData.matrix} onComplete={handleNarrativesComplete} />
          </div>
        )}

        {stage === 'codes' && (
          <div className="stage active">
            <ExternalCodes onComplete={handleCodesComplete} />
          </div>
        )}

        {stage === 'complete' && (
          <div className="stage active">
            <h2 className="revelatory-title">Chronicle Sealed</h2>
            <p className="revelatory-subtitle">
              Your Monday Recall is complete. The total matrix is established. We meet again on Wednesday for the RESONANCE.
            </p>
            <div className="completion-actions">
              <a href="/prime/" className="prime-btn">Enter Dashboard</a>
              <a href="/prime/onboarding/ritual_simulation" className="prime-btn-reverse">View Simulation Trace</a>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .onboarding-page {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem 1.5rem;
        }
        #onboarding-container { width: 100%; max-width: 650px; }
        .stage { display: block; animation: fadeIn 0.8s ease-out; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .revelatory-title {
          font-size: clamp(2.5rem, 8vw, 4rem);
          font-weight: 950;
          letter-spacing: -0.04em;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #fff 0%, var(--p-gold) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-align: center;
          line-height: 1.1;
        }
        .revelatory-subtitle {
          font-size: clamp(1rem, 4vw, 1.25rem);
          color: var(--p-t3);
          text-align: center;
          line-height: 1.6;
          margin-bottom: 4rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }
        .completion-actions { display: flex; flex-direction: column; gap: 1rem; margin-top: 3rem; }

        .prime-btn {
          display: block; width: 100%; padding: 1.75rem; border-radius: 20px;
          background: var(--p-gold); color: #000; font-weight: 900; font-size: 1.1rem;
          border: none; cursor: pointer; text-align: center; text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 30px rgba(212, 168, 67, 0.2);
        }
        .prime-btn:hover { background: #fff; transform: translateY(-4px); box-shadow: 0 15px 50px rgba(212, 168, 67, 0.4); }

        .prime-btn-reverse {
          display: block; width: 100%; padding: 1.5rem; border-radius: 20px;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
          color: #fff; font-weight: 700; text-align: center; text-decoration: none;
          transition: all 0.3s ease;
        }
        .prime-btn-reverse:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
};

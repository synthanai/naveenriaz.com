import React, { useEffect, useState } from 'react';
import { AuraMap } from './AuraMap';
import { synthesizeSights } from './SynthesisEngine';

type FridayStage = 'act1' | 'act2' | 'act3' | 'complete';

interface FridayBriefData {
  text: string;
  archetype: string;
  shadow: string;
  tension: string;
}

export const FridayFlow: React.FC = () => {
  const [stage, setStage] = useState<FridayStage>('act1');
  const [brief, setBrief] = useState<FridayBriefData | null>(null);
  const [vectors, setVectors] = useState<any[]>([]);
  const [declaration, setDeclaration] = useState('');
  const [ready, setReady] = useState(false);
  const [missingData, setMissingData] = useState(false);

  useEffect(() => {
    const mondayRaw = localStorage.getItem('synthai_onboarding_monday') || localStorage.getItem('synthai_prime_chronicle');
    const wednesdayRaw = localStorage.getItem('synthai_onboarding_wednesday');

    if (!mondayRaw || !wednesdayRaw) {
      setMissingData(true);
      setReady(true);
      return;
    }

    const mondayData = JSON.parse(mondayRaw);
    const resonanceData = JSON.parse(wednesdayRaw);
    const finalSynthesis = synthesizeSights(mondayData, resonanceData);

    setVectors(finalSynthesis.vectors);
    setBrief({
      text: finalSynthesis.brief.legacyPath,
      archetype: finalSynthesis.brief.archetype.toUpperCase(),
      shadow: finalSynthesis.brief.shadow.toUpperCase(),
      tension: finalSynthesis.brief.dissonancePoint.toUpperCase()
    });
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="reveal-page">
        <div className="loading-card glass-card">
          <h2>Loading Friday Reveal...</h2>
        </div>
      </div>
    );
  }

  if (missingData || !brief) {
    return (
      <div className="reveal-page">
        <div className="loading-card glass-card">
          <h2>Friday needs Monday and Wednesday data first.</h2>
          <a href="/prime/onboarding/sovereign" className="prime-btn-reverse">Return to Day 1</a>
        </div>
      </div>
    );
  }

  return (
    <div className="reveal-page">
      <div id="reveal-container">
        {stage === 'act1' && (
          <section className="active">
            <h1 className="reveal-title">Day 3: THE REVEAL</h1>
            <p className="reveal-subtitle">Monday was Recall. Wednesday was Resonance. Today, we map the Shift.</p>

            <div id="aura-map-root">
              <AuraMap vectors={vectors} />
            </div>

            <div className="sights-legend glass-card">
              <div className="legend-item"><span className="dot-blue"></span> Current Reality</div>
              <div className="legend-item"><span className="dot-gold"></span> Sovereign Potential</div>
            </div>

            <button id="see-the-brief" className="prime-btn" onClick={() => setStage('act2')}>Read the Legacy Brief</button>
          </section>
        )}

        {stage === 'act2' && (
          <section className="active">
            <div className="vow-speech-box glass-card">
              <h2 className="brief-title">Sovereign Legacy Brief</h2>
              <p id="vow-brief-text" className="vow-voice">{brief.text}</p>
              <div className="legacy-highlights">
                <div className="h-item"><strong>Archetype:</strong> <span id="archetype-val">{brief.archetype}</span></div>
                <div className="h-item"><strong>Shadow:</strong> <span id="shadow-val">{brief.shadow}</span></div>
                <div className="h-item"><strong>Tension:</strong> <span id="tension-val">{brief.tension}</span></div>
              </div>
              <button id="make-declaration" className="prime-btn" onClick={() => setStage('act3')}>Make the Declaration</button>
            </div>
          </section>
        )}

        {stage === 'act3' && (
          <section className="active">
            <h2 className="reveal-title">The Final Declaration</h2>
            <p className="reveal-subtitle">To Seal the Initiation, declare your intent for the 1.3M Legacy path. Your word is your bond.</p>

            <textarea
              id="declaration-input"
              placeholder="I declare that I will..."
              className="reveal-input"
              value={declaration}
              onChange={(event) => setDeclaration(event.target.value)}
            />

            <button
              id="seal-initiation"
              className="prime-btn"
              onClick={() => {
                localStorage.setItem('synthai_onboarding_final_declaration', declaration);
                setStage('complete');
              }}
            >
              Seal the Initiation
            </button>
          </section>
        )}

        {stage === 'complete' && (
          <section className="active">
            <h2 className="reveal-title">Initiation Sealed</h2>
            <p className="reveal-subtitle">You have transitioned from Prospect to Sovereign. Coach Naveen will see you in Session 1.</p>
            <a href="/prime/" className="prime-btn-reverse">Go to Dashboard</a>
          </section>
        )}
      </div>

      <style jsx>{`
        .reveal-page {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        #reveal-container > section,
        .loading-card {
          width: 100%;
          max-width: 600px;
          animation: fadeIn 1s ease-out;
        }
        #reveal-container > section.active {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        @keyframes fadeIn {
          from { opacity: 0; filter: blur(10px); }
          to { opacity: 1; filter: blur(0); }
        }

        .reveal-title {
          font-size: 2.8rem; font-weight: 900;
          background: linear-gradient(135deg, #fff 0%, var(--p-gold) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          text-align: center; margin-bottom: 0.5rem;
        }
        .reveal-subtitle { color: var(--p-t3); font-size: 1rem; text-align: center; }

        #aura-map-root { width: 100%; display: flex; justify-content: center; }

        .sights-legend { display: flex; gap: 2rem; padding: 1rem 2rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--p-t3); }
        .dot-blue { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: var(--p-blue); margin-right: 6px; }
        .dot-gold { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: var(--p-gold); margin-right: 6px; }

        .vow-speech-box, .loading-card { padding: 3rem; text-align: left; width: 100%; }
        .brief-title { font-size: 1.5rem; font-weight: 800; color: var(--p-gold); margin-bottom: 1.5rem; }
        .vow-voice { font-size: 1.25rem; line-height: 1.4; color: #fff; margin-bottom: 2rem; }

        .legacy-highlights { background: rgba(255,255,255,0.03); padding: 1.5rem; border-radius: 16px; margin-bottom: 2.5rem; border: 1px solid rgba(255,255,255,0.08); }
        .h-item { margin-bottom: 0.75rem; font-size: 0.9rem; color: var(--p-t3); }
        .h-item strong { color: var(--p-t2); text-transform: uppercase; font-size: 0.75rem; margin-right: 10px; }

        .reveal-input {
          width: 100%; min-height: 150px; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px; padding: 1.5rem; color: #fff; font-family: inherit; font-size: 1.1rem;
          outline: none; margin-bottom: 2.5rem;
        }
        .reveal-input:focus { border-color: var(--p-gold); box-shadow: 0 0 20px rgba(212, 168, 67, 0.2); }

        .prime-btn {
          width: 100%; padding: 1.5rem; border-radius: 20px; background: var(--p-gold); color: #000; font-weight: 900; font-size: 1.1rem; border: none; cursor: pointer; text-align: center; text-decoration: none;
        }
        .prime-btn-reverse {
          display: block; width: 100%; padding: 1.5rem; border-radius: 20px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff; text-align: center; text-decoration: none; margin-top: 2rem;
        }
      `}</style>
    </div>
  );
};

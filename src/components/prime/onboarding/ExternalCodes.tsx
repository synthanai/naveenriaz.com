import React, { useState } from 'react';

interface ExternalCodesProps {
  onComplete: (data: any) => void;
}

const HD_TYPES = ['Manifestor', 'Generator', 'Manifesting Generator', 'Projector', 'Reflector'];
const HD_AUTHORITIES = ['Emotional', 'Sacral', 'Splenic', 'Ego', 'Self-Projected', 'Environmental', 'Lunar'];

export const ExternalCodes: React.FC<ExternalCodesProps> = ({ onComplete }) => {
  const [data, setData] = useState({ 
    mbti: '', 
    high5: '',
    hdType: '',
    hdAuthority: '',
    hdProfile: ''
  });

  return (
    <div className="codes-container glass-card">
      <h2 className="codes-title">Act 3: The External Codes</h2>
      <p className="codes-desc">Finally, let's anchor your internal discovery in external signals. These 'Body Layer' tokens calibrate your final Sovereign Synthesis.</p>

      <div className="codes-grid">
        <div className="input-field">
          <label>Cognitive Persona (16personalities)</label>
          <input 
            type="text" 
            placeholder="e.g. INTJ-A" 
            value={data.mbti}
            onChange={(e) => setData({...data, mbti: e.target.value})}
          />
        </div>

        <div className="input-field">
          <label>Operational Strengths (High5 Top 5)</label>
          <input 
            type="text" 
            placeholder="e.g. Strategic, Achiever, Ideation..." 
            value={data.high5}
            onChange={(e) => setData({...data, high5: e.target.value})}
          />
        </div>

        <div className="hd-section">
          <h3 className="section-label">Human Design (Energetic Blueprint)</h3>
          <div className="hd-grid">
            <div className="input-field">
              <label>Type</label>
              <select value={data.hdType} onChange={(e) => setData({...data, hdType: e.target.value})}>
                <option value="">Select Type</option>
                {HD_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="input-field">
              <label>Authority</label>
              <select value={data.hdAuthority} onChange={(e) => setData({...data, hdAuthority: e.target.value})}>
                <option value="">Select Authority</option>
                {HD_AUTHORITIES.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div className="input-field">
              <label>Profile</label>
              <input 
                type="text" 
                placeholder="e.g. 5/1" 
                value={data.hdProfile}
                onChange={(e) => setData({...data, hdProfile: e.target.value})}
              />
            </div>
          </div>
        </div>
      </div>

      <button className="final-btn" onClick={() => onComplete(data)}>
        Seal the Monday Excavation
      </button>

      <style jsx>{`
        .codes-container { padding: 4rem; max-width: 650px; margin: 0 auto; text-align: center; }
        .codes-title { font-size: 2rem; font-weight: 800; margin-bottom: 1rem; color: var(--p-gold); }
        .codes-desc { color: var(--p-t3); font-size: 1rem; line-height: 1.6; margin-bottom: 3rem; }
        
        .codes-grid { display: flex; flex-direction: column; gap: 2rem; text-align: left; }
        .hd-section { margin-top: 1rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.08); }
        .section-label { font-size: 0.7rem; font-weight: 900; letter-spacing: 0.15em; text-transform: uppercase; color: var(--p-gold); margin-bottom: 1.5rem; }
        
        .hd-grid { display: grid; grid-template-columns: 1.2fr 1.2fr 0.6fr; gap: 1rem; }

        .input-field label { display: block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; margin-bottom: 0.75rem; color: var(--p-t3); letter-spacing: 0.05em; }
        .input-field input, .input-field select {
          width: 100%; padding: 1.25rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; color: #fff; font-size: 1rem; outline: none; transition: all 0.3s ease;
        }
        .input-field select option { background: #111; color: #fff; }
        .input-field input:focus, .input-field select:focus { border-color: var(--p-gold); background: rgba(212, 168, 67, 0.05); }
        
        .final-btn {
          margin-top: 3.5rem; width: 100%; padding: 1.75rem; border-radius: 20px;
          background: #fff; color: #000; font-weight: 900; font-size: 1.1rem; border: none; cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .final-btn:hover { background: var(--p-gold); transform: translateY(-4px); box-shadow: 0 10px 40px rgba(212, 168, 67, 0.4); }
      `}</style>
    </div>
  );
};

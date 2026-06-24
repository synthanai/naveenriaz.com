import React, { useState } from 'react';

export type UserProfile = {
  name: string;
  role: 'founder' | 'professional' | 'creative' | 'learner';
  primaryGoal: 'clarity' | 'growth' | 'balance' | 'peak_performance';
  tone: 'layman' | 'professional' | 'philosophical';
  oneThingGoal: string;
};

interface OnboardingProfileProps {
  onComplete: (profile: UserProfile) => void;
}

export const OnboardingProfile: React.FC<OnboardingProfileProps> = ({ onComplete }) => {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    role: 'professional',
    primaryGoal: 'clarity',
    tone: 'layman',
    oneThingGoal: ''
  });

  const handleSubmit = () => {
    if (profile.name.trim() && profile.oneThingGoal.trim()) {
      onComplete(profile);
    }
  };

  return (
    <div className="profile-step">
      <h2 className="profile-title">Before we begin the Chronicle...</h2>
      <p className="profile-subtitle">Personalizing your path to sovereignty.</p>

      <div className="profile-fields">
        <label className="field-label">What should I call you?</label>
        <input 
          type="text" 
          className="profile-input" 
          placeholder="Your Name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />

        <label className="field-label">Which path best describes your current state?</label>
        <div className="option-grid">
          {['founder', 'professional', 'creative', 'learner'].map((r) => (
            <button 
              key={r}
              className={`option-btn ${profile.role === r ? 'active' : ''}`}
              onClick={() => setProfile({ ...profile, role: r as any })}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>

        <label className="field-label">What is your primary obsession right now?</label>
        <div className="option-grid">
          {['clarity', 'growth', 'balance', 'peak_performance'].map((g) => (
            <button 
              key={g}
              className={`option-btn ${profile.primaryGoal === g ? 'active' : ''}`}
              onClick={() => setProfile({ ...profile, primaryGoal: g as any })}
            >
              {g.replace('_', ' ').toUpperCase()}
            </button>
          ))}
        </div>

        <label className="field-label">How should we communicate?</label>
        <div className="option-grid">
          <button 
            className={`option-btn ${profile.tone === 'layman' ? 'active' : ''}`}
            onClick={() => setProfile({ ...profile, tone: 'layman' })}
          >
            KEEP IT SIMPLE (LAYMAN)
          </button>
          <button 
            className={`option-btn ${profile.tone === 'professional' ? 'active' : ''}`}
            onClick={() => setProfile({ ...profile, tone: 'professional' })}
          >
            MODERN BUSINESS (PROFESSIONAL)
          </button>
          <button 
            className={`option-btn ${profile.tone === 'philosophical' ? 'active' : ''}`}
            onClick={() => setProfile({ ...profile, tone: 'philosophical' })}
          >
            DEEP WISDOM (EXISTENTIAL)
          </button>
        </div>

        <label className="field-label">What is the ONE thing you want to change in the next 90 days?</label>
        <input 
          type="text" 
          className="profile-input one-thing-input" 
          placeholder="Be specific. One sentence."
          value={profile.oneThingGoal}
          onChange={(e) => setProfile({ ...profile, oneThingGoal: e.target.value })}
        />
      </div>

      <button 
        className="prime-btn" 
        disabled={!profile.name.trim() || !profile.oneThingGoal.trim()}
        onClick={handleSubmit}
      >
        Set the Intent
      </button>

      <style jsx>{`
        .profile-step { width: 100%; max-width: 500px; margin: 0 auto; text-align: left; }
        .profile-title { font-size: 2rem; font-weight: 900; color: #fff; margin-bottom: 0.5rem; letter-spacing: -0.02em; }
        .profile-subtitle { color: var(--p-t3); margin-bottom: 3rem; font-size: 1.1rem; }
        
        .profile-fields { display: flex; flex-direction: column; gap: 2rem; margin-bottom: 4rem; }
        .field-label { font-size: 0.7rem; font-weight: 900; letter-spacing: 0.15em; color: var(--p-gold); text-transform: uppercase; }
        
        .profile-input {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; padding: 1.25rem; color: #fff; font-size: 1.1rem; outline: none;
        }
        .profile-input:focus { border-color: var(--p-gold); background: rgba(212, 168, 67, 0.05); }
        .one-thing-input { border-color: rgba(212, 168, 67, 0.2); }

        .option-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
        .option-btn {
          padding: 1rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);
          border-radius: 12px; color: rgba(255,255,255,0.4); font-size: 0.7rem; font-weight: 800;
          cursor: pointer; transition: all 0.2s ease;
        }
        .option-btn.active { background: #fff; color: #000; border-color: #fff; transform: scale(1.02); }
        .option-btn:hover:not(.active) { background: rgba(255,255,255,0.05); color: #fff; }

        .prime-btn { 
          width: 100%; padding: 1.5rem; border-radius: 20px; background: var(--p-gold); color: #000; 
          font-weight: 900; border: none; cursor: pointer; transition: all 0.3s ease; 
        }
        .prime-btn:disabled { opacity: 0.2; cursor: not-allowed; }
      `}</style>
    </div>
  );
};

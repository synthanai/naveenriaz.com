import React, { useState } from 'react';
import { MOCK_CLIENTS } from './MockData';
import type { ClientAudit } from './MockData';
import { synthesizeSights } from './SynthesisEngine';
import { AuraMap } from './AuraMap';

type DashboardTab = 'chronicle' | 'aura';

const LABEL_MAP: Record<string, string> = {
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

function getShockRank(matrix: Record<string, any>): string[] {
  return Object.keys(matrix).sort((a, b) => {
    const va = matrix[a];
    const vb = matrix[b];
    const shockA = Math.abs(va.present - va.past) + Math.abs(va.future - va.present);
    const shockB = Math.abs(vb.present - vb.past) + Math.abs(vb.future - vb.present);
    return shockB - shockA;
  });
}

export const DashboardOverview: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState<ClientAudit | null>(null);
  const [activeTab, setActiveTab] = useState<DashboardTab>('chronicle');
  const selectedSynthesis = selectedClient
    ? synthesizeSights(selectedClient.monday, selectedClient.wednesday)
    : null;

  const matrix = selectedClient?.monday?.matrix;
  const narratives = selectedClient?.monday?.narratives;
  const external = selectedClient?.monday?.external ?? selectedClient?.monday?.codes;
  const somaticLocation = selectedClient?.wednesday?.somaticLocation;
  const collisionAccepted = selectedClient?.wednesday?.collisionAccepted;
  const profile = (selectedClient?.monday as any)?.profile;

  const shockRankedKeys = matrix ? getShockRank(matrix) : [];
  const topShockKey = shockRankedKeys[0];
  const topShockLabel = topShockKey ? (LABEL_MAP[topShockKey] || topShockKey) : null;

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar glass-card">
        <h2 className="sidebar-title">Shadow Command</h2>
        <div className="stat-grid">
          <div className="stat-card">
            <span className="stat-label">Applicants</span>
            <span className="stat-value">{MOCK_CLIENTS.length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">High Dissonance</span>
            <span className="stat-value">{MOCK_CLIENTS.filter(c => c.flags.some(f => f.severity === 'high' || f.severity === 'CRITICAL')).length}</span>
          </div>
        </div>
        
        <nav className="client-feed">
          <h3 className="feed-header">Current Applicants</h3>
          {MOCK_CLIENTS.map(c => (
            <button 
              key={c.id} 
              className={`client-btn ${selectedClient?.id === c.id ? 'active' : ''}`}
              onClick={() => { setSelectedClient(c); setActiveTab('chronicle'); }}
            >
              <div className="status-indicator" data-status={c.status}></div>
              <span className="client-name">{c.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main View */}
      <main className="dashboard-main">
        {selectedClient && selectedSynthesis ? (
          <div className="audit-view">
            <header className="audit-header">
              <div>
                <h1 className="audit-title">{selectedClient.name} <span className="id-tag">#{selectedClient.id}</span></h1>
                {topShockLabel && (
                  <p className="shock-subtitle">Critical Leak: <strong>{topShockLabel}</strong></p>
                )}
              </div>
              <div className="header-meta">
                <div className="status-tag" data-status={selectedClient.status}>{selectedClient.status.toUpperCase()}</div>
                {profile?.tone && <span className="tone-tag">{profile.tone.toUpperCase()}</span>}
              </div>
            </header>

            {/* Tab Switcher */}
            <div className="tab-bar">
              <button className={`tab-btn ${activeTab === 'chronicle' ? 'active' : ''}`} onClick={() => setActiveTab('chronicle')}>
                Chronicle (Narratives)
              </button>
              <button className={`tab-btn ${activeTab === 'aura' ? 'active' : ''}`} onClick={() => setActiveTab('aura')}>
                Aura Map + Flags
              </button>
            </div>

            {/* TAB: Chronicle (PRIMARY) */}
            {activeTab === 'chronicle' && (
              <div className="chronicle-view">
                {/* Identity Codes */}
                {external && (
                  <section className="section-card glass-card">
                    <h3 className="section-label">External Codes (Identity Blueprint)</h3>
                    <div className="codes-grid">
                      {external.mbti && <div className="code-chip"><span className="code-key">MBTI</span> {external.mbti}</div>}
                      {external.high5 && <div className="code-chip"><span className="code-key">HIGH5</span> {external.high5}</div>}
                      {external.hdType && <div className="code-chip"><span className="code-key">HD TYPE</span> {external.hdType}</div>}
                      {external.hdAuthority && <div className="code-chip"><span className="code-key">HD AUTHORITY</span> {external.hdAuthority}</div>}
                      {external.hdProfile && <div className="code-chip"><span className="code-key">HD PROFILE</span> {external.hdProfile}</div>}
                    </div>
                  </section>
                )}

                {/* Somatic + Collision */}
                <section className="section-card glass-card somatic-section">
                  <h3 className="section-label">Resonance Signal (Wednesday)</h3>
                  <div className="resonance-grid">
                    <div className="resonance-item">
                      <span className="res-key">Collision</span>
                      <span className={`res-val ${collisionAccepted ? 'accepted' : 'resisted'}`}>
                        {collisionAccepted ? '✓ ADMITTED TRUTH' : '✗ RESISTED'}
                      </span>
                    </div>
                    <div className="resonance-item">
                      <span className="res-key">Somatic Location</span>
                      <span className="res-val somatic">{somaticLocation ? somaticLocation.toUpperCase() : 'NOT CAPTURED'}</span>
                    </div>
                  </div>
                </section>

                {/* Profile Info */}
                {profile && (
                  <section className="section-card glass-card">
                    <h3 className="section-label">Profile</h3>
                    <div className="codes-grid">
                      {profile.name && <div className="code-chip"><span className="code-key">NAME</span> {profile.name}</div>}
                      {profile.role && <div className="code-chip"><span className="code-key">ROLE</span> {profile.role.toUpperCase()}</div>}
                      {profile.primaryGoal && <div className="code-chip"><span className="code-key">GOAL</span> {profile.primaryGoal.replace('_', ' ').toUpperCase()}</div>}
                      {profile.oneThingGoal && <div className="code-chip one-thing"><span className="code-key">THE ONE THING</span> {profile.oneThingGoal}</div>}
                    </div>
                  </section>
                )}

                {/* Shock-Ranked Narrative Feed */}
                <section className="section-card glass-card">
                  <h3 className="section-label">Trajectory Narratives (Shock-Ranked)</h3>
                  <div className="narrative-feed">
                    {shockRankedKeys.map((key, i) => {
                      const vec = matrix![key];
                      const shock = Math.abs(vec.present - vec.past) + Math.abs(vec.future - vec.present);
                      const narText = narratives?.[key];
                      const label = LABEL_MAP[key] || key;
                      return (
                        <div key={key} className={`narrative-item ${i < 2 ? 'top-shock' : ''}`}>
                          <div className="nar-header">
                            <span className="nar-rank">#{i + 1}</span>
                            <span className="nar-label">{label}</span>
                            <span className="nar-shock">SHOCK: {shock}</span>
                          </div>
                          <div className="nar-trajectory">
                            <span className="t-past">{vec.past}</span>
                            <span className="t-arrow">→</span>
                            <span className="t-present">{vec.present}</span>
                            <span className="t-arrow">→</span>
                            <span className="t-future">{vec.future}</span>
                          </div>
                          {/* Micro-whys */}
                          <div className="why-stack">
                            {vec.whyPast && <div className="why-line past">PAST: "{vec.whyPast}"</div>}
                            {vec.whyPresent && <div className="why-line present">PRESENT: "{vec.whyPresent}"</div>}
                            {vec.whyFuture && <div className="why-line future">FUTURE: "{vec.whyFuture}"</div>}
                            {vec.why && !vec.whyPresent && <div className="why-line">{vec.why}</div>}
                          </div>
                          {/* Narrative Excavation (Cost text) */}
                          {narText && (
                            <div className="nar-excavation">
                              <span className="excavation-label">COST OF TRAJECTORY</span>
                              <p className="excavation-text">"{narText}"</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* Declaration */}
                <section className="section-card glass-card declaration-section">
                  <h3 className="section-label">The Declaration</h3>
                  <p className="declaration-text">
                    "{(selectedClient as any)?.declaration || 'I hide my true power to avoid being seen and rejected again. I declare my intention to rule my territory with absolute integrity.'}"
                  </p>
                </section>
              </div>
            )}

            {/* TAB: Aura (SECONDARY) */}
            {activeTab === 'aura' && (
              <div className="grid-2-col">
                <div className="viz-card glass-card">
                  <h3 className="viz-label">SIGHTS AURA Map</h3>
                  <AuraMap vectors={selectedSynthesis.vectors} />
                  <div className="aura-shift-score">
                    <span className="shift-label">Aura Shift Readiness</span>
                    <span className="shift-value">{selectedSynthesis.auraShift}%</span>
                  </div>
                </div>

                <div className="details-card glass-card">
                  <h3 className="viz-label">Dissonance Flags</h3>
                  <div className="flag-list">
                    {selectedClient.flags.map(f => (
                      <div key={f.id} className="flag-item" data-severity={f.severity}>
                        <span className="f-type">{f.type}</span>
                        <p className="f-msg">{f.message}</p>
                      </div>
                    ))}
                  </div>

                  <h3 className="viz-label mt-2">Legacy Brief</h3>
                  <div className="brief-grid">
                    <div className="brief-item"><span className="brief-key">Archetype</span> {selectedSynthesis.brief.archetype.toUpperCase()}</div>
                    <div className="brief-item"><span className="brief-key">Shadow</span> {selectedSynthesis.brief.shadow.toUpperCase()}</div>
                    <div className="brief-item"><span className="brief-key">Tension</span> {selectedSynthesis.brief.dissonancePoint.toUpperCase()}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="empty-state">
            <div className="vow-idle-pulse"></div>
            <h2>VOW Idle</h2>
            <p>Select a Sovereign Applicant to begin the audit pre-brief.</p>
          </div>
        )}
      </main>

      <style jsx>{`
        .dashboard-layout { display: flex; gap: 2rem; min-height: 80vh; }
        .dashboard-sidebar { width: 300px; padding: 2rem; height: calc(100vh - 100px); display: flex; flex-direction: column; gap: 2rem; position: sticky; top: 0; flex-shrink: 0; }
        .dashboard-main { flex: 1; padding: 1rem; overflow-y: auto; }
        
        .sidebar-title { font-size: 1.2rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--p-gold); }
        .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        .stat-card { background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); text-align: center; }
        .stat-label { display: block; font-size: 0.65rem; color: var(--p-t3); text-transform: uppercase; margin-bottom: 4px; }
        .stat-value { font-size: 1.5rem; font-weight: 800; color: #fff; }

        .client-feed { display: flex; flex-direction: column; gap: 0.5rem; }
        .feed-header { font-size: 0.75rem; color: var(--p-t3); text-transform: uppercase; margin-bottom: 0.5rem; }
        .client-btn {
          display: flex; align-items: center; gap: 12px; padding: 1rem;
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);
          border-radius: 12px; color: var(--p-t3); text-align: left; cursor: pointer;
        }
        .client-btn:hover { background: rgba(255,255,255,0.05); }
        .client-btn.active { background: rgba(255,255,255,0.08); border-color: var(--p-gold); color: #fff; }
        
        .status-indicator { width: 8px; height: 8px; border-radius: 50%; }
        .status-indicator[data-status='Sealed'] { background: var(--p-gold); box-shadow: 0 0 10px var(--p-gold); }
        .status-indicator[data-status='Initiated'] { background: var(--p-blue); }
        
        .audit-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; }
        .audit-title { font-size: 2rem; font-weight: 800; color: #fff; }
        .id-tag { color: var(--p-t3); font-size: 1rem; font-weight: 400; margin-left: 10px; }
        .shock-subtitle { font-size: 0.9rem; color: var(--p-t3); margin-top: 0.25rem; }
        .shock-subtitle strong { color: #ff6b6b; }
        .header-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem; }
        .tone-tag { font-size: 0.6rem; font-weight: 800; letter-spacing: 0.15em; color: var(--p-t3); background: rgba(255,255,255,0.05); padding: 4px 10px; border-radius: 4px; }

        /* Tab Bar */
        .tab-bar { display: flex; gap: 0; margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .tab-btn {
          padding: 1rem 2rem; background: none; border: none; border-bottom: 2px solid transparent;
          color: var(--p-t3); font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;
          cursor: pointer; transition: all 0.2s;
        }
        .tab-btn.active { color: var(--p-gold); border-bottom-color: var(--p-gold); }
        .tab-btn:hover:not(.active) { color: #fff; }

        /* Chronicle View */
        .chronicle-view { display: flex; flex-direction: column; gap: 1.5rem; }
        .section-card { padding: 2rem; border-radius: 20px; }
        .section-label { font-size: 0.7rem; font-weight: 900; letter-spacing: 0.15em; text-transform: uppercase; color: var(--p-gold); margin-bottom: 1.5rem; }

        /* Codes */
        .codes-grid { display: flex; flex-wrap: wrap; gap: 0.75rem; }
        .code-chip {
          padding: 0.75rem 1.25rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; font-size: 0.85rem; color: #fff;
        }
        .code-chip.one-thing { border-color: var(--p-gold); background: rgba(212, 168, 67, 0.08); width: 100%; }
        .code-key { display: block; font-size: 0.6rem; font-weight: 800; color: var(--p-t3); letter-spacing: 0.1em; margin-bottom: 2px; }

        /* Resonance */
        .resonance-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .resonance-item { padding: 1.25rem; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); }
        .res-key { display: block; font-size: 0.6rem; font-weight: 800; color: var(--p-t3); letter-spacing: 0.1em; margin-bottom: 0.5rem; text-transform: uppercase; }
        .res-val { font-size: 1rem; font-weight: 700; }
        .res-val.accepted { color: #00ffa3; }
        .res-val.resisted { color: #ff6b6b; }
        .res-val.somatic { color: var(--p-gold); }

        /* Narrative Feed */
        .narrative-feed { display: flex; flex-direction: column; gap: 1rem; }
        .narrative-item {
          padding: 1.5rem; background: rgba(255,255,255,0.02); border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.05); transition: all 0.2s;
        }
        .narrative-item.top-shock { border-color: rgba(255, 107, 107, 0.3); background: rgba(255, 107, 107, 0.03); }
        .nar-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.75rem; }
        .nar-rank { font-size: 0.7rem; font-weight: 900; color: var(--p-gold); min-width: 24px; }
        .nar-label { font-size: 0.8rem; font-weight: 700; color: #fff; flex: 1; }
        .nar-shock { font-size: 0.6rem; font-weight: 900; color: #ff6b6b; letter-spacing: 0.1em; }

        .nar-trajectory { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; }
        .t-past { font-size: 1rem; font-weight: 800; color: rgba(255,255,255,0.4); }
        .t-present { font-size: 1.1rem; font-weight: 900; color: var(--p-gold); }
        .t-future { font-size: 1rem; font-weight: 800; color: #00ffa3; }
        .t-arrow { font-size: 0.7rem; opacity: 0.3; color: #fff; }

        .why-stack { display: flex; flex-direction: column; gap: 0.4rem; padding-left: 1rem; border-left: 2px solid rgba(255,255,255,0.05); margin-bottom: 0.75rem; }
        .why-line { font-size: 0.8rem; color: rgba(255,255,255,0.6); font-style: italic; }
        .why-line.past { opacity: 0.5; }
        .why-line.present { color: var(--p-gold); opacity: 1; font-weight: 600; }
        .why-line.future { color: #00ffa3; opacity: 0.7; }

        .nar-excavation { margin-top: 0.75rem; padding: 1rem; background: rgba(212, 168, 67, 0.05); border-radius: 12px; border: 1px solid rgba(212, 168, 67, 0.15); }
        .excavation-label { display: block; font-size: 0.55rem; font-weight: 900; color: var(--p-gold); letter-spacing: 0.15em; margin-bottom: 0.5rem; }
        .excavation-text { font-size: 1rem; color: #fff; line-height: 1.5; font-style: italic; margin: 0; }

        /* Declaration */
        .declaration-section { border-top: 2px solid var(--p-gold); }
        .declaration-text { font-family: serif; font-style: italic; font-size: 1.3rem; color: var(--p-t2); line-height: 1.6; margin: 0; }

        /* Aura Tab */
        .grid-2-col { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start; }
        .viz-card { padding: 2rem; position: relative; display: flex; flex-direction: column; align-items: center; }
        .viz-label { font-size: 0.75rem; text-transform: uppercase; color: var(--p-gold); letter-spacing: 0.1em; margin-bottom: 2rem; }
        
        .aura-shift-score { margin-top: 2rem; text-align: center; }
        .shift-label { display: block; font-size: 0.8rem; color: var(--p-t3); margin-bottom: 4px; }
        .shift-value { font-size: 3rem; font-weight: 900; color: var(--p-gold); }
        
        .flag-list { display: flex; flex-direction: column; gap: 1rem; }
        .flag-item { padding: 1rem; border-radius: 12px; background: rgba(0,0,0,0.2); border-left: 3px solid #ccc; }
        .flag-item[data-severity='high'] { border-color: #ff4444; background: rgba(255,0,0,0.05); }
        .flag-item[data-severity='medium'] { border-color: var(--p-gold); }
        .flag-item[data-severity='CRITICAL'] { border-color: #ff0000; background: rgba(255,0,0,0.1); }
        .f-type { font-size: 0.65rem; color: var(--p-gold); font-weight: 800; text-transform: uppercase; }
        .f-msg { font-size: 1rem; color: var(--p-t1); margin-top: 4px; line-height: 1.4; }

        .brief-grid { display: flex; flex-direction: column; gap: 0.75rem; }
        .brief-item { padding: 0.75rem 1rem; background: rgba(255,255,255,0.03); border-radius: 10px; font-size: 0.9rem; color: #fff; }
        .brief-key { display: block; font-size: 0.6rem; font-weight: 800; color: var(--p-t3); margin-bottom: 2px; text-transform: uppercase; }
        .mt-2 { margin-top: 2.5rem; }

        .empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: var(--p-t3); text-align: center; gap: 1rem; }
        .vow-idle-pulse { width: 50px; height: 50px; border: 1px solid rgba(255,255,255,0.1); border-radius: 50%; animation: ping 2s infinite; }
        @keyframes ping { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(2); opacity: 0; } }

        .status-tag { font-size: 0.65rem; font-weight: 900; letter-spacing: 0.15em; padding: 6px 14px; border-radius: 6px; }
        .status-tag[data-status='Sealed'] { background: rgba(212,168,67,0.15); color: var(--p-gold); }
        .status-tag[data-status='Initiated'] { background: rgba(100,149,237,0.15); color: var(--p-blue); }
      `}</style>
    </div>
  );
};

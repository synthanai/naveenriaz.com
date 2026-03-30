import React, { useState } from 'react';
import { MOCK_CLIENTS } from './MockData';
import type { ClientAudit } from './MockData';
import { synthesizeSights } from './SynthesisEngine';
import { AuraMap } from './AuraMap';

export const DashboardOverview: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState<ClientAudit | null>(null);
  const selectedSynthesis = selectedClient
    ? synthesizeSights(selectedClient.monday, selectedClient.wednesday)
    : null;

  return (
    <div className="dashboard-layout">
      {/* Sidebar: Summary Stats */}
      <aside className="dashboard-sidebar glass-card">
        <h2 className="sidebar-title">Shadow Command</h2>
        <div className="stat-grid">
          <div className="stat-card">
            <span className="stat-label">Applicants</span>
            <span className="stat-value">{MOCK_CLIENTS.length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">High Dissonance</span>
            <span className="stat-value">2</span>
          </div>
        </div>
        
        <nav className="client-feed">
          <h3 className="feed-header">Current Applicants</h3>
          {MOCK_CLIENTS.map(c => (
            <button 
              key={c.id} 
              className={`client-btn ${selectedClient?.id === c.id ? 'active' : ''}`}
              onClick={() => setSelectedClient(c)}
            >
              <div className="status-indicator" data-status={c.status}></div>
              <span className="client-name">{c.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main View: Audit Details */}
      <main className="dashboard-main">
        {selectedClient && selectedSynthesis ? (
          <div className="audit-view">
            <header className="audit-header">
              <h1 className="audit-title">{selectedClient.name} <span className="id-tag">#{selectedClient.id}</span></h1>
              <div className="status-tag" data-status={selectedClient.status}>{selectedClient.status.toUpperCase()}</div>
            </header>

            <div className="grid-2-col">
              {/* SIGHTS Map */}
              <div className="viz-card glass-card">
                <h3 className="viz-label">SIGHTS AURA Map</h3>
                <AuraMap vectors={selectedSynthesis.vectors} />
                <div className="aura-shift-score">
                  <span className="shift-label">Aura Shift Readiness</span>
                  <span className="shift-value">{selectedSynthesis.auraShift}%</span>
                </div>
              </div>

              {/* Dissonance Flags */}
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
                
                <h3 className="viz-label mt-2">The Declaration</h3>
                <p className="declaration-text">
                  "I hide my true power to avoid being seen and rejected again. I declare my intention to rule my territory with absolute integrity."
                </p>
              </div>
            </div>
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
        .dashboard-sidebar { width: 300px; padding: 2rem; height: calc(100vh - 100px); display: flex; flex-direction: column; gap: 2rem; position: sticky; top: 0; }
        .dashboard-main { flex: 1; padding: 1rem; }
        
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
        
        .audit-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; }
        .audit-title { font-size: 2rem; font-weight: 800; color: #fff; }
        .id-tag { color: var(--p-t3); font-size: 1rem; font-weight: 400; margin-left:10px; }
        
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
        .f-type { font-size: 0.65rem; color: var(--p-gold); font-weight: 800; text-transform: uppercase; }
        .f-msg { font-size: 1rem; color: var(--p-t1); margin-top: 4px; line-height: 1.4; }
        
        .declaration-text { font-family: serif; font-style: italic; font-size: 1.25rem; color: var(--p-t2); line-height: 1.6; }
        .mt-2 { margin-top: 2.5rem; }

        .empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: var(--p-t3); text-align: center; gap: 1rem; }
        .vow-idle-pulse { width: 50px; height: 50px; border: 1px solid rgba(255,255,255,0.1); border-radius: 50%; animation: ping 2s infinite; }
        @keyframes ping { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(2); opacity: 0; } }
      `}</style>
    </div>
  );
};

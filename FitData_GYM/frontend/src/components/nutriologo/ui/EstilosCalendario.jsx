import React from 'react';

export function EstilosCalendario() {
  return (
    <style>{`
      .fc { --fc-border-color: #1e293b; }
      .fc td, .fc th, .fc .fc-scrollgrid { border-color: #1e293b !important; }
      .fc .fc-toolbar { margin-bottom: 0.75rem !important; }
      .fc-daygrid-day-number { color: #e2e8f0 !important; font-weight: 900 !important; padding: 8px !important; font-family: 'Inter', sans-serif; font-size: 0.82rem !important; }
      .fc-daygrid-day-frame { min-height: 74px; transition: background-color 0.2s ease, transform 0.2s ease; }
      .fc-daygrid-day:hover .fc-daygrid-day-frame { background-color: rgba(14, 165, 233, 0.08) !important; transform: translateY(-1px); cursor: pointer; }
      .fc-day-sun .fc-daygrid-day-frame { background-color: rgba(249, 115, 22, 0.06); }
      .fc-day-past .fc-daygrid-day-frame { background-color: rgba(100, 116, 139, 0.08) !important; }
      .fc-day-past:hover .fc-daygrid-day-frame { background-color: rgba(220, 38, 38, 0.12) !important; cursor: not-allowed !important; }
      .fc .fc-day-today { background: rgba(8, 145, 178, 0.14) !important; box-shadow: inset 0 0 0 1px rgba(34, 211, 238, 0.5); }
      .fc .fc-toolbar-title { color: white; font-weight: 900; text-transform: uppercase; font-size: 0.95rem; letter-spacing: -0.05em; }
      .fc .fc-button-primary { background: #1e293b; border: 1px solid #334155; font-weight: 900; border-radius: 10px; text-transform: uppercase; font-size: 0.58rem; padding: 6px 12px; }
      .fc .fc-button-primary:hover { background: #334155; border-color: #475569; }
      .fc .fc-button-active { background: #06b6d4 !important; border-color: #06b6d4 !important; }
      .fc-col-header-cell-cushion { color: #475569; text-transform: uppercase; font-size: 0.55rem; font-weight: 900; letter-spacing: 0.1em; padding: 7px 0 !important; }
      .fc-event { background: linear-gradient(to right, #2563eb, #06b6d4); border: none; padding: 3px 6px; border-radius: 7px; font-weight: 900; font-size: 0.62rem; box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
    `}</style>
  );
}
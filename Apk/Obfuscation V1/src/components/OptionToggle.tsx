interface OptionToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  badge?: string;
  badgeColor?: string;
  icon: React.ReactNode;
}

import React from 'react';

export function OptionToggle({
  label,
  description,
  checked,
  onChange,
  badge,
  badgeColor = 'violet',
  icon,
}: OptionToggleProps) {
  const badgeClasses: Record<string, string> = {
    violet: 'text-violet-300 bg-violet-500/10 border-violet-500/30',
    rose: 'text-rose-300 bg-rose-500/10 border-rose-500/30',
    amber: 'text-amber-300 bg-amber-500/10 border-amber-500/30',
    cyan: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',
    emerald: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30',
    blue: 'text-blue-300 bg-blue-500/10 border-blue-500/30',
  };

  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left group
        ${checked
          ? 'bg-violet-500/10 border-violet-500/40 shadow-sm shadow-violet-500/10'
          : 'bg-white/[0.03] border-white/8 hover:bg-white/5 hover:border-white/15'
        }`}
    >
      {/* Icon */}
      <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200
        ${checked ? 'bg-violet-500/20 text-violet-300' : 'bg-white/5 text-slate-400 group-hover:text-slate-300'}`}>
        {icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-sm font-semibold transition-colors ${checked ? 'text-white' : 'text-slate-300'}`}>
            {label}
          </span>
          {badge && (
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeClasses[badgeColor] ?? badgeClasses.violet}`}>
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{description}</p>
      </div>

      {/* Toggle */}
      <div className={`flex-shrink-0 w-11 h-6 rounded-full transition-all duration-300 relative
        ${checked ? 'bg-violet-600' : 'bg-white/10'}`}>
        <div className={`absolute top-0.5 w-5 h-5 rounded-full shadow-md transition-all duration-300
          ${checked ? 'translate-x-5 bg-white' : 'translate-x-0.5 bg-slate-400'}`} />
      </div>
    </button>
  );
}

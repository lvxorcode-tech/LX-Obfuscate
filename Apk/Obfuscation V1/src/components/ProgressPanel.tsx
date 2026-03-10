import type { ObfuscationProgress } from '../utils/obfuscator';

interface ProgressPanelProps {
  progress: ObfuscationProgress;
  log: string[];
}

export function ProgressPanel({ progress, log }: ProgressPanelProps) {
  return (
    <div className="space-y-4">
      {/* Current step */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white font-semibold">{progress.step}</p>
          <p className="text-slate-400 text-sm mt-0.5">{progress.detail}</p>
        </div>
        <span className="text-violet-400 font-mono font-bold text-lg">{progress.percent}%</span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-500 relative"
          style={{ width: `${progress.percent}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
        </div>
      </div>

      {/* Phase indicators */}
      <div className="flex gap-1">
        {[
          'Parse', 'Rename', 'Encrypt', 'CFG', 'Junk', 'Resource', 'Shield', 'Pack'
        ].map((phase, i) => {
          const threshold = (i + 1) * 12.5;
          const active = progress.percent >= threshold;
          const current = progress.percent >= threshold - 12.5 && progress.percent < threshold;
          return (
            <div
              key={phase}
              title={phase}
              className={`flex-1 h-1.5 rounded-full transition-all duration-500
                ${active ? 'bg-violet-500' : current ? 'bg-violet-500/50' : 'bg-white/5'}`}
            />
          );
        })}
      </div>

      {/* Log console */}
      <div className="bg-black/30 border border-white/5 rounded-xl p-3 h-40 overflow-y-auto font-mono text-xs space-y-1">
        {log.length === 0 ? (
          <span className="text-slate-600">Waiting for logs...</span>
        ) : (
          log.map((line, i) => (
            <p key={i} className={`leading-relaxed ${i === log.length - 1 ? 'text-violet-300' : 'text-slate-500'}`}>
              {line}
            </p>
          ))
        )}
      </div>
    </div>
  );
}

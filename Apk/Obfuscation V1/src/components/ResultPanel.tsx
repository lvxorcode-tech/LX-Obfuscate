import type { ObfuscationResult } from '../utils/obfuscator';
import { formatBytes, formatTime, downloadObfuscatedAPK } from '../utils/obfuscator';

interface ResultPanelProps {
  result: ObfuscationResult;
  file: File;
  onReset: () => void;
}

function StatCard({ label, value, sub, color = 'violet' }: { label: string; value: string; sub?: string; color?: string }) {
  const colors: Record<string, string> = {
    violet: 'text-violet-400',
    emerald: 'text-emerald-400',
    cyan: 'text-cyan-400',
    amber: 'text-amber-400',
    rose: 'text-rose-400',
    fuchsia: 'text-fuchsia-400',
  };
  return (
    <div className="bg-white/[0.03] border border-white/8 rounded-xl p-4 flex flex-col gap-1">
      <span className="text-slate-500 text-xs uppercase tracking-wider">{label}</span>
      <span className={`text-xl font-bold font-mono ${colors[color] ?? colors.violet}`}>{value}</span>
      {sub && <span className="text-slate-600 text-xs">{sub}</span>}
    </div>
  );
}

function ScoreRing({ score }: { score: number }) {
  const r = 44;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color =
    score >= 85 ? '#22c55e' :
    score >= 65 ? '#a78bfa' :
    score >= 45 ? '#f59e0b' :
    '#ef4444';

  const label =
    score >= 85 ? 'Extreme' :
    score >= 65 ? 'Strong' :
    score >= 45 ? 'Medium' :
    'Weak';

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <svg width={112} height={112} viewBox="0 0 112 112" className="-rotate-90">
          <circle cx={56} cy={56} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={8} />
          <circle
            cx={56} cy={56} r={r} fill="none"
            stroke={color} strokeWidth={8}
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 1s ease-in-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
          <span className="text-2xl font-black text-white">{score}</span>
          <span className="text-[10px] text-slate-400">/ 100</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-xs text-slate-500">Protection Score</p>
        <p className="text-sm font-bold" style={{ color }}>{label}</p>
      </div>
    </div>
  );
}

export function ResultPanel({ result, file, onReset }: ResultPanelProps) {
  const sizeDiff = result.obfuscatedSize - result.originalSize;
  const sizeLabel = sizeDiff > 0
    ? `+${formatBytes(sizeDiff)} (obfuscation overhead)`
    : 'Same size';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30">
          <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-white font-bold">Obfuscation Complete</h3>
          <p className="text-slate-400 text-sm">Processed in {formatTime(result.timeElapsed)}</p>
        </div>
      </div>

      {/* Score + stats grid */}
      <div className="flex gap-4 items-center">
        <ScoreRing score={result.protectionScore} />
        <div className="flex-1 grid grid-cols-2 gap-2">
          <StatCard label="Original" value={formatBytes(result.originalSize)} color="cyan" />
          <StatCard label="Obfuscated" value={formatBytes(result.obfuscatedSize)} sub={sizeLabel} color="violet" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <StatCard label="Classes" value={result.classesMapped.toLocaleString()} sub="identifiers remapped" color="fuchsia" />
        <StatCard label="Methods" value={result.methodsMapped.toLocaleString()} sub="identifiers remapped" color="violet" />
        <StatCard label="Fields" value={result.fieldsMapped.toLocaleString()} sub="identifiers remapped" color="cyan" />
        <StatCard label="Strings" value={result.stringsEncrypted.toLocaleString()} sub="AES-256 encrypted" color="amber" />
        <StatCard label="Junk Classes" value={result.junkClassesAdded.toLocaleString()} sub="decoys injected" color="rose" />
        <StatCard label="Time" value={formatTime(result.timeElapsed)} sub="processing time" color="emerald" />
      </div>

      {/* Output filename */}
      <div className="bg-black/30 border border-white/8 rounded-xl p-3 flex items-center gap-3">
        <svg className="w-4 h-4 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
        <span className="text-slate-400 font-mono text-xs truncate">{result.outputFileName}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => downloadObfuscatedAPK(file, result.outputFileName)}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600
            hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold py-3 px-4 rounded-xl
            transition-all duration-200 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-[0.98]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Download APK
        </button>
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10
            text-slate-300 font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          New APK
        </button>
      </div>
    </div>
  );
}

import { useState, useRef } from 'react';
import { DropZone } from './components/DropZone';
import { OptionToggle } from './components/OptionToggle';
import { ProgressPanel } from './components/ProgressPanel';
import { ResultPanel } from './components/ResultPanel';
import {
  runObfuscation,
  type ObfuscationOptions,
  type ObfuscationResult,
  type ObfuscationProgress,
} from './utils/obfuscator';

type Stage = 'idle' | 'running' | 'done';

const defaultOptions: ObfuscationOptions = {
  renameClasses: true,
  renameFields: true,
  renameMethods: true,
  stringEncryption: true,
  controlFlowObfuscation: true,
  junkCodeInsertion: false,
  resourceObfuscation: true,
  antiDecompile: true,
  packageFlattening: true,
  nativeCodeShield: false,
};

function Particles() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-20"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? '#a78bfa' : i % 3 === 1 ? '#e879f9' : '#38bdf8',
            animation: `float ${5 + Math.random() * 10}s ease-in-out ${Math.random() * 5}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

export function App() {
  const [file, setFile] = useState<File | null>(null);
  const [options, setOptions] = useState<ObfuscationOptions>(defaultOptions);
  const [stage, setStage] = useState<Stage>('idle');
  const [progress, setProgress] = useState<ObfuscationProgress>({ step: '', percent: 0, detail: '' });
  const [log, setLog] = useState<string[]>([]);
  const [result, setResult] = useState<ObfuscationResult | null>(null);
  const logRef = useRef<string[]>([]);

  const setOption = (key: keyof ObfuscationOptions) => (v: boolean) =>
    setOptions((prev) => ({ ...prev, [key]: v }));

  const protectionLevel = (() => {
    const on = Object.values(options).filter(Boolean).length;
    if (on >= 8) return { label: 'Extreme', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
    if (on >= 6) return { label: 'Strong', color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/30' };
    if (on >= 4) return { label: 'Medium', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' };
    return { label: 'Weak', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/30' };
  })();

  const handleStart = async () => {
    if (!file) return;
    setStage('running');
    logRef.current = [];
    setLog([]);
    setProgress({ step: 'Initializing', percent: 0, detail: 'Starting LX Obfuscation Engine...' });

    const res = await runObfuscation(file, options, (p) => {
      setProgress(p);
      logRef.current = [...logRef.current, `[${new Date().toLocaleTimeString()}] ${p.step}: ${p.detail}`];
      setLog([...logRef.current]);
    });

    setResult(res);
    setStage('done');
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setStage('idle');
    setLog([]);
    setProgress({ step: '', percent: 0, detail: '' });
  };

  return (
    <>
      <style>{`
        @keyframes float {
          from { transform: translateY(0px) scale(1); }
          to { transform: translateY(-30px) scale(1.2); }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .gradient-text {
          background: linear-gradient(135deg, #a78bfa, #e879f9, #38bdf8, #a78bfa);
          background-size: 300% 300%;
          animation: gradientShift 4s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .glow-border {
          box-shadow: 0 0 0 1px rgba(167,139,250,0.15), 0 0 40px rgba(167,139,250,0.05);
        }
        .glass {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(167,139,250,0.3); border-radius: 2px; }
      `}</style>

      {/* Background */}
      <div className="fixed inset-0 bg-[#080810]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(139,92,246,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(232,121,249,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(56,189,248,0.04),transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
      </div>

      <Particles />

      {/* Main layout */}
      <div className="relative z-10 min-h-screen flex flex-col font-[Inter,sans-serif]">

        {/* Navbar */}
        <nav className="border-b border-white/5 glass px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* LX Logo */}
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-lg shadow-violet-500/30">
              <span className="text-white font-black text-sm tracking-tight">LX</span>
            </div>
            <div>
              <span className="text-white font-bold text-lg tracking-tight">LX</span>
              <span className="text-slate-500 font-normal text-sm ml-1">Obfuscator</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-semibold ${protectionLevel.bg} ${protectionLevel.color}`}>
              <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              {protectionLevel.label} Protection
            </div>
            <div className="text-xs text-slate-600 hidden md:block font-mono">v2.5.0</div>
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 px-4 sm:px-6 py-8 max-w-6xl mx-auto w-full">

          {/* Hero */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Military-Grade APK Protection
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">
              <span className="gradient-text">APK Obfuscator</span>
            </h1>
            <p className="text-slate-400 text-base max-w-xl mx-auto leading-relaxed">
              Upload your APK and apply enterprise-grade obfuscation — rename identifiers, encrypt strings,
              obfuscate control flow, and shield against reverse engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

            {/* Left — Drop + Options */}
            <div className="lg:col-span-3 space-y-5">

              {/* Drop Zone */}
              <div className="glass border border-white/8 rounded-2xl p-5 glow-border">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  <h2 className="text-white font-semibold text-sm">Upload APK</h2>
                </div>
                <DropZone file={file} onFile={setFile} />
              </div>

              {/* Options */}
              <div className="glass border border-white/8 rounded-2xl p-5 glow-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                    </svg>
                    <h2 className="text-white font-semibold text-sm">Obfuscation Options</h2>
                  </div>
                  <div className={`text-xs px-2.5 py-1 rounded-full border font-bold ${protectionLevel.bg} ${protectionLevel.color}`}>
                    {Object.values(options).filter(Boolean).length}/10 active
                  </div>
                </div>

                <div className="space-y-2">
                  <OptionToggle
                    label="Class Renaming"
                    description="Rename all class, interface & enum names to meaningless identifiers"
                    checked={options.renameClasses}
                    onChange={setOption('renameClasses')}
                    badge="Core"
                    badgeColor="violet"
                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477" /></svg>}
                  />
                  <OptionToggle
                    label="Method Renaming"
                    description="Obfuscate all method & constructor names throughout the DEX"
                    checked={options.renameMethods}
                    onChange={setOption('renameMethods')}
                    badge="Core"
                    badgeColor="violet"
                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" /></svg>}
                  />
                  <OptionToggle
                    label="Field Renaming"
                    description="Rename all instance variables, static fields and constants"
                    checked={options.renameFields}
                    onChange={setOption('renameFields')}
                    badge="Core"
                    badgeColor="violet"
                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" /></svg>}
                  />
                  <OptionToggle
                    label="String Encryption"
                    description="AES-256 encrypt all string literals with runtime key derivation"
                    checked={options.stringEncryption}
                    onChange={setOption('stringEncryption')}
                    badge="High Impact"
                    badgeColor="rose"
                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>}
                  />
                  <OptionToggle
                    label="Control Flow Obfuscation"
                    description="Flatten CFG, insert opaque predicates & goto-spaghetti patterns"
                    checked={options.controlFlowObfuscation}
                    onChange={setOption('controlFlowObfuscation')}
                    badge="High Impact"
                    badgeColor="rose"
                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>}
                  />
                  <OptionToggle
                    label="Package Flattening"
                    description="Collapse all package hierarchy into a single obfuscated root"
                    checked={options.packageFlattening}
                    onChange={setOption('packageFlattening')}
                    badgeColor="cyan"
                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>}
                  />
                  <OptionToggle
                    label="Resource Obfuscation"
                    description="Scramble layout XML IDs, drawable names and string resource keys"
                    checked={options.resourceObfuscation}
                    onChange={setOption('resourceObfuscation')}
                    badgeColor="cyan"
                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>}
                  />
                  <OptionToggle
                    label="Anti-Decompile Shield"
                    description="Insert bytecode traps to crash Jadx, Fernflower & apktool"
                    checked={options.antiDecompile}
                    onChange={setOption('antiDecompile')}
                    badge="Advanced"
                    badgeColor="amber"
                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>}
                  />
                  <OptionToggle
                    label="Junk Code Injection"
                    description="Generate hundreds of decoy classes with unreachable dead code"
                    checked={options.junkCodeInsertion}
                    onChange={setOption('junkCodeInsertion')}
                    badge="Advanced"
                    badgeColor="amber"
                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" /></svg>}
                  />
                  <OptionToggle
                    label="Native Code Shield"
                    description="Wrap critical methods with LLVM-obfuscated JNI native stubs"
                    checked={options.nativeCodeShield}
                    onChange={setOption('nativeCodeShield')}
                    badge="Experimental"
                    badgeColor="emerald"
                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" /></svg>}
                  />
                </div>
              </div>

              {/* Quick presets */}
              <div className="glass border border-white/8 rounded-2xl p-5 glow-border">
                <h2 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                  Quick Presets
                </h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    {
                      name: 'Light', color: 'border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10',
                      opts: { renameClasses: true, renameFields: false, renameMethods: true, stringEncryption: false, controlFlowObfuscation: false, junkCodeInsertion: false, resourceObfuscation: false, antiDecompile: false, packageFlattening: false, nativeCodeShield: false }
                    },
                    {
                      name: 'Balanced', color: 'border-violet-500/30 text-violet-300 hover:bg-violet-500/10',
                      opts: { renameClasses: true, renameFields: true, renameMethods: true, stringEncryption: true, controlFlowObfuscation: true, junkCodeInsertion: false, resourceObfuscation: true, antiDecompile: false, packageFlattening: true, nativeCodeShield: false }
                    },
                    {
                      name: 'Maximum', color: 'border-rose-500/30 text-rose-300 hover:bg-rose-500/10',
                      opts: { renameClasses: true, renameFields: true, renameMethods: true, stringEncryption: true, controlFlowObfuscation: true, junkCodeInsertion: true, resourceObfuscation: true, antiDecompile: true, packageFlattening: true, nativeCodeShield: true }
                    },
                    {
                      name: 'None', color: 'border-slate-500/30 text-slate-400 hover:bg-slate-500/10',
                      opts: { renameClasses: false, renameFields: false, renameMethods: false, stringEncryption: false, controlFlowObfuscation: false, junkCodeInsertion: false, resourceObfuscation: false, antiDecompile: false, packageFlattening: false, nativeCodeShield: false }
                    },
                  ].map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => setOptions(preset.opts)}
                      className={`text-xs font-semibold px-4 py-2 rounded-lg border transition-all duration-200 ${preset.color}`}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Action + Status */}
            <div className="lg:col-span-2 space-y-5">

              {/* Start button */}
              <div className="glass border border-white/8 rounded-2xl p-5 glow-border">
                <button
                  onClick={handleStart}
                  disabled={!file || stage === 'running'}
                  className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold text-base
                    transition-all duration-300
                    ${!file || stage === 'running'
                      ? 'bg-white/5 border border-white/5 text-slate-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-[1.02] active:scale-[0.98]'
                    }`}
                >
                  {stage === 'running' ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Obfuscating...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                      {file ? 'Start Obfuscation' : 'Upload APK First'}
                    </>
                  )}
                </button>

                {file && stage === 'idle' && (
                  <p className="text-center text-slate-600 text-xs mt-3">
                    {Object.values(options).filter(Boolean).length} protection layers enabled
                  </p>
                )}
              </div>

              {/* Progress or Result */}
              {stage === 'running' && (
                <div className="glass border border-white/8 rounded-2xl p-5 glow-border">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                    <h2 className="text-white font-semibold text-sm">Processing</h2>
                  </div>
                  <ProgressPanel progress={progress} log={log} />
                </div>
              )}

              {stage === 'done' && result && (
                <div className="glass border border-white/8 rounded-2xl p-5 glow-border">
                  <ResultPanel result={result} file={file!} onReset={handleReset} />
                </div>
              )}

              {/* Feature cards */}
              {stage === 'idle' && (
                <div className="glass border border-white/8 rounded-2xl p-5 glow-border space-y-3">
                  <h2 className="text-white font-semibold text-sm mb-1">Why LX Obfuscator?</h2>
                  {[
                    { icon: '🔐', title: 'AES-256 String Encryption', desc: 'Runtime-only decryption — strings never appear in static analysis' },
                    { icon: '🌀', title: 'CFG Flattening', desc: 'Defeats Jadx, Fernflower and all major decompilers' },
                    { icon: '🧬', title: 'Identifier Renaming', desc: 'ProGuard-compatible mapping with symbol elimination' },
                    { icon: '🛡️', title: 'Anti-Tamper Shield', desc: 'Bytecode traps terminate reverse engineering attempts' },
                    { icon: '🚀', title: 'One-Click Workflow', desc: 'Upload → Configure → Download in seconds' },
                  ].map((f) => (
                    <div key={f.title} className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/5">
                      <span className="text-lg flex-shrink-0 mt-0.5">{f.icon}</span>
                      <div>
                        <p className="text-slate-200 text-xs font-semibold">{f.title}</p>
                        <p className="text-slate-500 text-xs mt-0.5">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/5 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
              <span className="text-white font-black text-[8px]">LX</span>
            </div>
            <span className="text-slate-600 text-xs">LX Obfuscator · 2024</span>
          </div>
          <div className="flex items-center gap-4">
            {['DEX Parsing', 'AES-256', 'CFG Flattening', 'ProGuard-Compatible'].map((t) => (
              <span key={t} className="text-[11px] text-slate-700">{t}</span>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
}

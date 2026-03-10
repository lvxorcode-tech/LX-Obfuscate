import React, { useCallback, useState } from 'react';
import { formatBytes } from '../utils/obfuscator';

interface DropZoneProps {
  onFile: (file: File) => void;
  file: File | null;
}

export function DropZone({ onFile, file }: DropZoneProps) {
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped && dropped.name.endsWith('.apk')) {
        onFile(dropped);
      }
    },
    [onFile]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    if (picked) onFile(picked);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`relative group rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer
        ${dragging
          ? 'border-violet-500 bg-violet-500/10 scale-[1.01]'
          : file
          ? 'border-emerald-500/60 bg-emerald-500/5'
          : 'border-white/10 bg-white/[0.03] hover:border-violet-500/50 hover:bg-violet-500/5'
        }`}
      style={{ minHeight: 180 }}
    >
      <label className="flex flex-col items-center justify-center w-full h-full p-8 cursor-pointer">
        <input
          type="file"
          accept=".apk"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleChange}
        />

        {file ? (
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 mb-1">
              <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-lg">{file.name}</p>
              <p className="text-slate-400 text-sm mt-1">{formatBytes(file.size)} · APK Package</p>
            </div>
            <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              Ready to obfuscate
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className={`flex items-center justify-center w-16 h-16 rounded-2xl border transition-all duration-300
              ${dragging ? 'bg-violet-500/30 border-violet-400' : 'bg-white/5 border-white/10 group-hover:bg-violet-500/10 group-hover:border-violet-500/40'}`}>
              <svg className={`w-8 h-8 transition-colors ${dragging ? 'text-violet-300' : 'text-slate-400 group-hover:text-violet-400'}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-base">
                {dragging ? 'Drop your APK here' : 'Drop APK or click to browse'}
              </p>
              <p className="text-slate-500 text-sm mt-1">Supports .apk files up to any size</p>
            </div>
            <div className="flex gap-2">
              {['DEX', 'Resources', 'Manifest', 'Signing'].map((tag) => (
                <span key={tag} className="text-xs text-slate-500 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </label>
    </div>
  );
}

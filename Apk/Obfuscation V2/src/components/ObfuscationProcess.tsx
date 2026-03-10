import { useState, useEffect } from 'react';
import { Loader2, CheckCircle, AlertCircle, Download, Shield } from 'lucide-react';

interface ObfuscationProcessProps {
  isProcessing: boolean;
  progress: number;
  onStartObfuscation: () => void;
  onDownload: () => void;
}

export function ObfuscationProcess({
  isProcessing,
  progress,
  onStartObfuscation,
  onDownload,
}: ObfuscationProcessProps) {
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (progress >= 100 && isProcessing) {
      setTimeout(() => {
        setCompleted(true);
      }, 500);
    }
  }, [progress, isProcessing]);

  const getProgressColor = () => {
    if (error) return 'bg-red-500';
    if (completed) return 'bg-green-500';
    return 'bg-gradient-to-r from-indigo-500 to-violet-500';
  };

  const getStatusText = () => {
    if (error) return 'Obfuscation Failed';
    if (completed) return 'Obfuscation Complete';
    if (isProcessing) return 'Processing APK...';
    return 'Ready to Obfuscate';
  };

  const getStatusIcon = () => {
    if (error) return <AlertCircle className="h-6 w-6 text-red-500" />;
    if (completed) return <CheckCircle className="h-6 w-6 text-green-500" />;
    if (isProcessing) return <Loader2 className="h-6 w-6 text-indigo-500 animate-spin" />;
    return <Shield className="h-6 w-6 text-gray-400" />;
  };

  const simulateObfuscation = () => {
    setError(null);
    setCompleted(false);
    onStartObfuscation();
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-white p-8 shadow-lg">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon()}
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{getStatusText()}</h3>
                <p className="text-sm text-gray-500">
                  {error 
                    ? 'An error occurred during obfuscation'
                    : completed
                    ? 'Your APK has been successfully obfuscated'
                    : isProcessing
                    ? 'Applying security layers to your APK'
                    : 'Click start to begin obfuscation process'}
                </p>
              </div>
            </div>
            {completed && (
              <div className="rounded-full bg-green-100 px-3 py-1">
                <span className="text-sm font-medium text-green-800">SECURED</span>
              </div>
            )}
          </div>

          {!error && (
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${getProgressColor()}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-xl bg-red-50 p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-800">Error Details</h4>
                  <p className="mt-1 text-sm text-red-600">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-blue-100 p-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Security Level</p>
                  <p className="font-semibold text-gray-900">Maximum</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-green-100 p-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Protection</p>
                  <p className="font-semibold text-gray-900">Multi-layer</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-purple-100 p-2">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Algorithm</p>
                  <p className="font-semibold text-gray-900">AES-256 + RSA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        {!isProcessing && !completed && (
          <button
            onClick={simulateObfuscation}
            className="flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:from-indigo-700 hover:to-violet-700 hover:shadow-xl disabled:opacity-50"
          >
            Start Obfuscation Process
          </button>
        )}

        {completed && (
          <button
            onClick={onDownload}
            className="flex items-center justify-center space-x-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-4 font-semibold text-white shadow-lg shadow-green-200 transition-all hover:from-green-700 hover:to-emerald-700 hover:shadow-xl"
          >
            <Download className="h-5 w-5" />
            <span>Download Obfuscated APK</span>
          </button>
        )}

        {isProcessing && (
          <button
            disabled
            className="flex-1 cursor-not-allowed rounded-xl bg-gradient-to-r from-gray-400 to-gray-500 px-8 py-4 font-semibold text-white opacity-70"
          >
            <div className="flex items-center justify-center space-x-3">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Processing...</span>
            </div>
          </button>
        )}
      </div>

      {completed && (
        <div className="rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 p-5">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Obfuscation Successful!</h4>
              <ul className="mt-2 space-y-2 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-green-500" />
                  <span>All security layers applied successfully</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-green-500" />
                  <span>Code obfuscation prevents reverse engineering</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-green-500" />
                  <span>String encryption protects sensitive data</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-green-500" />
                  <span>Resource protection enabled</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
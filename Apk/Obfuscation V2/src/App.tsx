import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { ObfuscationOptions } from './components/ObfuscationOptions';
import { ObfuscationProcess } from './components/ObfuscationProcess';
import { StatsPanel } from './components/StatsPanel';
import { Shield, Lock, Code, Key, EyeOff, Layers } from 'lucide-react';

interface ObfuscationOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  strength: 'low' | 'medium' | 'high';
}

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [obfuscatedCount, setObfuscatedCount] = useState(1428);
  const [protectionLevel, setProtectionLevel] = useState(95);
  const [processingTime, setProcessingTime] = useState(45);

  const [obfuscationOptions, setObfuscationOptions] = useState<ObfuscationOption[]>([
    {
      id: 'string-encryption',
      name: 'String Encryption',
      description: 'Encrypts all string literals in the code',
      icon: <Lock className="h-5 w-5 text-indigo-600" />,
      enabled: true,
      strength: 'high',
    },
    {
      id: 'control-flow',
      name: 'Control Flow Obfuscation',
      description: 'Modifies program flow to prevent analysis',
      icon: <Code className="h-5 w-5 text-blue-600" />,
      enabled: true,
      strength: 'high',
    },
    {
      id: 'resource-protection',
      name: 'Resource Protection',
      description: 'Encrypts and protects app resources',
      icon: <Shield className="h-5 w-5 text-green-600" />,
      enabled: true,
      strength: 'medium',
    },
    {
      id: 'native-code',
      name: 'Native Code Obfuscation',
      description: 'Protects native libraries and binaries',
      icon: <Layers className="h-5 w-5 text-purple-600" />,
      enabled: true,
      strength: 'high',
    },
    {
      id: 'anti-debug',
      name: 'Anti-Debug Protection',
      description: 'Prevents debugging and dynamic analysis',
      icon: <EyeOff className="h-5 w-5 text-red-600" />,
      enabled: true,
      strength: 'high',
    },
    {
      id: 'api-hiding',
      name: 'API Hiding',
      description: 'Hides sensitive API calls from analysis',
      icon: <Key className="h-5 w-5 text-yellow-600" />,
      enabled: true,
      strength: 'medium',
    },
  ]);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    if (!file) {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const handleToggleOption = (id: string) => {
    setObfuscationOptions(options =>
      options.map(option =>
        option.id === id ? { ...option, enabled: !option.enabled } : option
      )
    );
  };

  const handleStartObfuscation = () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setObfuscatedCount(prev => prev + 1);
          setProcessingTime(Math.floor(Math.random() * 20) + 30);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 200);
  };

  const handleDownload = () => {
    if (!selectedFile) return;
    
    const blob = new Blob(['Simulated obfuscated APK content'], { type: 'application/vnd.android.package-archive' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `obfuscated_${selectedFile.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const enabledOptions = obfuscationOptions.filter(opt => opt.enabled).length;
    const totalOptions = obfuscationOptions.length;
    const newLevel = Math.round((enabledOptions / totalOptions) * 100);
    setProtectionLevel(newLevel);
  }, [obfuscationOptions]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-100 to-violet-100 px-4 py-2 mb-4">
            <span className="text-sm font-medium text-indigo-700">SECURE YOUR APPS</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Advanced APK Obfuscation
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Protect your Android applications with multi-layer obfuscation, encryption, 
            and anti-tampering technologies. Keep your code safe from reverse engineering.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Upload APK File</h2>
              <FileUpload 
                onFileSelect={handleFileSelect} 
                selectedFile={selectedFile} 
              />
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <ObfuscationOptions 
                options={obfuscationOptions}
                onToggleOption={handleToggleOption}
              />
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <ObfuscationProcess
                isProcessing={isProcessing}
                progress={progress}
                onStartObfuscation={handleStartObfuscation}
                onDownload={handleDownload}
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <StatsPanel
                obfuscatedCount={obfuscatedCount}
                protectionLevel={protectionLevel}
                processingTime={processingTime}
              />
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-6 text-white shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="rounded-lg bg-white/20 p-2">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">Why Choose LX?</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    'Military-grade encryption algorithms',
                    'Multi-layer obfuscation techniques',
                    'Real-time protection monitoring',
                    'Zero performance impact',
                    '24/7 security updates',
                    'Enterprise-grade security',
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-white" />
                      <span className="text-sm opacity-90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 p-6 shadow-lg">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Security Tips</h3>
                <div className="space-y-3">
                  {[
                    'Always enable all obfuscation options for maximum protection',
                    'Keep your obfuscation tools updated',
                    'Test obfuscated APKs thoroughly before release',
                    'Use code signing certificates',
                    'Implement runtime protection checks',
                    'Monitor for suspicious activity',
                  ].map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                      <span className="text-sm text-gray-600">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-2xl bg-gradient-to-r from-slate-900 to-gray-900 p-8 text-white">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-xl font-bold">Enterprise Features</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Custom obfuscation rules</li>
                <li>• Batch processing</li>
                <li>• API integration</li>
                <li>• Priority support</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-bold">Supported Technologies</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Java/Kotlin applications</li>
                <li>• Native libraries (C/C++)</li>
                <li>• React Native apps</li>
                <li>• Flutter applications</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-bold">Compliance</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• GDPR compliant</li>
                <li>• ISO 27001 certified</li>
                <li>• SOC 2 Type II</li>
                <li>• HIPAA ready</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-12 border-t border-gray-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 p-2">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">LX APK Obfuscator</h2>
                <p className="text-sm text-gray-500">© 2024 All rights reserved</p>
              </div>
            </div>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Terms of Service</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Contact</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Documentation</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
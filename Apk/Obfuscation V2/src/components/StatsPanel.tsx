import { Shield, Lock, Code, Cpu } from 'lucide-react';

interface StatsPanelProps {
  obfuscatedCount: number;
  protectionLevel: number;
  processingTime: number;
}

export function StatsPanel({ obfuscatedCount, protectionLevel, processingTime }: StatsPanelProps) {
  const stats = [
    {
      icon: <Shield className="h-6 w-6 text-indigo-600" />,
      label: 'APKs Obfuscated',
      value: obfuscatedCount.toLocaleString(),
      color: 'from-indigo-500 to-violet-500',
      bgColor: 'bg-indigo-50',
    },
    {
      icon: <Lock className="h-6 w-6 text-green-600" />,
      label: 'Protection Level',
      value: `${protectionLevel}%`,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
    },
    {
      icon: <Code className="h-6 w-6 text-blue-600" />,
      label: 'Code Layers',
      value: '7',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: <Cpu className="h-6 w-6 text-purple-600" />,
      label: 'Avg. Processing',
      value: `${processingTime}s`,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 p-2">
          <Cpu className="h-6 w-6 text-gray-700" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Statistics</h3>
          <p className="text-sm text-gray-500">Real-time obfuscation metrics</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white"
          >
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                  {stat.icon}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${stat.color}`}
                    style={{
                      width: index === 0 ? '85%' : 
                             index === 1 ? `${protectionLevel}%` : 
                             index === 2 ? '100%' : '75%'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 p-5">
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Security Features Applied</h4>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              'String Encryption',
              'Control Flow Obfuscation',
              'Resource Protection',
              'Native Code',
              'Anti-Debug',
              'Anti-Tamper',
              'Code Virtualization',
              'API Hiding',
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 rounded-lg bg-white px-3 py-2 shadow-sm"
              >
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
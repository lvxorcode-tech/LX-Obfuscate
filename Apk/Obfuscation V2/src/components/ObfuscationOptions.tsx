import React from 'react';
import { Shield } from 'lucide-react';

interface ObfuscationOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  strength: 'low' | 'medium' | 'high';
}

interface ObfuscationOptionsProps {
  options: ObfuscationOption[];
  onToggleOption: (id: string) => void;
}

export function ObfuscationOptions({ options, onToggleOption }: ObfuscationOptionsProps) {
  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="rounded-lg bg-gradient-to-r from-indigo-100 to-violet-100 p-2">
          <Shield className="h-6 w-6 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Obfuscation Settings</h3>
          <p className="text-sm text-gray-500">Customize the protection level for your APK</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {options.map((option) => (
          <div
            key={option.id}
            className={`rounded-xl border p-5 transition-all ${
              option.enabled
                ? 'border-indigo-300 bg-gradient-to-r from-indigo-50 to-white shadow-sm'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className={`rounded-lg p-2 ${
                  option.enabled ? 'bg-indigo-100' : 'bg-gray-100'
                }`}>
                  {option.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">{option.name}</h4>
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStrengthColor(option.strength)}`}>
                      {option.strength.toUpperCase()}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{option.description}</p>
                </div>
              </div>
              <button
                onClick={() => onToggleOption(option.id)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  option.enabled ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    option.enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-5">
        <div className="flex items-start space-x-3">
          <div className="rounded-lg bg-blue-100 p-2">
            <Shield className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Security Recommendations</h4>
            <ul className="mt-2 space-y-2 text-sm text-gray-600">
              <li className="flex items-start space-x-2">
                <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-blue-500" />
                <span>Enable all options for maximum protection</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-blue-500" />
                <span>String encryption prevents reverse engineering</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-blue-500" />
                <span>Control flow obfuscation makes decompilation difficult</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
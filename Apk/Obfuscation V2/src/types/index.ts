export interface ObfuscationOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  strength: 'low' | 'medium' | 'high';
}

export interface ObfuscationStats {
  obfuscatedCount: number;
  protectionLevel: number;
  processingTime: number;
}

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}
/**
 * Obfuscation utility functions
 */

// Simulate obfuscation process
export const simulateObfuscation = async (
  file: File,
  options: { [key: string]: boolean }
): Promise<{
  success: boolean;
  downloadUrl?: string;
  error?: string;
  stats: {
    processingTime: number;
    sizeIncrease: number;
    protectionLevel: number;
  };
}> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const enabledOptions = Object.values(options).filter(Boolean).length;
  const totalOptions = Object.keys(options).length;
  const protectionLevel = Math.round((enabledOptions / totalOptions) * 100);

  // Generate simulated results
  return {
    success: true,
    downloadUrl: URL.createObjectURL(
      new Blob([`Obfuscated version of ${file.name}`], {
        type: 'application/vnd.android.package-archive',
      })
    ),
    stats: {
      processingTime: Math.floor(Math.random() * 30) + 20, // 20-50 seconds
      sizeIncrease: Math.floor(Math.random() * 15) + 5, // 5-20% increase
      protectionLevel,
    },
  };
};

// Calculate protection level based on enabled options
export const calculateProtectionLevel = (options: { [key: string]: boolean }): number => {
  const enabledOptions = Object.values(options).filter(Boolean).length;
  const totalOptions = Object.keys(options).length;
  return Math.round((enabledOptions / totalOptions) * 100);
};

// Format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Validate APK file
export const validateAPKFile = (file: File): { valid: boolean; error?: string } => {
  // Check file extension
  if (!file.name.toLowerCase().endsWith('.apk')) {
    return { valid: false, error: 'File must be an APK file (.apk)' };
  }

  // Check file size (max 100MB)
  const maxSize = 100 * 1024 * 1024; // 100MB in bytes
  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 100MB' };
  }

  // Check MIME type if available
  if (file.type && file.type !== 'application/vnd.android.package-archive') {
    return { valid: false, error: 'Invalid file type' };
  }

  return { valid: true };
};

// Generate security report
export const generateSecurityReport = (options: { [key: string]: boolean }) => {
  const enabledOptions = Object.values(options).filter(Boolean).length;
  const totalOptions = Object.keys(options).length;
  const percentage = (enabledOptions / totalOptions) * 100;

  let securityLevel = 'Low';
  if (percentage >= 80) securityLevel = 'High';
  else if (percentage >= 50) securityLevel = 'Medium';

  const recommendations = [];

  if (!options['string-encryption']) {
    recommendations.push('Enable string encryption to protect sensitive data');
  }
  if (!options['control-flow']) {
    recommendations.push('Enable control flow obfuscation to prevent reverse engineering');
  }
  if (!options['anti-debug']) {
    recommendations.push('Enable anti-debug protection to prevent dynamic analysis');
  }

  return {
    securityLevel,
    score: Math.round(percentage),
    enabledOptions,
    totalOptions,
    recommendations,
  };
};

// Default obfuscation options
export const defaultObfuscationOptions = {
  'string-encryption': true,
  'control-flow': true,
  'resource-protection': true,
  'native-code': true,
  'anti-debug': true,
  'api-hiding': true,
};
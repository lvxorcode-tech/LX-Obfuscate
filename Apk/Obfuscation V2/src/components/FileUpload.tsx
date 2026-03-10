import React, { useCallback, useState } from 'react';
import { Upload, File, Shield, X } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

export function FileUpload({ onFileSelect, selectedFile }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].name.endsWith('.apk')) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && files[0].name.endsWith('.apk')) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  const removeFile = useCallback(() => {
    onFileSelect(null as any);
  }, [onFileSelect]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      <div
        className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 ${
          isDragging
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
        } ${selectedFile ? 'p-6' : 'p-12'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {selectedFile ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center space-x-4">
              <div className="rounded-xl bg-indigo-100 p-3">
                <File className="h-8 w-8 text-indigo-600" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-900">{selectedFile.name}</h3>
                <p className="text-sm text-gray-500">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
              <button
                onClick={removeFile}
                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center space-x-2 text-sm text-indigo-600">
              <Shield className="h-4 w-4" />
              <span>APK file ready for obfuscation</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 p-6">
              <Upload className="h-12 w-12 text-indigo-600" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">
                Upload your APK file
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Drag and drop your APK file here, or click to browse
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Supports .apk files up to 100MB
              </p>
            </div>
            <label className="cursor-pointer rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 font-medium text-white shadow-lg shadow-indigo-200 transition-all hover:from-indigo-700 hover:to-violet-700 hover:shadow-xl">
              <span>Browse Files</span>
              <input
                type="file"
                className="hidden"
                accept=".apk"
                onChange={handleFileInput}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
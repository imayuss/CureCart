'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function PrescriptionUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload-prescription', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload');
      }

      setResult({ success: true, analysis: data.analysis });
    } catch (error: any) {
      setResult({ success: false, error: error.message });
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <h3 className="text-lg font-black text-gray-900 mb-2 flex items-center gap-2">
          <span className="text-xl">📋</span> Upload Prescription
        </h3>
        <p className="text-sm text-gray-600 font-medium mb-6">
          Some medicines require a valid doctor&apos;s prescription. Our AI will verify it instantly.
        </p>

        <div 
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
            dragActive ? 'border-blue-500 bg-blue-50/50 scale-[1.02]' : file ? 'border-emerald-300 bg-emerald-50/30' : 'border-gray-300/50 bg-white/50 hover:border-blue-300 hover:bg-blue-50/30'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById('prescriptionFile')?.click()}
        >
          <input 
            id="prescriptionFile"
            type="file" 
            accept="image/*" 
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />
          {file ? (
            <div className="space-y-2">
              <span className="text-3xl">✅</span>
              <p className="text-sm font-bold text-emerald-700">{file.name}</p>
              <p className="text-xs text-gray-500">Click to change file</p>
            </div>
          ) : (
            <div className="space-y-2">
              <span className="text-3xl">📄</span>
              <p className="text-sm font-semibold text-gray-700">Drop your prescription here</p>
              <p className="text-xs text-gray-400">or click to browse files</p>
            </div>
          )}
        </div>
        
        {file && (
          <Button 
            onClick={handleUpload} 
            disabled={uploading}
            className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all border-0"
          >
            {uploading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Verifying with AI...
              </span>
            ) : 'Verify Prescription with AI'}
          </Button>
        )}

        {result && (
          <div className={`mt-6 p-5 rounded-2xl text-sm font-medium ${result.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-red-50 text-red-800 border border-red-100'}`}>
            {result.success ? (
              <div className="space-y-1">
                <p className="font-bold flex items-center gap-2">✅ Prescription Verified!</p>
                <p>Doctor: {result.analysis.doctorName}</p>
                <p>Medicines detected: {result.analysis.extractedMedicines.join(", ")}</p>
              </div>
            ) : (
              <p className="font-bold flex items-center gap-2">❌ Verification Failed: {result.error}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

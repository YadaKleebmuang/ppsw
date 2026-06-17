'use client';

import { Mail, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

export function CopyEmailIcon({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success('คัดลอกอีเมลเรียบร้อยแล้ว');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy} 
      className="p-2 text-gray-500 hover:text-black transition-colors bg-white rounded-full border shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center"
      title="Copy Email"
    >
      {copied ? <Check className="w-5 h-5 text-green-500" /> : <Mail className="w-5 h-5" />}
    </button>
  );
}

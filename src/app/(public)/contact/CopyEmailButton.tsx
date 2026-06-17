'use client';

import { Mail, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

export function CopyEmailButton({ email }: { email: string }) {
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
      className="w-full text-left group flex items-center p-6 bg-white border rounded-2xl shadow-sm hover:shadow-md transition-all hover:border-black cursor-pointer"
    >
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors shrink-0">
        {copied ? <Check className="w-5 h-5 text-green-500 group-hover:text-white" /> : <Mail className="w-5 h-5" />}
      </div>
      <div className="ml-6 flex-1 flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Email</h3>
          <p className="text-lg font-semibold text-gray-900">{email}</p>
        </div>
        {copied && <span className="text-sm font-medium text-green-600">คัดลอกแล้ว</span>}
      </div>
    </button>
  );
}

'use client';

import { Mail, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function CopyEmailActionButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success('คัดลอกอีเมลเรียบร้อยแล้ว');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button 
      size="lg" 
      onClick={handleCopy}
      className="rounded-full px-8 bg-white text-black hover:bg-gray-100 w-full sm:w-auto font-bold h-12 transition-all"
    >
      {copied ? 'คัดลอกอีเมลแล้ว' : 'คัดลอก Email'} 
      {copied ? <Check className="ml-2 w-4 h-4 text-green-600" /> : <Mail className="ml-2 w-4 h-4" />}
    </Button>
  );
}

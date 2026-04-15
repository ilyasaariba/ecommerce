'use client';

import { ShieldCheck, Truck, Clock } from 'lucide-react';

export default function TrustBar() {
  return (
    <div className="flex items-center justify-between bg-pearl border-y border-palerose py-3 px-4 my-2">
      <div className="flex flex-col items-center gap-1 w-1/3 text-center border-l border-palerose">
        <Truck size={20} className="text-roseblush" />
        <span className="text-[10px] font-bold text-charcoal leading-tight">توصيل<br/>مجاني</span>
      </div>
      <div className="flex flex-col items-center gap-1 w-1/3 text-center border-l border-palerose">
        <ShieldCheck size={20} className="text-roseblush" />
        <span className="text-[10px] font-bold text-charcoal leading-tight">ضمان<br/>الجودة</span>
      </div>
      <div className="flex flex-col items-center gap-1 w-1/3 text-center">
        <Clock size={20} className="text-roseblush" />
        <span className="text-[10px] font-bold text-charcoal leading-tight">الدفع عند<br/>الاستلام</span>
      </div>
    </div>
  );
}

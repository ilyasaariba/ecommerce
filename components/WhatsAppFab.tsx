'use client';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFab({ phoneNumber }: { phoneNumber: string }) {
  const handleClick = () => {
    console.log('[Snap Pixel] Fired WHATSAPP_CLICK event via trigger mapped from dashboard contacts');
    window.open(`https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`, '_blank');
  };

  return (
    <button 
      onClick={handleClick}
      className="fixed bottom-4 right-4 bg-whatsapp text-white p-4 rounded-full shadow-xl shadow-whatsapp/30 hover:scale-110 active:scale-95 transition-all z-50 flex items-center justify-center animate-bounce"
      style={{ animationDuration: '3s' }}
      aria-label="تواصل معنا عبر واتساب"
    >
      <MessageCircle size={28} />
    </button>
  );
}

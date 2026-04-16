'use client';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function ConversionForm({ price, oldPrice }: { price: number, oldPrice: number | null }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Native basic validation
    if (formData.phone.length < 8) {
      setError('المرجوا إدخال رقم هاتف صحيح');
      setLoading(false);
      return;
    }

    const { error: insertErr } = await supabase.from('leads').insert([
      {
        name: formData.name,
        phone_number: formData.phone,
        city: formData.city,
        status: 'new'
      }
    ]);

    if (insertErr) {
      console.error(insertErr);
      setError(`خطأ: ${insertErr.message || insertErr.details || 'يرجى المحاولة مرة أخرى أو مراسلتنا عبر الواتساب'}`);
    } else {
      // Format Phone Number strictly to Snapchat Standards (212...)
      let formattedPhone = formData.phone.trim();
      if (formattedPhone.startsWith('0')) {
        formattedPhone = '212' + formattedPhone.substring(1);
      } else if (!formattedPhone.startsWith('212')) {
        formattedPhone = '212' + formattedPhone;
      }

      // Fire the critical PURCHASE Pixel Event
      if (typeof window !== 'undefined' && (window as any).snaptr) {
        (window as any).snaptr('track', 'PURCHASE', {
          price: price,
          currency: 'MAD',
          user_phone_number: formattedPhone,
          firstname: formData.name,
          geo_city: formData.city
        });
      }

      setSuccess(true);
      setFormData({ name: '', phone: '', city: '' });
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="bg-whatsapp/10 border-2 border-whatsapp p-8 rounded-xl text-center shadow-lg transform transition-all duration-500 scale-100">
        <h3 className="text-2xl font-bold text-whatsapp mb-3">شكراً لكِ! تم التوصل بطلبك بنجاح 🎉</h3>
        <p className="text-charcoal text-base font-medium">فريقنا سيقوم بالاتصال بك في أقرب وقت لتأكيد طلبيتك.</p>
        <p className="text-whatsapp font-bold text-sm mt-6 bg-white py-2 rounded-lg inline-block px-4">الدفع يكون عند الاستلام فقط 📦</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-2xl border-2 border-roseblush shadow-[0_0_15px_rgba(212,131,143,0.15)] relative overflow-hidden">
      {/* Top Banner inside form purely for conversion psychology */}
      <div className="absolute top-0 left-0 right-0 bg-roseblush text-white text-center py-1 text-xs font-bold tracking-wide">
        عرض خاص: الدفع عند الاستلام 📦
      </div>

      <h2 className="text-xl font-bold text-charcoal text-center mt-6 mb-2">أدخل معلوماتك للطلب</h2>
      <p className="text-xs text-center text-slate mb-4">لن تدفع أي شيء حتى تتوصل بالمنتج</p>
      
      <div className="flex items-center justify-center gap-2 mb-6">
        <span className="text-2xl font-extrabold text-roseblush">{price} د.م</span>
        {oldPrice && (
          <span className="text-sm text-slate line-through decoration-softcrimson">{oldPrice} د.م</span>
        )}
      </div>

      {error && <div className="text-white bg-softcrimson text-sm text-center p-2 rounded-lg mb-4 font-bold">{error}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <input 
            required 
            type="text" 
            placeholder="الاسم الكامل"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full bg-pearl border border-palerose p-4 rounded-xl text-charcoal focus:outline-none focus:border-roseblush focus:ring-1 focus:ring-roseblush transition"
          />
        </div>
        <div>
          <input 
            required 
            type="tel" 
            dir="rtl"
            placeholder="رقم الهاتف (مثال: 0612345678)"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full bg-pearl border border-palerose p-4 rounded-xl text-charcoal focus:outline-none focus:border-roseblush focus:ring-1 focus:ring-roseblush transition"
          />
        </div>
        <div>
          <input 
            required 
            type="text" 
            placeholder="المدينة"
            value={formData.city}
            onChange={(e) => setFormData({...formData, city: e.target.value})}
            className="w-full bg-pearl border border-palerose p-4 rounded-xl text-charcoal focus:outline-none focus:border-roseblush focus:ring-1 focus:ring-roseblush transition"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-roseblush hover:bg-softcrimson text-white text-lg font-bold py-4 rounded-xl shadow-lg mt-2 transition-all disabled:opacity-70 flex justify-center items-center"
        >
          {loading ? 'جاري التأكيد...' : 'تأكيد الطلب للتوصل به'}
        </button>
      </form>
    </div>
  );
}

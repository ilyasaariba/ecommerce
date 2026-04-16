import { supabase } from '../lib/supabase';
import HeroSection from '../components/HeroSection';
import TrustBar from '../components/TrustBar';
import ProductDetails from '../components/ProductDetails';
import SocialProofReviews from '../components/SocialProofReviews';
import ConversionForm from '../components/ConversionForm';
import WhatsAppFab from '../components/WhatsAppFab';
import SnapPixel from '../components/SnapPixel';

export const revalidate = 0; // Ensure data is always dynamically fresh from Supabase

export default async function LandingPage() {
  const { data: pageData } = await supabase.from('page').select('*').limit(1).single();
  const { data: contactData } = await supabase.from('contacts').select('*').limit(1).single();

  if (!pageData || !contactData) {
    return <div className="min-h-screen flex items-center justify-center p-8 text-center text-roseblush font-bold">جاري تحميل المتجر...</div>;
  }

  return (
    <main className="max-w-md mx-auto min-h-screen bg-white relative shadow-2xl pb-24 overflow-x-hidden">
      <SnapPixel price={pageData.price} />
      
      {/* Announcement Bar */}
      <div className="bg-roseblush text-white text-center py-1.5 text-xs font-bold tracking-wide">
        عرض حصري - الكمية محدودة جداً!
      </div>

      <HeroSection 
        mainImage={pageData.main_image_url} 
        sideImages={pageData.side_images} 
        title={pageData.product_title}
        price={pageData.price}
        oldPrice={pageData.old_price}
        stock={pageData.stock_left}
      />
      
      <TrustBar />

      <div className="px-4">
        <ProductDetails 
          shortDesc={pageData.product_short_description} 
          fullDesc={pageData.product_full_description} 
        />
        
        {/* Dynamic Target to snap to the order form */}
        <div id="order-form" className="mt-8 pt-6 border-t border-palerose">
          <ConversionForm price={pageData.price} oldPrice={pageData.old_price} />
        </div>

        <SocialProofReviews reviews={pageData.reviews} />
      </div>
      
      {/* Site Footer */}
      <footer className="mt-12 py-8 bg-pearl border-t border-palerose flex flex-col items-center justify-center">
        <p className="text-sm font-bold text-charcoal mb-1">تسوق الآن</p>
        <p className="text-xs text-slate">{contactData.email}</p>
        <p className="text-[10px] text-slate/60 mt-4">&copy; {new Date().getFullYear()} كافة الحقوق محفوظة</p>
      </footer>

      <WhatsAppFab phoneNumber={contactData.phone_number} />
    </main>
  );
}

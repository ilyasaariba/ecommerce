'use client';

type Props = {
  mainImage: string;
  sideImages: string[];
  title: string;
  price: number;
  oldPrice: number | null;
  stock: number;
};

export default function HeroSection({ mainImage, sideImages, title, price, oldPrice, stock }: Props) {
  const images = mainImage ? [mainImage, ...sideImages] : sideImages;

  const scrollToForm = () => {
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-white">
      {/* Mobile-optimized Horizontal Scrolling Image Gallery */}
      <div className="w-full h-96 bg-pearl overflow-x-auto snap-x snap-mandatory flex scrollbar-hide">
        {images.length > 0 ? images.map((img, i) => (
           // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={img} alt="Product" className="w-full h-full object-cover snap-center flex-shrink-0" />
        )) : (
          <div className="w-full h-full flex items-center justify-center text-slate">لا توجد صور</div>
        )}
      </div>

      <div className="p-4">
        {/* Urgency Badge */}
        {stock > 0 && stock <= 50 && (
          <div className="inline-flex bg-softcrimson/10 text-softcrimson text-xs font-bold px-2 py-1 rounded mb-2 w-fit">
            انتبه: تبقّى {stock} قطع فقط في المخزن!
          </div>
        )}

        <h1 className="text-2xl font-bold text-charcoal leading-snug mb-2">{title}</h1>
        
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl font-extrabold text-roseblush">{price} د.م</span>
          {oldPrice && (
            <span className="text-lg text-slate line-through decoration-softcrimson">{oldPrice} د.م</span>
          )}
        </div>

        <button 
          onClick={scrollToForm}
          className="w-full bg-roseblush text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-roseblush/30 hover:scale-[1.02] active:scale-[0.98] transition-transform animate-pulse"
        >
          أطلب الآن - الدفع عند الاستلام
        </button>
      </div>
    </section>
  );
}

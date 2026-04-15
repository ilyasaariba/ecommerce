import { Star } from 'lucide-react';

type Review = {
  reviewer_name: string;
  rating: number;
  comment: string;
};

export default function SocialProofReviews({ reviews }: { reviews: Review[] }) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="py-6 border-t border-palerose mt-4">
      <h2 className="text-xl font-bold text-charcoal mb-4">آراء زبنائنا</h2>
      <div className="flex flex-col gap-4">
        {reviews.map((r, i) => (
          <div key={i} className="bg-pearl p-4 rounded-xl border border-palerose shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-charcoal text-sm">{r.reviewer_name}</span>
              <div className="flex gap-1" dir="ltr">
                {[...Array(5)].map((_, idx) => (
                  <Star 
                    key={idx} 
                    size={14} 
                    className={idx < r.rating ? 'fill-[#FFD700] text-[#FFD700]' : 'fill-palerose text-palerose'} 
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-slate leading-relaxed">&quot;{r.comment}&quot;</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ProductDetails({ shortDesc, fullDesc }: { shortDesc: string, fullDesc: string | null }) {
  return (
    <section className="py-4">
      <h2 className="text-xl font-bold text-charcoal mb-3">لماذا هذا المنتج؟</h2>
      <p className="text-charcoal leading-relaxed whitespace-pre-line mb-4 font-medium">
        {shortDesc}
      </p>
      
      {fullDesc && (
        <div className="mt-4 p-4 bg-bg-pearl rounded-xl text-sm leading-relaxed text-charcoal whitespace-pre-line border border-palerose">
          {fullDesc}
        </div>
      )}
    </section>
  );
}

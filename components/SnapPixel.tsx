'use client';

import { useEffect } from 'react';

// Specialized Snapchat Pixel interceptor
export default function SnapPixel({ price }: { price?: number }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).snaptr) {
      // 1. Always fire PAGE_VIEW when page initializes
      (window as any).snaptr('track', 'PAGE_VIEW');
      
      // 2. Fire VIEW_CONTENT if price is provided
      if (price) {
        (window as any).snaptr('track', 'VIEW_CONTENT', {
          price: price,
          currency: 'MAD'
        });
      }
    }
  }, [price]);

  return null;
}

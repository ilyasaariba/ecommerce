import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const cairo = Cairo({ subsets: ['arabic', 'latin'], weight: ['400', '600', '700'] });

export const metadata: Metadata = {
  title: 'تسوق الآن | عرض حصري', // "Shop Now | Exclusive Offer"
  description: 'اكتشفي منتجاتنا عالية الجودة - دائمًا الدفع عند الاستلام',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
            {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
            a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
            r.src=n;var u=t.getElementsByTagName(s)[0];
            u.parentNode.insertBefore(r,u);})(window,document,
            'https://sc-static.net/scevent.min.js');

            snaptr('init', '10c92a42-e8cf-439f-8ce7-c53f04b1d5a1');
          `
        }} />
      </head>
      <body className={`${cairo.className} bg-pearl text-charcoal antialiased scroll-smooth`}>
        {children}
      </body>
    </html>
  );
}

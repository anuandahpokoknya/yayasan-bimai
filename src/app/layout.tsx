import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, Amiri } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWA from "@/components/FloatingWA";

export const metadata: Metadata = {
  metadataBase: new URL("https://bimaipeduli.id"),
  title: {
    default: "BIMAI Peduli - Yayasan Bina Masyarakat Indonesia",
    template: "%s | BIMAI Peduli",
  },
  description:
    "Portal Resmi Wakaf & Donasi Yayasan Bina Masyarakat Indonesia. Bersama memberdayakan masyarakat melalui program sosial, pendidikan, wakaf Al-Qur'an Braille, dan kemanusiaan berkelanjutan.",
  keywords: [
    "yayasan bimai",
    "bimai peduli",
    "wakaf quran braille",
    "donasi online",
    "sedekah subuh",
    "wakaf alquran",
    "yayasan yatim",
    "bina masyarakat indonesia",
    "pamulang tangerang selatan",
  ],
  authors: [{ name: "Yayasan Bina Masyarakat Indonesia" }],
  creator: "Yayasan BIMAI",
  publisher: "Yayasan BIMAI",
  alternates: {
    canonical: "https://bimaipeduli.id",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.webp",
    apple: "/logo.webp",
  },
  openGraph: {
    title: "BIMAI Peduli - Bergerak Bersama Memberdayakan Umat",
    description:
      "Satu langkah kecilmu hari ini bisa mengubah hidup banyak orang. Mari berdonasi dan berwakaf Al-Qur'an Braille bersama BIMAI Peduli.",
    url: "https://bimaipeduli.id",
    siteName: "BIMAI Peduli",
    images: [
      {
        url: "/logo.webp",
        width: 800,
        height: 600,
        alt: "Logo Resmi BIMAI Peduli",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BIMAI Peduli - Yayasan Bina Masyarakat Indonesia",
    description:
      "Bersama memberdayakan masyarakat melalui program sosial, pendidikan, wakaf Al-Qur'an Braille, dan kemanusiaan.",
    images: ["/logo.webp"],
  },
  verification: {
    other: {
      "facebook-domain-verification": ["a6lqDw0ssk019kyB53tjaqt11evhh7"],
    },
  },
};

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-amiri",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tiktokPixelId = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;

  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Meta Facebook Domain Verification */}
        <meta
          name="facebook-domain-verification"
          content="a6lqDw0ssk019kyB53tjaqt11evhh7"
        />

        {/* TikTok Pixel (Hanya aktif jika NEXT_PUBLIC_TIKTOK_PIXEL_ID dikonfigurasi) */}
        {tiktokPixelId && (
          <Script id="tiktok-pixel" strategy="afterInteractive">
            {`
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
                ttq.load('${tiktokPixelId}');
                ttq.page();
              }(window, document, 'ttq');
            `}
          </Script>
        )}

        {/* Meta Pixel (Facebook Ads) */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1023891886904648');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body
        className={`${jakarta.variable} ${playfair.variable} ${amiri.variable} font-sans bg-[var(--color-putih)] text-[var(--color-teks)] antialiased min-h-screen flex flex-col overflow-x-hidden`}
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-1 w-full max-w-full overflow-x-hidden">{children}</main>
        <FloatingWA />
        <Footer />
      </body>
    </html>
  );
}

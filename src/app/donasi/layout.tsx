import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formulir Donasi & Wakaf Online Resmi | BIMAI Peduli",
  description:
    "Salurkan infak, sedekah subuh, dan wakaf Al-Qur'an Braille secara aman dan langsung melalui portal resmi Yayasan Bina Masyarakat Indonesia.",
  openGraph: {
    title: "Formulir Donasi & Wakaf Online Resmi | BIMAI Peduli",
    description:
      "Mudah, cepat, dan terverifikasi. Pilih program kebaikan dan salurkan donasi Anda untuk keberdayaan ummat.",
  },
};

export default function DonasiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

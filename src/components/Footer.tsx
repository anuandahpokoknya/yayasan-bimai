import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/tentang" },
  { label: "Program", href: "/program" },
  { label: "Wakaf Braille", href: "/wakaf-quran-braille" },
  { label: "Galeri", href: "/galeri" },
  { label: "Transparansi", href: "/transparansi" },
  { label: "Panduan Bayar", href: "/tata-cara-pembayaran" },
  { label: "Kontak", href: "/kontak" },
];

const legalLinks = [
  { label: "Kebijakan Privasi", href: "/kebijakan-privasi" },
  { label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <section className="bg-[var(--color-hijau-tua)] text-white">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        {/* Grid Footer */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Kolom 1 - Logo & Deskripsi */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-white p-1 rounded">
                <Image
                  src="/logo.webp"
                  alt="Logo BIMAI Peduli"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold leading-tight text-lg">
                  BIMAI Peduli
                </span>
                <span className="text-[10px] text-[var(--color-emas)] tracking-widest uppercase font-semibold mt-0.5">
                  Yayasan Bina Masyarakat Indonesia
                </span>
              </div>
            </Link>

            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              Bersama memberdayakan masyarakat melalui program sosial,
              pendidikan, dan kemanusiaan yang berkelanjutan untuk membangun
              peradaban yang lebih baik.
            </p>

            <div className="flex flex-col gap-1 text-[11px] text-white/50 font-mono">
              <p>SK MENKUMHAM: AHU-0010921.AH.01.04.Tahun 2017</p>
              <p>SK KESBANGPOL: 220/845 - Kesbangpol / 2019</p>
            </div>

            {/* Media Sosial Resmi (Meta Cross-Verification) */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-white/60 font-semibold mr-1">Ikuti Kami:</span>
              <a
                href="https://facebook.com/bimaipeduli"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-[var(--color-emas)] hover:text-[var(--color-teks)] transition-all"
                aria-label="Facebook Page BIMAI Peduli"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://instagram.com/bimaipeduli"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-[var(--color-emas)] hover:text-[var(--color-teks)] transition-all"
                aria-label="Instagram BIMAI Peduli"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://wa.me/6288902047766"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-[#25D366] hover:text-white transition-all"
                aria-label="WhatsApp BIMAI Peduli"
              >
                <span className="text-xs font-bold">WA</span>
              </a>
            </div>

            <div className="mt-1 pl-4 border-l-2 border-[var(--color-emas)]/50">
              <p
                dir="rtl"
                className="font-arab text-xl text-[var(--color-emas)] leading-relaxed"
              >
                بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
              </p>
            </div>
          </div>

          {/* Kolom 2 - Navigasi */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <p className="text-xs font-bold text-white/50 tracking-[0.2em] uppercase">
              Navigasi
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-[var(--color-emas)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3 - Kontak & Legalitas */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <p className="text-xs font-bold text-white/50 tracking-[0.2em] uppercase">
              Kontak & Lokasi
            </p>
            <div className="flex flex-col gap-3 text-sm text-white/80 leading-relaxed">
              <p>
                Jalan Villa Pamulang Blok CF 1 No. 5, RT 011/RW 017, Pondok Benda, Pamulang, Tangerang Selatan, 15416
              </p>
              <p>Senin - Jumat, 08.00 - 17.00 WIB</p>
              <div className="flex flex-col gap-1 mt-1">
                <a
                  href="tel:+6288902047766"
                  className="text-[var(--color-emas)] hover:text-white transition-colors font-medium"
                >
                  Hotline / WA: +62 889-0204-7766
                </a>
                <a
                  href="mailto:info@bimaipeduli.id"
                  className="text-[var(--color-emas)] hover:text-white transition-colors font-medium"
                >
                  Email: info@bimaipeduli.id
                </a>
              </div>
            </div>

            {/* Legalitas Cepat */}
            <div className="pt-2">
              <p className="text-xs font-bold text-white/50 tracking-[0.2em] uppercase mb-2">
                Legal & Kebijakan
              </p>
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {legalLinks.map((legal) => (
                  <li key={legal.href}>
                    <Link
                      href={legal.href}
                      className="text-xs text-white/70 hover:text-[var(--color-emas)] transition-colors underline underline-offset-4"
                    >
                      {legal.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/kontak"
              className="inline-block mt-1 px-6 py-2.5 border border-[var(--color-emas)]/50 text-[var(--color-emas)] text-xs font-bold tracking-widest uppercase rounded hover:bg-[var(--color-emas)] hover:text-[var(--color-teks)] transition-all w-fit"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-3 text-xs text-white/50 text-center md:text-left">
            <p>
              &copy; {currentYear} Yayasan Bina Masyarakat Indonesia. Semua hak dilindungi.
            </p>
            <span className="hidden md:inline">•</span>
            <div className="flex items-center gap-3">
              <Link href="/kebijakan-privasi" className="hover:text-[var(--color-emas)] transition-colors">
                Kebijakan Privasi
              </Link>
              <span>•</span>
              <Link href="/syarat-ketentuan" className="hover:text-[var(--color-emas)] transition-colors">
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
          <p className="text-xs text-white/40 tracking-wider">bimaipeduli.id</p>
        </div>
      </div>
    </section>
  );
}

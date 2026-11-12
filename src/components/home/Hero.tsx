import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-[#fdfaf5] pt-20 pb-32 overflow-hidden">
      {/* Decorative Text background for uniqueness */}
      <div className="absolute top-0 left-10 text-[15rem] font-serif text-black/[0.02] select-none pointer-events-none leading-none -translate-y-1/2">
        BIMAI
      </div>

      <div className="max-w-6xl mx-auto px-6 relative flex flex-col md:flex-row items-center">
        {/* Left Side: Content with more dynamic spacing */}
        <div className="md:w-3/5 z-10 text-left mb-16 md:mb-0">
          <div className="inline-block px-3 py-1 bg-emas/10 border border-emas/20 mb-8">
            <span className="text-emas font-bold text-[10px] tracking-[0.3em] uppercase">
              Sejak 2017 • Yayasan Bina Masyarakat Indonesia
            </span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-teks leading-[0.9] mb-8">
            Nyalakan <br />
            <span className="text-hijau-tua">Harapan,</span> <br />
            Ubah Takdir.
          </h1>

          <p className="text-teks-sekunder text-lg md:text-xl leading-relaxed max-w-md mb-10 border-l-2 border-hijau-tua pl-6">
            Bukan sekadar bantuan, tapi pemberdayaan yang memutus rantai kemiskinan secara permanen dan bermartabat.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <Link
              href="/donasi"
              className="group relative inline-flex items-center justify-center px-10 py-4 bg-hijau-tua text-white font-bold tracking-widest uppercase text-xs overflow-hidden"
            >
              <span className="relative z-10">Donasi Sekarang</span>
              <div className="absolute inset-0 bg-emas translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
            <Link
              href="/program"
              className="inline-flex items-center text-xs font-bold tracking-widest uppercase text-teks hover:text-hijau-tua transition-colors"
            >
              Eksplorasi Program <span className="ml-3 text-lg">→</span>
            </Link>
          </div>
        </div>

        {/* Right Side: Overlapping Image Layout (Less "Template") */}
        <div className="md:w-2/5 relative flex justify-center md:justify-end">
          <div className="relative w-72 h-96 bg-gray-200 border border-black/5 z-20 overflow-hidden shadow-2xl rotate-2 translate-x-4">
             <Image 
                src="/images/impact-photo.jpg" 
                alt="Anak binaan memeluk Al-Qur'an" 
                fill 
                className="object-cover"
                priority
              />
          </div>
          <div className="absolute top-12 -left-12 w-64 h-80 bg-hijau-tua/10 border border-hijau-tua/20 z-10 overflow-hidden -rotate-3">
             <Image 
                src="/images/doa-bersama.webp" 
                alt="Doa bersama anak yatim binaan" 
                fill 
                className="object-cover opacity-80"
              />
          </div>
          
          {/* Subtle Stats box in a non-standard position */}
          <div className="absolute -bottom-10 -right-4 bg-white p-6 border border-gray-100 z-30 min-w-[200px]">
            <p className="text-4xl font-serif font-bold text-hijau-tua">5Rb+</p>
            <p className="text-[10px] uppercase tracking-widest text-teks-sekunder font-bold mt-1">
              Jiwa Telah Terbantu
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

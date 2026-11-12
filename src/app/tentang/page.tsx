import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Tentang Kami - BIMAI Peduli",
  description:
    "Mengenal lebih dekat Yayasan Bina Masyarakat Indonesia, visi, misi, dan dampak yang telah kami ciptakan.",
};

const misiList = [
  "Menyelenggarakan program pendidikan yang berkualitas bagi yatim dan dhuafa.",
  "Memberdayakan ekonomi masyarakat prasejahtera melalui bantuan modal dan pembinaan.",
  "Merespons cepat kebutuhan kemanusiaan dan tanggap darurat bencana alam.",
  "Menyediakan fasilitas kesehatan dan air bersih di daerah pelosok yang membutuhkan.",
];

export default function TentangPage() {
  return (
    <div className="bg-[#fdfaf5] min-h-screen">
      {/* Editorial Hero Header */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 text-[20rem] font-serif text-black/[0.02] select-none pointer-events-none leading-none translate-x-1/4 -translate-y-1/4">
          VISI
        </div>
        
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px w-12 bg-emas" />
              <p className="text-xs font-bold tracking-[0.4em] text-emas uppercase">Profil Yayasan</p>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-teks font-bold leading-[0.85] mb-10">
              Membangun <br /> <span className="text-hijau-tua">Martabat,</span> <br /> Memberdaya.
            </h1>
            <p className="text-teks-sekunder text-lg md:text-xl leading-relaxed max-w-lg border-l-2 border-hijau-tua pl-8">
              Lahir dari kepedulian mendalam terhadap ketimpangan sosial, BIMAI hadir bukan hanya untuk memberi ikan, tapi mengajarkan cara memancing di kolam kehidupan.
            </p>
          </div>
          
          <div className="md:w-1/2 relative">
             <div className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden shadow-2xl">
                <Image 
                  src="/images/program-rumah-belajar.jpg" 
                  alt="Kelas belajar Yayasan BIMAI" 
                  fill 
                  className="object-cover"
                />
             </div>
             <div className="absolute -bottom-10 -left-10 w-48 h-48 border border-emas hidden md:block" />
          </div>
        </div>
      </section>

      {/* Narrative Statistics */}
      <section className="bg-white py-32 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-24">
            <div className="flex flex-col gap-4">
               <p className="font-serif text-6xl text-emas font-bold">2017</p>
               <div className="h-px w-full bg-gray-100" />
               <p className="text-[10px] font-bold tracking-widest text-teks uppercase">Tahun Berdiri & Berkhidmat</p>
            </div>
            <div className="flex flex-col gap-4 md:translate-y-12">
               <p className="font-serif text-6xl text-hijau-tua font-bold">5Rb+</p>
               <div className="h-px w-full bg-gray-100" />
               <p className="text-[10px] font-bold tracking-widest text-teks uppercase">Jiwa yang Kembali Tersenyum</p>
            </div>
            <div className="flex flex-col gap-4">
               <p className="font-serif text-6xl text-emas font-bold">1.2K</p>
               <div className="h-px w-full bg-gray-100" />
               <p className="text-[10px] font-bold tracking-widest text-teks uppercase">Donatur yang Menaruh Percaya</p>
            </div>
            <div className="flex flex-col gap-4 md:translate-y-12">
               <p className="font-serif text-6xl text-hijau-tua font-bold">20+</p>
               <div className="h-px w-full bg-gray-100" />
               <p className="text-[10px] font-bold tracking-widest text-teks uppercase">Program Sosial Aktif</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi Redesign */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-24">
           <div className="md:w-1/2">
              <h2 className="font-serif text-4xl text-teks font-bold mb-12">Filosofi <br /> Pergerakan</h2>
              <div className="bg-emas/5 p-12 border-l-4 border-emas">
                 <p className="font-serif text-2xl text-teks italic leading-relaxed">
                   "Menjadi lembaga filantropi terdepan yang profesional, transparan, dan berdampak luas dalam mewujudkan masyarakat Indonesia yang mandiri."
                 </p>
              </div>
           </div>
           
           <div className="md:w-1/2">
              <h2 className="font-serif text-4xl text-teks font-bold mb-12">Misi Utama</h2>
              <div className="flex flex-col gap-10">
                {misiList.map((misi, idx) => (
                  <div key={idx} className="group flex gap-8">
                    <span className="font-serif text-3xl text-emas opacity-30 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
                    <p className="text-lg text-teks-sekunder border-b border-gray-100 pb-4 flex-1">{misi}</p>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* Section Legalitas & Kredibilitas */}
      <section className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8 justify-center">
            <span className="h-px w-12 bg-emas" />
            <h2 className="font-serif text-3xl text-teks font-bold text-center">Legalitas Resmi</h2>
            <span className="h-px w-12 bg-emas" />
          </div>
          <p className="text-center text-teks-sekunder max-w-xl mx-auto mb-16 leading-relaxed">
            Didirikan resmi sejak tahun 2017 di bawah pengesahan Kemenkumham RI, Yayasan Bina Masyarakat Indonesia berkomitmen menjaga kepatuhan regulasi pemerintah dan keterbukaan kepada publik.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-[#fdfaf5] p-6 border border-emas/10 text-center rounded-xl shadow-sm">
              <div className="text-emas text-3xl mb-3">⚖️</div>
              <h3 className="font-bold text-base text-teks mb-1">SK Kemenkumham</h3>
              <p className="text-xs text-teks-sekunder mb-4 leading-relaxed">Pengesahan Pendirian Badan Hukum RI</p>
              <div className="inline-block font-mono text-[11px] bg-emas/10 text-emas px-3 py-1.5 rounded-full font-bold">
                AHU-0010921.AH.01.04.2017
              </div>
            </div>
            <div className="bg-[#fdfaf5] p-6 border border-emas/10 text-center rounded-xl shadow-sm">
              <div className="text-emas text-3xl mb-3">🏢</div>
              <h3 className="font-bold text-base text-teks mb-1">NIB Berbasis Risiko</h3>
              <p className="text-xs text-teks-sekunder mb-4 leading-relaxed">Nomor Induk Berusaha BKPM / OSS</p>
              <div className="inline-block font-mono text-[11px] bg-emas/10 text-emas px-3 py-1.5 rounded-full font-bold">
                2911220041043
              </div>
            </div>
            <div className="bg-[#fdfaf5] p-6 border border-emas/10 text-center rounded-xl shadow-sm">
              <div className="text-emas text-3xl mb-3">🤝</div>
              <h3 className="font-bold text-base text-teks mb-1">Tanda Daftar Dinsos</h3>
              <p className="text-xs text-teks-sekunder mb-4 leading-relaxed">Lembaga Kesejahteraan Sosial (LKS)</p>
              <div className="inline-block font-mono text-[11px] bg-emas/10 text-emas px-3 py-1.5 rounded-full font-bold">
                460/4170-27/Bid.Dayasos/2022
              </div>
            </div>
            <div className="bg-[#fdfaf5] p-6 border border-emas/10 text-center rounded-xl shadow-sm">
              <div className="text-emas text-3xl mb-3">📋</div>
              <h3 className="font-bold text-base text-teks mb-1">SK Kesbangpol</h3>
              <p className="text-xs text-teks-sekunder mb-4 leading-relaxed">Badan Kesatuan Bangsa dan Politik</p>
              <div className="inline-block font-mono text-[11px] bg-emas/10 text-emas px-3 py-1.5 rounded-full font-bold">
                220/845/Kesbangpol/2019
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

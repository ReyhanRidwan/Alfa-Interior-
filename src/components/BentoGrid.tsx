/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from "react";
import { 
  Compass, 
  Truck, 
  ShieldCheck, 
  Factory, 
  Sparkles, 
  Layers 
} from "lucide-react";

interface BentoCardProps {
  key?: any;
  title: string;
  description: string;
  badge?: string;
  icon: React.ReactNode;
  gridClass: string;
}

function BentoCard({ title, description, badge, icon, gridClass }: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // mouse x relative to card
    const y = e.clientY - rect.top; // mouse y relative to card
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate tilt angles (max 8 degrees for elegant subtle effect)
    const tiltY = ((x - centerX) / centerX) * 8;
    const tiltX = -((y - centerY) / centerY) * 8;

    setRotateX(tiltX);
    setRotateY(tiltY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative bg-neutral-900 border border-neutral-800 rounded-3xl p-8 overflow-hidden transition-all duration-300 ease-out flex flex-col justify-between ${gridClass}`}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)` 
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        boxShadow: isHovered 
          ? "0 20px 40px -15px rgba(245, 158, 11, 0.15), 0 0 50px -10px rgba(245, 158, 11, 0.05)" 
          : "none"
      }}
    >
      {/* Background radial gradient accent on hover */}
      <div 
        className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: isHovered ? 0.08 : 0,
          background: "radial-gradient(600px circle at center, rgba(245, 158, 11, 0.4), transparent 40%)"
        }}
      />

      {/* Header icon and badge */}
      <div className="flex justify-between items-start mb-6">
        <div className={`p-4 rounded-2xl bg-neutral-950 border border-neutral-800 transition-all duration-300 ${isHovered ? "border-amber-500/50 text-amber-500 scale-110 rotate-3" : "text-neutral-400"}`}>
          {icon}
        </div>
        {badge && (
          <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-mono tracking-wider uppercase font-medium">
            {badge}
          </span>
        )}
      </div>

      {/* Description and Title */}
      <div>
        <h3 className="text-xl font-sans font-semibold text-white tracking-tight mb-2 flex items-center gap-1.5">
          {title}
        </h3>
        <p className="text-neutral-400 font-light text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Decorative corner glow */}
      <div className={`absolute bottom-0 right-0 w-16 h-16 bg-amber-500/10 blur-xl rounded-full transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
}

export default function BentoGrid() {
  const cards = [
    {
      title: "Gratis Desain 3D Realistis",
      description: "Visualisasikan interior idaman Anda secara presisi sebelum masuk tahap produksi. Revisi desain tanpa batasan untuk memastikan kesesuaian ekspektasi.",
      badge: "Best Value",
      icon: <Compass className="w-6 h-6" />,
      gridClass: "md:col-span-2 lg:col-span-2 row-span-1"
    },
    {
      title: "Bahan Baku Premium",
      description: "Kami hanya menggunakan blockboard melamin kualitas ekspor tebal 18mm & plywood Meranti premium, bukan serbuk gergaji kayu murah.",
      badge: "High Class",
      icon: <Layers className="w-6 h-6" />,
      gridClass: "md:col-span-1 lg:col-span-1 row-span-1"
    },
    {
      title: "Bebas Biaya Pengiriman & Pasang",
      description: "Layanan menyeluruh mencakup pengantaran hingga perakitan langsung di lokasi Anda secara gratis khusus wilayah JABODETABEK.",
      icon: <Truck className="w-6 h-6" />,
      gridClass: "md:col-span-1 lg:col-span-1 row-span-1"
    },
    {
      title: "Pabrik Sendiri (Direct Workshop)",
      description: "Tanpa perantara! Kami memproduksi seluruh furnitur kustom di workshop modern kami sendiri dengan tenaga ahli bersertifikasi demi hasil presisi dan harga terbaik.",
      badge: "Pasti Presisi",
      icon: <Factory className="w-6 h-6" />,
      gridClass: "md:col-span-2 lg:col-span-2 row-span-1"
    },
    {
      title: "Garansi Struktur 10 Tahun",
      description: "Bentuk komitmen kualitas kami. Alfa Interior memberikan garansi struktur dari rayap dan kelapukan hingga sepuluh tahun penuh demi ketenangan pikiran Anda.",
      badge: "Warranty",
      icon: <ShieldCheck className="w-6 h-6" />,
      gridClass: "md:col-span-3 lg:col-span-3 row-span-1"
    }
  ];

  return (
    <section id="features-grid" className="py-24 bg-neutral-950 border-b border-neutral-900 relative overflow-hidden">
      {/* Decorative grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370f_1px,transparent_1px),linear-gradient(to_bottom,#1f29370f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-amber-500 tracking-wider uppercase mb-4">
            <Sparkles className="w-3 h-3" /> Standar Alfa Interior
          </div>
          <h2 className="text-3xl md:text-5xl font-sans font-light tracking-tight text-white mb-4">
            Mengapa Memilih <span className="font-semibold text-amber-500">Alfa Interior?</span>
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto font-light text-sm md:text-base">
            Mewujudkan standar kemewahan yang fungsional, tahan lama, dan terencana dengan dukungan material terbaik di kelasnya.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
          {cards.map((card, idx) => (
            <BentoCard
              key={idx}
              title={card.title}
              description={card.description}
              badge={card.badge}
              icon={card.icon}
              gridClass={card.gridClass}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

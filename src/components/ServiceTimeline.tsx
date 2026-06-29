/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { MessageSquareCode, Ruler, Compass, Sparkles, Hammer, CheckCircle2 } from "lucide-react";

interface Step {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}

export default function ServiceTimeline() {
  const [activeStep, setActiveStep] = useState(0);

  const steps: Step[] = [
    {
      number: "01",
      title: "Konsultasi & Ideasi",
      subtitle: "Brainstorming Konsep Gratis",
      description: "Diskusi awal mengenai kebutuhan fungsional ruang, pilihan gaya desain (Japandi, Modern, Klasik, dll), estimasi awal anggaran biaya (RAB), serta penjadwalan survey lokasi.",
      icon: <MessageSquareCode className="w-6 h-6" />
    },
    {
      number: "02",
      title: "Survey & Pengukuran Lokasi",
      subtitle: "Akurasi Ukuran & Cek Struktur",
      description: "Tim teknis dan desainer interior kami mendatangi lokasi proyek untuk melakukan pengukuran millimeter-blok yang presisi, pengecekan instalasi MEP (listrik & air), serta evaluasi dinding.",
      icon: <Ruler className="w-6 h-6" />
    },
    {
      number: "03",
      title: "Visualisasi Desain 3D",
      subtitle: "Render Realistis & Pemilihan Material",
      description: "Pembuatan gambar 3D resolusi tinggi sehingga Anda bisa melihat interior sebelum diproduksi. Di tahap ini, kita melakukan revisi layout, pencahayaan, dan finalisasi sampel material.",
      icon: <Compass className="w-6 h-6" />
    },
    {
      number: "04",
      title: "Down Payment & Produksi",
      subtitle: "Presisi Produksi Internal Workshop",
      description: "Setelah persetujuan RAB dan penandatanganan SPK, Anda membayar DP. Produksi langsung dilakukan di workshop internal kami menggunakan mesin pemotong presisi berstandar tinggi.",
      icon: <Hammer className="w-6 h-6" />
    },
    {
      number: "05",
      title: "Instalasi & Serah Terima",
      subtitle: "Pemasangan Rapi & Garansi Struktur",
      description: "Instalasi akhir di lokasi dilakukan secara rapi oleh tim aplikator profesional kami. Setelah lolos quality control, dilakukan serah terima kunci dan penyerahan sertifikat garansi resmi.",
      icon: <CheckCircle2 className="w-6 h-6" />
    }
  ];

  return (
    <section id="process" className="py-24 bg-neutral-950 border-b border-neutral-900 relative overflow-hidden">
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-amber-500 tracking-wider uppercase mb-4">
            <Sparkles className="w-3 h-3" /> Alur Pelayanan
          </div>
          <h2 className="text-3xl md:text-5xl font-sans font-light tracking-tight text-white mb-4">
            Langkah Mudah <span className="font-semibold text-amber-500">Mewujudkan Impian</span>
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto font-light text-sm md:text-base">
            Proses kolaboratif yang transparan dan terstruktur rapi dari awal mula konsultasi hingga penyerahan kunci ruangan baru Anda.
          </p>
        </div>

        {/* Interactive Steps Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Vertical timeline indicators */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`group relative text-left p-6 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${isActive ? "bg-neutral-900 border-amber-500/40 shadow-lg shadow-amber-500/5" : "bg-neutral-950/40 border-neutral-900 hover:border-neutral-800"}`}
                >
                  <div className={`text-2xl font-mono font-bold transition-colors duration-300 ${isActive ? "text-amber-500" : "text-neutral-600 group-hover:text-neutral-400"}`}>
                    {step.number}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`font-sans font-semibold tracking-tight transition-colors duration-300 ${isActive ? "text-white" : "text-neutral-400 group-hover:text-neutral-200"}`}>
                      {step.title}
                    </h3>
                    <p className="text-neutral-500 text-xs font-light mt-0.5">
                      {step.subtitle}
                    </p>
                  </div>

                  <div className={`p-2.5 rounded-xl border transition-all duration-300 ${isActive ? "bg-amber-500 text-neutral-950 border-amber-400" : "bg-neutral-900 text-neutral-500 border-neutral-800"}`}>
                    {step.icon}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Displaying detail of active step with clean presentation */}
          <div className="lg:col-span-7 bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-3xl p-8 md:p-12 min-h-[380px] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex justify-between items-center mb-8">
                <span className="text-7xl font-mono font-black text-amber-500/10 block leading-none">
                  {steps[activeStep].number}
                </span>
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
                  {steps[activeStep].icon}
                </div>
              </div>

              <span className="text-amber-500 text-xs font-mono uppercase tracking-widest font-semibold">
                {steps[activeStep].subtitle}
              </span>
              <h4 className="text-2xl md:text-3xl font-sans font-semibold text-white tracking-tight mt-2 mb-6">
                {steps[activeStep].title}
              </h4>
              <p className="text-neutral-300 font-light leading-relaxed text-sm md:text-base">
                {steps[activeStep].description}
              </p>
            </div>

            {/* Bottom dot indicators */}
            <div className="flex gap-2 mt-8 pt-6 border-t border-neutral-800/60">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeStep ? "w-8 bg-amber-500" : "w-2 bg-neutral-800 hover:bg-neutral-700"}`}
                  aria-label={`Go to step ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

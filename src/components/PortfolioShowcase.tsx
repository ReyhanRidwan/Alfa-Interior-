/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sparkles, ArrowUpRight, Search, Hammer, Eye, X, Ruler } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: "kitchen" | "bedroom" | "wardrobe";
  categoryLabel: string;
  size: string;
  material: string;
  image: string;
  priceEstimate: string;
  description: string;
}

export default function PortfolioShowcase() {
  const [activeTab, setActiveTab] = useState<"all" | "kitchen" | "bedroom" | "wardrobe">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: "p1",
      title: "Dapur Modern Charcoal Gold",
      category: "kitchen",
      categoryLabel: "Kitchen Set",
      size: "Panjang Kabinet 4.5m¹",
      material: "Plywood Meranti 18mm, Finishing HPL Charcoal Matte & List Gold, Top Table Marble",
      image: "/images/kitchen_after.jpg",
      priceEstimate: "Rp 18.500.000 - Rp 25.000.000",
      description: "Desain dapur bersih (dry kitchen) modern yang mewah dengan kombinasi warna abu-abu arang dan serat kayu ek yang hangat. Dilengkapi list logam berwarna emas di sepanjang profil kabinet atas dan bawah, serta marmer putih carrara dengan pola urat halus untuk kesan eksklusif."
    },
    {
      id: "p2",
      title: "Kamar Tidur Utama Wood Panel",
      category: "bedroom",
      categoryLabel: "Bedroom Set",
      size: "Backdrop Headboard Tinggi 2.8m",
      material: "MDF Hijau HMR, Finishing HPL Woodgrain Oak, List Kuningan, Padded Leather",
      image: "/images/bedroom_set.jpg",
      priceEstimate: "Rp 15.000.000 - Rp 22.000.000",
      description: "Tempat tidur utama yang dirancang kustom dari lantai hingga langit-langit. Menggabungkan panel kayu vertikal dengan pencahayaan LED tersembunyi yang hangat (warm white) di belakangnya, didukung sandaran kepala berlapis kulit premium."
    },
    {
      id: "p3",
      title: "Walk-in Closet Glass Frame",
      category: "wardrobe",
      categoryLabel: "Wardrobe / Lemari",
      size: "Lebar 3.2m, Tinggi 2.8m",
      material: "Rangka Aluminium Anodized Hitam, Pintu Kaca Tempered, Sensor Gerak Lampu LED",
      image: "/images/wardrobe_luxury.jpg",
      priceEstimate: "Rp 24.000.000 - Rp 32.000.000",
      description: "Lemari pakaian elegan bergaya butik kustom dengan pintu kaca tembus pandang berbingkai logam hitam. Bagian dalam lemari dilengkapi dengan lampu LED pintar berbasis sensor gerak yang otomatis menyala ketika pintu dibuka."
    },
    {
      id: "p4",
      title: "Dapur Japandi Natural Bright",
      category: "kitchen",
      categoryLabel: "Kitchen Set",
      size: "Panjang Kabinet 3.6m¹",
      material: "Multiplex Premium, Finishing HPL Light Natural Oak & Putih Glossy, Solid Surface",
      image: "/images/kitchen_scandinavian.jpg",
      priceEstimate: "Rp 14.500.000 - Rp 19.000.000",
      description: "Sentuhan gaya hidup minimalis Jepang dan Skandinavia yang cerah dan lapang. Lemari atas berwarna putih mengkilap memantulkan cahaya alami ruangan, sedangkan kabinet bawah menggunakan tekstur kayu alami untuk menciptakan kehangatan bersantap keluarga."
    },
    {
      id: "p5",
      title: "Backdrop TV Luxury Living Room",
      category: "wardrobe",
      categoryLabel: "TV Console & Living",
      size: "Lebar Panel 4.0m",
      material: "PVC Board Motif Marmer Glossy, Panel Kisi Kayu Kustom, Credenza Gantung Melamik",
      image: "/images/living_room_luxury.jpg",
      priceEstimate: "Rp 12.000.000 - Rp 18.000.000",
      description: "Desain ruang keluarga mewah berkelas tinggi. Menggunakan dinding utama berlatar belakang panel marmer glossy yang tahan air dan gores, dibingkai panel kisi-kisi kayu kustom vertikal dan kabinet TV gantung minimalis."
    }
  ];

  const filteredProjects = activeTab === "all" 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  return (
    <section id="portfolio" className="py-24 bg-neutral-950 border-b border-neutral-900 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-amber-500 tracking-wider uppercase mb-4">
              <Sparkles className="w-3 h-3" /> Galeri Portofolio
            </div>
            <h2 className="text-3xl md:text-5xl font-sans font-light tracking-tight text-white">
              Koleksi Proyek <span className="font-semibold text-amber-500">Kustom</span> Kami
            </h2>
          </div>

          {/* Tab Filters */}
          <div className="flex flex-wrap gap-2 bg-neutral-900/50 p-1 rounded-2xl border border-neutral-800 max-w-max">
            {[
              { id: "all", label: "Semua Proyek" },
              { id: "kitchen", label: "Kitchen Set" },
              { id: "bedroom", label: "Bedroom Set" },
              { id: "wardrobe", label: "Wardrobes & TV" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-300 ${activeTab === tab.id ? "bg-amber-500 text-neutral-950 font-bold shadow-lg shadow-amber-500/20" : "text-neutral-400 hover:text-white"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer bg-neutral-900/40 rounded-2xl overflow-hidden border border-neutral-900 hover:border-neutral-800 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Container with Hover zoom */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay details on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-amber-500 text-xs font-mono uppercase tracking-widest block mb-1">
                        {project.categoryLabel}
                      </span>
                      <h4 className="text-white text-lg font-medium tracking-tight">
                        {project.title}
                      </h4>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 left-4 bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-neutral-300 uppercase tracking-widest border border-neutral-800">
                  {project.categoryLabel}
                </div>
              </div>

              {/* Bottom text info (Fallback for non-hover/mobile users) */}
              <div className="p-6">
                <h3 className="text-lg font-medium text-white group-hover:text-amber-500 transition-colors mb-2">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-neutral-400 text-xs font-light mb-3">
                  <Ruler className="w-3.5 h-3.5 text-amber-500/70" />
                  <span>{project.size}</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-neutral-800/60">
                  <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">Estimasi Harga</span>
                  <span className="text-amber-500 font-mono text-xs font-medium">{project.priceEstimate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-neutral-950/60 text-neutral-400 hover:text-white border border-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-[4/3] md:aspect-auto md:h-[500px]">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-8 md:p-10 flex flex-col justify-between h-full md:h-[500px] overflow-y-auto">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-mono tracking-wider uppercase mb-4">
                    <Hammer className="w-3.5 h-3.5" /> {selectedProject.categoryLabel}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-sans font-semibold text-white tracking-tight mb-4">
                    {selectedProject.title}
                  </h3>
                  <p className="text-neutral-300 font-light text-sm leading-relaxed mb-6">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="space-y-4 pt-6 border-t border-neutral-800">
                  <div className="flex justify-between items-start text-sm">
                    <span className="text-neutral-500 font-mono text-xs uppercase tracking-wider">Dimensi Fisik</span>
                    <span className="text-neutral-200 font-light text-right max-w-[200px]">{selectedProject.size}</span>
                  </div>
                  <div className="flex justify-between items-start text-sm">
                    <span className="text-neutral-500 font-mono text-xs uppercase tracking-wider">Material Utama</span>
                    <span className="text-neutral-200 font-light text-right max-w-[200px]">{selectedProject.material}</span>
                  </div>
                  <div className="flex justify-between items-start text-sm pt-2">
                    <span className="text-neutral-500 font-mono text-xs uppercase tracking-wider">Estimasi Rentang Biaya</span>
                    <span className="text-amber-500 font-mono font-medium text-right">{selectedProject.priceEstimate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

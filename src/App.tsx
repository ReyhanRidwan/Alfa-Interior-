/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import BentoGrid from "./components/BentoGrid";
import PortfolioShowcase from "./components/PortfolioShowcase";
import ServiceTimeline from "./components/ServiceTimeline";
import RabCalculator from "./components/RabCalculator";
import ContactForm from "./components/ContactForm";

export default function App() {
  const scrollToCalculator = () => {
    const calcElement = document.getElementById("rab-calculator");
    if (calcElement) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = calcElement.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const scrollToPortfolio = () => {
    const portElement = document.getElementById("portfolio");
    if (portElement) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = portElement.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-amber-500 selection:text-neutral-950 font-sans scroll-smooth">
      {/* HEADER NAVBAR */}
      <Header />

      {/* HERO SLIDER SECTION */}
      <HeroSlider 
        onScrollToCalculator={scrollToCalculator} 
        onScrollToPortfolio={scrollToPortfolio} 
      />

      {/* 1. BEFORE/AFTER SLIDER INTERACTIVE */}
      <BeforeAfterSlider />

      {/* 2. WHY CHOOSE US - BENTO GRID */}
      <BentoGrid />

      {/* 3. PORTFOLIO SHOWCASE CATEGORIZED */}
      <PortfolioShowcase />

      {/* 4. PROCESS STAGE-BY-STAGE TIMELINE */}
      <ServiceTimeline />

      {/* 5. INTERACTIVE RAB CALCULATOR */}
      <RabCalculator />

      {/* 6. CONTACT FORM & FLOATING WHATSAPP */}
      <ContactForm />

      {/* MINIMALIST FOOTER */}
      <footer className="bg-neutral-950 py-16 border-t border-neutral-900 print:hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* Branding Column */}
            <div className="md:col-span-2 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-neutral-950 flex items-center justify-center font-bold text-base">
                  A
                </div>
                <h3 className="text-white text-md font-bold font-sans">Alfa Interior</h3>
              </div>
              <p className="text-neutral-500 text-xs font-light max-w-sm leading-relaxed">
                Penyedia layanan desain interior kustom premium, pembuatan kabinet kitchen set, wardrobe, bedroom set, dan penataan ruang tinggal berkualitas ekspor dengan ketelitian pengrajin profesional.
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="flex flex-col gap-3">
              <h4 className="text-white text-xs font-semibold font-mono uppercase tracking-wider">Navigasi Rujukan</h4>
              <div className="flex flex-col gap-2 text-xs text-neutral-500">
                <a href="#transformation-slider" className="hover:text-amber-500 transition-colors">Transformasi Dapur</a>
                <a href="#features-grid" className="hover:text-amber-500 transition-colors">Keunggulan Layanan</a>
                <a href="#portfolio" className="hover:text-amber-500 transition-colors">Galeri Proyek</a>
                <a href="#rab-calculator" className="hover:text-amber-500 transition-colors">Kalkulator Biaya RAB</a>
              </div>
            </div>

            {/* Workshop Location Column */}
            <div className="flex flex-col gap-3">
              <h4 className="text-white text-xs font-semibold font-mono uppercase tracking-wider">Workshop Utama</h4>
              <p className="text-neutral-500 text-xs font-light leading-relaxed">
                Kawasan Industri Sentul, Blok B-12<br />
                Kabupaten Bogor, Jawa Barat 16810<br />
                JABODETABEK — Indonesia
              </p>
            </div>

          </div>

          {/* Legal copyrights bottom bar */}
          <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-neutral-600">
            <p>&copy; {new Date().getFullYear()} Alfa Interior. Hak Cipta Dilindungi Undang-Undang.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-neutral-400">Aturan Penggunaan</a>
              <a href="#" className="hover:text-neutral-400">Kebijakan Privasi</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

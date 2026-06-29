/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Compass, Hammer, Menu, X, ArrowUpRight } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-neutral-950/95 border-b border-neutral-900/60 backdrop-blur-md py-4" : "bg-transparent py-6"} print:hidden`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        
        {/* Brand Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-neutral-950 flex items-center justify-center font-bold text-lg shadow-lg shadow-amber-500/10 group-hover:scale-105 transition-all">
            A
          </div>
          <div>
            <h1 className="text-white text-lg font-bold font-sans tracking-tight leading-none">Alfa Interior</h1>
            <span className="text-amber-500 text-[9.5px] font-mono tracking-widest uppercase block mt-0.5">Design & Build</span>
          </div>
        </div>

        {/* Desktop Menu links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider">
          {[
            { id: "transformation-slider", label: "Transformasi" },
            { id: "features-grid", label: "Keunggulan" },
            { id: "portfolio", label: "Portofolio" },
            { id: "process", label: "Pelayanan" },
            { id: "rab-calculator", label: "Kalkulator RAB" }
          ].map(link => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-neutral-400 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollToSection("rab-calculator")}
            className="inline-flex items-center gap-1 px-4.5 py-2 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs font-mono tracking-wider transition-all duration-300 hover:bg-amber-400 shadow-md shadow-amber-500/10 active:scale-95"
          >
            ESTIMASI RAB <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[72px] left-0 right-0 bg-neutral-950 border-b border-neutral-900 py-6 px-6 flex flex-col gap-5 animate-in slide-in-from-top duration-300">
          {[
            { id: "transformation-slider", label: "Transformasi" },
            { id: "features-grid", label: "Keunggulan" },
            { id: "portfolio", label: "Portofolio" },
            { id: "process", label: "Pelayanan" },
            { id: "rab-calculator", label: "Kalkulator RAB" }
          ].map(link => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-left text-neutral-400 hover:text-white text-sm font-mono uppercase tracking-wider py-1"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection("rab-calculator")}
            className="w-full py-3.5 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs font-mono tracking-wider text-center"
          >
            HITUNG ESTIMASI RAB
          </button>
        </div>
      )}
    </header>
  );
}

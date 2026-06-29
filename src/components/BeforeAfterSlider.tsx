/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { ArrowLeftRight, Sparkles } from "lucide-react";

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <section id="transformation-slider" className="py-24 bg-neutral-950 border-b border-neutral-900 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-amber-500 tracking-wider uppercase mb-4">
            <Sparkles className="w-3 h-3" /> Realisasi Desain-Bangun
          </div>
          <h2 className="text-3xl md:text-5xl font-sans font-light tracking-tight text-white mb-4">
            Sentuhan <span className="font-semibold text-amber-500">Transformasi</span> Nyata
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto font-light text-sm md:text-base">
            Geser pemisah di bawah ini untuk melihat perbedaan sebelum renovasi dan setelah instalasi Kitchen Set premium oleh tim pengrajin ahli Alfa Interior.
          </p>
        </div>

        {/* Slider Container */}
        <div 
          ref={containerRef}
          className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl select-none cursor-ew-resize group"
          onPointerDown={(e) => {
            setIsDragging(true);
            handleMove(e.clientX);
          }}
        >
          {/* Before Image (Background) */}
          <img 
            src="/images/kitchen_before.jpg" 
            alt="Dapur Lama Sebelum Alfa Interior" 
            className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 left-4 bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded text-xs font-mono font-medium text-red-400 uppercase tracking-widest border border-red-950/35">
            Sebelum (Ruang Lama)
          </div>

          {/* After Image (Foreground with dynamic clip-path width) */}
          <div 
            className="absolute top-0 left-0 w-full h-full overflow-hidden"
            style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          >
            <img 
              src="/images/kitchen_after.jpg" 
              alt="Dapur Premium Setelah Alfa Interior" 
              className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 right-4 bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded text-xs font-mono font-medium text-amber-400 uppercase tracking-widest border border-amber-950/35">
              Sesudah (Alfa Interior)
            </div>
          </div>

          {/* Divider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 via-yellow-300 to-amber-500 cursor-ew-resize flex items-center justify-center"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="w-10 h-10 rounded-full bg-neutral-900 border-2 border-amber-400 text-amber-400 flex items-center justify-center shadow-lg active:scale-95 transition-transform group-hover:scale-110">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
          </div>

          {/* Interactive instruction hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-neutral-950/70 backdrop-blur-md px-4 py-2 rounded-full border border-neutral-800 text-xs text-neutral-300 pointer-events-none font-mono flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
            <span>Geser Kiri/Kanan</span>
          </div>
        </div>
      </div>
    </section>
  );
}

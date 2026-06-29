/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ArrowDown, Flame, ArrowUpRight, ChevronLeft, ChevronRight, Play, Pause, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeroSliderProps {
  onScrollToCalculator: () => void;
  onScrollToPortfolio: () => void;
}

const SLIDES = [
  {
    image: "/images/kitchen_after.jpg",
    badge: "KITCHEN SET ELIT",
    title: "Apresiasi Estetika Kitchen Set Kustom",
    description: "Ubah area dapur Anda menjadi pusat kehangatan keluarga dengan material berkualitas ekspor, pengerjaan presisi tinggi, dan tata ruang yang ergonomis.",
    primaryLabel: "HITUNG ESTIMASI RAB",
    secondaryLabel: "GALERI KITCHEN SET"
  },
  {
    image: "/images/bedroom_set.jpg",
    badge: "BEDROOM SET PRESTIGE",
    title: "Kenyamanan Eksklusif Kamar Tidur Utama",
    description: "Menciptakan ruang istirahat yang intim dengan panel kayu kustom, pencahayaan hangat tersembunyi, dan sandaran kepala berlapis kulit yang disesuaikan secara personal.",
    primaryLabel: "KONSULTASI SEKARANG",
    secondaryLabel: "DESAIN KAMAR TIDUR"
  },
  {
    image: "/images/wardrobe_luxury.jpg",
    badge: "WALK-IN CLOSET MEWAH",
    title: "Walk-in Closet Elegan Bergaya Butik",
    description: "Sistem penyimpanan cerdas berpintu kaca tempered berbingkai logam hitam, dilengkapi pencahayaan LED otomatis berbasis sensor gerak.",
    primaryLabel: "ESTIMASI BIAYA LEMARI",
    secondaryLabel: "GALERI CLOSET MEWAH"
  },
  {
    image: "/images/kitchen_scandinavian.jpg",
    badge: "JAPANDI MODERN",
    title: "Kehangatan Gaya Japandi yang Cerah",
    description: "Perpaduan harmonis estetika Jepang dan kesederhanaan Skandinavia, menyatukan serat kayu alami dengan kabinet putih bersih yang memikat.",
    primaryLabel: "HITUNG ESTIMASI",
    secondaryLabel: "PORTOFOLIO JAPANDI"
  },
  {
    image: "/images/living_room_luxury.jpg",
    badge: "LIVING ROOM LUXURY",
    title: "Backdrop TV & Ruang Keluarga Berkelas",
    description: "Transformasikan ruang keluarga Anda dengan dinding panel marmer glossy yang indah, dipadukan panel kisi-kisi kayu kustom serta credenza gantung yang anggun.",
    primaryLabel: "HUBUNGI TIM DESAINER",
    secondaryLabel: "GALERI RUANG KELUARGA"
  }
];

const AUTOPLAY_INTERVAL = 7000; // 7 seconds per slide

export default function HeroSlider({ onScrollToCalculator, onScrollToPortfolio }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  }, []);

  // Handle slide progress and rotation
  useEffect(() => {
    if (!isPlaying) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const startTime = Date.now();
    const duration = AUTOPLAY_INTERVAL;
    const initialProgress = progress;

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(initialProgress + (elapsed / duration) * 100, 100);
      
      setProgress(calculatedProgress);

      if (calculatedProgress >= 100) {
        nextSlide();
      }
    }, 50);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, currentSlide, nextSlide, progress]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const togglePlayback = () => {
    setIsPlaying((prev) => !prev);
  };

  const scrollToNextSection = () => {
    const nextElement = document.getElementById("transformation-slider");
    if (nextElement) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = nextElement.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  // Content animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden border-b border-neutral-900 print:hidden flex items-center">
      {/* Background Slideshow with AnimatePresence */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Dark gradient overlay over image to ensure high contrast */}
            <div className="absolute inset-0 bg-neutral-950/65 z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/75 to-transparent z-10 hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/40 z-10" />
            
            <motion.img
              src={SLIDES[currentSlide].image}
              alt={SLIDES[currentSlide].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              initial={{ scale: 1.15, x: -10 }}
              animate={{ scale: 1.02, x: 0 }}
              transition={{ duration: 7.2, ease: "easeOut" }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-10" />

      {/* Hero Content Container (Left Aligned for an Asymmetric Aesthetic Look) */}
      <div className="max-w-6xl mx-auto px-6 relative z-20 w-full flex flex-col items-start text-left pt-16">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              {/* Badge with Flame/Sparkles */}
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-950/60 border border-neutral-800 text-xs font-mono text-amber-500 tracking-wider uppercase backdrop-blur-sm">
                <Flame className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                <span>{SLIDES[currentSlide].badge}</span>
              </motion.div>

              {/* Spectacular Title */}
              <motion.h1 
                variants={itemVariants} 
                className="text-4xl sm:text-5xl md:text-6xl font-display font-light tracking-tight text-white leading-[1.1]"
              >
                {/* Visual highlights on slide changing titles */}
                {SLIDES[currentSlide].title.split(" ").map((word, i) => {
                  const isHighlighted = ["Kustom", "Kamar", "Utama", "Eksklusif", "Mewah", "Butik", "Japandi", "Berkelas"].includes(word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""));
                  return (
                    <span key={i} className={isHighlighted ? "font-semibold text-amber-500 inline-block mr-2" : "inline-block mr-2"}>
                      {word}
                    </span>
                  );
                })}
              </motion.h1>

              {/* Description */}
              <motion.p 
                variants={itemVariants} 
                className="text-neutral-300 text-sm md:text-lg font-light leading-relaxed max-w-2xl"
              >
                {SLIDES[currentSlide].description}
              </motion.p>

              {/* Dynamic Action CTAs */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={onScrollToCalculator}
                  className="relative px-8 py-4 rounded-xl bg-amber-500 text-neutral-950 font-bold font-sans text-xs uppercase tracking-wider transition-all duration-300 hover:bg-amber-400 hover:scale-[1.02] shadow-2xl shadow-amber-500/25 active:scale-95 group overflow-hidden flex items-center justify-center gap-2"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {SLIDES[currentSlide].primaryLabel} <ArrowUpRight className="w-4 h-4" />
                  </span>
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <button
                  onClick={onScrollToPortfolio}
                  className="px-8 py-4 rounded-xl bg-neutral-950/60 border border-neutral-800 text-neutral-200 hover:text-white font-bold font-mono text-xs uppercase tracking-wider transition-all duration-300 hover:bg-neutral-900 hover:border-neutral-700 active:scale-95 flex items-center justify-center gap-2 backdrop-blur-sm"
                >
                  {SLIDES[currentSlide].secondaryLabel}
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Controls Overlay (Minimalist Architectural Styling) */}
      <div className="absolute bottom-10 left-0 right-0 z-30 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          
          {/* Thumbnails/Progress indicators */}
          <div className="flex-1 max-w-2xl grid grid-cols-5 gap-3">
            {SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className="text-left group focus:outline-none block"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  {/* Miniature Label */}
                  <span className={`hidden sm:block text-[9px] font-mono tracking-widest uppercase transition-colors mb-2 ${isActive ? "text-amber-500" : "text-neutral-500 group-hover:text-neutral-300"}`}>
                    0{idx + 1}
                  </span>
                  
                  {/* Dynamic Progress/Active border lines */}
                  <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden relative">
                    {isActive && isPlaying ? (
                      <motion.div
                        className="h-full bg-amber-500"
                        style={{ width: `${progress}%` }}
                      />
                    ) : isActive ? (
                      <div className="h-full w-full bg-amber-500" />
                    ) : (
                      <div className="h-full w-0 bg-amber-500 transition-all duration-300 group-hover:w-1/3" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Previous/Next Manual controllers and Play/Pause */}
          <div className="flex items-center gap-4 text-white">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlayback}
              className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-950/60 hover:bg-neutral-900 transition-all hover:border-neutral-700 hover:scale-105 active:scale-95 text-neutral-400 hover:text-white"
              title={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>

            {/* Prev/Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-950/60 hover:bg-neutral-900 transition-all hover:border-neutral-700 hover:scale-105 active:scale-95 text-neutral-400 hover:text-white"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-950/60 hover:bg-neutral-900 transition-all hover:border-neutral-700 hover:scale-105 active:scale-95 text-neutral-400 hover:text-white"
                aria-label="Next slide"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Scroll indicators down hint */}
            <button
              onClick={scrollToNextSection}
              className="hidden lg:flex flex-col items-center gap-1.5 pl-4 border-l border-neutral-800 text-neutral-500 hover:text-amber-500 transition-colors animate-bounce cursor-pointer group"
            >
              <span className="text-[9px] font-mono tracking-widest uppercase">Eksplor</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

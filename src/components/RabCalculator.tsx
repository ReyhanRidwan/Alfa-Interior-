/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { 
  Calculator, 
  ChevronRight, 
  ChevronLeft, 
  Printer, 
  Check, 
  Maximize2, 
  Minimize2, 
  Compass, 
  Grid, 
  Sparkles,
  Info,
  Layers,
  Lightbulb,
  InfoIcon
} from "lucide-react";
import { DesignStyle, MaterialFinishing, CalculatorState } from "../types";

export default function RabCalculator() {
  // Stepper state
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  // Mobile drawer state
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  // Core Calculator State
  const [state, setState] = useState<CalculatorState>({
    roomLength: 4.0,
    roomWidth: 3.0,
    ceilingHeight: 2.8,
    designStyle: "Modern Minimalis",
    
    kitchenSet: { checked: true, length: 2.5, pricePerMeter: 2400000 },
    wardrobe: { checked: false, length: 2.0, pricePerMeter: 2600000 },
    materialFinishing: "HPL Standar",
    hingesSlowMo: true,
    ledStrip: true,

    flooring: { checked: true, pricePerSqM: 2200000 / 10 }, // standard mapping down to per sq meter, let's keep slider defaults
    wallpaper: { checked: false, areaSqM: 15, pricePerSqM: 85000 },
    dropCeiling: { checked: true, pricePerSqM: 160000 },

    downlights: { checked: true, count: 6, pricePerUnit: 75000 },
    sockets: { checked: true, count: 4, pricePerUnit: 55000 },
    chandelier: { checked: false, count: 1, pricePerUnit: 1200000 }
  });

  // Additional sofa item specifically requested by user ("Sofa & Coffee Table")
  const [sofa, setSofa] = useState({ checked: false, price: 5500000 });

  // Update specific values safely
  const updateState = (key: keyof CalculatorState, value: any) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const updateNestedState = (parentKey: "kitchenSet" | "wardrobe" | "flooring" | "wallpaper" | "dropCeiling" | "downlights" | "sockets" | "chandelier", childKey: string, value: any) => {
    setState((prev) => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [childKey]: value
      }
    }));
  };

  // Dimensions limits
  const minLength = 1.0;
  const maxLength = 8.0;
  const minWidth = 1.0;
  const maxWidth = 8.0;
  const minCeiling = 2.5;
  const maxCeiling = 3.5;

  // Real-time calculated volumes
  const totalFloorArea = state.roomLength * state.roomWidth;
  const totalWallArea = ((state.roomLength * 2) + (state.roomWidth * 2)) * state.ceilingHeight;

  // Style colors for Left Panel items
  const styleColorTheme = useMemo(() => {
    switch (state.designStyle) {
      case "Modern Minimalis":
        return {
          woodFill: "#cbd5e1", // Slate gray wood
          woodStroke: "#475569",
          wallColor: "#f1f5f9",
          labelColor: "#0f172a",
          sofaColor: "#94a3b8",
          primaryAccent: "#64748b"
        };
      case "Japandi Natural":
        return {
          woodFill: "#fed7aa", // Amber warm oak
          woodStroke: "#ca8a04",
          wallColor: "#fffbeb",
          labelColor: "#78350f",
          sofaColor: "#d97706",
          primaryAccent: "#ca8a04"
        };
      case "Classic Luxury":
        return {
          woodFill: "#eab308", // Golden mahogany look
          woodStroke: "#854d0e",
          wallColor: "#fafaf9",
          labelColor: "#451a03",
          sofaColor: "#a16207",
          primaryAccent: "#854d0e"
        };
      case "Industrial":
        return {
          woodFill: "#b45309", // Dark walnut rustic
          woodStroke: "#451a03",
          wallColor: "#f4f4f5",
          labelColor: "#27272a",
          sofaColor: "#52525b",
          primaryAccent: "#78350f"
        };
    }
  }, [state.designStyle]);

  // Adjust sliders limit dynamically when room dimensions change
  React.useEffect(() => {
    if (state.kitchenSet.length > state.roomLength) {
      updateNestedState("kitchenSet", "length", parseFloat(state.roomLength.toFixed(1)));
    }
    if (state.wardrobe.length > state.roomWidth) {
      updateNestedState("wardrobe", "length", parseFloat(state.roomWidth.toFixed(1)));
    }
  }, [state.roomLength, state.roomWidth]);

  // Multiplier details
  const materialMultipliers = {
    "HPL Standar": 1.0,
    "HPL Premium / Tekstur": 1.15,
    "Cat Duco": 1.40
  };

  const selectedMultiplier = materialMultipliers[state.materialFinishing];

  // Detailed items calculation
  const calculations = useMemo(() => {
    let list: { name: string; volume: number; unit: string; unitPrice: number; total: number }[] = [];

    // Furniture Multipliers & Micro Opsi
    const microOpsiPerMeter = (state.hingesSlowMo ? 150000 : 0) + (state.ledStrip ? 95000 : 0);

    // 1. Kitchen Set
    if (state.kitchenSet.checked) {
      const unitCost = (state.kitchenSet.pricePerMeter * selectedMultiplier) + microOpsiPerMeter;
      list.push({
        name: `Kitchen Set (Kabinet Atas & Bawah) - ${state.materialFinishing}`,
        volume: state.kitchenSet.length,
        unit: "m¹",
        unitPrice: unitCost,
        total: state.kitchenSet.length * unitCost
      });
    }

    // 2. Wardrobe
    if (state.wardrobe.checked) {
      const unitCost = (state.wardrobe.pricePerMeter * selectedMultiplier) + microOpsiPerMeter;
      list.push({
        name: `Wardrobe / Lemari Pakaian Full Plafond - ${state.materialFinishing}`,
        volume: state.wardrobe.length,
        unit: "m¹",
        unitPrice: unitCost,
        total: state.wardrobe.length * unitCost
      });
    }

    // 3. Sofa minimalis
    if (sofa.checked) {
      list.push({
        name: "Sofa Minimalis & Coffee Table Set",
        volume: 1,
        unit: "Set",
        unitPrice: sofa.price,
        total: sofa.price
      });
    }

    // 4. Flooring
    if (state.flooring.checked) {
      list.push({
        name: "Pemasangan Lantai Vinyl / Parket Kayu",
        volume: parseFloat(totalFloorArea.toFixed(2)),
        unit: "m²",
        unitPrice: state.flooring.pricePerSqM,
        total: totalFloorArea * state.flooring.pricePerSqM
      });
    }

    // 5. Wallpaper
    if (state.wallpaper.checked) {
      const activeArea = Math.min(state.wallpaper.areaSqM, totalWallArea);
      list.push({
        name: "Finishing Wallpaper / Wall Panel Dinding",
        volume: parseFloat(activeArea.toFixed(2)),
        unit: "m²",
        unitPrice: state.wallpaper.pricePerSqM,
        total: activeArea * state.wallpaper.pricePerSqM
      });
    }

    // 6. Drop Ceiling
    if (state.dropCeiling.checked) {
      list.push({
        name: "Pembuatan Plafond Gypsum Drop Ceiling",
        volume: parseFloat(totalFloorArea.toFixed(2)),
        unit: "m²",
        unitPrice: state.dropCeiling.pricePerSqM,
        total: totalFloorArea * state.dropCeiling.pricePerSqM
      });
    }

    // 7. Downlights
    if (state.downlights.checked) {
      list.push({
        name: "Pekerjaan Titik Lampu Downlight LED Premium",
        volume: state.downlights.count,
        unit: "Unit",
        unitPrice: state.downlights.pricePerUnit,
        total: state.downlights.count * state.downlights.pricePerUnit
      });
    }

    // 8. Sockets
    if (state.sockets.checked) {
      list.push({
        name: "Pemasangan Stop Kontak & Saklar Tambahan",
        volume: state.sockets.count,
        unit: "Unit",
        unitPrice: state.sockets.pricePerUnit,
        total: state.sockets.count * state.sockets.pricePerUnit
      });
    }

    // 9. Chandelier
    if (state.chandelier.checked) {
      list.push({
        name: "Instalasi Lampu Gantung Hias (Chandelier/Pendant)",
        volume: state.chandelier.count,
        unit: "Unit",
        unitPrice: state.chandelier.pricePerUnit,
        total: state.chandelier.count * state.chandelier.pricePerUnit
      });
    }

    const grandTotal = list.reduce((acc, item) => acc + item.total, 0);

    return { list, grandTotal };
  }, [state, sofa, selectedMultiplier, totalFloorArea, totalWallArea]);

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Interactive dynamic values
  const kitchenLengthLimit = state.roomLength;
  const wardrobeLengthLimit = state.roomWidth;

  // Render SVG Blueprint Layouts
  const renderTopBlueprint = () => {
    const svgWidth = 400;
    const svgHeight = 240;
    const padding = 40;

    // Center layout scaling
    // Max dimension is 8.0m, we scale uniform
    const maxDimension = 8.0;
    const drawWidth = svgWidth - padding * 2;
    const drawHeight = svgHeight - padding * 2;
    
    // Scale (pixels per meter)
    const scale = Math.min(drawWidth / maxDimension, drawHeight / maxDimension);

    // Actual sizes in px
    const wPx = state.roomLength * scale;
    const hPx = state.roomWidth * scale;

    // Room rect starting coordinate
    const x0 = (svgWidth - wPx) / 2;
    const y0 = (svgHeight - hPx) / 2;

    // Kitchen size in px
    const kitchenSetW = state.kitchenSet.checked ? state.kitchenSet.length * scale : 0;
    const cabinetDepth = 0.6 * scale; // 0.6m depth

    // Wardrobe size in px
    const wardrobeH = state.wardrobe.checked ? state.wardrobe.length * scale : 0;

    return (
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full bg-white select-none">
        {/* Millimeter block pattern */}
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#f1f5f9" strokeWidth="1" />
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#e2e8f0" strokeWidth="1.2" />
          </pattern>
        </defs>
        
        {/* Draw background grid */}
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Room Boundary Box */}
        <rect 
          x={x0} 
          y={y0} 
          width={wPx} 
          height={hPx} 
          fill={styleColorTheme.wallColor} 
          stroke="#475569" 
          strokeWidth="3.5"
          className="transition-all duration-300"
        />

        {/* Dynamic Kitchen Set (Top Wall - Dinding A) */}
        {state.kitchenSet.checked && (
          <g className="transition-all duration-300">
            {/* Main Cabinet */}
            <rect 
              x={x0} 
              y={y0} 
              width={kitchenSetW} 
              height={cabinetDepth} 
              fill={styleColorTheme.woodFill} 
              stroke={styleColorTheme.woodStroke} 
              strokeWidth="2"
            />
            {/* Draw sink details and cabinet lines */}
            <line x1={x0} y1={y0 + cabinetDepth / 2} x2={x0 + kitchenSetW} y2={y0 + cabinetDepth / 2} stroke={styleColorTheme.woodStroke} strokeWidth="1" strokeDasharray="3,3" />
            <rect x={x0 + 10} y={y0 + 5} width={25} height={15} fill="none" stroke={styleColorTheme.woodStroke} strokeWidth="1.5" rx="2" />
            {/* Sink circle drain */}
            <circle cx={x0 + 22} cy={y0 + 12} r="2.5" fill="none" stroke={styleColorTheme.woodStroke} strokeWidth="1" />
            <text x={x0 + kitchenSetW / 2} y={y0 + cabinetDepth - 4} fontSize="8" fontFamily="monospace" fill={styleColorTheme.labelColor} textAnchor="middle" fontWeight="bold">KITCHEN</text>
          </g>
        )}

        {/* Dynamic Wardrobe (Left Wall - Dinding D) */}
        {state.wardrobe.checked && (
          <g className="transition-all duration-300">
            <rect 
              x={x0} 
              y={y0} 
              width={cabinetDepth} 
              height={wardrobeH} 
              fill={styleColorTheme.woodFill} 
              stroke={styleColorTheme.woodStroke} 
              strokeWidth="2"
            />
            {/* Panel lines */}
            <line x1={x0 + cabinetDepth / 2} y1={y0} x2={x0 + cabinetDepth / 2} y2={y0 + wardrobeH} stroke={styleColorTheme.woodStroke} strokeWidth="1" strokeDasharray="3,3" />
            {/* X lines showing wardrobe structure */}
            <line x1={x0} y1={y0} x2={x0 + cabinetDepth} y2={y0 + wardrobeH} stroke={styleColorTheme.woodStroke} strokeWidth="0.5" strokeDasharray="2,2" />
            <line x1={x0 + cabinetDepth} y1={y0} x2={x0} y2={y0 + wardrobeH} stroke={styleColorTheme.woodStroke} strokeWidth="0.5" strokeDasharray="2,2" />
            <text 
              x={x0 + cabinetDepth / 2} 
              y={y0 + wardrobeH / 2} 
              fontSize="8" 
              fontFamily="monospace" 
              fill={styleColorTheme.labelColor} 
              textAnchor="middle" 
              fontWeight="bold"
              transform={`rotate(-90, ${x0 + cabinetDepth / 2}, ${y0 + wardrobeH / 2})`}
            >
              WARDROBE
            </text>
          </g>
        )}

        {/* Sofa minimalist (Bottom Wall - Dinding C) */}
        {sofa.checked && (
          <g className="transition-all duration-300">
            {/* Sofa rect block */}
            <rect 
              x={x0 + wPx / 2 - 25} 
              y={y0 + hPx - 18} 
              width="50" 
              height="15" 
              fill={styleColorTheme.sofaColor} 
              stroke={styleColorTheme.woodStroke} 
              strokeWidth="1.5" 
              rx="3" 
            />
            {/* Left Armrest */}
            <rect x={x0 + wPx / 2 - 28} y={y0 + hPx - 18} width="5" height="15" fill={styleColorTheme.sofaColor} stroke={styleColorTheme.woodStroke} strokeWidth="1" rx="1" />
            {/* Right Armrest */}
            <rect x={x0 + wPx / 2 + 23} y={y0 + hPx - 18} width="5" height="15" fill={styleColorTheme.sofaColor} stroke={styleColorTheme.woodStroke} strokeWidth="1" rx="1" />
            {/* Coffee Table */}
            <ellipse cx={x0 + wPx / 2} cy={y0 + hPx - 32} rx="14" ry="7" fill="#f8fafc" stroke="#64748b" strokeWidth="1" />
            <text x={x0 + wPx / 2} y={y0 + hPx - 30} fontSize="6" fontFamily="sans-serif" fill="#64748b" textAnchor="middle">Table</text>
            <text x={x0 + wPx / 2} y={y0 + hPx - 8} fontSize="7" fontFamily="sans-serif" fill="white" textAnchor="middle" fontWeight="bold">SOFA</text>
          </g>
        )}

        {/* Wall Labels and Dimensions */}
        {/* Dinding A (Top) */}
        <line x1={x0} y1={y0 - 15} x2={x0 + wPx} y2={y0 - 15} stroke="#64748b" strokeWidth="1" />
        <path d={`M ${x0} ${y0 - 18} L ${x0} ${y0 - 12} M ${x0 + wPx} ${y0 - 18} L ${x0 + wPx} ${y0 - 12}`} stroke="#64748b" strokeWidth="1" />
        <text x={x0 + wPx / 2} y={y0 - 22} fontSize="10" fill="#334155" fontFamily="monospace" textAnchor="middle" fontWeight="semibold">
          Dinding A (Atas): {state.roomLength.toFixed(2)}m
        </text>

        {/* Dinding B (Right) */}
        <line x1={x0 + wPx + 15} y1={y0} x2={x0 + wPx + 15} y2={y0 + hPx} stroke="#64748b" strokeWidth="1" />
        <path d={`M ${x0 + wPx + 12} ${y0} L ${x0 + wPx + 18} ${y0} M ${x0 + wPx + 12} ${y0 + hPx} L ${x0 + wPx + 18} ${y0 + hPx}`} stroke="#64748b" strokeWidth="1" />
        <text 
          x={x0 + wPx + 25} 
          y={y0 + hPx / 2} 
          fontSize="10" 
          fill="#334155" 
          fontFamily="monospace" 
          textAnchor="middle" 
          fontWeight="semibold"
          transform={`rotate(90, ${x0 + wPx + 25}, ${y0 + hPx / 2})`}
        >
          Dinding B (Kanan): {state.roomWidth.toFixed(2)}m
        </text>

        {/* Dinding C (Bottom) */}
        <line x1={x0} y1={y0 + hPx + 15} x2={x0 + wPx} y2={y0 + hPx + 15} stroke="#64748b" strokeWidth="1" />
        <path d={`M ${x0} ${y0 + hPx + 12} L ${x0} ${y0 + hPx + 18} M ${x0 + wPx} ${y0 + hPx + 12} L ${x0 + wPx} ${y0 + hPx + 18}`} stroke="#64748b" strokeWidth="1" />
        <text x={x0 + wPx / 2} y={y0 + hPx + 26} fontSize="10" fill="#334155" fontFamily="monospace" textAnchor="middle" fontWeight="semibold">
          Dinding C (Bawah): {state.roomLength.toFixed(2)}m
        </text>

        {/* Dinding D (Left) */}
        <line x1={x0 - 15} y1={y0} x2={x0 - 15} y2={y0 + hPx} stroke="#64748b" strokeWidth="1" />
        <path d={`M ${x0 - 18} ${y0} L ${x0 - 12} ${y0} M ${x0 - 18} ${y0 + hPx} L ${x0 - 12} ${y0 + hPx}`} stroke="#64748b" strokeWidth="1" />
        <text 
          x={x0 - 25} 
          y={y0 + hPx / 2} 
          fontSize="10" 
          fill="#334155" 
          fontFamily="monospace" 
          textAnchor="middle" 
          fontWeight="semibold"
          transform={`rotate(-90, ${x0 - 25}, ${y0 + hPx / 2})`}
        >
          Dinding D (Kiri): {state.roomWidth.toFixed(2)}m
        </text>

        {/* Grid scale indication */}
        <text x="12" y="16" fontSize="7" fill="#64748b" fontFamily="monospace">Denah Tata Ruang (Top View)</text>
      </svg>
    );
  };

  const renderSideBlueprint = () => {
    const svgWidth = 400;
    const svgHeight = 160;
    const groundY = 130;
    
    // Proportional height mapping
    // Map ceiling height max (3.5m) to 95 pixels (ceilingY = 130 - 95 = 35)
    // Map ceiling height min (2.5m) to 68 pixels (ceilingY = 130 - 68 = 62)
    // ceilingHeight factor: 30 pixels per meter
    const pScale = 28; 
    const ceilingY = groundY - state.ceilingHeight * pScale;

    return (
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full bg-white select-none">
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* LED Glow effect definition */}
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Wall Background */}
        <rect x="50" y={ceilingY} width="300" height={state.ceilingHeight * pScale} fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

        {/* Ceiling Line */}
        {state.dropCeiling.checked ? (
          // Drop Ceiling stepped line
          <g>
            {/* LED Glow line */}
            <path 
              d={`M 50 ${ceilingY + 10} L 100 ${ceilingY + 10} L 100 ${ceilingY} L 300 ${ceilingY} L 300 ${ceilingY + 10} L 350 ${ceilingY + 10}`} 
              fill="none" 
              stroke="#fbbf24" 
              strokeWidth="6" 
              filter="url(#glow)" 
              opacity="0.75"
            />
            {/* Plafond physical structure */}
            <path 
              d={`M 50 ${ceilingY + 8} L 100 ${ceilingY + 8} L 100 ${ceilingY} L 300 ${ceilingY} L 300 ${ceilingY + 8} L 350 ${ceilingY + 8}`} 
              fill="none" 
              stroke="#334155" 
              strokeWidth="3.5" 
            />
            <text x="200" y={ceilingY - 5} fontSize="7" fill="#ca8a04" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              DROP CEILING ACTIVE (WITH HIDDEN LED COVE LIGHTING)
            </text>
          </g>
        ) : (
          // Standard Flat Ceiling
          <g>
            <line x1="50" y1={ceilingY} x2="350" y2={ceilingY} stroke="#334155" strokeWidth="3" />
            <text x="200" y={ceilingY - 5} fontSize="7" fill="#64748b" fontFamily="monospace" textAnchor="middle">FLAT CEILING</text>
          </g>
        )}

        {/* Ground Floor Line */}
        <line x1="30" y1={groundY} x2="370" y2={groundY} stroke="#1e293b" strokeWidth="4" />
        <text x="35" y={groundY + 14} fontSize="8" fill="#1e293b" fontFamily="sans-serif" fontWeight="bold">LANTAI</text>

        {/* Double-headed arrow showing ceiling height */}
        <line x1="365" y1={ceilingY} x2="365" y2={groundY} stroke="#64748b" strokeWidth="1" strokeDasharray="2,2" />
        <path d={`M 362 ${ceilingY} L 368 ${ceilingY} M 362 ${groundY} L 368 ${groundY}`} stroke="#64748b" strokeWidth="1" />
        <text x="375" y={(ceilingY + groundY) / 2 + 3} fontSize="8" fill="#475569" fontFamily="monospace" fontWeight="bold">
          {state.ceilingHeight.toFixed(2)}m
        </text>

        {/* Potongan Furniture (Side View) */}
        {state.kitchenSet.checked && (
          <g className="transition-all duration-300">
            {/* Lower Cabinet (height: 0.85m) */}
            <rect 
              x="120" 
              y={groundY - 0.85 * pScale} 
              width="60" 
              height={0.85 * pScale} 
              fill={styleColorTheme.woodFill} 
              stroke={styleColorTheme.woodStroke} 
              strokeWidth="1.5" 
            />
            {/* Countertop Line */}
            <rect 
              x="118" 
              y={groundY - 0.88 * pScale} 
              width="64" 
              height={0.03 * pScale} 
              fill="#ffffff" 
              stroke={styleColorTheme.woodStroke} 
              strokeWidth="1" 
            />
            {/* Upper Cabinet (height: 0.8m, aligned near top, with 0.6m backsplash space) */}
            <rect 
              x="120" 
              y={groundY - (0.85 + 0.6 + 0.8) * pScale} 
              width="50" 
              height={0.8 * pScale} 
              fill={styleColorTheme.woodFill} 
              stroke={styleColorTheme.woodStroke} 
              strokeWidth="1.5" 
            />
            <text x="150" y={groundY - 12} fontSize="7" fill={styleColorTheme.labelColor} textAnchor="middle" fontWeight="semibold">Base Cab</text>
            <text x="145" y={groundY - (0.85 + 0.6 + 0.3) * pScale} fontSize="7" fill={styleColorTheme.labelColor} textAnchor="middle" fontWeight="semibold">Top Cab</text>
            <text x="145" y={groundY - (0.85 + 0.3) * pScale} fontSize="6" fill="#ca8a04" textAnchor="middle" fontStyle="italic">Backsplash 0.6m</text>
          </g>
        )}

        {/* Room side wall boundary labels */}
        <text x="12" y="16" fontSize="7" fill="#64748b" fontFamily="monospace">Potongan Tinggi Dinding (Wall Elevation)</text>
      </svg>
    );
  };

  return (
    <section id="rab-calculator" className="py-24 bg-slate-100 relative print:bg-white print:py-0">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header Section */}
        <div className="text-center mb-10 print:hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-700 tracking-wider uppercase mb-4">
            <Calculator className="w-3.5 h-3.5" /> Estimator Instan
          </div>
          <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-neutral-900 mb-4">
            Kalkulator RAB <span className="text-amber-600">Interior Kustom</span>
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto font-light text-sm md:text-base">
            Rencanakan anggaran renovasi Anda secara transparan. Sesuaikan dimensi ruangan, pilih kabinet, finishing, hingga sistem kelistrikan dengan kalkulasi biaya real-time otomatis.
          </p>
        </div>

        {/* MOBILE STICKY REAL-TIME BAR (Visible on Mobile/Tablet and when scrolling down) */}
        <div className="sticky top-16 md:top-20 left-0 right-0 z-40 bg-neutral-900 border border-neutral-800 rounded-2xl p-4 mb-6 shadow-xl lg:hidden flex flex-col gap-3 print:hidden">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">Estimasi Anggaran RAB</span>
              <span className="text-xl md:text-2xl font-bold font-mono text-amber-500">
                {formatRupiah(calculations.grandTotal)}
              </span>
            </div>

            <button
              onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 text-neutral-950 text-xs font-bold shadow-md hover:bg-amber-400 active:scale-95 transition-all"
            >
              <Grid className="w-3.5 h-3.5" />
              {isMobileDrawerOpen ? "Sembunyikan Denah" : "Lihat Denah 2D"}
            </button>
          </div>

          {/* Collapsible Interactive Drawer inside Mobile Sticky Bar */}
          {isMobileDrawerOpen && (
            <div className="bg-white border border-neutral-200 rounded-xl p-3 flex flex-col gap-4 overflow-hidden animate-in slide-in-from-top duration-300">
              <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Visualisasi Interaktif (Mobile Drawer)</span>
                <span className="text-[10px] font-mono text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{state.designStyle}</span>
              </div>
              <div className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-slate-200">
                {renderTopBlueprint()}
              </div>
              <div className="w-full aspect-[16/6] rounded-lg overflow-hidden border border-slate-200">
                {renderSideBlueprint()}
              </div>
              <div className="bg-amber-50 text-[10.5px] text-amber-800 p-2 rounded-lg leading-relaxed flex gap-1.5 items-start">
                <InfoIcon className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-amber-600" />
                <span>Denah di atas otomatis merefleksikan pergeseran ukuran & penambahan perabot Anda di form bawah!</span>
              </div>
            </div>
          )}
        </div>

        {/* SPLIT SCREEN MAIN CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: 2D VISUALIZATION BOARD (Sticky Pinning on desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 hidden lg:block z-10 print:hidden">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xl flex flex-col gap-6">
              
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-sm font-semibold text-slate-800 font-sans tracking-tight">Rencana Gambar Denah Kustom</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-mono font-bold uppercase tracking-wider border border-amber-200">
                  {state.designStyle}
                </span>
              </div>

              {/* Diagram Denah Atas Container (60%) */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs text-slate-400 font-mono px-1">
                  <span>A. DENAH FURNITUR (TOP VIEW)</span>
                  <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">Skala Proporsional</span>
                </div>
                <div className="w-full border border-slate-100 rounded-2xl overflow-hidden shadow-sm bg-white aspect-[4/3]">
                  {renderTopBlueprint()}
                </div>
              </div>

              {/* Diagram Potongan Vertikal (40%) */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs text-slate-400 font-mono px-1">
                  <span>B. TINGGI ELEVASI (FRONT VIEW)</span>
                  <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">Skala Proporsional</span>
                </div>
                <div className="w-full border border-slate-100 rounded-2xl overflow-hidden shadow-sm bg-white aspect-[16/7]">
                  {renderSideBlueprint()}
                </div>
              </div>

              {/* Bottom Real-time Quick Info */}
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex flex-col gap-2 text-xs text-amber-800">
                <div className="flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Real-Time Blueprint Sync</span>
                </div>
                <p className="font-light leading-relaxed">
                  Dimensi denah persegi panjang dan item kustom (Kitchen, Wardrobe, Sofa, Drop Ceiling) akan langsung bertambah besar atau bergeser secara proporsional sesuai parameter masukan Anda.
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT PANEL: MULTI-STEP FORM (Stepper) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xl print:shadow-none print:border-none print:p-0">
            
            {/* Form Header Steps indicators */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100 print:hidden">
              {[1, 2, 3, 4, 5].map((stepNum) => (
                <div key={stepNum} className="flex items-center flex-1 last:flex-none">
                  <button
                    onClick={() => {
                      if (stepNum <= currentStep || stepNum === 5) {
                        setCurrentStep(stepNum);
                      }
                    }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-sm font-bold transition-all ${
                      currentStep === stepNum
                        ? "bg-amber-500 text-neutral-950 ring-4 ring-amber-500/20"
                        : currentStep > stepNum
                        ? "bg-amber-100 text-amber-700 font-bold"
                        : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                    }`}
                  >
                    {currentStep > stepNum ? <Check className="w-4 h-4 stroke-[3px]" /> : stepNum}
                  </button>
                  {stepNum < 5 && (
                    <div className={`h-1 flex-1 mx-2 rounded-full transition-all ${currentStep > stepNum ? "bg-amber-400" : "bg-slate-100"}`} />
                  )}
                </div>
              ))}
            </div>

            {/* STEP CONTENT SWITCHERS */}
            <div className="min-h-[420px]">
              
              {/* TAHAP 1: DIMENSI & PEMILIHAN ZONA */}
              {currentStep === 1 && (
                <div className="animate-in fade-in slide-in-from-right duration-300">
                  <span className="text-[10px] font-mono text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">Langkah 1 dari 5</span>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-2 mb-1">Tentukan Ukuran & Fungsi Ruang</h3>
                  <p className="text-slate-500 text-xs font-light mb-6">Masukkan panjang, lebar dinding utama, tinggi plafond ideal ruangan Anda, serta tentukan preferensi gaya arsitektur yang diinginkan.</p>

                  <div className="space-y-6">
                    {/* Room Length Slider & Numeric Input */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-slate-700">Panjang Ruangan (Dinding A & C)</label>
                        <div className="flex items-center gap-2">
                          <input 
                            type="number" 
                            step="0.1"
                            min={minLength}
                            max={maxLength}
                            value={state.roomLength}
                            onChange={(e) => updateState("roomLength", Math.max(minLength, Math.min(maxLength, parseFloat(e.target.value) || minLength)))}
                            className="w-16 text-center border border-slate-200 rounded-lg py-1 px-1.5 text-xs font-mono font-bold text-slate-800 focus:outline-amber-500"
                          />
                          <span className="text-xs text-slate-500 font-mono">meter</span>
                        </div>
                      </div>
                      <input 
                        type="range" 
                        min={minLength}
                        max={maxLength}
                        step="0.1"
                        value={state.roomLength}
                        onChange={(e) => updateState("roomLength", parseFloat(e.target.value))}
                        className="w-full accent-amber-500 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                        <span>Min: {minLength.toFixed(1)}m</span>
                        <span>Max: {maxLength.toFixed(1)}m</span>
                      </div>
                    </div>

                    {/* Room Width Slider & Numeric Input */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-slate-700">Lebar Ruangan (Dinding B & D)</label>
                        <div className="flex items-center gap-2">
                          <input 
                            type="number" 
                            step="0.1"
                            min={minWidth}
                            max={maxWidth}
                            value={state.roomWidth}
                            onChange={(e) => updateState("roomWidth", Math.max(minWidth, Math.min(maxWidth, parseFloat(e.target.value) || minWidth)))}
                            className="w-16 text-center border border-slate-200 rounded-lg py-1 px-1.5 text-xs font-mono font-bold text-slate-800 focus:outline-amber-500"
                          />
                          <span className="text-xs text-slate-500 font-mono">meter</span>
                        </div>
                      </div>
                      <input 
                        type="range" 
                        min={minWidth}
                        max={maxWidth}
                        step="0.1"
                        value={state.roomWidth}
                        onChange={(e) => updateState("roomWidth", parseFloat(e.target.value))}
                        className="w-full accent-amber-500 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                        <span>Min: {minWidth.toFixed(1)}m</span>
                        <span>Max: {maxWidth.toFixed(1)}m</span>
                      </div>
                    </div>

                    {/* Ceiling Height Slider & Numeric Input */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-slate-700">Tinggi Plafond Ruangan</label>
                        <div className="flex items-center gap-2">
                          <input 
                            type="number" 
                            step="0.1"
                            min={minCeiling}
                            max={maxCeiling}
                            value={state.ceilingHeight}
                            onChange={(e) => updateState("ceilingHeight", Math.max(minCeiling, Math.min(maxCeiling, parseFloat(e.target.value) || minCeiling)))}
                            className="w-16 text-center border border-slate-200 rounded-lg py-1 px-1.5 text-xs font-mono font-bold text-slate-800 focus:outline-amber-500"
                          />
                          <span className="text-xs text-slate-500 font-mono">meter</span>
                        </div>
                      </div>
                      <input 
                        type="range" 
                        min={minCeiling}
                        max={maxCeiling}
                        step="0.1"
                        value={state.ceilingHeight}
                        onChange={(e) => updateState("ceilingHeight", parseFloat(e.target.value))}
                        className="w-full accent-amber-500 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                        <span>Min: {minCeiling.toFixed(1)}m</span>
                        <span>Max: {maxCeiling.toFixed(1)}m</span>
                      </div>
                    </div>

                    {/* Design Style Dropdown */}
                    <div className="pt-4 border-t border-slate-100">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Pilihan Gaya Desain Interior</label>
                      <select
                        value={state.designStyle}
                        onChange={(e) => updateState("designStyle", e.target.value as DesignStyle)}
                        className="w-full border border-slate-200 rounded-xl py-3 px-4 text-sm text-slate-800 bg-white focus:outline-amber-500 font-medium"
                      >
                        <option value="Modern Minimalis">Modern Minimalis (Monochrome Slate & Clean Lines)</option>
                        <option value="Japandi Natural">Japandi Natural (Warm Oak & Cozy Honey accents)</option>
                        <option value="Classic Luxury">Classic Luxury (Golden Mahogany & High Ornamentation)</option>
                        <option value="Industrial">Industrial (Walnut & Reclaimed Dark Wood Frame)</option>
                      </select>
                      <p className="text-[11px] text-slate-400 font-light mt-1.5 leading-relaxed">
                        *Gaya desain yang dipilih otomatis akan merubah tema warna, nuansa material, dan tekstur gambar simulasi pada diagram cetak denah sebelah kiri.
                      </p>
                    </div>

                  </div>
                </div>
              )}

              {/* TAHAP 2: CUSTOM FURNITURE BORONGAN */}
              {currentStep === 2 && (
                <div className="animate-in fade-in slide-in-from-right duration-300">
                  <span className="text-[10px] font-mono text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">Langkah 2 dari 5</span>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-2 mb-1">Kustomisasi Kabinet & Furniture</h3>
                  <p className="text-slate-500 text-xs font-light mb-6">Centang jenis pekerjaan kabinet kustom di bawah, lalu sesuaikan panjang kabinet yang ingin dibuat serta tipe finishing eksterior.</p>

                  <div className="space-y-6">
                    
                    {/* Kitchen Set Checked and Custom sliders */}
                    <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            id="kitchenCheck"
                            checked={state.kitchenSet.checked}
                            onChange={(e) => updateNestedState("kitchenSet", "checked", e.target.checked)}
                            className="w-5 h-5 accent-amber-500 cursor-pointer rounded"
                          />
                          <label htmlFor="kitchenCheck" className="text-sm font-bold text-slate-800 cursor-pointer">Pembuatan Kitchen Set (Kabinet)</label>
                        </div>
                        <span className="text-[10.5px] font-mono text-slate-400">Satuan m¹ (Meter Lari)</span>
                      </div>

                      {state.kitchenSet.checked && (
                        <div className="pl-8 flex flex-col gap-4 border-l-2 border-amber-500/20 pt-2 animate-in fade-in duration-200">
                          {/* Length Slider */}
                          <div>
                            <div className="flex justify-between items-center text-xs mb-1.5">
                              <span className="text-slate-600 font-medium">Panjang Kabinet Kitchen Set</span>
                              <span className="font-mono font-bold text-slate-800">{state.kitchenSet.length} meter lari</span>
                            </div>
                            <input 
                              type="range" 
                              min="1.0"
                              max={kitchenLengthLimit}
                              step="0.1"
                              value={state.kitchenSet.length}
                              onChange={(e) => updateNestedState("kitchenSet", "length", parseFloat(e.target.value))}
                              className="w-full accent-amber-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                              <span>Min: 1.0m</span>
                              <span>Maksimal (Panjang Ruang): {kitchenLengthLimit.toFixed(1)}m</span>
                            </div>
                          </div>

                          {/* Base Price Slider */}
                          <div>
                            <div className="flex justify-between items-center text-xs mb-1.5">
                              <span className="text-slate-600 font-medium">Harga Dasar Per Meter Lari</span>
                              <span className="font-mono font-bold text-amber-600">{formatRupiah(state.kitchenSet.pricePerMeter)} / m¹</span>
                            </div>
                            <input 
                              type="range" 
                              min="1800000"
                              max="3500000"
                              step="100000"
                              value={state.kitchenSet.pricePerMeter}
                              onChange={(e) => updateNestedState("kitchenSet", "pricePerMeter", parseInt(e.target.value))}
                              className="w-full accent-amber-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                              <span>Min: Rp 1,8 Jt</span>
                              <span>Max: Rp 3,5 Jt</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Wardrobe Checkbox and Custom sliders */}
                    <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            id="wardrobeCheck"
                            checked={state.wardrobe.checked}
                            onChange={(e) => updateNestedState("wardrobe", "checked", e.target.checked)}
                            className="w-5 h-5 accent-amber-500 cursor-pointer rounded"
                          />
                          <label htmlFor="wardrobeCheck" className="text-sm font-bold text-slate-800 cursor-pointer">Pembuatan Wardrobe / Lemari Pakaian</label>
                        </div>
                        <span className="text-[10.5px] font-mono text-slate-400">Satuan m¹ (Meter Lari)</span>
                      </div>

                      {state.wardrobe.checked && (
                        <div className="pl-8 flex flex-col gap-4 border-l-2 border-amber-500/20 pt-2 animate-in fade-in duration-200">
                          {/* Length Slider */}
                          <div>
                            <div className="flex justify-between items-center text-xs mb-1.5">
                              <span className="text-slate-600 font-medium">Panjang Lemari Wardrobe</span>
                              <span className="font-mono font-bold text-slate-800">{state.wardrobe.length} meter lari</span>
                            </div>
                            <input 
                              type="range" 
                              min="1.0"
                              max={wardrobeLengthLimit}
                              step="0.1"
                              value={state.wardrobe.length}
                              onChange={(e) => updateNestedState("wardrobe", "length", parseFloat(e.target.value))}
                              className="w-full accent-amber-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                              <span>Min: 1.0m</span>
                              <span>Maksimal (Lebar Ruang): {wardrobeLengthLimit.toFixed(1)}m</span>
                            </div>
                          </div>

                          {/* Base Price Slider */}
                          <div>
                            <div className="flex justify-between items-center text-xs mb-1.5">
                              <span className="text-slate-600 font-medium">Harga Dasar Per Meter Lari</span>
                              <span className="font-mono font-bold text-amber-600">{formatRupiah(state.wardrobe.pricePerMeter)} / m¹</span>
                            </div>
                            <input 
                              type="range" 
                              min="2000000"
                              max="4000000"
                              step="100000"
                              value={state.wardrobe.pricePerMeter}
                              onChange={(e) => updateNestedState("wardrobe", "pricePerMeter", parseInt(e.target.value))}
                              className="w-full accent-amber-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                              <span>Min: Rp 2,0 Jt</span>
                              <span>Max: Rp 4,0 Jt</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Sofa Minimalis & Coffee Table Set - Added as requested */}
                    <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            id="sofaCheck"
                            checked={sofa.checked}
                            onChange={(e) => setSofa((prev) => ({ ...prev, checked: e.target.checked }))}
                            className="w-5 h-5 accent-amber-500 cursor-pointer rounded"
                          />
                          <label htmlFor="sofaCheck" className="text-sm font-bold text-slate-800 cursor-pointer">Pekerjaan Sofa Minimalis & Coffee Table Set</label>
                        </div>
                        <span className="text-[10.5px] font-mono text-slate-400">Satuan Set</span>
                      </div>

                      {sofa.checked && (
                        <div className="pl-8 flex flex-col gap-3 border-l-2 border-amber-500/20 pt-1 animate-in fade-in duration-200">
                          <div>
                            <div className="flex justify-between items-center text-xs mb-1.5">
                              <span className="text-slate-600 font-medium">Harga Set Sofa + Meja (Custom Built)</span>
                              <span className="font-mono font-bold text-amber-600">{formatRupiah(sofa.price)}</span>
                            </div>
                            <input 
                              type="range" 
                              min="4500000"
                              max="9000000"
                              step="250000"
                              value={sofa.price}
                              onChange={(e) => setSofa((prev) => ({ ...prev, price: parseInt(e.target.value) }))}
                              className="w-full accent-amber-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                              <span>Min: Rp 4.5 Jt</span>
                              <span>Max: Rp 9.0 Jt</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Material Finishing Global Multiplier Dropdown */}
                    <div className="pt-4 border-t border-slate-100">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Pilihan Material Finishing Furniture</label>
                      <select
                        value={state.materialFinishing}
                        onChange={(e) => updateState("materialFinishing", e.target.value as MaterialFinishing)}
                        className="w-full border border-slate-200 rounded-xl py-2.5 px-4 text-sm text-slate-800 bg-white focus:outline-amber-500 font-medium"
                      >
                        <option value="HPL Standar">HPL Standar (Pengali ×1.0)</option>
                        <option value="HPL Premium / Tekstur">HPL Premium / Tekstur Kayu / Kulit Jeruk (Pengali ×1.15)</option>
                        <option value="Cat Duco">Cat Duco Premium Semi Glossy / Doff (Pengali ×1.40)</option>
                      </select>
                    </div>

                    {/* Checkbox Fitur Tambahan Opsi Mikro */}
                    <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Opsi Mikro Perabot Kustom</span>
                      
                      <div className="flex items-start gap-3">
                        <input 
                          type="checkbox" 
                          id="hingesSlowMo"
                          checked={state.hingesSlowMo}
                          onChange={(e) => updateState("hingesSlowMo", e.target.checked)}
                          className="w-4 h-4 accent-amber-500 mt-0.5 cursor-pointer"
                        />
                        <div>
                          <label htmlFor="hingesSlowMo" className="text-sm font-medium text-slate-700 cursor-pointer block">Gunakan Engsel & Rel Laci Slow-motion (Soft Close)</label>
                          <span className="text-[11px] text-slate-400">+Rp 150.000 per meter lari furniture yang diproduksi. Menghindari benturan pintu.</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <input 
                          type="checkbox" 
                          id="ledStrip"
                          checked={state.ledStrip}
                          onChange={(e) => updateState("ledStrip", e.target.checked)}
                          className="w-4 h-4 accent-amber-500 mt-0.5 cursor-pointer"
                        />
                        <div>
                          <label htmlFor="ledStrip" className="text-sm font-medium text-slate-700 cursor-pointer block">Tambah Lampu LED Strip Tersembunyi (Warm Glow)</label>
                          <span className="text-[11px] text-slate-400">+Rp 95.000 per meter lari furniture. Dipasang di ceruk bawah kabinet.</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* TAHAP 3: FINISHING DINDING, LANTAI & PLAFOND */}
              {currentStep === 3 && (
                <div className="animate-in fade-in slide-in-from-right duration-300">
                  <span className="text-[10px] font-mono text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">Langkah 3 dari 5</span>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-2 mb-1">Pelapis Permukaan & Estetika Ruang</h3>
                  <p className="text-slate-500 text-xs font-light mb-6">Hitung pelapisan lantai kayu vinyl, pemasangan wallpaper bermotif pada keliling dinding, serta instalasi drop ceiling plafon mewah.</p>

                  {/* Surface Info Box */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6 grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 font-mono uppercase block">Volume Luas Lantai:</span>
                      <span className="font-bold text-slate-800 font-mono text-sm">{totalFloorArea.toFixed(2)} m²</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-mono uppercase block">Volume Luas Dinding Total:</span>
                      <span className="font-bold text-slate-800 font-mono text-sm">{totalWallArea.toFixed(2)} m²</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Vinyl Flooring Checkbox & Sliders */}
                    <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            id="flooringCheck"
                            checked={state.flooring.checked}
                            onChange={(e) => updateNestedState("flooring", "checked", e.target.checked)}
                            className="w-5 h-5 accent-amber-500 cursor-pointer rounded"
                          />
                          <label htmlFor="flooringCheck" className="text-sm font-bold text-slate-800 cursor-pointer">Pemasangan Lantai Vinyl / Parket</label>
                        </div>
                        <span className="text-[10.5px] font-mono text-slate-400">Volume: {totalFloorArea.toFixed(2)}m²</span>
                      </div>

                      {state.flooring.checked && (
                        <div className="pl-8 flex flex-col gap-4 border-l-2 border-amber-500/20 pt-2 animate-in fade-in duration-200">
                          <div>
                            <div className="flex justify-between items-center text-xs mb-1.5">
                              <span className="text-slate-600 font-medium">Biaya Lantai Vinyl Per Meter Persegi (m²)</span>
                              <span className="font-mono font-bold text-amber-600">{formatRupiah(state.flooring.pricePerSqM)} / m²</span>
                            </div>
                            <input 
                              type="range" 
                              min="150000"
                              max="400000"
                              step="10000"
                              value={state.flooring.pricePerSqM}
                              onChange={(e) => updateNestedState("flooring", "pricePerSqM", parseInt(e.target.value))}
                              className="w-full accent-amber-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                              <span>Min: Rp 150.000</span>
                              <span>Max: Rp 400.000</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Wallpaper Finishing Checkbox, Area Slider & Price Slider */}
                    <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            id="wallpaperCheck"
                            checked={state.wallpaper.checked}
                            onChange={(e) => updateNestedState("wallpaper", "checked", e.target.checked)}
                            className="w-5 h-5 accent-amber-500 cursor-pointer rounded"
                          />
                          <label htmlFor="wallpaperCheck" className="text-sm font-bold text-slate-800 cursor-pointer">Finishing Wallpaper Dinding</label>
                        </div>
                        <span className="text-[10.5px] font-mono text-slate-400">Pekerjaan Dinding</span>
                      </div>

                      {state.wallpaper.checked && (
                        <div className="pl-8 flex flex-col gap-4 border-l-2 border-amber-500/20 pt-2 animate-in fade-in duration-200">
                          {/* Area Slider */}
                          <div>
                            <div className="flex justify-between items-center text-xs mb-1.5">
                              <span className="text-slate-600 font-medium">Luas Area Dinding yang Dipasang</span>
                              <span className="font-mono font-bold text-slate-800">{state.wallpaper.areaSqM} m²</span>
                            </div>
                            <input 
                              type="range" 
                              min="5"
                              max={Math.ceil(totalWallArea)}
                              step="1"
                              value={Math.min(state.wallpaper.areaSqM, Math.ceil(totalWallArea))}
                              onChange={(e) => updateNestedState("wallpaper", "areaSqM", parseInt(e.target.value))}
                              className="w-full accent-amber-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                              <span>Min: 5m²</span>
                              <span>Maksimal (Dinding Total): {totalWallArea.toFixed(1)}m²</span>
                            </div>
                          </div>

                          {/* Price Slider */}
                          <div>
                            <div className="flex justify-between items-center text-xs mb-1.5">
                              <span className="text-slate-600 font-medium">Biaya Wallpaper Per Meter Persegi (m²)</span>
                              <span className="font-mono font-bold text-amber-600">{formatRupiah(state.wallpaper.pricePerSqM)} / m²</span>
                            </div>
                            <input 
                              type="range" 
                              min="60000"
                              max="350000"
                              step="5000"
                              value={state.wallpaper.pricePerSqM}
                              onChange={(e) => updateNestedState("wallpaper", "pricePerSqM", parseInt(e.target.value))}
                              className="w-full accent-amber-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                              <span>Min: Rp 60.000</span>
                              <span>Max: Rp 350.000</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Drop Ceiling Plafond Checkbox & Price Slider */}
                    <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            id="dropCeilingCheck"
                            checked={state.dropCeiling.checked}
                            onChange={(e) => updateNestedState("dropCeiling", "checked", e.target.checked)}
                            className="w-5 h-5 accent-amber-500 cursor-pointer rounded"
                          />
                          <label htmlFor="dropCeilingCheck" className="text-sm font-bold text-slate-800 cursor-pointer">Pembuatan Plafond Drop Ceiling</label>
                        </div>
                        <span className="text-[10.5px] font-mono text-slate-400">Volume: {totalFloorArea.toFixed(2)}m²</span>
                      </div>

                      {state.dropCeiling.checked && (
                        <div className="pl-8 flex flex-col gap-4 border-l-2 border-amber-500/20 pt-2 animate-in fade-in duration-200">
                          <div>
                            <div className="flex justify-between items-center text-xs mb-1.5">
                              <span className="text-slate-600 font-medium">Biaya Drop Ceiling Per Meter Persegi (m²)</span>
                              <span className="font-mono font-bold text-amber-600">{formatRupiah(state.dropCeiling.pricePerSqM)} / m²</span>
                            </div>
                            <input 
                              type="range" 
                              min="120000"
                              max="250000"
                              step="10000"
                              value={state.dropCeiling.pricePerSqM}
                              onChange={(e) => updateNestedState("dropCeiling", "pricePerSqM", parseInt(e.target.value))}
                              className="w-full accent-amber-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                              <span>Min: Rp 120.000</span>
                              <span>Max: Rp 250.000</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              )}

              {/* TAHAP 4: MEKANIKAL, ELEKTRIKAL & AMBIENCE (MEP) */}
              {currentStep === 4 && (
                <div className="animate-in fade-in slide-in-from-right duration-300">
                  <span className="text-[10px] font-mono text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">Langkah 4 dari 5</span>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-2 mb-1">Pencahayaan & Titik Daya (MEP)</h3>
                  <p className="text-slate-500 text-xs font-light mb-6">Hitung kebutuhan titik pencahayaan lampu downlight, penambahan stop kontak premium untuk colokan, serta pemasangan lampu gantung hias.</p>

                  <div className="space-y-6">
                    
                    {/* Downlights LED Checkbox, Count & Slider price */}
                    <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            id="downlightsCheck"
                            checked={state.downlights.checked}
                            onChange={(e) => updateNestedState("downlights", "checked", e.target.checked)}
                            className="w-5 h-5 accent-amber-500 cursor-pointer rounded"
                          />
                          <label htmlFor="downlightsCheck" className="text-sm font-bold text-slate-800 cursor-pointer">Pekerjaan Titik Lampu Downlight LED</label>
                        </div>
                        <span className="text-xs text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-full">{state.downlights.count} Unit</span>
                      </div>

                      {state.downlights.checked && (
                        <div className="pl-8 flex flex-col gap-4 border-l-2 border-amber-500/20 pt-2 animate-in fade-in duration-200">
                          {/* Unit count */}
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-600 font-medium">Jumlah Titik Lampu</span>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => updateNestedState("downlights", "count", Math.max(1, state.downlights.count - 1))}
                                className="w-7 h-7 rounded-lg border border-slate-200 text-slate-600 font-bold hover:bg-slate-100 flex items-center justify-center"
                              >
                                -
                              </button>
                              <span className="font-mono font-bold text-slate-800 w-6 text-center">{state.downlights.count}</span>
                              <button 
                                onClick={() => updateNestedState("downlights", "count", state.downlights.count + 1)}
                                className="w-7 h-7 rounded-lg border border-slate-200 text-slate-600 font-bold hover:bg-slate-100 flex items-center justify-center"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Price slider */}
                          <div>
                            <div className="flex justify-between items-center text-xs mb-1.5">
                              <span className="text-slate-600 font-medium">Biaya Per Titik Lampu (Termasuk kabel & bobokan)</span>
                              <span className="font-mono font-bold text-amber-600">{formatRupiah(state.downlights.pricePerUnit)} / unit</span>
                            </div>
                            <input 
                              type="range" 
                              min="45000"
                              max="120000"
                              step="5000"
                              value={state.downlights.pricePerUnit}
                              onChange={(e) => updateNestedState("downlights", "pricePerUnit", parseInt(e.target.value))}
                              className="w-full accent-amber-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                              <span>Min: Rp 45.000</span>
                              <span>Max: Rp 120.000</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Sockets premium Checkbox, Count & Slider price */}
                    <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            id="socketsCheck"
                            checked={state.sockets.checked}
                            onChange={(e) => updateNestedState("sockets", "checked", e.target.checked)}
                            className="w-5 h-5 accent-amber-500 cursor-pointer rounded"
                          />
                          <label htmlFor="socketsCheck" className="text-sm font-bold text-slate-800 cursor-pointer">Stop Kontak & Saklar Tambahan (Merek Premium)</label>
                        </div>
                        <span className="text-xs text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-full">{state.sockets.count} Unit</span>
                      </div>

                      {state.sockets.checked && (
                        <div className="pl-8 flex flex-col gap-4 border-l-2 border-amber-500/20 pt-2 animate-in fade-in duration-200">
                          {/* Unit count */}
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-600 font-medium">Jumlah Titik Colokan</span>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => updateNestedState("sockets", "count", Math.max(1, state.sockets.count - 1))}
                                className="w-7 h-7 rounded-lg border border-slate-200 text-slate-600 font-bold hover:bg-slate-100 flex items-center justify-center"
                              >
                                -
                              </button>
                              <span className="font-mono font-bold text-slate-800 w-6 text-center">{state.sockets.count}</span>
                              <button 
                                onClick={() => updateNestedState("sockets", "count", state.sockets.count + 1)}
                                className="w-7 h-7 rounded-lg border border-slate-200 text-slate-600 font-bold hover:bg-slate-100 flex items-center justify-center"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Price slider */}
                          <div>
                            <div className="flex justify-between items-center text-xs mb-1.5">
                              <span className="text-slate-600 font-medium">Biaya Per Unit (Inbowdus + Stop Kontak)</span>
                              <span className="font-mono font-bold text-amber-600">{formatRupiah(state.sockets.pricePerUnit)} / unit</span>
                            </div>
                            <input 
                              type="range" 
                              min="35000"
                              max="90000"
                              step="5000"
                              value={state.sockets.pricePerUnit}
                              onChange={(e) => updateNestedState("sockets", "pricePerUnit", parseInt(e.target.value))}
                              className="w-full accent-amber-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                              <span>Min: Rp 35.000</span>
                              <span>Max: Rp 90.000</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Chandelier Checkbox, Count & Slider price */}
                    <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            id="chandelierCheck"
                            checked={state.chandelier.checked}
                            onChange={(e) => updateNestedState("chandelier", "checked", e.target.checked)}
                            className="w-5 h-5 accent-amber-500 cursor-pointer rounded"
                          />
                          <label htmlFor="chandelierCheck" className="text-sm font-bold text-slate-800 cursor-pointer">Lampu Gantung Hias (Chandelier/Pendant)</label>
                        </div>
                        <span className="text-xs text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-full">{state.chandelier.count} Unit</span>
                      </div>

                      {state.chandelier.checked && (
                        <div className="pl-8 flex flex-col gap-4 border-l-2 border-amber-500/20 pt-2 animate-in fade-in duration-200">
                          {/* Unit count */}
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-600 font-medium">Jumlah Unit Lampu Gantung</span>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => updateNestedState("chandelier", "count", Math.max(1, state.chandelier.count - 1))}
                                className="w-7 h-7 rounded-lg border border-slate-200 text-slate-600 font-bold hover:bg-slate-100 flex items-center justify-center"
                              >
                                -
                              </button>
                              <span className="font-mono font-bold text-slate-800 w-6 text-center">{state.chandelier.count}</span>
                              <button 
                                onClick={() => updateNestedState("chandelier", "count", state.chandelier.count + 1)}
                                className="w-7 h-7 rounded-lg border border-slate-200 text-slate-600 font-bold hover:bg-slate-100 flex items-center justify-center"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Price slider */}
                          <div>
                            <div className="flex justify-between items-center text-xs mb-1.5">
                              <span className="text-slate-600 font-medium">Biaya Pasang & Unit Lampu Gantung Mewah</span>
                              <span className="font-mono font-bold text-amber-600">{formatRupiah(state.chandelier.pricePerUnit)} / unit</span>
                            </div>
                            <input 
                              type="range" 
                              min="350000"
                              max="2500000"
                              step="50000"
                              value={state.chandelier.pricePerUnit}
                              onChange={(e) => updateNestedState("chandelier", "pricePerUnit", parseInt(e.target.value))}
                              className="w-full accent-amber-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                              <span>Min: Rp 350.000</span>
                              <span>Max: Rp 2.500.000</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              )}

              {/* TAHAP 5: HALAMAN REKAPITULASI & GRAND TOTAL */}
              {currentStep === 5 && (
                <div className="animate-in fade-in slide-in-from-right duration-300 print:p-0">
                  <div className="flex justify-between items-start mb-6 print:hidden">
                    <div>
                      <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">Tinjauan Final</span>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-2 mb-1">Ringkasan Rencana Anggaran Biaya</h3>
                      <p className="text-slate-500 text-xs font-light">Periksa kembali detail anggaran yang telah dirancang. Cetak dokumen ini sebagai draf resmi pengerjaan interior Anda.</p>
                    </div>
                  </div>

                  {/* Print-Only Header */}
                  <div className="hidden print:block mb-8 border-b-2 border-slate-900 pb-4">
                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 uppercase">ALFA INTERIOR</h1>
                    <p className="text-xs text-slate-500 font-mono">Draf Rencana Anggaran Biaya (RAB) Kustom</p>
                    <div className="grid grid-cols-2 gap-4 text-xs mt-4 pt-4 border-t border-slate-100">
                      <div>
                        <strong>Spesifikasi Ruangan:</strong><br />
                        Panjang: {state.roomLength.toFixed(2)}m | Lebar: {state.roomWidth.toFixed(2)}m<br />
                        Tinggi Plafond: {state.ceilingHeight.toFixed(2)}m<br />
                        Gaya Desain: {state.designStyle}
                      </div>
                      <div className="text-right">
                        <strong>Tanggal Cetak:</strong> {new Date().toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}<br />
                        <strong>Bahan Finishing:</strong> {state.materialFinishing}
                      </div>
                    </div>
                  </div>

                  {/* Receipt table */}
                  <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm print:border-slate-300 print:rounded-none">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-600 font-mono uppercase tracking-wider border-b border-slate-200 print:bg-none print:border-b-2 print:border-slate-300">
                          <th className="py-3 px-4 font-semibold">Item Pekerjaan</th>
                          <th className="py-3 px-4 text-center font-semibold">Volume</th>
                          <th className="py-3 px-4 text-center font-semibold">Satuan</th>
                          <th className="py-3 px-4 text-right font-semibold">Harga Satuan</th>
                          <th className="py-3 px-4 text-right font-semibold">Total Biaya</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 print:divide-slate-200 text-slate-700">
                        {calculations.list.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50 print:hover:bg-none">
                            <td className="py-3.5 px-4 font-medium text-slate-900 max-w-[200px] md:max-w-xs">{item.name}</td>
                            <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-800">{item.volume}</td>
                            <td className="py-3.5 px-4 text-center text-slate-500 font-mono">{item.unit}</td>
                            <td className="py-3.5 px-4 text-right font-mono text-slate-600">{formatRupiah(item.unitPrice)}</td>
                            <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">{formatRupiah(item.total)}</td>
                          </tr>
                        ))}
                        {calculations.list.length === 0 && (
                          <tr>
                            <td colSpan={5} className="py-8 text-center text-slate-400 font-light">Tidak ada item pekerjaan yang dicentang. Silakan kembali ke tahap sebelumnya.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Grand total receipts block */}
                  <div className="mt-6 bg-slate-900 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 print:bg-transparent print:text-slate-950 print:border-t-2 print:border-slate-900 print:p-0 print:mt-4 print:rounded-none">
                    <div>
                      <span className="text-[10px] md:text-xs font-mono text-amber-400 uppercase tracking-widest font-bold block print:text-slate-500">
                        ESTIMASI TOTAL ANGGARAN ALFA INTERIOR
                      </span>
                      <span className="text-2xl md:text-3.5xl font-extrabold font-mono text-amber-500 print:text-slate-900 block mt-1">
                        {formatRupiah(calculations.grandTotal)}
                      </span>
                    </div>

                    <button
                      onClick={() => window.print()}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-sans tracking-wide shadow-lg active:scale-95 transition-all print:hidden"
                    >
                      <Printer className="w-4 h-4" />
                      CETAK RAB / SIMPAN PDF
                    </button>
                  </div>

                  {/* Trust Badge */}
                  <div className="mt-6 p-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 text-[11px] text-slate-500 leading-relaxed flex gap-2 print:hidden">
                    <Info className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>
                      *Perhitungan di atas merupakan estimasi transparan awal berbasis parameter standar Alfa Interior. Anggaran final akurat akan kami serahkan dalam berkas SPK resmi setelah melakukan pengukuran millimeter-blok langsung di lokasi Anda oleh tim sipil kami.
                    </span>
                  </div>

                </div>
              )}

            </div>

            {/* BUTTON NAVIGATION FOOTER */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100 print:hidden">
              <button
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                disabled={currentStep === 1}
                className={`inline-flex items-center gap-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold font-sans tracking-wide transition-all ${
                  currentStep === 1
                    ? "opacity-40 cursor-not-allowed text-slate-300"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900 active:scale-95"
                }`}
              >
                <ChevronLeft className="w-4 h-4" /> KEMBALI
              </button>

              {currentStep < 5 ? (
                <button
                  onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-sans tracking-wide shadow-md active:scale-95 transition-all"
                >
                  BERIKUTNYA <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    // Quick reset mock or link action
                    setCurrentStep(1);
                  }}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs font-sans tracking-wide shadow-md active:scale-95 transition-all"
                >
                  ULANG KALKULASI
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

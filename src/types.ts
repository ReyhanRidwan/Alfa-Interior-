/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type DesignStyle = "Modern Minimalis" | "Japandi Natural" | "Classic Luxury" | "Industrial";

export type MaterialFinishing = "HPL Standar" | "HPL Premium / Tekstur" | "Cat Duco";

export interface FurnitureItem {
  checked: boolean;
  length: number;
  pricePerMeter: number;
}

export interface FlooringItem {
  checked: boolean;
  pricePerSqM: number;
}

export interface WallpaperItem {
  checked: boolean;
  areaSqM: number;
  pricePerSqM: number;
}

export interface DropCeilingItem {
  checked: boolean;
  pricePerSqM: number;
}

export interface MepItem {
  checked: boolean;
  count: number;
  pricePerUnit: number;
}

export interface CalculatorState {
  roomLength: number; // m
  roomWidth: number; // m
  ceilingHeight: number; // m
  designStyle: DesignStyle;
  
  // Step 2
  kitchenSet: FurnitureItem;
  wardrobe: FurnitureItem;
  materialFinishing: MaterialFinishing;
  hingesSlowMo: boolean;
  ledStrip: boolean;

  // Step 3
  flooring: FlooringItem;
  wallpaper: WallpaperItem;
  dropCeiling: DropCeilingItem;

  // Step 4
  downlights: MepItem;
  sockets: MepItem;
  chandelier: MepItem;
}

export interface ProjectCategory {
  id: string;
  name: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: "kitchen" | "bedroom" | "wardrobe";
  size: string;
  material: string;
  image: string;
  priceRange: string;
}

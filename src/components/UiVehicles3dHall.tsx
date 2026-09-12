import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCw, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import type { VehicleColor } from '../types';

interface UiVehicles3dHallProps {
  vehicleId: string;
  folder: string;
  colors: VehicleColor[];
  defaultColor?: string;
  totalFrames?: number;
  vehicleName: string;
}

export const UiVehicles3dHall: React.FC<UiVehicles3dHallProps> = ({
  folder,
  colors,
  defaultColor,
  totalFrames = 36,
  vehicleName,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    defaultColor || (colors[0]?.value ?? 'silver_snow')
  );
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);
  const [loadedCount, setLoadedCount] = useState<number>(0);

  const startXRef = useRef<number>(0);
  const startFrameRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesCacheRef = useRef<Record<string, HTMLImageElement[]>>({});

  // Frame URL constructor
  const getFrameUrl = useCallback(
    (color: string, frame: number) => {
      const padded = String(frame).padStart(2, '0');
      return `https://www.jetourglobal.com/new-static/exterior/${folder}/${color}/${padded}.png`;
    },
    [folder]
  );

  // Preload frames whenever color changes
  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);
    setLoadedCount(0);

    const cacheKey = `${folder}-${selectedColor}`;
    if (!imagesCacheRef.current[cacheKey]) {
      imagesCacheRef.current[cacheKey] = [];
    }

    let loaded = 0;
    const totalToLoad = totalFrames;

    for (let i = 0; i < totalToLoad; i++) {
      const img = new Image();
      img.src = getFrameUrl(selectedColor, i);
      img.onload = () => {
        if (!isCancelled) {
          loaded++;
          setLoadedCount(loaded);
          if (loaded >= 6) {
            // Can start interacting once key perspectives are ready
            setIsLoading(false);
          }
        }
      };
      img.onerror = () => {
        if (!isCancelled) {
          loaded++;
          setLoadedCount(loaded);
          if (loaded >= 6) setIsLoading(false);
        }
      };
      imagesCacheRef.current[cacheKey][i] = img;
    }

    return () => {
      isCancelled = true;
    };
  }, [folder, selectedColor, totalFrames, getFrameUrl]);

  // Auto rotation loop
  useEffect(() => {
    if (!isAutoRotating) return;
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % totalFrames);
    }, 90);
    return () => clearInterval(interval);
  }, [isAutoRotating, totalFrames]);

  // Mouse & Touch Drag handlers
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    startXRef.current = clientX;
    startFrameRef.current = currentFrame;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - startXRef.current;
    // Every 12px drag rotates one frame
    const sensitivity = 12;
    const frameOffset = Math.round(deltaX / sensitivity);
    let target = (startFrameRef.current - frameOffset) % totalFrames;
    if (target < 0) target += totalFrames;
    setCurrentFrame(target);
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setCurrentFrame((prev) => (prev - 1 + totalFrames) % totalFrames);
    } else if (e.key === 'ArrowRight') {
      setCurrentFrame((prev) => (prev + 1) % totalFrames);
    }
  };

  const activeColorObj = colors.find((c) => c.value === selectedColor) || colors[0];

  return (
    <div
      id="vehicles-3d-hall"
      className="relative w-full max-w-5xl mx-auto flex flex-col items-center select-none py-8"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* 360 Title Header */}
      <div className="w-full flex items-center justify-between px-4 mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#39AEB2] font-goldman">
            360° Exterior Configurator
          </span>
          <h3 className="text-2xl font-bold text-white tracking-wide">
            {vehicleName} — {activeColorObj?.label}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              isAutoRotating
                ? 'bg-[#39AEB2] text-black font-bold'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
            title="Auto Rotate 360"
          >
            <RotateCw size={14} className={isAutoRotating ? 'animate-spin' : ''} />
            <span>{isAutoRotating ? 'Rotating' : 'Auto 360°'}</span>
          </button>
        </div>
      </div>

      {/* Interactive 3D Frame Stage */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[16/9] md:aspect-[21/9] max-h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden rounded-2xl bg-radial from-[#22272b] via-[#151719] to-[#0c0d0e] border border-white/5"
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
      >
        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50 backdrop-blur-xs">
            <div className="w-10 h-10 border-2 border-[#39AEB2] border-t-transparent rounded-full animate-spin mb-2" />
            <span className="text-xs text-gray-400">
              Loading 360° view ({Math.min(100, Math.round((loadedCount / totalFrames) * 100))}%)
            </span>
          </div>
        )}

        {/* Shadow plane under car */}
        <div className="absolute bottom-6 w-3/4 h-12 bg-black/60 blur-xl rounded-full pointer-events-none transform scale-y-50" />

        {/* Active Frame Image */}
        <img
          key={`${selectedColor}-${currentFrame}`}
          src={getFrameUrl(selectedColor, currentFrame)}
          alt={`${vehicleName} frame ${currentFrame}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain pointer-events-none z-10 transition-transform duration-75"
          draggable={false}
        />

        {/* Interactive Drag Hint Overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 flex items-center gap-3 text-xs text-gray-300 pointer-events-none">
          <ChevronLeft size={14} className="animate-pulse text-[#39AEB2]" />
          <span className="tracking-wide">Drag horizontally to rotate 360°</span>
          <ChevronRight size={14} className="animate-pulse text-[#39AEB2]" />
        </div>

        {/* Frame stepper controls */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
          <button
            onClick={() => setCurrentFrame((prev) => (prev - 1 + totalFrames) % totalFrames)}
            className="p-2 rounded-full bg-black/40 hover:bg-black/80 text-white border border-white/10 transition-colors"
            aria-label="Rotate Left"
          >
            <ChevronLeft size={20} />
          </button>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
          <button
            onClick={() => setCurrentFrame((prev) => (prev + 1) % totalFrames)}
            className="p-2 rounded-full bg-black/40 hover:bg-black/80 text-white border border-white/10 transition-colors"
            aria-label="Rotate Right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Color Palette Selector */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 bg-white/5 border border-white/10 px-6 py-3 rounded-full backdrop-blur-md">
        <span className="text-xs uppercase font-semibold text-gray-400 mr-2">Exterior Colors:</span>
        {colors.map((c) => {
          const isSelected = selectedColor === c.value;
          return (
            <button
              key={c.value}
              onClick={() => setSelectedColor(c.value)}
              className={`group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isSelected
                  ? 'bg-white/20 text-white ring-2 ring-[#39AEB2] scale-105'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
              title={c.label}
            >
              <span
                className="w-4 h-4 rounded-full border border-white/40 shadow-inner flex-shrink-0"
                style={{ background: c.color }}
              />
              <span>{c.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

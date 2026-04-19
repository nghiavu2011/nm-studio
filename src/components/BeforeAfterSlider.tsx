import React, { useState, useRef, useEffect } from 'react';

const BeforeAfterSlider = ({ beforeImage, afterImage, beforeLabel = "Phác Thảo / Ý Tưởng", afterLabel = "AI Diễn Họa" }: any) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
        setSliderPosition(percent);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        handleMove(e.clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        handleMove(e.touches[0].clientX);
    };

    useEffect(() => {
        const handleMouseUp = () => setIsDragging(false);
        if (isDragging) {
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchend', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div 
            ref={containerRef}
            className="relative w-full h-[300px] md:h-[500px] overflow-hidden rounded-sm cursor-col-resize select-none group shadow-xl"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
            onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
        >
            {/* Before Image (Background) */}
            <div className="absolute inset-0">
                <img src={beforeImage} className="w-full h-full object-cover" alt="Before" draggable="false" />
                <div className="absolute top-4 left-4 bg-black/60 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded backdrop-blur-sm">
                    {beforeLabel}
                </div>
            </div>

            {/* After Image (Clipped) */}
            <div 
                className="absolute inset-0 z-10"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <img src={afterImage} className="w-full h-full object-cover" alt="After" draggable="false" />
                <div className="absolute top-4 right-4 bg-brand-primary text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded shadow-lg">
                    {afterLabel}
                </div>
            </div>

            {/* Slider Line */}
            <div 
                className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-20 flex items-center justify-center transform -translate-x-1/2"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200 group-hover:scale-110 transition-transform">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primary">
                        <polyline points="15 18 9 12 15 6"></polyline>
                        <polyline points="9 18 15 12 9 6" className="opacity-0"></polyline>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default BeforeAfterSlider;

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroCarousel = ({ heroImages }: { heroImages: string[] }) => {
    const [current, setCurrent] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrent((prev) => (prev === (heroImages || []).length - 1 ? 0 : prev + 1));
    }, [heroImages]);

    const prevSlide = useCallback(() => {
        setCurrent((prev) => (prev === 0 ? (heroImages || []).length - 1 : prev - 1));
    }, [heroImages]);

    useEffect(() => {
        const timer = setInterval(nextSlide, 6000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <div className="absolute inset-0 overflow-hidden">
            {(heroImages || []).map((img: string, idx: number) => (
                <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === current ? 'opacity-100' : 'opacity-0'}`}
                >
                    <div className="absolute inset-0 animate-breathe">
                        <img src={img} className="w-full h-full object-cover" alt={`Hero ${idx + 1}`} />
                    </div>
                    <div className="absolute inset-0 bg-black/45 animate-pulse-brightness" />
                </div>
            ))}

            <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-4 border border-white/20 text-white rounded-full hover:bg-brand-primary hover:border-brand-primary transition-all group"
            >
                <ChevronLeft className="w-10 h-10 group-hover:scale-110 transition-transform" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-4 border border-white/20 text-white rounded-full hover:bg-brand-primary hover:border-brand-primary transition-all group"
            >
                <ChevronRight className="w-10 h-10 group-hover:scale-110 transition-transform" />
            </button>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {(heroImages || []).map((_: any, idx: number) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`transition-all duration-500 rounded-full h-1.5 ${idx === current ? 'w-12 bg-brand-primary' : 'w-4 bg-white/30 hover:bg-white/50'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;

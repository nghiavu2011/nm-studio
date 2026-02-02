import React, { useState, useEffect, useRef } from 'react';

const Counter = ({ target, duration = 1000, suffix = "+" }: { target: number, duration?: number, suffix?: string }) => {
    const [count, setCount] = useState(0);
    const elementRef = useRef<HTMLDivElement>(null);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.5 }
        );

        if (elementRef.current) observer.observe(elementRef.current);
        return () => observer.disconnect();
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;

        let startTime: number | null = null;
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const currentCount = Math.min(Math.floor((progress / duration) * target), target);
            setCount(currentCount);

            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }, [hasStarted, target, duration]);

    // Updated number color to #705d3f with drop-shadow for clarity
    return (
        <div
            ref={elementRef}
            className="text-4xl font-heading font-bold text-[#705d3f] transition-colors duration-300"
            style={{ filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))' }}
        >
            {count}{suffix}
        </div>
    );
};

export default Counter;

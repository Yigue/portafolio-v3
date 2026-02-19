'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { heroData } from '@/data/portfolio-data';

export default function Hero() {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.timeline()
                .to(titleRef.current, { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' })
                .to(subtitleRef.current, { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' }, '-=0.8');
        });

        return () => ctx.revert();
    }, []);

    return (
        <section id="hero" className="min-h-[100dvh] flex flex-col items-center justify-center relative overflow-hidden py-20">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black" />

            {/* Content */}
            <div className="z-10 text-center space-y-4 sm:space-y-6 px-4 max-w-[95vw]">
                <h1
                    ref={titleRef}
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter text-gradient opacity-0 translate-y-10 leading-tight"
                >
                    {heroData.title}
                </h1>
                <p
                    ref={subtitleRef}
                    className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500 max-w-2xl mx-auto opacity-0 translate-y-10 font-light px-4 leading-relaxed"
                >
                    {heroData.subtitle}
                </p>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 sm:bottom-10 animate-pulse text-gray-600 text-[10px] sm:text-xs tracking-[0.2em]">
                {heroData.scrollIndicator}
            </div>
        </section>
    );
}

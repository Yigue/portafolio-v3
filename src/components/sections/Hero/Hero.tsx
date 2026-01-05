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
        <section id="hero" className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black" />

            {/* Content */}
            <div className="z-10 text-center space-y-6 px-4">
                <h1
                    ref={titleRef}
                    className="text-7xl md:text-9xl font-bold tracking-tighter text-gradient opacity-0 translate-y-10"
                >
                    {heroData.title}
                </h1>
                <p
                    ref={subtitleRef}
                    className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto opacity-0 translate-y-10 font-light"
                >
                    {heroData.subtitle}
                </p>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 animate-pulse text-gray-600 text-xs tracking-[0.2em]">
                {heroData.scrollIndicator}
            </div>
        </section>
    );
}

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutData } from '@/data/portfolio-data';

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const visualRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=150%',
                    pin: true,
                    scrub: 1,
                },
            });

            tl.to(textRef.current, { opacity: 1, y: 0, duration: 1 })
                .to(visualRef.current, { opacity: 1, scale: 1, duration: 1 }, '-=0.5');
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-black py-20 md:py-0"
        >
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-10 items-center relative z-10 max-w-7xl">
                {/* Text Content */}
                <div ref={textRef} className="opacity-0 translate-y-20 space-y-4 md:space-y-5 order-2 lg:order-1 flex flex-col justify-center">
                    <span className="text-blue-500 font-semibold tracking-widest uppercase text-xs">
                        {aboutData.badge}
                    </span>
                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                        dangerouslySetInnerHTML={{ __html: aboutData.title }}
                    />
                    <div className="text-gray-400 text-sm md:text-base leading-relaxed space-y-4">
                        {aboutData.description.split('\n').map((line, lineIndex) => (
                            <p key={lineIndex} className="mb-3 last:mb-0">
                                {line.split(' perfecto').map((part, partIndex, parts) =>
                                    partIndex === parts.length - 1 ? (
                                        <span key={partIndex}>
                                            {part.includes('perfecto') ? (
                                                <>
                                                    que se sienta{' '}
                                                    <span className="text-white">perfecto</span>
                                                    {part.replace('perfecto', '')}
                                                </>
                                            ) : (
                                                part
                                            )}
                                        </span>
                                    ) : (
                                        <span key={partIndex}>{part}</span>
                                    )
                                )}
                            </p>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-2 pt-4">
                        {aboutData.tags.map((tag, index) => (
                            <div key={index} className="px-3 py-1.5 md:px-4 md:py-2 glass-panel rounded-full text-xs text-center border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-default">
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Visual Content */}
                <div ref={visualRef} className="opacity-0 scale-90 relative order-1 lg:order-2 flex justify-center items-center w-full">
                    <div className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[450px] aspect-[4/5] md:aspect-square rounded-2xl md:rounded-3xl overflow-hidden glass-panel relative p-1.5 md:p-2 rotate-2 hover:rotate-0 transition-transform duration-500 shadow-2xl shadow-blue-900/10">
                        <img
                            src={aboutData.image}
                            alt="Guillermo Riedel"
                            className="w-full h-full object-cover rounded-xl md:rounded-2xl opacity-90 grayscale hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 glass-panel p-3 sm:p-5 rounded-xl border border-white/10 backdrop-blur-md bg-black/40">
                            <div className="text-2xl sm:text-4xl font-bold text-white tracking-tighter">{aboutData.experience.years}</div>
                            <div className="text-[10px] sm:text-xs text-gray-400 uppercase font-medium tracking-wide">{aboutData.experience.label}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

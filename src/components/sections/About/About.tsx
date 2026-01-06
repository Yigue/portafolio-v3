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
            <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10 max-w-6xl">
                {/* Text Content */}
                <div ref={textRef} className="opacity-0 translate-y-20 space-y-4 md:space-y-6 order-1">
                    <span className="text-blue-500 font-semibold tracking-widest uppercase text-xs sm:text-sm">
                        {aboutData.badge}
                    </span>
                    <h2 
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
                        dangerouslySetInnerHTML={{ __html: aboutData.title }}
                    />
                    <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                        {aboutData.description.split('\n').map((line, lineIndex) => (
                            <span key={lineIndex}>
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
                                {lineIndex < aboutData.description.split('\n').length - 1 && <br />}
                            </span>
                        ))}
                    </p>
                    <div className="flex flex-wrap gap-3 md:gap-4 pt-2 md:pt-4">
                        {aboutData.tags.map((tag, index) => (
                            <div key={index} className="px-4 py-2 md:px-6 md:py-3 glass-panel rounded-lg text-xs sm:text-sm">
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Visual Content */}
                <div ref={visualRef} className="opacity-0 scale-90 relative order-2 max-w-md mx-auto w-full md:max-w-full">
                    <div className="w-full aspect-square rounded-3xl overflow-hidden glass-panel relative p-2">
                        <img
                            src={aboutData.image}
                            alt="Guillermo Riedel"
                            className="w-full h-full object-cover rounded-2xl opacity-80"
                        />
                        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 glass-panel p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border border-white/10">
                            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{aboutData.experience.years}</div>
                            <div className="text-[9px] sm:text-[10px] md:text-xs text-gray-400 uppercase mt-0.5 sm:mt-1">{aboutData.experience.label}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

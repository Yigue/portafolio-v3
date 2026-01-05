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
            className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-black"
        >
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
                {/* Text Content */}
                <div ref={textRef} className="opacity-0 translate-y-20 space-y-6">
                    <span className="text-blue-500 font-semibold tracking-widest uppercase text-sm">
                        {aboutData.badge}
                    </span>
                    <h2 
                        className="text-5xl font-bold text-white leading-tight"
                        dangerouslySetInnerHTML={{ __html: aboutData.title }}
                    />
                    <p className="text-gray-400 text-lg leading-relaxed">
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
                    <div className="flex gap-4 pt-4">
                        {aboutData.tags.map((tag, index) => (
                            <div key={index} className="px-6 py-3 glass-panel rounded-lg text-sm">
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Visual Content */}
                <div ref={visualRef} className="opacity-0 scale-90 relative">
                    <div className="w-full aspect-square rounded-3xl overflow-hidden glass-panel relative p-2">
                        <img
                            src={aboutData.image}
                            alt="Guillermo Riedel"
                            className="w-full h-full object-cover rounded-2xl opacity-80"
                        />
                        <div className="absolute bottom-4 left-4 glass-panel p-4 sm:p-6 rounded-2xl border border-white/10">
                            <div className="text-2xl sm:text-3xl font-bold text-white">{aboutData.experience.years}</div>
                            <div className="text-[10px] sm:text-xs text-gray-400 uppercase mt-1">{aboutData.experience.label}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

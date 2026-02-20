'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';

export default function Timeline() {
    const { language, data } = useLanguage();
    const { mainTimeline, branchEvents } = data.timeline;

    const sectionRef = useRef(null);
    const wrapperRef = useRef(null);
    const mainLineRef = useRef(null);
    const mainLineGlowRef = useRef(null);
    const leftLineRef = useRef(null);
    const rightLineRef = useRef(null);
    const mergeLeftRef = useRef(null);
    const mergeRightRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const setupPath = (path: SVGPathElement | null) => {
            if (!path) return;
            const length = path.getTotalLength();
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        };

        setupPath(mainLineRef.current);
        setupPath(mainLineGlowRef.current);
        setupPath(leftLineRef.current);
        setupPath(rightLineRef.current);
        setupPath(mergeLeftRef.current);
        setupPath(mergeRightRef.current);

        const ctx = gsap.context(() => {
            // 1. ANIMACIÓN DE LA LÍNEA PRINCIPAL
            [mainLineRef.current, mainLineGlowRef.current].forEach(path => {
                if (!path) return;
                gsap.to(path, {
                    strokeDashoffset: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: wrapperRef.current,
                        start: 'top 60%',
                        end: '+=900',
                        scrub: 1,
                    },
                });
            });

            // Left branch (Andreani)
            gsap.to(leftLineRef.current, {
                strokeDashoffset: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.split-section',
                    start: 'top 70%',
                    end: 'bottom 80%',
                    scrub: 1,
                },
            });

            // Right branch (Freelance)
            gsap.to(rightLineRef.current, {
                strokeDashoffset: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.split-section',
                    start: 'top 70%',
                    end: 'bottom 80%',
                    scrub: 1,
                },
            });

            // Merge lines
            [mergeLeftRef.current, mergeRightRef.current].forEach((line) => {
                if (line) {
                    gsap.to(line, {
                        strokeDashoffset: 0,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: '.split-section',
                            start: 'bottom 60%',
                            end: 'bottom 20%',
                            scrub: 1,
                        },
                    });
                }
            });

            // Card animations
            const cards = document.querySelectorAll('.timeline-card, .branch-card');
            cards.forEach((card) => {
                gsap.to(card, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const andreaniEvents = branchEvents.filter((e: any) => e.branch === 'andreani');
    const freelanceEvents = branchEvents.filter((e: any) => e.branch === 'freelance');

    return (
        <>
            <section ref={sectionRef} id="timeline" className="relative w-full min-h-screen bg-[#020202]">
                <div className="text-center pt-16 sm:pt-20 pb-8 sm:pb-10 px-4">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                        {language === 'en' ? 'Career Path' : 'Trayectoria'}
                    </h2>
                    <p className="text-gray-500 font-mono text-xs sm:text-sm">
                        {language === 'en' ? 'Scroll to connect the dots' : 'Desliza para conectar los puntos'}
                    </p>
                </div>

                <div ref={wrapperRef} className="timeline-wrapper relative pb-[250px]"> {/* Aumenté el padding inferior */}

                    {/* SVG Paths */}
                    <svg className="svg-layer absolute top-0 left-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1000 2000" preserveAspectRatio="xMidYMin slice">
                        <defs>
                            <linearGradient id="gradMain" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#30d158" stopOpacity="0" />
                                <stop offset="50%" stopColor="#30d158" />
                                <stop offset="100%" stopColor="#30d158" />
                            </linearGradient>
                        </defs>

                        {/* Background paths */}
                        <path d="M500,0 L500,900" className="path-bg opacity-20" stroke="white" strokeWidth="2" />
                        <path d="M500,900 C500,1000 250,1000 250,1100 L250,1800" className="path-bg opacity-20" stroke="white" strokeWidth="2" />
                        <path d="M500,900 C500,1000 750,1000 750,1100 L750,1800" className="path-bg opacity-20" stroke="white" strokeWidth="2" />
                        <path d="M250,1800 C250,1850 375,1850 500,1880" className="path-bg opacity-20" stroke="white" strokeWidth="2" />
                        <path d="M750,1800 C750,1850 625,1850 500,1880" className="path-bg opacity-20" stroke="white" strokeWidth="2" />

                        {/* Active paths */}
                        <path ref={mainLineRef} d="M500,0 L500,900" className="path-active" stroke="#30d158" strokeWidth="4" fill="none" />
                        <path ref={mainLineGlowRef} d="M500,0 L500,900" className="path-active" stroke="url(#gradMain)" strokeWidth="4" fill="none" style={{ filter: 'blur(5px)' }} />

                        <path ref={leftLineRef} d="M500,900 C500,1000 250,1000 250,1100 L250,1800" className="path-active" stroke="#bf5af2" strokeWidth="4" fill="none" />
                        <path ref={rightLineRef} d="M500,900 C500,1000 750,1000 750,1100 L750,1800" className="path-active" stroke="#30d158" strokeWidth="4" fill="none" />
                        <path ref={mergeLeftRef} d="M250,1800 C250,1850 375,1850 500,1880" className="path-active" stroke="#bf5af2" strokeWidth="4" fill="none" />
                        <path ref={mergeRightRef} d="M750,1800 C750,1850 625,1850 500,1880" className="path-active" stroke="#30d158" strokeWidth="4" fill="none" />
                    </svg>

                    {/* Main Timeline Cards */}
                    {mainTimeline.map((event: any, index: number) => (
                        <div key={index} className={`timeline-card card-${event.side} relative z-10 `}>
                            <div className="glass-box  ">
                                <span className="date-tag">{event.date}</span>
                                <h3 className="text-xl font-bold text-white">{event.title}</h3>
                                <p className="text-gray-400 text-sm mt-2">{event.description}</p>
                            </div>
                        </div>
                    ))}

                    {/* Branch Split Indicator */}
                    <div className="text-center py-12 sm:py-16 md:py-20 relative z-20">
                        <div className="inline-block px-3 sm:px-4 py-1 rounded-full bg-gray-900 border border-gray-700 text-[10px] sm:text-xs font-mono text-gray-400">
                            {language === 'en' ? 'AUGUST 2025: BRANCH SPLIT' : 'AGOSTO 2025: BRANCH SPLIT'}
                        </div>
                    </div>

                    {/* Split Section */}
                    <div className="split-section relative z-10 ">
                        <div className="split-col">
                            {andreaniEvents.map((event: any, index: number) => (
                                <div key={index} className="branch-card andreani" style={index > 0 ? { marginTop: '50px' } : {}}>
                                    <div className="glass-box">
                                        <span className="date-tag text-purple-400">{event.date}</span>
                                        <h3 className={`${index === 0 ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'} font-bold text-white`}>{event.title}</h3>
                                        <p className="text-gray-400 text-xs sm:text-sm mt-2">{event.description}</p>
                                        {event.tags?.length > 0 && (
                                            <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                                                {event.tags.map((tag: string) => (
                                                    <span key={tag} className="text-[9px] sm:text-[10px] bg-purple-500/10 text-purple-400 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-purple-500/20">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="split-col">
                            {freelanceEvents.map((event: any, index: number) => (
                                <div key={index} className="branch-card freelance" style={index > 0 ? { marginTop: '50px' } : {}}>
                                    <div className="glass-box">
                                        <span className="date-tag text-green-400">{event.date}</span>
                                        <h3 className={`${index === 0 ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'} font-bold text-white`}>{event.title}</h3>
                                        <p className="text-gray-400 text-xs sm:text-sm mt-2">{event.description}</p>
                                        {event.tags?.length > 0 && (
                                            <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2 justify-start md:justify-end">
                                                {event.tags.map((tag: string) => (
                                                    <span key={tag} className="text-[9px] sm:text-[10px] bg-green-500/10 text-green-400 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-green-500/20">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative z-40" style={{ height: '150px' }} />
                    {/* Future Card */}

                    {/* Future Card - Posicionada justo donde terminan las líneas (y=1880 del viewBox = 94%) */}
                    <div className="absolute left-1/2 -translate-x-1/2 z-40" style={{ top: '95%' }}>
                        <div className="timeline-card max-w-md w-full px-4">
                            <div className="glass-box text-center border-2 border-blue-500/50">
                                <span className="date-tag text-blue-400">
                                    {language === 'en' ? 'Future' : 'Futuro'}
                                </span>
                                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                                    {language === 'en' ? 'The Story Continues...' : 'La Historia Continúa...'}
                                </h3>
                                <p className="text-gray-400 text-xs sm:text-sm">
                                    {language === 'en' ? 'Always learning, always growing, always building.' : 'Siempre aprendiendo, siempre creciendo, siempre construyendo.'}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}
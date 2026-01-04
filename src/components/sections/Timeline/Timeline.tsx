'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { mainTimeline, branchEvents } from '@/data/timeline';

export default function Timeline() {
    const sectionRef = useRef<HTMLElement>(null);
    const mainLineRef = useRef<SVGPathElement>(null);
    const leftLineRef = useRef<SVGPathElement>(null);
    const rightLineRef = useRef<SVGPathElement>(null);
    const mergeLeftRef = useRef<SVGPathElement>(null);
    const mergeRightRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const setupPath = (path: SVGPathElement | null) => {
            if (!path) return;
            const length = path.getTotalLength();
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        };

        setupPath(mainLineRef.current);
        setupPath(leftLineRef.current);
        setupPath(rightLineRef.current);
        setupPath(mergeLeftRef.current);
        setupPath(mergeRightRef.current);

        const ctx = gsap.context(() => {
            // Main line animation
            gsap.to(mainLineRef.current, {
                strokeDashoffset: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    end: 'top 20%',
                    scrub: 1,
                },
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

    const andreaniEvents = branchEvents.filter((e) => e.branch === 'andreani');
    const freelanceEvents = branchEvents.filter((e) => e.branch === 'freelance');

    return (
        <section ref={sectionRef} id="timeline" className="relative w-full min-h-screen bg-[#020202]">
            <div className="text-center pt-20 pb-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">Trayectoria</h2>
                <p className="text-gray-500 font-mono text-sm">Desliza para conectar los puntos</p>
            </div>

            <div className="timeline-wrapper">
                {/* SVG Paths */}
                <svg className="svg-layer" viewBox="0 0 1000 2000" preserveAspectRatio="xMidYMin slice">
                    <defs>
                        <linearGradient id="gradMain" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#2997ff', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#2997ff', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>

                    {/* Background paths */}
                    <path d="M500,0 L500,900" className="path-bg" />
                    <path d="M500,900 C500,1000 250,1000 250,1100 L250,1800" className="path-bg" />
                    <path d="M500,900 C500,1000 750,1000 750,1100 L750,1800" className="path-bg" />
                    <path d="M250,1800 C250,1850 375,1850 500,1900" className="path-bg" />
                    <path d="M750,1800 C750,1850 625,1850 500,1900" className="path-bg" />

                    {/* Active paths */}
                    <path ref={mainLineRef} d="M500,0 L500,900" className="path-active" stroke="url(#gradMain)" />
                    <path ref={leftLineRef} d="M500,900 C500,1000 250,1000 250,1100 L250,1800" className="path-active" stroke="#bf5af2" />
                    <path ref={rightLineRef} d="M500,900 C500,1000 750,1000 750,1100 L750,1800" className="path-active" stroke="#30d158" />
                    <path ref={mergeLeftRef} d="M250,1800 C250,1850 375,1850 500,1900" className="path-active" stroke="#bf5af2" />
                    <path ref={mergeRightRef} d="M750,1800 C750,1850 625,1850 500,1900" className="path-active" stroke="#30d158" />
                </svg>

                {/* Main Timeline Cards */}
                {mainTimeline.map((event, index) => (
                    <div key={index} className={`timeline-card card-${event.side}`}>
                        <div className="glass-box">
                            <span className="date-tag">{event.date}</span>
                            <h3 className="text-xl font-bold text-white">{event.title}</h3>
                            <p className="text-gray-400 text-sm mt-2">{event.description}</p>
                        </div>
                    </div>
                ))}

                {/* Branch Split Indicator */}
                <div className="text-center py-20 relative z-20">
                    <div className="inline-block px-4 py-1 rounded-full bg-gray-900 border border-gray-700 text-xs font-mono text-gray-400">
                        AGOSTO 2025: BRANCH SPLIT
                    </div>
                </div>

                {/* Split Section */}
                <div className="split-section">
                    {/* Andreani Column */}
                    <div className="split-col">
                        {andreaniEvents.map((event, index) => (
                            <div key={index} className="branch-card andreani" style={index > 0 ? { marginTop: '50px' } : {}}>
                                <div className="glass-box">
                                    <span className="date-tag text-purple-400">{event.date}</span>
                                    <h3 className={`${index === 0 ? 'text-xl' : 'text-lg'} font-bold text-white`}>{event.title}</h3>
                                    <p className="text-gray-400 text-sm mt-2">{event.description}</p>
                                    {event.tags.length > 0 && (
                                        <div className="mt-3 flex gap-2">
                                            {event.tags.map((tag) => (
                                                <span key={tag} className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-1 rounded border border-purple-500/20">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Freelance Column */}
                    <div className="split-col">
                        {freelanceEvents.map((event, index) => (
                            <div key={index} className="branch-card freelance" style={index > 0 ? { marginTop: '50px' } : {}}>
                                <div className="glass-box">
                                    <span className="date-tag text-green-400">{event.date}</span>
                                    <h3 className={`${index === 0 ? 'text-xl' : 'text-lg'} font-bold text-white`}>{event.title}</h3>
                                    <p className="text-gray-400 text-sm mt-2">{event.description}</p>
                                    {event.tags.length > 0 && (
                                        <div className="mt-3 flex gap-2 justify-end">
                                            {event.tags.map((tag) => (
                                                <span key={tag} className="text-[10px] bg-green-500/10 text-green-400 px-2 py-1 rounded border border-green-500/20">
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

                {/* Future Card */}
                <div className="flex justify-center mt-32 mb-20 relative z-20">
                    <div className="timeline-card">
                        <div className="glass-box text-center border-2 border-blue-500/50">
                            <span className="date-tag text-blue-400">Futuro</span>
                            <h3 className="text-2xl font-bold text-white mb-2">La Historia Continúa...</h3>
                            <p className="text-gray-400 text-sm">Siempre aprendiendo, siempre creciendo, siempre construyendo.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { certificates, Certificate } from '@/data/certificates';

export default function Certificates() {
    const sectionRef = useRef<HTMLElement>(null);
    const stripRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [expandedId, setExpandedId] = useState<number | null>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Card entrance animation
            gsap.from('.certificate-card', {
                opacity: 0,
                scale: 0.8,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            });

            // Horizontal scroll with pin
            if (stripRef.current) {
                gsap.to(stripRef.current, {
                    x: () => -(stripRef.current!.scrollWidth - window.innerWidth + 200),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: wrapperRef.current,
                        start: 'top top',
                        end: () => '+=' + stripRef.current!.scrollWidth * 1.2,
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                });
            }
        }, sectionRef);

        // Mouse spotlight effect
        const handleMouseMove = (e: MouseEvent) => {
            const cards = document.querySelectorAll('.spotlight-card, .glass-panel');
            cards.forEach((card) => {
                const rect = (card as HTMLElement).getBoundingClientRect();
                (card as HTMLElement).style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                (card as HTMLElement).style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            });
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            ctx.revert();
        };
    }, []);

    const expandCertificate = (cert: Certificate) => {
        if (expandedId === cert.id) return;
        setExpandedId(cert.id);

        const wrapper = cardRefs.current[cert.id - 1];
        if (!wrapper) return;

        const detailsPanel = wrapper.querySelector('.certificate-details-panel') as HTMLElement;
        if (!detailsPanel) return;

        // Full-screen overlay animation for all devices
        gsap.to(detailsPanel, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
            pointerEvents: 'auto'
        });

        // Dim other cards
        cardRefs.current.forEach((w, i) => {
            if (w && i !== cert.id - 1) {
                gsap.to(w.querySelector('.certificate-card'), {
                    opacity: 0.4,
                    scale: 0.95,
                    duration: 0.4,
                    ease: 'power2.out',
                });
            }
        });

        wrapper.classList.add('expanded');
    };

    const collapseCertificate = () => {
        if (expandedId === null) return;

        const wrapper = cardRefs.current[expandedId - 1];
        if (!wrapper) return;

        const detailsPanel = wrapper.querySelector('.certificate-details-panel') as HTMLElement;
        if (detailsPanel) {
            gsap.to(detailsPanel, {
                opacity: 0,
                scale: 0.95,
                duration: 0.4,
                ease: 'power2.in',
                pointerEvents: 'none'
            });
        }

        // Restore all cards
        cardRefs.current.forEach((w) => {
            if (w) {
                gsap.to(w.querySelector('.certificate-card'), {
                    opacity: 1,
                    scale: 1,
                    duration: 0.4,
                    ease: 'power2.out',
                });
            }
        });

        wrapper.classList.remove('expanded');
        setExpandedId(null);
    };

    return (
        <section ref={sectionRef} id="certificates" className="overflow-hidden bg-[#020202] relative min-h-screen">
            <div ref={wrapperRef} className="certificates-wrapper h-screen w-full flex items-center relative pl-10 md:pl-20 overflow-hidden">
                {/* Header */}
                <div className="absolute top-10 left-10 z-20">
                    <h2 className="text-6xl md:text-8xl font-bold text-white/10 uppercase tracking-tighter">Certificaciones</h2>
                    <div className="flex items-center gap-2 mt-2 ml-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                        <p className="text-purple-500 font-mono text-xs">DESLIZA PARA EXPLORAR →</p>
                    </div>
                </div>

                {/* Certificates Strip */}
                <div ref={stripRef} className="certificates-strip flex gap-16 px-10">
                    {certificates.map((cert) => (
                        <div
                            key={cert.id}
                            ref={(el) => { cardRefs.current[cert.id - 1] = el; }}
                            className="certificate-card-wrapper flex-shrink-0"
                            data-certificate={cert.id}
                        >
                            <div
                                className="certificate-card w-[90vw] md:w-[600px] h-[60vh] md:h-[60vh] spotlight-card rounded-2xl md:rounded-3xl relative group cursor-pointer perspective-container overflow-hidden"
                                onClick={() => expandCertificate(cert)}
                            >
                                <div className="preserve-3d w-full h-full relative">
                                    <img
                                        src={cert.image}
                                        alt={cert.title}
                                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition duration-500 rounded-2xl md:rounded-3xl grayscale group-hover:grayscale-0"
                                    />

                                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 bg-gradient-to-t from-black via-black/80 to-transparent rounded-b-2xl md:rounded-b-3xl certificate-content">
                                        <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
                                            {cert.title}<br />{cert.subtitle}
                                        </h3>
                                        <p className="text-gray-300 max-w-lg mb-4 md:mb-6 text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity delay-100 transform translate-y-4 group-hover:translate-y-0">
                                            {cert.desc.slice(0, 70)}...
                                        </p>
                                        <div className="flex gap-2">
                                            {cert.tech.slice(0, 2).map((t) => (
                                                <span key={t} className="px-2.5 py-1 md:px-3 md:py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] md:text-xs text-white">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Details Panel - Full screen overlay */}
                                <div className="certificate-details-panel fixed inset-0 z-50 w-full h-full bg-black/95 backdrop-blur-xl opacity-0 pointer-events-none p-6 md:p-12 overflow-y-auto flex items-center justify-center">
                                    <button
                                        className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl md:text-2xl z-10 w-10 h-10 flex items-center justify-center"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            collapseCertificate();
                                        }}
                                    >
                                        ×
                                    </button>
                                    <div className="certificate-details-content max-w-2xl md:max-w-none mx-auto">
                                        <div className="flex justify-between items-start mb-4 pr-10">
                                            <div>
                                                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">{cert.title}</h2>
                                                <p className="text-purple-400 font-mono text-sm mt-1">{cert.subtitle}</p>
                                            </div>
                                            {cert.status === 'coming_soon' && (
                                                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full text-xs font-bold whitespace-nowrap">
                                                    COMING SOON
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-sm">{cert.desc}</p>

                                        {cert.pdfUrl && (
                                            <a
                                                href={cert.pdfUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold text-sm transition-all mb-8 shadow-lg shadow-purple-900/20 group/btn"
                                            >
                                                <span>Ver Diploma Oficial</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                                </svg>
                                            </a>
                                        )}

                                        <div className="mb-6">
                                            <h3 className="text-base md:text-lg font-bold text-white mb-3">Temas</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {cert.tech.map((t) => (
                                                    <span key={t} className="px-3 py-1.5 bg-white/10 rounded-full text-xs text-white border border-white/20">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-base md:text-lg font-bold text-white mb-3">Conceptos Clave</h3>
                                            <ul className="space-y-2 text-gray-300 text-sm">
                                                {cert.features.map((f) => (
                                                    <li key={f} className="flex items-start gap-2">
                                                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 flex-shrink-0" />
                                                        <span>{f}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

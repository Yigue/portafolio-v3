'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, Project } from '@/data/projects';

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);
    const stripRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [expandedId, setExpandedId] = useState<number | null>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Card entrance animation
            gsap.from('.project-card', {
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

    const expandProject = (project: Project) => {
        if (expandedId === project.id) return;
        setExpandedId(project.id);

        const wrapper = cardRefs.current[project.id - 1];
        if (!wrapper) return;

        const detailsPanel = wrapper.querySelector('.project-details-panel') as HTMLElement;
        if (!detailsPanel) return;

        gsap.to(detailsPanel, {
            x: -500,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
        });

        // Dim other cards
        cardRefs.current.forEach((w, i) => {
            if (w && i !== project.id - 1) {
                gsap.to(w.querySelector('.project-card'), {
                    opacity: 0.4,
                    scale: 0.95,
                    duration: 0.4,
                    ease: 'power2.out',
                });
            }
        });

        wrapper.classList.add('expanded');
    };

    const collapseProject = () => {
        if (expandedId === null) return;

        const wrapper = cardRefs.current[expandedId - 1];
        if (!wrapper) return;

        const detailsPanel = wrapper.querySelector('.project-details-panel') as HTMLElement;
        if (detailsPanel) {
            gsap.to(detailsPanel, {
                x: 0,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in',
            });
        }

        // Restore all cards
        cardRefs.current.forEach((w) => {
            if (w) {
                gsap.to(w.querySelector('.project-card'), {
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
        <section ref={sectionRef} id="projects" className="overflow-hidden bg-[#020202] relative min-h-screen">
            <div ref={wrapperRef} className="projects-wrapper h-screen w-full flex items-center relative pl-10 md:pl-20 overflow-hidden">
                {/* Header */}
                <div className="absolute top-10 left-10 z-20">
                    <h2 className="text-6xl md:text-8xl font-bold text-white/5 uppercase tracking-tighter">Proyectos</h2>
                    <div className="flex items-center gap-2 mt-2 ml-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        <p className="text-blue-500 font-mono text-xs">DESLIZA PARA EXPLORAR →</p>
                    </div>
                </div>

                {/* Projects Strip */}
                <div ref={stripRef} className="projects-strip flex gap-16 px-10">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            ref={(el) => { cardRefs.current[project.id - 1] = el; }}
                            className="project-card-wrapper flex-shrink-0"
                            data-project={project.id}
                        >
                            <div
                                className="project-card w-[80vw] md:w-[600px] h-[60vh] spotlight-card rounded-3xl relative group cursor-pointer perspective-container overflow-hidden"
                                onClick={() => expandProject(project)}
                            >
                                <div className="preserve-3d w-full h-full relative">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition duration-500 rounded-3xl grayscale group-hover:grayscale-0"
                                    />

                                    <div className="absolute bottom-0 left-0 w-full p-10 bg-gradient-to-t from-black via-black/80 to-transparent rounded-b-3xl project-content">
                                        <h3 className="text-4xl font-bold text-white mb-2 leading-tight">
                                            {project.title}<br />{project.subtitle}
                                        </h3>
                                        <p className="text-gray-300 max-w-lg mb-6 opacity-0 group-hover:opacity-100 transition-opacity delay-100 transform translate-y-4 group-hover:translate-y-0">
                                            {project.desc.slice(0, 70)}...
                                        </p>
                                        <div className="flex gap-2">
                                            {project.tech.slice(0, 2).map((t) => (
                                                <span key={t} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs text-white">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Details Panel */}
                                <div className="project-details-panel absolute top-0 left-full h-full w-[500px] bg-black/95 backdrop-blur-xl border-l border-white/10 p-8 overflow-y-auto">
                                    <button
                                        className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            collapseProject();
                                        }}
                                    >
                                        ×
                                    </button>
                                    <div className="project-details-content">
                                        <h2 className="text-3xl font-bold text-white mb-4">{project.title} {project.subtitle}</h2>
                                        <p className="text-gray-300 mb-6 leading-relaxed text-sm">{project.desc}</p>
                                        <div className="mb-6">
                                            <h3 className="text-lg font-bold text-white mb-3">Tecnologías</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.map((t) => (
                                                    <span key={t} className="px-3 py-1.5 bg-white/10 rounded-full text-xs text-white border border-white/20">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white mb-3">Características</h3>
                                            <ul className="space-y-2 text-gray-300 text-sm">
                                                {project.features.map((f) => (
                                                    <li key={f} className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                                        {f}
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

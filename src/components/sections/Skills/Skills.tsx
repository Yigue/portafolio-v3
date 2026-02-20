'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';

interface SkillNode {
    type: 'core' | 'area' | 'tool';
    icon: string;
    title: string;
    label: string;
    desc: string;
    color: string;
    borderColor: string;
    textColor: string;
    position: { top: string; left: string };
}

interface InfoState {
    title: string;
    desc: string;
    color: string;
    tools: string[];
}

export default function Skills() {
    const { language, data } = useLanguage();
    const skillNodes = data.skills.nodes as SkillNode[];
    const connections = data.skills.connections as [number, number][];

    const defaultInfo: InfoState = {
        title: language === 'en' ? 'Select a Node' : 'Selecciona un Nodo',
        desc: language === 'en'
            ? 'Interact with the graph on the left to view details of each technology and its role in the architecture.'
            : 'Interactúa con el grafo de la izquierda para ver detalles de cada tecnología y su rol en la arquitectura.',
        color: '#ffffff',
        tools: [],
    };

    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const networkContainerRef = useRef<HTMLDivElement>(null);
    const panelContainerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
    const panelRef = useRef<HTMLDivElement>(null);
    const [activeInfo, setActiveInfo] = useState<InfoState>(defaultInfo);
    const autoSelectingRef = useRef(false);

    // Update info when language changes
    useEffect(() => {
        setActiveInfo(defaultInfo);
    }, [language]);

    const getToolsForArea = useCallback((areaIndex: number) => {
        const toolIndices = connections
            .filter(([fromIdx]) => fromIdx === areaIndex)
            .map(([, toIdx]) => toIdx);

        return toolIndices
            .map((idx) => skillNodes[idx]?.title)
            .filter((title): title is string => Boolean(title));
    }, [connections, skillNodes]);

    // Helper function to select a node (used by both hover and auto-tour)
    const selectNode = useCallback((index: number) => {
        const node = skillNodes[index];
        const tools = node.type === 'area' ? getToolsForArea(index) : [];
        setActiveInfo({
            title: node.title,
            desc: node.desc,
            color: node.color,
            tools,
        });

        // Update panel border
        if (panelRef.current) {
            panelRef.current.style.borderColor = node.color;
        }

        // Highlight connected lines with animation
        const lines = svgRef.current?.querySelectorAll('line');
        lines?.forEach((line) => {
            if (line.dataset.from === String(index) || line.dataset.to === String(index)) {
                line.classList.add('active');
                line.style.setProperty('--active-color', node.color);
                // Animate line activation - slower
                gsap.to(line, {
                    opacity: 0.7,
                    duration: 0.8,
                    ease: 'power2.out',
                });
            } else {
                line.classList.remove('active');
                // Animate line dimming - slower
                gsap.to(line, {
                    opacity: 0.05,
                    duration: 0.8,
                    ease: 'power2.out',
                });
            }
        });

        // Highlight active node and dim other nodes with animations
        nodesRef.current.forEach((n, i) => {
            if (n) {
                if (i === index) {
                    // Animate active node with hover effect (scale 1.15) - slower transition
                    gsap.to(n, {
                        opacity: 1,
                        scale: 1.15,
                        zIndex: 50,
                        duration: 0.8,
                        ease: 'power2.out',
                    });
                    // Also animate the icon for glow effect
                    const icon = n.querySelector('.node-icon') as HTMLElement;
                    if (icon) {
                        gsap.to(icon, {
                            boxShadow: '0 0 25px currentColor',
                            backgroundColor: '#111',
                            duration: 0.8,
                            ease: 'power2.out',
                        });
                    }
                } else {
                    // Dim other nodes - slower transition
                    gsap.to(n, {
                        opacity: 0.25,
                        scale: 1,
                        duration: 0.8,
                        ease: 'power2.out',
                    });
                }
            }
        });
    }, []);

    // Draw SVG lines between connected nodes
    const drawLines = useCallback(() => {
        const container = containerRef.current;
        const svg = svgRef.current;
        if (!container || !svg) return;

        // Clear existing lines
        while (svg.firstChild) {
            svg.removeChild(svg.firstChild);
        }

        const rectContainer = container.getBoundingClientRect();

        connections.forEach(([fromIdx, toIdx]) => {
            const n1 = nodesRef.current[fromIdx];
            const n2 = nodesRef.current[toIdx];
            if (!n1 || !n2) return;

            const r1 = n1.getBoundingClientRect();
            const r2 = n2.getBoundingClientRect();

            const x1 = r1.left + r1.width / 2 - rectContainer.left;
            const y1 = r1.top + r1.height / 2 - rectContainer.top;
            const x2 = r2.left + r2.width / 2 - rectContainer.left;
            const y2 = r2.top + r2.height / 2 - rectContainer.top;

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', String(x1));
            line.setAttribute('y1', String(y1));
            line.setAttribute('x2', String(x2));
            line.setAttribute('y2', String(y2));
            line.classList.add('network-line');
            line.dataset.from = String(fromIdx);
            line.dataset.to = String(toIdx);
            svg.appendChild(line);
        });
    }, []);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Draw lines immediately - nodes are already visible (fast load)
            setTimeout(drawLines, 100);

            // Animation timeline with pin and scrub - activates when panel is visible
            let lastActiveArea = -1; // Track which area is currently active
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: '55% center',
                    end: '+=500%',
                    pin: true,
                    scrub: 1,
                    pinSpacing: true,
                    onUpdate: (self) => {
                        // Auto-tour: Sequential area selection based on scroll progress
                        const progress = self.progress;
                        const areaIndices = [1, 2, 3]; // Programación, Infraestructura, Ciberseguridad
                        let targetAreaIndex = -1;

                        // Start auto-tour after animation completes (around 30% progress) - earlier start
                        if (progress > 0.3) {
                            const tourProgress = (progress - 0.3) / 0.7; // 0 to 1 range over 70% of scroll
                            if (tourProgress < 0.33) {
                                targetAreaIndex = areaIndices[0]; // Programación
                            } else if (tourProgress < 0.66) {
                                targetAreaIndex = areaIndices[1]; // Infraestructura
                            } else {
                                targetAreaIndex = areaIndices[2]; // Ciberseguridad
                            }

                            // Only call selectNode if the target area changed
                            if (targetAreaIndex !== -1 && targetAreaIndex !== lastActiveArea) {
                                lastActiveArea = targetAreaIndex;
                                autoSelectingRef.current = true;
                                selectNode(targetAreaIndex);
                            }
                        }
                    },
                    onLeave: () => {
                        autoSelectingRef.current = false;
                    },
                    onLeaveBack: () => {
                        autoSelectingRef.current = false;
                        setActiveInfo(defaultInfo);
                        if (panelRef.current) {
                            panelRef.current.style.borderColor = 'rgba(255,255,255,0.1)';
                        }
                        const lines = svgRef.current?.querySelectorAll('line');
                        lines?.forEach((line) => {
                            line.classList.remove('active');
                            line.style.opacity = '1';
                        });
                        nodesRef.current.forEach((n) => {
                            if (n) n.style.opacity = '1';
                        });
                    },
                },
            });

            // Animate network container (where nodes are) - faster entry
            tl.to(networkContainerRef.current, {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out',
            })
                // Animate panel container (node inspector) - faster entry
                .to(panelContainerRef.current, {
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power2.out',
                }, '-=0.3');
        }, sectionRef);

        // Draw lines on resize
        const handleResize = () => drawLines();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            ctx.revert();
        };
    }, [drawLines, selectNode]);

    const handleNodeEnter = (index: number) => {
        autoSelectingRef.current = false;
        selectNode(index);
    };

    const handleNodeLeave = () => {
        if (!autoSelectingRef.current) {
            setActiveInfo(defaultInfo);

            if (panelRef.current) {
                panelRef.current.style.borderColor = 'rgba(255,255,255,0.1)';
            }

            // Reset lines with animation
            const lines = svgRef.current?.querySelectorAll('line');
            lines?.forEach((line) => {
                line.classList.remove('active');
                gsap.to(line, {
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                });
            });

            // Reset nodes with animation
            nodesRef.current.forEach((n) => {
                if (n) {
                    gsap.to(n, {
                        opacity: 1,
                        scale: 1,
                        zIndex: 20,
                        duration: 0.8,
                        ease: 'power2.out',
                    });
                    const icon = n.querySelector('.node-icon') as HTMLElement;
                    if (icon) {
                        gsap.to(icon, {
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
                            backgroundColor: 'rgba(10, 10, 10, 0.5)',
                            duration: 0.8,
                            ease: 'power2.out',
                        });
                    }
                }
            });
        }
    };

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="min-h-screen w-full relative bg-black flex items-center justify-center py-16 md:py-24 overflow-hidden"
        >
            {/* Background Dot Grid */}
            <div
                className="absolute inset-0 z-0 opacity-30 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(rgba(41, 151, 255, 0.3) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(circle at center, black 30%, transparent 75%)',
                }}
            />

            <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full max-w-7xl">
                {/* Header */}
                <div className="text-center mb-10 md:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-900/10 mb-4">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-mono text-blue-300 tracking-widest uppercase">
                            {language === 'en' ? 'System Online' : 'Sistema Online'}
                        </span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
                        {language === 'en' ? 'Technical Ecosystem' : 'Ecosistema Técnico'}
                    </h2>
                    <p className="text-gray-500 mt-4 max-w-lg mx-auto text-sm md:text-base">
                        {language === 'en'
                            ? 'An integrated DevSecOps architecture. Hover over nodes to explore.'
                            : 'Una arquitectura DevSecOps integrada. Pasa el cursor sobre los nodos para explorar.'}
                    </p>
                </div>

                {/* Main Content: Network + Panel */}
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch justify-center">
                    {/* Network Container */}
                    <div
                        ref={(el) => {
                            containerRef.current = el;
                            networkContainerRef.current = el;
                        }}
                        className="network-container glass-panel rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-6 opacity-0"
                    >
                        <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

                        {skillNodes.map((node, index) => (
                            <div
                                key={index}
                                ref={(el) => { nodesRef.current[index] = el; }}
                                className={`tech-node ${node.type === 'core' ? 'core-node' : ''}`}
                                data-node-type={node.type}
                                style={{ top: node.position.top, left: node.position.left }}
                                onMouseEnter={() => handleNodeEnter(index)}
                                onMouseLeave={handleNodeLeave}
                                onClick={() => handleNodeEnter(index)}
                            >
                                <div
                                    className="node-icon"
                                    style={{
                                        borderColor: node.borderColor,
                                        color: node.textColor,
                                        ...(node.type === 'tool' ? { fontSize: '1.2rem' } : {}),
                                    }}
                                >
                                    {node.icon}
                                </div>
                                <span className="node-label">{node.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Info Panel */}
                    <div
                        ref={panelContainerRef}
                        className="w-full lg:w-[420px] self-stretch opacity-0"
                    >
                        <div
                            ref={panelRef}
                            className="h-full glass-panel rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 relative overflow-hidden flex flex-col transition-all duration-300 min-h-[300px]"
                            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                        >
                            <div className="flex justify-between items-center mb-4 sm:mb-5 lg:mb-6 border-b border-white/10 pb-3 sm:pb-4">
                                <span className="font-mono text-[9px] sm:text-[10px] text-gray-500 tracking-widest">
                                    {language === 'en' ? 'NODE INSPECTOR' : 'INSPECTOR DE NODOS'}
                                </span>
                                <div className="flex gap-1.5 sm:gap-2">
                                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500" />
                                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500" />
                                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500" />
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col justify-center relative z-10">
                                <h3
                                    className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 transition-colors duration-300"
                                    style={{ color: activeInfo.color }}
                                >
                                    {activeInfo.title}
                                </h3>
                                <div
                                    className="w-12 sm:w-14 lg:w-16 h-1 sm:h-1.5 mb-4 sm:mb-5 lg:mb-6 rounded-full transition-colors duration-300"
                                    style={{ backgroundColor: activeInfo.color === '#ffffff' ? '#374151' : activeInfo.color }}
                                />
                                <p className="text-gray-400 leading-relaxed text-xs sm:text-sm transition-all duration-300">
                                    {activeInfo.desc}
                                </p>
                                {activeInfo.tools.length > 0 && (
                                    <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                                        {activeInfo.tools.map((tool) => {
                                            // Convert hex to rgb for opacity
                                            const hex = activeInfo.color.replace('#', '');
                                            const r = parseInt(hex.substring(0, 2), 16);
                                            const g = parseInt(hex.substring(2, 4), 16);
                                            const b = parseInt(hex.substring(4, 6), 16);
                                            const bgColor = `rgba(${r}, ${g}, ${b}, 0.1)`;
                                            const borderColor = `rgba(${r}, ${g}, ${b}, 0.2)`;
                                            const textColor = activeInfo.color;

                                            return (
                                                <span
                                                    key={tool}
                                                    className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border font-mono"
                                                    style={{
                                                        backgroundColor: bgColor,
                                                        borderColor: borderColor,
                                                        color: textColor,
                                                    }}
                                                >
                                                    {tool}
                                                </span>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            <div
                                className="panel-glow"
                                style={{ backgroundColor: activeInfo.color === '#ffffff' ? 'rgba(31, 41, 55, 0.2)' : activeInfo.color }}
                            />

                            <div className="mt-auto pt-3 sm:pt-4 border-t border-white/5 flex justify-between text-[8px] sm:text-[9px] lg:text-[10px] font-mono text-gray-600">
                                <span>{language === 'en' ? 'STATUS: ACTIVE' : 'ESTADO: ACTIVO'}</span>
                                <span>{language === 'en' ? 'LATENCY: 12ms' : 'LATENCIA: 12ms'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { futureGoals } from '@/data/timeline';

export default function Future() {
    const sectionRef = useRef<HTMLElement>(null);

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

            tl.to('.future-header', { opacity: 1, duration: 1 })
                .to('.future-card', {
                    opacity: 1,
                    y: 0,
                    stagger: 0.2,
                    duration: 2,
                });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const getProgressColor = (color: string) => {
        switch (color) {
            case 'blue': return 'bg-blue-600';
            case 'pink': return 'bg-pink-600';
            case 'purple': return 'bg-purple-600';
            default: return 'bg-blue-600';
        }
    };

    return (
        <section
            ref={sectionRef}
            id="future"
            className="h-screen w-full flex flex-col justify-center items-center bg-[#050505] relative blueprint-grid border-t border-white/5 overflow-hidden"
        >
            <div className="container mx-auto px-6 z-10">
                <div className="text-center mb-16 future-header opacity-0">
                    <span className="text-blue-500 font-mono text-xs">[ ROADMAP 2026+ ]</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">Objetivos Desbloqueables</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {futureGoals.map((goal, index) => (
                        <div
                            key={index}
                            className="future-card glass-panel p-8 rounded-xl border-dashed border-gray-700 relative opacity-0 translate-y-10"
                        >
                            <div className="absolute top-4 right-4 text-gray-500 text-xs font-mono">
                                {goal.status}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">{goal.title}</h3>
                            <div className="w-full bg-gray-800 h-1 rounded-full mb-4 overflow-hidden">
                                <div
                                    className={`${getProgressColor(goal.color)} h-full`}
                                    style={{ width: `${goal.progress}%` }}
                                />
                            </div>
                            <p className="text-gray-400 text-sm">{goal.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

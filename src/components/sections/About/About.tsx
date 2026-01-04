'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
                        Sobre mí
                    </span>
                    <h2 className="text-5xl font-bold text-white leading-tight">
                        Más que código,<br />creo ecosistemas.
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Soy un desarrollador apasionado por la intersección entre diseño y lógica.
                        No busco solo que funcione, busco que se sienta{' '}
                        <span className="text-white">perfecto</span>.
                    </p>
                    <div className="flex gap-4 pt-4">
                        <div className="px-6 py-3 glass-panel rounded-lg text-sm">Full Stack</div>
                        <div className="px-6 py-3 glass-panel rounded-lg text-sm">UI/UX Fanatic</div>
                    </div>
                </div>

                {/* Visual Content */}
                <div ref={visualRef} className="opacity-0 scale-90 relative">
                    <div className="w-full aspect-square rounded-3xl overflow-hidden glass-panel relative p-2">
                        <img
                            src="https://images.unsplash.com/photo-1544256335-af1323166529?fit=crop&w=800&q=80"
                            alt="Workspace"
                            className="w-full h-full object-cover rounded-2xl opacity-80"
                        />
                        <div className="absolute -bottom-6 -left-6 glass-panel p-6 rounded-2xl border border-white/10">
                            <div className="text-3xl font-bold text-white">+5 Años</div>
                            <div className="text-xs text-gray-400 uppercase">Experiencia</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

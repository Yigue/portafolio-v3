'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { contactData } from '@/data/portfolio-data';

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const reveals = document.querySelectorAll('.reveal-item');
            reveals.forEach((el) => {
                gsap.to(el, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 85%' },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Form submission logic here
    };

    return (
        <section ref={sectionRef} id="contact" className="min-h-screen flex items-center justify-center relative bg-black pt-20">
            <div className="container mx-auto px-6 max-w-5xl text-center">
                <h2 className="text-5xl md:text-7xl font-bold mb-8 reveal-item opacity-0 translate-y-10">
                    {contactData.title}
                </h2>
                <p className="text-xl text-gray-400 mb-12 reveal-item opacity-0 translate-y-10">
                    {contactData.description}
                </p>

                <div className="grid md:grid-cols-2 gap-8 text-left">
                    {/* Contact Form */}
                    <div className="glass-panel p-8 rounded-3xl reveal-item opacity-0 translate-y-10">
                        <h3 className="text-2xl font-bold mb-6">{contactData.formTitle}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="email"
                                placeholder={contactData.emailPlaceholder}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition"
                                required
                            />
                            <textarea
                                rows={4}
                                placeholder={contactData.messagePlaceholder}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white resize-none focus:outline-none focus:border-blue-500 transition"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition"
                            >
                                {contactData.submitButton}
                            </button>
                        </form>
                    </div>

                    {/* CV Download */}
                    <div className="space-y-8 flex flex-col justify-between reveal-item opacity-0 translate-y-10">
                        <div className="glass-panel p-8 rounded-3xl h-full flex flex-col justify-center items-center text-center hover:bg-white/5 transition cursor-pointer">
                            <h3 className="text-2xl font-bold text-white">{contactData.cvTitle}</h3>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-20 py-10 border-t border-white/5 text-gray-600 text-sm">
                    {contactData.footer}
                </footer>
            </div>
        </section>
    );
}

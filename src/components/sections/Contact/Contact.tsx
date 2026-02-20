'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';
import emailjs from '@emailjs/browser';

export default function Contact() {
    const { language, data } = useLanguage();
    const contactData = data.contact;

    const sectionRef = useRef<HTMLElement>(null);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        // Verificar que las variables de entorno existen
        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            console.error('❌ Credenciales de EmailJS faltantes');
            console.log('Service ID:', serviceId ? '✓' : '✗');
            console.log('Template ID:', templateId ? '✓' : '✗');
            console.log('Public Key:', publicKey ? '✓' : '✗');
            setSubmitStatus('error');
            setIsSubmitting(false);
            setTimeout(() => setSubmitStatus('idle'), 5000);
            return;
        }

        try {
            console.log('📧 Enviando email con EmailJS SDK...');

            // Usar el SDK oficial de EmailJS
            const result = await emailjs.send(
                serviceId,
                templateId,
                {
                    from_email: email,
                    message: message,
                    to_email: 'RiedelCeo@gmail.com',
                },
                publicKey
            );

            console.log('✅ Email enviado exitosamente:', result);
            setSubmitStatus('success');
            setEmail('');
            setMessage('');
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } catch (error: any) {
            console.error('❌ Error al enviar email:', error);
            console.error('Detalles del error:', {
                text: error.text,
                status: error.status,
                message: error.message
            });
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDownloadCV = () => {
        const link = document.createElement('a');
        link.href = language === 'en' ? '/cv-en.pdf' : '/cv-es.pdf';
        link.download = language === 'en' ? 'CV_Guillermo_Riedel_EN.pdf' : 'CV_Guillermo_Riedel_ES.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section ref={sectionRef} id="contact" className="min-h-screen flex items-center justify-center relative bg-black pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-5xl text-center">
                <h2 className="text-5xl md:text-7xl font-bold mb-8 reveal-item opacity-0 translate-y-10">
                    {contactData.title}
                </h2>
                <p className="text-xl text-gray-400 mb-12 reveal-item opacity-0 translate-y-10">
                    {contactData.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-left">
                    {/* Contact Form */}
                    <div className="glass-panel p-6 md:p-8 rounded-2xl md:rounded-3xl reveal-item opacity-0 translate-y-10">
                        <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">{contactData.formTitle}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="email"
                                placeholder={contactData.emailPlaceholder}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 text-white text-sm md:text-base focus:outline-none focus:border-blue-500 transition"
                                required
                                disabled={isSubmitting}
                            />
                            <textarea
                                rows={4}
                                placeholder={contactData.messagePlaceholder}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 text-white text-sm md:text-base resize-none focus:outline-none focus:border-blue-500 transition"
                                required
                                disabled={isSubmitting}
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-white text-black font-bold py-3 md:py-4 rounded-xl hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                            >
                                {isSubmitting
                                    ? (language === 'en' ? 'Sending...' : 'Enviando...')
                                    : submitStatus === 'success'
                                        ? (language === 'en' ? '✓ Sent' : '✓ Enviado')
                                        : submitStatus === 'error'
                                            ? (language === 'en' ? '✗ Error' : '✗ Error')
                                            : contactData.submitButton}
                            </button>
                            {submitStatus === 'success' && (
                                <p className="text-green-400 text-sm text-center">
                                    {language === 'en' ? 'Message sent successfully!' : '¡Mensaje enviado con éxito!'}
                                </p>
                            )}
                            {submitStatus === 'error' && (
                                <p className="text-red-400 text-sm text-center">
                                    {language === 'en' ? 'Error sending. Please try again.' : 'Error al enviar. Por favor, intenta de nuevo.'}
                                </p>
                            )}
                        </form>
                    </div>

                    {/* CV Download */}
                    <div className="space-y-8 flex flex-col justify-between reveal-item opacity-0 translate-y-10">
                        <button
                            onClick={handleDownloadCV}
                            className="glass-panel p-6 md:p-8 rounded-2xl md:rounded-3xl h-full flex flex-col gap-4 justify-center items-center text-center hover:bg-white/5 transition cursor-pointer group"
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center group-hover:bg-blue-500/20 transition">
                                <svg className="w-8 h-8 md:w-10 md:h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{contactData.cvTitle}</h3>
                                <p className="text-sm text-gray-400">
                                    {language === 'en' ? 'Click to download PDF' : 'Click para descargar PDF'}
                                </p>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-12 md:mt-20 py-8 md:py-10 border-t border-white/5 text-gray-600 text-xs md:text-sm px-4">
                    {language === 'en'
                        ? '© 2026 Guillermo Riedel. All rights reserved. Created with Next.js and Tailwind CSS.'
                        : '© 2026 Guillermo Riedel. Todos los derechos reservados. Creado con Next.js y Tailwind CSS.'}
                </footer>
            </div>
        </section>
    );
}

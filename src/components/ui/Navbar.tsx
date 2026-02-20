'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
    const { toggleLanguage, language } = useLanguage();
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="fixed top-0 right-0 z-50 p-6 flex justify-end pointer-events-none">
            <button
                onClick={toggleLanguage}
                className={`pointer-events-auto glass-panel px-6 py-2.5 rounded-full font-bold text-white text-xs hover:text-blue-400 transition tracking-widest uppercase flex items-center justify-center gap-2 ${scrolled ? 'bg-black/80 shadow-lg backdrop-blur-md' : 'bg-black/20 backdrop-blur-sm'}`}
                aria-label="Toggle Language"
            >
                <span className={language === 'es' ? 'text-white' : 'text-gray-500'}>ES</span>
                <span className="w-px h-3 bg-white/20"></span>
                <span className={language === 'en' ? 'text-white' : 'text-gray-500'}>EN</span>
            </button>
        </nav>
    );
}

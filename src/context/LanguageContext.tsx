'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { portfolioData, PortfolioData } from '@/data/portfolio-data';

type Language = 'es' | 'en';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    data: PortfolioData;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('es');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedLang = localStorage.getItem('portfolio-language') as Language;
        if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
            setLanguage(savedLang);
        }
        setMounted(true);
    }, []);

    const toggleLanguage = () => {
        const newLang = language === 'es' ? 'en' : 'es';
        setLanguage(newLang);
        localStorage.setItem('portfolio-language', newLang);
    };

    // Avoid hydration mismatch by rendering children only after mount, 
    // or you could use a loading state. For simplicity in this portfolio, 
    // we'll just return the provider with default 'es' initially matching server.
    // However, to be safe with localStorage, we can use the 'mounted' check 
    // to arguably prevent flicker or just default to ES. 
    // Given the static nature, let's just use the state.

    // Access the data based on the current language
    // We assume portfolioData has 'es' and 'en' keys now.
    // @ts-ignore - Temporary ignore until we update the JSON type structure
    const currentData = portfolioData[language] || portfolioData['es'];

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, data: currentData }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

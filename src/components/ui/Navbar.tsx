'use client';

import Link from 'next/link';

const navLinks = [
    { href: '#hero', label: 'Inicio' },
    { href: '#about', label: 'Sobre mí' },
    { href: '#skills', label: 'Skills' },
    { href: '#timeline', label: 'Trayectoria' },
    { href: '#projects', label: 'Proyectos' },
];

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 py-6 px-6 flex justify-center pointer-events-none">
            <div className="glass-panel px-8 py-4 rounded-full flex gap-8 pointer-events-auto">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="text-xs font-bold text-gray-400 hover:text-white transition uppercase tracking-widest"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
}

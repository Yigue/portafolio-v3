import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#020202] text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black pointer-events-none" />
            <div className="absolute w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -top-20 -left-20 pointer-events-none" />

            <div className="z-10 text-center space-y-8 px-4">
                <div className="relative">
                    <h1 className="text-[150px] md:text-[200px] font-bold tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl md:text-2xl font-mono text-blue-500 tracking-[0.5em] animate-pulse">
                            SYSTEM_ERROR
                        </span>
                    </div>
                </div>

                <div className="space-y-4 max-w-lg mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                        Página no encontrada
                    </h2>
                    <p className="text-gray-400 leading-relaxed">
                        Parece que te has desviado del camino. La ruta solicitada no existe en este sistema o ha sido movida.
                    </p>
                </div>

                <div className="pt-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 group px-8 py-4 glass-panel rounded-full hover:bg-white/10 transition-all border border-white/5"
                    >
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-sm font-bold tracking-widest uppercase">Volver al Inicio</span>
                    </Link>
                </div>
            </div>

            {/* Decorative Code Elements */}
            <div className="absolute bottom-10 left-10 text-xs font-mono text-white/10 hidden md:block">
                <p>error_code: 0x404</p>
                <p>status: MODULE_NOT_FOUND</p>
                <p>trace: /void/null/undefined</p>
            </div>
        </div>
    );
}

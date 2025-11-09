import { Link, usePage } from '@inertiajs/react';

export default function LandingPage() {
    const { auth } = usePage().props;
    const user = auth?.user;
    const href = user ? (user.role === 'hr' ? '/hr/dashboard' : '/employee/dashboard') : '/login';

    return (
        <div
            className="relative min-h-screen bg-cover bg-center font-['Hanken_Grotesk'] text-white overflow-hidden"
            style={{
                backgroundImage:
                    `url(https://res.cloudinary.com/dha8kpdrp/image/upload/v1762624806/PixVerse_Image_Effect_prompt_enhance_the_quali_1_lsl9ea.png)`
            }}
        >
            {/* === Gradient overlays === */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-transparent pointer-events-none"></div>
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm md:backdrop-blur-[2px]"></div>

            {/* === Content === */}
            <div className="relative z-10 flex flex-col justify-center h-full w-full px-6 sm:px-10 md:px-16 lg:px-20 py-10 md:py-16 text-left max-w-6xl">
                <div className="w-full md:w-[60%] lg:w-[45%] space-y-4 sm:space-y-6 md:space-y-8">
                    {/* Logo */}
                    <img
                        src="https://res.cloudinary.com/dha8kpdrp/image/upload/v1762624680/full-logo-D2sb1z0W_hw6tyl.svg"
                        alt="HR Employee Management System Logo"
                        className="w-32 sm:w-40 md:w-52 mb-3 select-none drop-shadow-2xl animate-slideDown delay-[100ms]"
                    />

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] animate-slideLeft delay-[200ms]">
                        HR Employee <br className="hidden sm:block" /> Management System
                    </h1>

                    {/* Accent line */}
                    <div className="h-1 w-16 sm:w-20 md:w-24 bg-[#003153] rounded-full mt-3 sm:mt-4 animate-scaleUp delay-[400ms]"></div>

                    {/* Paragraph */}
                    <p className="text-sm sm:text-base md:text-lg leading-relaxed max-w-md sm:max-w-lg opacity-90 mt-4 animate-slideLeft delay-[500ms]">
                        Simplify your HR tasks with no hassle. Manage employee records, attendance, payroll, and performance — all in one place. Stay organized, fast, and automated.
                    </p>

                    {/* Button */}
                    <div className="mt-6">
                        <Link
                            href={href}
                            className="relative inline-block px-6 sm:px-8 py-2.5 sm:py-3 rounded-md font-semibold border-2 border-white text-white bg-transparent overflow-hidden group transition-transform duration-300 hover:scale-105 hover:shadow-xl animate-fadeIn delay-[800ms]"
                            role="button"
                            aria-label="Get started"
                        >
                            <span className="absolute inset-0 bg-[#003153] -z-10 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out rounded-md"></span>
                            <span className="relative z-10 text-sm sm:text-base">Get Started</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* === Decorative floating circle === */}
            <div className="absolute bottom-8 right-6 hidden lg:block animate-floatSlow opacity-70">
                <div className="w-24 h-24 lg:w-32 lg:h-32 border-4 border-[#003153]/60 rounded-full"></div>
            </div>
        </div>
    );
}

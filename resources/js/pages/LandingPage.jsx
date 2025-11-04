import bgImg from '@/assets/Background-Image.PNG';
import fullLogo from '@/assets/full-logo.svg';


export default function LandingPage() {
  return (
    <div
      className="relative h-screen bg-cover bg-center font-['Hanken_Grotesk'] text-white overflow-hidden"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* === Gradient overlays for depth === */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent"></div>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>

      {/* === Content section === */}
      <div className="relative z-10 flex flex-col justify-center h-full w-full md:w-1/2 px-10 md:px-20 py-16 text-left space-y-8 animate-fadeInSlow">
        {/* Logo with soft motion */}
        <img
          src={fullLogo}
          alt="HR Employee Management System Logo"
          className="w-44 md:w-52 mb-2 select-none drop-shadow-2xl animate-slideDown delay-[100ms]"
        />

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] animate-slideLeft delay-[200ms]">
          HR Employee <br /> Management System
        </h1>

        {/* Accent line */}
        <div className="h-1 w-24 bg-[#003153] rounded-full animate-scaleUp delay-[400ms]"></div>

        {/* Paragraph */}
        <p className="text-base md:text-lg leading-relaxed max-w-lg opacity-90 animate-slideLeft delay-[500ms]">
          Simplify your HR tasks with no hassle.  
          Our platform helps you manage employee records, attendance, payroll, and performance —  
          all in one place. Keep your HR operations organized, fast, and automated.
        </p>

        {/* Button */}
        <button className="relative mt-6 w-fit px-8 py-3 rounded-md font-semibold border-2 border-white text-white bg-transparent overflow-hidden group transition-all duration-500 hover:scale-105 hover:shadow-xl animate-fadeIn delay-[800ms]">
        {/* Animated background — stays behind text */}
        <span className="absolute inset-0 bg-[#003153] -z-10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>

        {/* Button text */}
        <span className="relative z-10 transition-colors duration-300">
          Get Started
        </span>
      </button>
      </div>

      {/* === Decorative floating circle === */}
      <div className="absolute bottom-10 right-10 hidden md:block animate-floatSlow opacity-70">
        <div className="w-32 h-32 border-4 border-[#003153]/60 rounded-full"></div>
      </div>
    </div>
  );
}

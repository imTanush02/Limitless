import React from "react";

const Landing = () => {
  // Generate an array for the tick marks
  const ticks = Array.from({ length: 40 });
  return (
    <div className="relative w-full h-screen bg-[#050505] overflow-hidden font-sans text-white">
      {/* Deep Space Starry Background */}
      <div className="absolute inset-0 z-0 bg-black">
        <img
          src="/images/stars.png"
          alt="Stars"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-90"
        />
      </div>

      {/* Top Left Logo Placeholder */}
      <div className="absolute top-10 left-10 z-30 flex items-center gap-3">
        <img src="/images/logo.png" alt="" className="w-[40%]" />
      </div>

      {/* Top Right Navigation */}
      <div className="absolute top-10 right-10 z-30 flex flex-col text-right text-[10px] tracking-[0.2em] gap-3 text-white">
        <a href="#" className="hover:text-white transition-colors">
          WORK
        </a>
        <a href="#" className="hover:text-white transition-colors">
          PROCESS
        </a>
        <a href="#" className="hover:text-white transition-colors">
          STUDIO
        </a>
        <a href="#" className="hover:text-white transition-colors">
          CONTACT
        </a>
      </div>

      {/* Left Vertical Line with Ticks */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col items-start justify-center gap-1 z-30 pointer-events-none">
        {ticks.map((_, i) => (
          <div
            key={`left-tick-${i}`}
            className={`h-[1px] bg-white ${i % 5 === 0 ? "w-3" : "w-1"}`}
          ></div>
        ))}
      </div>

      {/* Right Vertical Line with Ticks */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col items-end justify-center gap-1 z-30 pointer-events-none">
        {ticks.map((_, i) => (
          <div
            key={`right-tick-${i}`}
            className={`h-[1px] bg-white ${i % 5 === 0 ? "w-3" : "w-1"}`}
          ></div>
        ))}
      </div>

      {/* Bottom Left: Scroll Indicator */}
      <div className="absolute bottom-10 left-10 z-30 origin-bottom-left -rotate-90 flex items-center gap-2">
        <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400">
          Scroll
        </span>
        <svg
          w="12"
          h="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-3 h-3 text-neutral-400 rotate-45"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </div>

      {/* Bottom Right: Social Icons Placeholder */}
      <div className="absolute bottom-10 right-10 z-30 flex flex-col gap-5 text-neutral-400">
        {/* Dribbble-like icon */}
        <a href="#" className="hover:text-white transition-colors">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path>
          </svg>
        </a>
        {/* Instagram icon */}
        <a href="#" className="hover:text-white transition-colors">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
        {/* LinkedIn icon */}
        <a href="#" className="hover:text-white transition-colors">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        </a>
      </div>

      {/* Main Center Content */}
      <div className="relative w-full h-full flex flex-col items-center justify-end pb-0 z-10">
        {/* Arch Mask Window */}
        <div className="absolute -bottom-10 border-[1px] bg-transparent border-white/20 rounded-full scale-110 w-[80vh] h-[80vh] pointer-events-none"></div>
        <div className="absolute -bottom-10 border-[1px] bg-transparent border-white/20 rounded-full scale-120 w-[80vh] h-[80vh] pointer-events-none"></div>
        <div className="absolute -bottom-10 border-[1px] bg-transparent border-white/20 rounded-full scale-130 w-[80vh] h-[80vh] pointer-events-none"></div>
        <div
          className="relative w-[40vw]  h-[80vh] overflow-hidden drop-shadow-2xl"
          style={{ borderRadius: "350px 350px 0 0" }}
        >
          {/* Sunset Sky Background inside Arch */}
          <img
            src="/images/bg.png"
            alt="Sunset Sky"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />

          {/* Astronaut inside Arch */}
          <img
            src="/images/astro.png"
            alt="Astronaut"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] object-contain pointer-events-none drop-shadow-xl hover:-translate-y-[55%] transition-transform duration-700"
          />

          {/* Glowing Arch Border */}
        </div>

        {/* Foreground Flowers Layer */}
        <img
          src="/images/flowers.png"
          alt="Foreground Flowers"
          className="absolute -bottom-5 left-0 w-full object-cover object-bottom z-20 pointer-events-none drop-shadow-2xl"
        />

        {/* Floating Typography Overlapping Arch */}
        {/* Split to avoid Stacking Context issues on Mix-Blend-Mode */}

        {/* Main Title with Blend Mode */}
        <div className="absolute top-[220px] left-0 w-full text-center z-30 pointer-events-none mix-blend-difference">
          <h1
            className="text-[64px] sm:text-[96px] xl:text-[128px] font-normal leading-none inline-block"
            style={{
              fontFamily: "'Catavalo', Georgia, serif",
              color: "#FFFBFE",
            }}
          >
            Limitless Studio
          </h1>
        </div>

        {/* Subtitle */}
        <div className="absolute top-[300px] sm:top-[340px] xl:top-[360px] left-0 w-full text-center z-30 pointer-events-none">
          <p 
            className="text-sm sm:text-lg md:text-[20px] font-light text-white tracking-wide drop-shadow-md"
            style={{ fontFamily: "'Gilroy', sans-serif" }}
          >
            Where vision becomes experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;

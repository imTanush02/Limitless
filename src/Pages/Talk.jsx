import React from 'react';

const Talk = () => {
  return (
    <div className="w-full h-[80vh] relative bg-[#0a0a0a] text-white overflow-hidden font-sans">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/images/stars.png" 
          alt="Background" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/80"></div>
      </div>

      {/* Main Content Area */}
      <div className="relative w-full h-full flex items-center px-10 md:px-32 lg:px-48 mx-auto z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-center md:items-center w-full gap-10 md:gap-20">
          {/* Left Side: Large Text */}
          <div className="flex flex-col items-start w-full md:w-auto">
            <div className="flex items-baseline gap-4 md:gap-8">
              <h1 className="text-5xl sm:text-6xl md:text-[80px] lg:text-[110px] font-bold tracking-tighter leading-none">
                LET'S
              </h1>
              <h1 className="text-5xl sm:text-6xl md:text-[80px] lg:text-[110px] font-['Catavalo'] font-normal tracking-tight leading-none relative">
                WORK
                <span className="absolute left-0 -bottom-2 md:-bottom-4 w-full h-[2px] md:h-[4px] bg-white"></span>
              </h1>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-[80px] lg:text-[110px] font-bold tracking-tighter leading-none mt-2 md:mt-4">
              TOGETHER
            </h1>
          </div>

          {/* Right Side: Smaller Text & Link */}
          <div className="flex flex-col items-start w-full md:w-auto md:max-w-[300px] mt-10 md:mt-0">
            <p className="text-sm md:text-base text-white/50 font-light leading-relaxed mb-6">
              Work With Us If Average Isn't Your Thing.
              <br />
              Drop It, We'll Build It!
            </p>
            
            <a href="#" className="flex items-center gap-2 text-sm md:text-base font-medium hover:text-white/70 transition-colors group">
              Let's Talk 
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2} 
                stroke="currentColor" 
                className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Talk;

import React from 'react';

const Footer = () => {
  return (
    <div className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden flex flex-col justify-between font-sans text-white">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <img 
          src="/images/process_bg.png" 
          alt="Footer Background" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/80"></div>
      </div>

      <div className="relative z-10 mt-[10vh] flex justify-end px-12 md:px-24 mb-[5vh] w-full">
         <div className="grid grid-cols-3 gap-8 md:gap-16 text-right text-white text-[10px] md:text-[11px] tracking-[0.25em] font-bold uppercase" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            <div className="flex flex-col gap-3">
               <a href="#" className="hover:text-gray-300 transition-all">WORK</a>
               <a href="#" className="hover:text-gray-300 transition-all">PROCESS</a>
               <a href="#" className="hover:text-gray-300 transition-all">STUDIO</a>
               <a href="#" className="hover:text-gray-300 transition-all">CONTACT</a>
            </div>
            <div className="flex flex-col gap-3">
               <a href="#" className="hover:text-gray-300 transition-all">WORK</a>
               <a href="#" className="hover:text-gray-300 transition-all">PROCESS</a>
               <a href="#" className="hover:text-gray-300 transition-all">STUDIO</a>
               <a href="#" className="hover:text-gray-300 transition-all">CONTACT</a>
            </div>
            <div className="flex flex-col gap-3">
               <a href="#" className="hover:text-gray-300 transition-all">WORK</a>
               <a href="#" className="hover:text-gray-300 transition-all">PROCESS</a>
               <a href="#" className="hover:text-gray-300 transition-all">STUDIO</a>
               <a href="#" className="hover:text-gray-300 transition-all">CONTACT</a>
            </div>
         </div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 w-full flex flex-col items-center pb-8 px-8 md:px-12">
        <div className="w-full flex justify-between items-end relative">
           {/* SCROLL */}
           <div className="absolute left-0 bottom-[1vh] flex items-center gap-2 text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-medium opacity-80" style={{ fontFamily: "'Gilroy', sans-serif" }}>
             SCROLL 
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
           </div>
        </div>
        
        {/* Big Text */}
        <div className="w-full flex justify-center items-center overflow-hidden h-[180px] md:h-[220px] lg:h-[280px]">
           <h1 className="text-[13vw] font-bold leading-none tracking-tight uppercase" 
               style={{ 
                   fontFamily: "'Catavalo', Georgia, serif",
                   backgroundImage: "url('/images/flowers.png')",
                   backgroundColor: "rgba(255, 255, 255, 0.85)",
                   backgroundBlendMode: "screen",
                   backgroundSize: "cover",
                   backgroundPosition: "center 30%",
                   WebkitBackgroundClip: "text",
                   WebkitTextFillColor: "transparent"
               }}>
             LIMITLESSSTUDIO
           </h1>
        </div>

        {/* Footer Bottom Bar */}
        <div className="w-full flex justify-between items-center mt-2 md:mt-4">
           <div className="w-[60%] flex justify-end">
            <p className="text-[10px] md:text-xs font-light opacity-50" style={{ fontFamily: "'Gilroy', sans-serif" }}>
             © 2026 Limitless Studio. All Rights Reserved.
           </p>
           </div>
           <div className="flex items-center gap-5">
              <a href="#" className="hover:opacity-100 opacity-70 transition-opacity">
                {/* Dribbble SVG */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4C13.56 4 15.02 4.45 16.27 5.21C15.93 6.03 15.42 6.84 14.77 7.64C12.8 6.94 10.59 6.4 8.24 6.06C9.27 5.03 10.57 4.3 12 4ZM5.09 7.84C7.03 8.16 8.89 8.63 10.61 9.27C9.37 12.18 7.74 14.78 5.75 16.92C4.65 15.54 4 13.84 4 12C4 10.45 4.41 9.02 5.09 7.84ZM6.96 18.23C8.65 16.32 10.09 13.98 11.23 11.3C13.06 11.89 14.71 12.67 16.15 13.62C15.77 15.55 14.99 17.3 13.94 18.77C11.83 18.29 9.49 18.16 6.96 18.23ZM12 20C10.15 20 8.44 19.37 7.05 18.34C9.52 18.22 11.84 18.39 13.95 18.91C13.08 19.64 12.12 20 12 20ZM17.26 18.06C16.35 16.79 15.58 15.41 14.97 13.96C16.51 13.09 18.25 12.44 20.12 12.06C19.98 14.39 18.91 16.48 17.26 18.06ZM20.12 11.02C18.42 11.38 16.8 11.96 15.3 12.72C14.01 11.84 12.51 11.13 10.87 10.6C12.03 8.11 13.56 5.86 15.43 3.9C17.7 4.9 19.38 6.91 19.93 9.3C19.99 9.86 20.06 10.43 20.12 11.02Z"/>
                </svg>
              </a>
              <a href="#" className="hover:opacity-100 opacity-70 transition-opacity">
                {/* Instagram SVG */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="hover:opacity-100 opacity-70 transition-opacity">
                {/* LinkedIn SVG */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

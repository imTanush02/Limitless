import React from 'react';

const Footer = () => {
  return (
    <div className="footer-section relative w-full h-screen bg-[#0a0a0a] overflow-hidden flex flex-col justify-between font-sans text-white">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <video
          src="/video/footer.mp4" 
          alt="Footer Background" 
          muted
          loop
          autoPlay
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
        
        {/* Big Text */}
        <div className="w-full flex justify-center items-center overflow-hidden h-[180px] md:h-[220px] lg:h-[280px]">
           <h1 className="text-[12vw] font-bold leading-none uppercase" 
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
        <div className="w-full flex justify-center items-center mt-2 md:mt-4">
           
            <p className="text-[10px] md:text-xs font-light opacity-50" style={{ fontFamily: "'Gilroy', sans-serif" }}>
             © 2026 Limitless Studio. All Rights Reserved.
           </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const processes = [
  {
    id: "01",
    title: "Strategy",
    subtitle: "Understanding Client",
    description: "We bring visions to life with cutting-edge technology, ensuring every experience is seamless, performant, and unforgettable."
  },
  {
    id: "02",
    title: "Design",
    subtitle: "Visual Conception",
    description: "Crafting beautiful, intuitive interfaces that resonate with your brand identity and engage your target audience effectively."
  },
  {
    id: "03",
    title: "Development",
    subtitle: "Building the Core",
    description: "Developing robust and scalable architectures using modern frameworks to ensure longevity and high performance."
  }
];

const OurProcess = () => {
  const containerRef = useRef(null);
  const titleRefs = useRef([]);
  const numberRefs = useRef([]);
  const detailRefs = useRef([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Set initial states for elements except the first one
      gsap.set(titleRefs.current.slice(1), { autoAlpha: 0, y: 50 });
      gsap.set(numberRefs.current.slice(1), { autoAlpha: 0, y: 50 });
      gsap.set(detailRefs.current.slice(1), { autoAlpha: 0, y: 50 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${processes.length * 800}`, // 800px scroll distance per step
          pin: true,
          scrub: 1,
        }
      });

      processes.forEach((_, i) => {
        if (i === 0) return;

        // Animate out the previous step and animate in the current step simultaneously
        tl.to(titleRefs.current[i - 1], { autoAlpha: 0, y: -50, duration: 1, ease: "power2.inOut" }, `step${i}`)
          .to(numberRefs.current[i - 1], { autoAlpha: 0, y: -50, duration: 1, ease: "power2.inOut" }, `step${i}`)
          .to(detailRefs.current[i - 1], { autoAlpha: 0, y: -50, duration: 1, ease: "power2.inOut" }, `step${i}`)
          
          .to(titleRefs.current[i], { autoAlpha: 1, y: 0, duration: 1, ease: "power2.inOut" }, `step${i}`)
          .to(numberRefs.current[i], { autoAlpha: 1, y: 0, duration: 1, ease: "power2.inOut" }, `step${i}`)
          .to(detailRefs.current[i], { autoAlpha: 1, y: 0, duration: 1, ease: "power2.inOut" }, `step${i}`);
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-screen relative bg-[#0a0a0a] text-white overflow-hidden font-sans">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/images/process_bg.png" 
          alt="Process Background" 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div> {/* Subtle dark overlay for text readability */}
      </div>

      {/* Main Content Area */}
      <div className="relative w-full h-full flex flex-col justify-between py-16 px-10 md:px-24 max-w-[1800px] mx-auto z-10">
        
        {/* Top Section: Title and Number */}
        <div className="flex justify-between items-start pt-10">
          <div>
            <h2 className="text-lg md:text-xl font-light text-white/70 mb-1">Our process</h2>
            <div className="relative h-20 w-80">
              {processes.map((p, i) => (
                <h1 
                  key={p.id} 
                  ref={el => titleRefs.current[i] = el}
                  className="absolute top-0 left-0 text-5xl md:text-7xl font-medium tracking-tight text-white/90"
                >
                  {p.title}
                </h1>
              ))}
            </div>
          </div>
          
          <div className="relative h-32 w-32 md:h-48 md:w-48">
            {processes.map((p, i) => (
              <div 
                key={p.id}
                ref={el => numberRefs.current[i] = el} 
                className="absolute top-0 right-0 text-7xl md:text-[140px] font-thin italic text-white/70 tracking-tighter"
              >
                {p.id}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Details and Breadcrumbs */}
        <div className="flex flex-col gap-10 max-w-xl pb-10">
          <div className="relative h-48">
            {processes.map((p, i) => (
              <div 
                key={p.id}
                ref={el => detailRefs.current[i] = el}
                className="absolute bottom-0 left-0 w-full flex flex-col justify-end h-full"
              >
                <h3 className="text-3xl md:text-[40px] font-normal leading-tight mb-4">{p.subtitle}</h3>
                <p className="text-sm md:text-base text-white/50 leading-relaxed font-light">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
          
          {/* Static Breadcrumbs */}
          <div className="flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium">
            <span className="border border-white/20 px-6 py-2.5 rounded-full text-white/70 backdrop-blur-md bg-white/5">Vision behind</span>
            <span className="w-8 h-[1px] bg-white/20"></span>
            <span className="border border-white/20 px-6 py-2.5 rounded-full text-white/70 backdrop-blur-md bg-white/5">References</span>
            <span className="w-8 h-[1px] bg-white/20"></span>
            <span className="border border-white/20 px-6 py-2.5 rounded-full text-white/70 backdrop-blur-md bg-white/5">Research</span>
          </div>
        </div>
      </div>

      {/* Decorative Fixed UI Elements within the section */}
      {/* Scroll indicator - Left */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-8 hidden lg:flex z-10">
         <div className="text-[10px] tracking-[0.4em] -rotate-90 origin-left translate-x-4 text-white/40 font-medium uppercase">
           SCROLL
         </div>
         <div className="flex flex-col gap-2 mt-12">
            {[...Array(8)].map((_, i) => (
              <span key={i} className="w-[3px] h-[3px] rounded-full bg-white/30"></span>
            ))}
         </div>
      </div>

      {/* Right Indicator bar */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 hidden lg:flex z-10">
         <div className="flex flex-col gap-2 mb-2">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="w-[3px] h-[3px] rounded-full bg-white/30"></span>
            ))}
         </div>
         <div className="w-[2px] h-32 bg-white/10 relative rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/3 bg-orange-500/80 rounded-full"></div>
         </div>
         <div className="flex flex-col gap-2 mt-2">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="w-[3px] h-[3px] rounded-full bg-white/30"></span>
            ))}
         </div>
      </div>
    </div>
  );
};

export default OurProcess;

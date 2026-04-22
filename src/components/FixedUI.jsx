import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FixedUI = () => {
  const ticks = Array.from({ length: 150 });
  const leftTicksRef = useRef(null);
  const rightTicksRef = useRef(null);
  const smoothY = useRef(0);

  useEffect(() => {
    const mod = (n, m) => ((n % m) + m) % m;
    let rafId;

    const animate = () => {
      // Read the ACTUAL page scroll position
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const targetY = scrollY * 0.5;

      // Lerp smoothly towards the target
      smoothY.current += (targetY - smoothY.current) * 0.12;

      const wrappedY = -mod(smoothY.current, 45);
      if (leftTicksRef.current) {
        leftTicksRef.current.style.transform = `translateY(${wrappedY}px)`;
      }
      if (rightTicksRef.current) {
        rightTicksRef.current.style.transform = `translateY(${wrappedY}px)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] pointer-events-none font-sans text-white">
      {/* Top Left Logo Placeholder */}
      <div className="absolute top-10 left-10 pointer-events-auto flex items-center gap-3">
        <img src="/images/logo.png" alt="" className="w-[40%]" />
      </div>

      {/* Top Right Navigation */}
      <div className="absolute top-10 right-10 pointer-events-auto flex flex-col text-right text-[10px] tracking-[0.2em] gap-3">
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

      {/* Left Vertical Line with Ticks (Dial) */}
      <div
        className="absolute left-10 top-1/2 -translate-y-1/2 h-[300px] w-5 pointer-events-none overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
        }}
      >
        <div
          ref={leftTicksRef}
          className="left-ticks-inner absolute top-0 left-0 w-full flex flex-col gap-2 items-start"
        >
          {ticks.map((_, i) => (
            <div
              key={`left-tick-${i}`}
              className={`h-[1px] bg-white shrink-0 ${i % 5 === 0 ? "w-3" : "w-1"}`}
            ></div>
          ))}
        </div>
      </div>

      {/* Right Vertical Line with Ticks (Dial) */}
      <div
        className="absolute right-10 top-1/2 -translate-y-1/2 h-[300px] w-5 pointer-events-none overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
        }}
      >
        <div
          ref={rightTicksRef}
          className="right-ticks-inner absolute top-0 right-0 w-full flex flex-col gap-2 items-end"
        >
          {ticks.map((_, i) => (
            <div
              key={`right-tick-${i}`}
              className={`h-[1px] bg-white shrink-0 ${i % 5 === 0 ? "w-3" : "w-1"}`}
            ></div>
          ))}
        </div>
      </div>

      {/* Bottom Left: Scroll Indicator */}
      <div className="absolute bottom-10 left-10 pointer-events-auto origin-bottom-left -rotate-90 flex items-center gap-2">
        <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400">
          Scroll
        </span>
        <svg
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
      <div className="absolute bottom-10 right-10 pointer-events-auto flex flex-col gap-5 text-neutral-400">
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
    </div>
  );
};

export default FixedUI;

import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  { selector: ".landing-section", name: "HOME" },
  { selector: ".video-page-section", name: "SHOWREEL" },
  { selector: ".text-page-section", name: "MANIFEST" },
  { selector: ".work-section", name: "WORK" },
  { selector: ".workwedo-section", name: "SERVICES" },
  { selector: ".process-section", name: "PROCESS" },
  { selector: ".talk-section", name: "CONNECT" },
  { selector: ".footer-section", name: "FOOTER" },
];

const TICK_COUNT = 150;
const TICK_STEP = 9; // 1px height + 8px gap (gap-2)

const FixedUI = () => {
  const ticks = Array.from({ length: TICK_COUNT });
  const leftTicksRef = useRef(null);
  const rightTicksRef = useRef(null);
  const leftLabelRef = useRef(null);
  const rightLabelRef = useRef(null);
  const smoothY = useRef(0);
  const dotsRef = useRef(null);
  const navRef = useRef(null);
  const [currentSection, setCurrentSection] = useState("HOME");
  const [leftLabelVisible, setLeftLabelVisible] = useState(false);
  const [rightLabelVisible, setRightLabelVisible] = useState(false);

  // Lens state stored in refs (no re-renders)
  const leftMouseY = useRef(-1);
  const rightMouseY = useRef(-1);
  const leftActive = useRef(false);
  const rightActive = useRef(false);

  // Update tick widths based on cursor position (lens effect)
  const applyLens = useCallback((ticksInner, mouseY, isActive) => {
    if (!ticksInner) return;
    const children = ticksInner.children;
    const transform = ticksInner.style.transform || "";
    const match = transform.match(/translateY\(([-\d.]+)px\)/);
    const scrollOffset = match ? parseFloat(match[1]) : 0;

    for (let i = 0; i < children.length; i++) {
      if (isActive && mouseY >= 0) {
        const tickVisualY = i * TICK_STEP + scrollOffset;
        const dist = Math.abs(tickVisualY - mouseY);
        const sigma = 30;
        const factor = Math.exp(-(dist * dist) / (2 * sigma * sigma));
        const w = (i % 5 === 0 ? 12 : 4) + 18 * factor;
        children[i].style.width = `${w}px`;
      } else {
        children[i].style.width = i % 5 === 0 ? "12px" : "4px";
      }
    }
  }, []);

  // Main animation loop — scrolls ticks + applies lens
  useEffect(() => {
    const mod = (n, m) => ((n % m) + m) % m;
    let rafId;

    const animate = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const targetY = scrollY * 0.5;
      smoothY.current += (targetY - smoothY.current) * 0.12;
      const wrappedY = -mod(smoothY.current, 45);

      if (leftTicksRef.current) {
        leftTicksRef.current.style.transform = `translateY(${wrappedY}px)`;
        applyLens(leftTicksRef.current, leftMouseY.current, leftActive.current);
      }
      if (rightTicksRef.current) {
        rightTicksRef.current.style.transform = `translateY(${wrappedY}px)`;
        applyLens(rightTicksRef.current, rightMouseY.current, rightActive.current);
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [applyLens]);

  // Track current section
  useEffect(() => {
    const triggers = [];
    const timer = setTimeout(() => {
      SECTIONS.forEach((s) => {
        const el = document.querySelector(s.selector);
        if (!el) return;
        triggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: "top center",
            end: "bottom center",
            onEnter: () => setCurrentSection(s.name),
            onEnterBack: () => setCurrentSection(s.name),
          })
        );
      });
    }, 500);
    return () => { clearTimeout(timer); triggers.forEach((t) => t.kill()); };
  }, []);

  // Dots → Nav transition
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(navRef.current, { opacity: 0, y: 10, pointerEvents: "none" });
      gsap.set(dotsRef.current, { opacity: 1, scale: 1 });
      ScrollTrigger.create({
        trigger: ".landing-section",
        start: "bottom 60%",
        onLeave: () => {
          gsap.to(navRef.current, { opacity: 0, y: 10, duration: 0.3, ease: "power2.in", pointerEvents: "none" });
          gsap.to(dotsRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out", pointerEvents: "auto" });
        },
        onEnterBack: () => {
          gsap.to(dotsRef.current, { opacity: 0, scale: 0.8, duration: 0.3, ease: "power2.in", pointerEvents: "none" });
          gsap.to(navRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", pointerEvents: "auto" });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  // ── Mouse handlers for lens effect ──
  const onLeftMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    leftMouseY.current = e.clientY - rect.top;
    if (leftLabelRef.current) {
      leftLabelRef.current.style.top = `${leftMouseY.current}px`;
    }
  }, []);
  const onLeftEnter = useCallback(() => {
    leftActive.current = true;
    setLeftLabelVisible(true);
  }, []);
  const onLeftLeave = useCallback(() => {
    leftActive.current = false;
    leftMouseY.current = -1;
    setLeftLabelVisible(false);
  }, []);

  const onRightMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rightMouseY.current = e.clientY - rect.top;
    if (rightLabelRef.current) {
      rightLabelRef.current.style.top = `${rightMouseY.current}px`;
    }
  }, []);
  const onRightEnter = useCallback(() => {
    rightActive.current = true;
    setRightLabelVisible(true);
  }, []);
  const onRightLeave = useCallback(() => {
    rightActive.current = false;
    rightMouseY.current = -1;
    setRightLabelVisible(false);
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] pointer-events-none font-sans text-white">
      {/* Top Left Logo */}
      <div className="absolute top-10 left-10 xl:top-12 xl:left-14 2xl:top-8 2xl:left-16 pointer-events-auto flex items-center gap-3">
        <img src="/images/logo.png" alt="" className="w-[40%]" />
      </div>

      {/* 4-Dot Hamburger */}
      <div ref={dotsRef} className="absolute top-10 right-10 xl:top-12 xl:right-14 2xl:top-14 2xl:right-16 pointer-events-auto cursor-pointer">
        <div className="grid grid-cols-2 gap-[5px]">
          <span className="w-[5px] h-[5px] rounded-full bg-white/80"></span>
          <span className="w-[5px] h-[5px] rounded-full bg-white/80"></span>
          <span className="w-[5px] h-[5px] rounded-full bg-white/80"></span>
          <span className="w-[5px] h-[5px] rounded-full bg-white/80"></span>
        </div>
      </div>

      {/* Nav Links */}
      <div ref={navRef} className="absolute top-10 right-10 xl:top-12 xl:right-14 2xl:top-14 2xl:right-16 pointer-events-auto flex flex-col text-right text-[10px] xl:text-[11px] tracking-[0.2em] gap-3 xl:gap-4">
        <a href="#" className="hover:text-white transition-colors">WORK</a>
        <a href="#" className="hover:text-white transition-colors">PROCESS</a>
        <a href="#" className="hover:text-white transition-colors">STUDIO</a>
        <a href="#" className="hover:text-white transition-colors">CONTACT</a>
      </div>

      {/* ── LEFT TICKS ── */}
      <div
        className="absolute left-10 xl:left-14 2xl:left-16 top-1/2 -translate-y-1/2 h-[300px] xl:h-[360px] 2xl:h-[400px] pointer-events-auto"
        onMouseMove={onLeftMove}
        onMouseEnter={onLeftEnter}
        onMouseLeave={onLeftLeave}
        style={{ cursor: "default", width: "40px" }}
      >
        {/* Section label — follows cursor Y */}
        <div
          ref={leftLabelRef}
          className="absolute left-full -translate-y-1/2 ml-3 flex items-center gap-2 whitespace-nowrap"
          style={{ opacity: leftLabelVisible ? 1 : 0, transition: "opacity 0.25s ease" }}
        >
          <div className="w-5 h-[1px] bg-white/50"></div>
          <span className="text-[11px] tracking-[0.2em] uppercase text-white/90 font-medium"
            style={{ fontFamily: "'Gilroy', sans-serif" }}>{currentSection}</span>
        </div>

        {/* Ticks */}
        <div className="h-full overflow-hidden" style={{
          width: "40px",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        }}>
          <div ref={leftTicksRef}
            className="absolute top-0 left-0 w-full flex flex-col gap-2 items-start">
            {ticks.map((_, i) => (
              <div key={`l-${i}`} className="h-[1px] bg-white shrink-0"
                style={{ width: i % 5 === 0 ? "12px" : "4px", transition: "width 0.15s ease-out" }}></div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT TICKS ── */}
      <div
        className="absolute right-10 xl:right-14 2xl:right-16 top-1/2 -translate-y-1/2 h-[300px] xl:h-[360px] 2xl:h-[400px] pointer-events-auto"
        onMouseMove={onRightMove}
        onMouseEnter={onRightEnter}
        onMouseLeave={onRightLeave}
        style={{ cursor: "default", width: "40px" }}
      >
        {/* Section label — follows cursor Y */}
        <div
          ref={rightLabelRef}
          className="absolute right-full -translate-y-1/2  flex items-center gap-1 whitespace-nowrap"
          style={{ opacity: rightLabelVisible ? 1 : 0, transition: "opacity 0.25s ease" }}
        >
          <span className="text-[11px] tracking-[0.2em] uppercase text-white/90 font-medium"
            style={{ fontFamily: "'Gilroy', sans-serif" }}>{currentSection}</span>
          <div className="w-5 h-[1px] bg-white/50"></div>
        </div>

        {/* Ticks */}
        <div className="h-full overflow-hidden" style={{
          width: "40px",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        }}>
          <div ref={rightTicksRef}
            className="absolute top-0 right-0 w-full flex flex-col gap-2 items-end">
            {ticks.map((_, i) => (
              <div key={`r-${i}`} className="h-[1px] bg-white shrink-0"
                style={{ width: i % 5 === 0 ? "12px" : "4px", transition: "width 0.15s ease-out" }}></div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Left: Scroll Indicator */}
      <div className="absolute bottom-10 left-10 xl:bottom-12 xl:left-14 2xl:bottom-14 2xl:left-16 pointer-events-auto origin-bottom-left -rotate-90 flex items-center ">
        <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400">Scroll</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 text-neutral-400 rotate-45">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </div>

      {/* Bottom Right: Social Icons */}
      <div className="absolute bottom-10 right-10 xl:bottom-12 xl:right-14 2xl:bottom-14 2xl:right-16 pointer-events-auto flex flex-col gap-5 xl:gap-6 text-neutral-400">
        {/* Dribbble */}
        <a href="#" className="hover:text-white transition-colors">
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <circle cx="12" cy="12" r="10" fill="currentColor"/>
            <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" stroke="black" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        </a>
        {/* Instagram */}
        <a href="#" className="hover:text-white transition-colors">
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="currentColor"/>
            <circle cx="12" cy="12" r="4.5" fill="none" stroke="black" strokeWidth="1.8"/>
            <circle cx="17.5" cy="6.5" r="1.2" fill="black"/>
          </svg>
        </a>
        {/* LinkedIn */}
        <a href="#" className="hover:text-white transition-colors">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default FixedUI;

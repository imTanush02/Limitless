import React, { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Text lines with their associated project card images
const TEXT_LINES = [
  {
    text: `IT'S NEVER "JUST A WEBSITE."`,
    cards: ["/images/project1.png"],
  },
  {
    text: "EVERY PIXEL MATTERS.",
    cards: ["/images/project2.png"],
  },
  {
    text: "WE CRAFT DIGITAL EXPERIENCES.",
    cards: ["/images/project3.png"],
  },
  {
    text: "YOUR DESIGN IS OUR OBSESSION.",
    cards: ["/images/project5.png"],
  },
  {
    text: "YOUR BRAND. OUR",
    highlight: "PLAYGROUND.",
    cards: ["/images/project4.png"],
  },
];

const TextPage = () => {
  const container = useRef(null);
  const [activeLineIdx, setActiveLineIdx] = useState(-1);
  const cardRefs = useRef([]);
  const animTimelines = useRef([]);

  // Scroll-triggered entrance animation for text lines
  useGSAP(
    () => {
      gsap.fromTo(
        ".showcase-line",
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );
    },
    { scope: container }
  );

  // Handle hover enter — pop out cards with a fanned stagger
  const handleLineEnter = useCallback((idx) => {
    setActiveLineIdx(idx);

    // Kill any running anim on this line
    if (animTimelines.current[idx]) {
      animTimelines.current[idx].kill();
    }

    const cardsEl = cardRefs.current[idx];
    if (!cardsEl) return;

    const cards = cardsEl.querySelectorAll(".popup-card");
    if (!cards.length) return;

    const tl = gsap.timeline();

    // Fan out from the center
    const rotations = [-12, 0, 12];
    const xOffsets = [-100, 0, 100]; // percentage offsets for fanning

    tl.to(cardsEl, {
      opacity: 1,
      duration: 0.1,
      pointerEvents: "auto",
    });

    cards.forEach((card, i) => {
      tl.fromTo(
        card,
        {
          scale: 0.3,
          opacity: 0,
   
          y: 40,
          x: 0,
        },
        {
          scale: 1,
          opacity: 1,
       
          y: 0,
          x: xOffsets[i] || 0,
          duration: 0.45,
          ease: "back.out(1.7)",
        },
        i * 0.08 // stagger
      );
    });

    animTimelines.current[idx] = tl;
  }, []);

  // Handle hover leave — shrink cards back
  const handleLineLeave = useCallback((idx) => {
    setActiveLineIdx(-1);

    if (animTimelines.current[idx]) {
      animTimelines.current[idx].kill();
    }

    const cardsEl = cardRefs.current[idx];
    if (!cardsEl) return;

    const cards = cardsEl.querySelectorAll(".popup-card");
    if (!cards.length) return;

    const tl = gsap.timeline();

    tl.to(cards, {
      scale: 0.3,
      opacity: 0,
      rotation: 0,
      y: 40,
      x: 0,
      duration: 0.3,
      ease: "power2.in",
      stagger: 0.04,
    });

    tl.to(
      cardsEl,
      {
        opacity: 0,
        duration: 0.1,
        pointerEvents: "none",
      },
      "-=0.1"
    );

    animTimelines.current[idx] = tl;
  }, []);

  return (
    <div
      ref={container}
      style={{
        backgroundImage: "url('/images/stars.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="relative flex items-center justify-center w-full min-h-screen bg-black font-sans text-white overflow-hidden"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>

      {/* Subtle gold vertical accent line — left */}
      <div className="absolute left-[6%] sm:left-[8%] top-[15%] bottom-[15%] w-[2px] bg-gradient-to-b from-transparent via-amber-500/40 to-transparent pointer-events-none"></div>

      {/* Subtle gold vertical accent line — right */}
      <div className="absolute right-[6%] sm:right-[8%] top-[15%] bottom-[15%] w-[2px] bg-gradient-to-b from-transparent via-amber-500/40 to-transparent pointer-events-none"></div>

      {/* Text Lines */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-2 sm:gap-4 md:gap-6 px-4 py-20 sm:py-28">
        {TEXT_LINES.map((line, idx) => (
          <div
            key={idx}
            className="showcase-line relative cursor-default"
            onMouseEnter={() => handleLineEnter(idx)}
            onMouseLeave={() => handleLineLeave(idx)}
          >
            {/* Hoverable text */}
            <h2
              className="text-center font-bold uppercase tracking-tight leading-none select-none transition-colors duration-300
                text-5xl"
              style={{
                
                color: activeLineIdx === idx ? "#fff" : "rgba(255,255,255,0.85)",
                textShadow:
                  activeLineIdx === idx
                    ? "0 0 40px rgba(255,255,255,0.15)"
                    : "none",
              }}
            >
              {line.text}
              {line.highlight && (
                <span
                  className="ml-2 font-light"
                  style={{
                    fontFamily: "'Catavalo', Georgia, serif",
                    WebkitTextStroke: "0.6px rgba(0,0,0,0.7)",
                    textDecoration: "underline",
                    textUnderlineOffset: "6px",
                    textDecorationThickness: "1px",
                  }}
                >
                  {line.highlight}
                </span>
              )}
            </h2>

            {/* Popup Cards — positioned absolutely above the text line */}
            <div
              ref={(el) => (cardRefs.current[idx] = el)}
              className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none opacity-0 z-20"
              style={{ willChange: "opacity" }}
            >
              {line.cards.map((src, cardIdx) => (
                <div
                  key={cardIdx}
                  className="popup-card absolute rounded-lg overflow-hidden shadow-2xl shadow-black/60"
                  style={{
                    width: "clamp(120px, 18vw, 260px)",
                    aspectRatio: "3 / 4",
                    willChange: "transform, opacity",
                    opacity: 0,
                    transform: "scale(0.3)",
                  }}
                >
                  <img
                    src={src}
                    alt={`Project ${cardIdx + 1}`}
                    className="w-full h-full object-cover"
                    draggable="false"
                  />
                  {/* Subtle gradient overlay on card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Side text decorations — rotated vertical text */}
      <div
        className="hidden md:block absolute left-[3%] top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[10px] tracking-[0.3em] uppercase text-white/20 pointer-events-none select-none"
        style={{ fontFamily: "'Gilroy', sans-serif" }}
      >
        limitless studio — design without boundaries
      </div>
      <div
        className="hidden md:block absolute right-[3%] top-1/2 -translate-y-1/2 rotate-90 origin-center text-[10px] tracking-[0.3em] uppercase text-white/20 pointer-events-none select-none"
        style={{ fontFamily: "'Gilroy', sans-serif" }}
      >
        where ambition meets execution — est. 2025
      </div>
    </div>
  );
};

export default TextPage;

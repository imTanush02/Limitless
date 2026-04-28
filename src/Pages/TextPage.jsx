import React, { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// All project images that cycle on hover
const POPUP_IMAGES = [
  "/images/WWD1.jpg",
  "/images/WWD2.jpg",
  "/images/WWD3.jpg",
  "/images/WWD4.jpg",
];

// Text lines — only the last line has a hoverable highlight
const TEXT_LINES = [
  { text: `IT'S NEVER "JUST A WEBSITE."` },
  { text: "EVERY PIXEL MATTERS." },
  { text: "WE CRAFT DIGITAL EXPERIENCES." },
  { text: "YOUR DESIGN IS OUR OBSESSION." },
  { text: "YOUR BRAND. OUR", highlight: "PLAYGROUND." },
];

const TextPage = () => {
  const container = useRef(null);
  const cardsContainerRef = useRef(null);
  const loopInterval = useRef(null);
  const activeCardIdx = useRef(0);
  const [isHovering, setIsHovering] = useState(false);

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

  // Pop in a card — stacks on top of previous ones
  const popCard = useCallback((index) => {
    const cardsEl = cardsContainerRef.current;
    if (!cardsEl) return;

    const cards = cardsEl.querySelectorAll(".popup-card");
    if (!cards.length) return;

    const card = cards[index % cards.length];
    if (!card) return;

    // Random slight rotation for organic feel
    const randomRotation = (Math.random() - 0.5) * 12; // -6 to +6 degrees

    // Bring this card to top of stack
    card.style.zIndex = index + 1;

    // Animate from bottom up onto the pile
    gsap.fromTo(
      card,
      {
        opacity: 0,
        scale: 0.85,
        y: 120,
        rotation: 0,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotation: randomRotation,
        duration: 0.3,
        ease: "power3.out",
      }
    );
  }, []);

  // Start looping images on hover
  const handlePlaygroundEnter = useCallback(() => {
    setIsHovering(true);
    activeCardIdx.current = 0;

    const cardsEl = cardsContainerRef.current;
    if (!cardsEl) return;

    // Reset all cards hidden
    const cards = cardsEl.querySelectorAll(".popup-card");
    gsap.set(cards, { opacity: 0, scale: 0.85, y: 120, rotation: 0 });

    // Show the container
    gsap.to(cardsEl, {
      opacity: 1,
      duration: 0.1,
      pointerEvents: "auto",
    });

    // Show first card immediately
    popCard(0);

    // Loop through cards — keep stacking infinitely
    loopInterval.current = setInterval(() => {
      activeCardIdx.current = activeCardIdx.current + 1;
      popCard(activeCardIdx.current);
    }, 300);
  }, [popCard]);

  // Stop loop on leave
  const handlePlaygroundLeave = useCallback(() => {
    setIsHovering(false);

    if (loopInterval.current) {
      clearInterval(loopInterval.current);
      loopInterval.current = null;
    }

    const cardsEl = cardsContainerRef.current;
    if (!cardsEl) return;

    const cards = cardsEl.querySelectorAll(".popup-card");

    // Entire stack slides down and fades
    gsap.to(cards, {
      y: 80,
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      ease: "power2.in",
      stagger: 0.02,
    });

    gsap.to(cardsEl, {
      opacity: 0,
      duration: 0.15,
      delay: 0.25,
      pointerEvents: "none",
    });
  }, []);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (loopInterval.current) clearInterval(loopInterval.current);
    };
  }, []);

  return (
    <div
      ref={container}
      className="text-page-section relative flex items-center justify-center w-full min-h-screen bg-transparent font-sans text-white overflow-hidden"
    >
      {/* Text Lines */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-2 sm:gap-4 md:gap-6 px-4 py-20 sm:py-28">
        {TEXT_LINES.map((line, idx) => (
          <div
            key={idx}
            className="showcase-line relative cursor-default"
          >
            <h2
              className="text-center font-bold uppercase tracking-tight leading-none select-none text-5xl"
              style={{
                color: "rgba(255,255,255,0.85)",
              }}
            >
              {line.text}
              {line.highlight && (
                <span
                  className="ml-2 font-light relative inline-block"
                  style={{
                    fontFamily: "'Catavalo', Georgia, serif",
                    color: isHovering ? "#fff" : "rgba(255,255,255,0.85)",
                    textShadow: isHovering
                      ? "0 0 40px rgba(255,255,255,0.2)"
                      : "none",
                    transition: "color 0.3s, text-shadow 0.3s",
                  }}
                  onMouseEnter={handlePlaygroundEnter}
                  onMouseLeave={handlePlaygroundLeave}
                >
                  {line.highlight}
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/70"></span>
                </span>
              )}
            </h2>
          </div>
        ))}

        {/* Popup Cards Container — centered over the text block */}
        <div
          ref={cardsContainerRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none opacity-0 z-20"
          style={{ willChange: "opacity" }}
        >
          {POPUP_IMAGES.map((src, cardIdx) => (
            <div
              key={cardIdx}
              className="popup-card absolute rounded-lg overflow-hidden shadow-2xl shadow-black/60"
              style={{
                width: "250px",
                willChange: "transform, opacity",
                opacity: 0,
                transform: "scale(0.85) translateY(120px)",
              }}
            >
              <img
                src={src}
                alt={`Project ${cardIdx + 1}`}
                className="w-full h-auto block"
                draggable="false"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextPage;

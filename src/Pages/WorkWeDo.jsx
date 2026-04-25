import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data for each service card ─── */
const SERVICES = [
  {
    id: 1,
    category: "WEB DEV",
    subtitle: "Web dev",
    description:
      "For 25 years, Tripadvisor has been the world's travel companion, with real reviews, real advice, straight from real people. But in a race to compete with booking engines and comparison sites on price and capacity, the brand risked losing its edge. We set out to refocus on what makes Tripadvisor unique: its community of real travelers, and their real reviews.",
    client: "TRIPADVISOR",
    image: "/images/laptop_crypto.png",
    accent: "#E63B2E", // Red tab
    tag: "WEB DEV",
  },
  {
    id: 2,
    category: "E-COMMERCE",
    subtitle: "E-Commerce",
    description:
      "We build conversion-optimized digital storefronts that transform browsers into buyers. From headless commerce architectures to seamless payment integrations, our e-commerce solutions are engineered for scale, speed, and a frictionless shopping experience across every device.",
    client: "MERIDIAN CO",
    image: "/images/laptop_ecommerce.png",
    accent: "#2A2A2A", // Dark Grey tab
    tag: "E-COM",
  },
  {
    id: 3,
    category: "APP DEV",
    subtitle: "App dev",
    description:
      "We craft pixel-perfect mobile experiences that users love. From native iOS and Android applications to cross-platform solutions, our team delivers performant, intuitive apps that drive engagement and retention. Every interaction is meticulously designed to feel natural and responsive.",
    client: "NEXUS LABS",
    image: "/images/laptop_appdev.png",
    accent: "#1A233A", // Dark Blue tab
    tag: "MOBILE",
  },
  {
    id: 4,
    category: "UI/UX",
    subtitle: "UI/UX",
    description:
      "Design is not just how it looks — it's how it works. We create interfaces that bridge the gap between human intention and digital interaction. Through rigorous user research, wireframing, and iterative prototyping, we shape experiences that feel effortless and leave lasting impressions.",
    client: "VOLTA DESIGN",
    image: "/images/laptop_uiux.png",
    accent: "#5C1717", // Dark Red/Brown tab
    tag: "DESIGN",
  },
];

const WorkWeDo = () => {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const textRefs = useRef([]);
  const cardRefs = useRef([]);

  useGSAP(
    () => {
      const cards = cardRefs.current.filter(Boolean);
      const texts = textRefs.current.filter(Boolean);
      const totalCards = cards.length;

      if (totalCards === 0) return;

      /* ── Master pinning timeline ── */
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalCards * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / (totalCards - 1),
            duration: { min: 0.2, max: 0.5 },
            delay: 0.05,
            ease: "power1.inOut"
          }
        },
      });

      // Initial setup
      cards.forEach((card, i) => {
        gsap.set(card, { 
          y: i === 0 ? "0%" : `-${i * 25}px`, 
          scale: 1 - i * 0.04, 
          zIndex: 50 - i 
        });
        if (i === 0) {
          gsap.set(texts[i], { opacity: 1, y: 0 });
        } else {
          gsap.set(texts[i], { opacity: 0, y: 40 });
        }
      });

      // Animate each step
      for (let i = 1; i < totalCards; i++) {
        const startTime = i - 1; // 0, 1, 2...
        
        // Text transitions (Sequential fade out then fade in)
        masterTl.to(texts[i - 1], { opacity: 0, y: -30, duration: 0.4, ease: "power2.inOut" }, startTime);
        masterTl.to(texts[i], { opacity: 1, y: 0, duration: 0.4, ease: "power2.inOut" }, startTime + 0.4);

        // Previous card (i-1) moves down and disappears
        masterTl.to(cards[i - 1], { 
          y: "100%", 
          opacity: 0, 
          duration: 0.8, 
          ease: "power3.inOut" 
        }, startTime);

        // Bring subsequent cards forward
        for (let j = i; j < totalCards; j++) {
          const depth = j - i; // New depth after shifting
          masterTl.to(
            cards[j],
            {
              y: depth === 0 ? "0%" : `-${depth * 25}px`, // Move down to new depth position
              scale: 1 - depth * 0.04, // Scale to new depth
              duration: 0.8,
              ease: "power3.inOut"
            },
            startTime
          );
        }
        
        // Pad to ensure the step takes exactly 1.0 unit of time
        masterTl.to({}, { duration: 1 }, startTime);
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black text-white overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* ── Background noise texture ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* ── Subtle border frame ── */}
      <div className="absolute inset-[12px] border border-white/[0.06] rounded-sm pointer-events-none z-[1]"></div>

      {/* ── Gold vertical accent — right ── */}
      <div className="absolute right-[60px] top-[15%] bottom-[15%] w-[1px] bg-gradient-to-b from-transparent via-amber-500/25 to-transparent pointer-events-none z-[1]"></div>

      {/* ── Main layout ── */}
      <div className="relative z-10 flex w-full h-full">
        {/* ── LEFT: Stacked cards area ── */}
        <div className="relative flex-1 flex items-center justify-center px-8 lg:px-16">
          {/* Vertical "SCROLL" text */}
          <div
            className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[10px] tracking-[0.3em] uppercase text-white/20 pointer-events-none select-none whitespace-nowrap z-20"
            style={{ fontFamily: "'Gilroy', sans-serif" }}
          >
            scroll ↓
          </div>

          {/* Stacked cards wrapper */}
          <div
            ref={cardsContainerRef}
            className="relative w-full max-w-[720px] perspective-1000"
            style={{ aspectRatio: "16/11" }}
          >
            {SERVICES.map((service, index) => (
              <div
                key={service.id}
                ref={(el) => (cardRefs.current[index] = el)}
                className="absolute inset-0 w-full h-full transform-gpu"
                style={{
                  willChange: "transform",
                }}
              >
                <div className="relative w-full h-full rounded-xl shadow-2xl overflow-hidden bg-neutral-300">
                  <img
                    src={service.image}
                    alt={service.category}
                    className="w-full h-full object-cover object-center"
                  />

                  {/* Gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>

                  {/* Client watermark */}
                  <span
                    className="absolute bottom-4 right-5 text-[9px] tracking-[0.25em] uppercase text-white/90"
                    style={{ fontFamily: "'Gilroy', sans-serif" }}
                  >
                    {service.client}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Text content area ── */}
        <div className="relative w-[380px] lg:w-[420px] flex flex-col justify-between py-20 pr-20 pl-8 shrink-0">
          
          {/* Static Title */}
          <div className="absolute top-20 left-8 right-20 z-10 pointer-events-none">
            <h2
              className="text-[36px] lg:text-[42px] font-normal leading-[1.1] text-white mb-1"
              style={{ fontFamily: "'Catavalo', Georgia, serif" }}
            >
              What we do?
            </h2>
          </div>

          {/* Text blocks for each service (stacked, only one visible at a time) */}
          <div className="relative flex-1 flex flex-col justify-center mt-16">
            {SERVICES.map((service, index) => (
              <div
                key={service.id}
                ref={(el) => (textRefs.current[index] = el)}
                className="absolute inset-0 flex flex-col justify-center"
                style={{
                  opacity: index === 0 ? 1 : 0,
                  willChange: "transform, opacity",
                  pointerEvents: index === 0 ? "auto" : "none",
                }}
              >
                {/* Subtitle with outline/grey style to match image */}
                <p
                  className="text-[32px] lg:text-[38px] font-light leading-tight mb-12 text-white/90"
                  style={{
                    fontFamily: "'Catavalo', Georgia, serif",
                  }}
                >
                  {service.subtitle}
                </p>

                {/* Description */}
                <p
                  className="text-[11px] lg:text-[12px] leading-[1.8] text-white/80 text-right max-w-[320px] ml-auto"
                  style={{ fontFamily: "'Gilroy', sans-serif" }}
                >
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom section label ── */}
      <div
        className="absolute bottom-6 left-16 text-[10px] tracking-[0.3em] uppercase text-white/25 pointer-events-none"
        style={{ fontFamily: "'Gilroy', sans-serif" }}
      >
        our process
      </div>

      {/* ── Card counter — bottom right ── */}
      <div
        className="absolute bottom-6 right-20 text-[10px] tracking-[0.2em] text-white/20 pointer-events-none"
        style={{ fontFamily: "'Gilroy', sans-serif" }}
      >
        {SERVICES.length} SERVICES
      </div>
    </section>
  );
};

export default WorkWeDo;

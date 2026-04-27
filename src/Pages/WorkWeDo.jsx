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
    image: "/images/WWD1.jpg",
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
    image: "/images/WWD2.jpg",
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
    image: "/images/WWD3.jpg",
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
    image: "/images/WWD4.jpg",
    accent: "#5C1717", // Dark Red/Brown tab
    tag: "DESIGN",
  },
];

const WorkWeDo = () => {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const subtitleRefs = useRef([]);
  const descRefs = useRef([]);
  const cardRefs = useRef([]);

  useGSAP(
    () => {
      const cards = cardRefs.current.filter(Boolean);
      const subtitles = subtitleRefs.current.filter(Boolean);
      const descs = descRefs.current.filter(Boolean);
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
          y: i === 0 ? "0%" : `-${i * 40}px`, 
          scale: 1 - i * 0.05, 
          zIndex: 50 - i,
          filter: i === 0 ? "blur(0px)" : `blur(${i * 1}px)`
        });
        if (i === 0) {
          gsap.set(subtitles[i], { opacity: 1, y: 0 });
          gsap.set(descs[i], { opacity: 1, y: 0 });
        } else {
          gsap.set(subtitles[i], { opacity: 0, y: 40 });
          gsap.set(descs[i], { opacity: 0, y: 0 });
        }
      });

      // Animate each step
      for (let i = 1; i < totalCards; i++) {
        const startTime = i - 1; 
        
        // Text transitions
        masterTl.to(subtitles[i - 1], { opacity: 0, y: -30, duration: 0.4, ease: "power2.inOut" }, startTime);
        masterTl.to(subtitles[i], { opacity: 1, y: 0, duration: 0.4, ease: "power2.inOut" }, startTime + 0.4);

        masterTl.to(descs[i - 1], { opacity: 0, duration: 0.4, ease: "power2.inOut" }, startTime);
        masterTl.to(descs[i], { opacity: 1, duration: 0.4, ease: "power2.inOut" }, startTime + 0.4);

        // Previous card (i-1) moves down and disappears
        masterTl.to(cards[i - 1], { 
          y: "100%", 
          opacity: 0, 
          filter: "blur(0px)",
          duration: 0.8, 
          ease: "power3.inOut" 
        }, startTime);

        // Bring subsequent cards forward
        for (let j = i; j < totalCards; j++) {
          const depth = j - i;
          masterTl.to(
            cards[j],
            {
              y: depth === 0 ? "0%" : `-${depth * 40}px`,
              scale: 1 - depth * 0.05,
              filter: depth === 0 ? "blur(0px)" : `blur(${depth * 1}px)`,
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
      className="workwedo-section relative w-full h-full text-white overflow-hidden"
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

      {/* ── Main layout ── */}
      <div className="relative z-10 flex w-full h-full px-10 md:px-20 lg:px-25 py-20 lg:py-30">
        {/* ── LEFT: Stacked cards area ── */}
        <div className="relative flex-1 flex items-center justify-center">

          {/* Stacked cards wrapper */}
          <div
            ref={cardsContainerRef}
            className="relative w-full lg:w-[65vw] h-[70vh]  perspective-1000 mt-20"
            style={{ aspectRatio: "16/10" }}
          >
            {SERVICES.map((service, index) => (
              <div
                key={service.id}
                ref={(el) => (cardRefs.current[index] = el)}
                className="absolute inset-0 w-full h-full transform-gpu"
                style={{
                  willChange: "transform, filter",
                }}
              >
                <div className="relative w-full h-full rounded-2xl shadow-2xl overflow-hidden bg-[#111] flex flex-col border border-white/10">


                  {/* Image Area */}
                  <div className="relative flex-1 w-full bg-neutral-800 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.category}
                      className="w-full h-full object-cover object-center"
                    />

                    {/* Gradient overlay at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

                    {/* Client watermark */}
                    <span
                      className="absolute bottom-5 right-6 text-[10px] tracking-[0.25em] uppercase text-white/90"
                      style={{ fontFamily: "'Gilroy', sans-serif" }}
                    >
                      {service.client}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Text content area ── */}
        <div className=" h-full flex flex-col justify-between shrink-0">
          
          {/* Top text area */}
          <div className=" flex flex-col items-end w-full">
            <h2
              className="text-[40px] lg:text-[40px] font-normal leading-[1.1] text-white mb-0"
              style={{ fontFamily: "Gilroy" }}
            >
              What we do?
            </h2>

            <div className="relative w-full h-[60px] lg:h-[70px]">
              {SERVICES.map((service, index) => (
                <div
                  key={`sub-${service.id}`}
                  ref={(el) => (subtitleRefs.current[index] = el)}
                  className="absolute top-0 right-0 w-full text-right"
                  style={{
                    opacity: index === 0 ? 1 : 0,
                    willChange: "transform, opacity",
                    pointerEvents: index === 0 ? "auto" : "none",
                  }}
                >
                  <p
                    className="text-[40px] lg:text-[35px] font-normal leading-none text-white/50"
                    style={{
                      fontFamily: "Gilroy",
                    }}
                  >
                    {service.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom text area */}
          <div >
            <div className="relative w-full h-[220px] lg:h-[180px]">
              {SERVICES.map((service, index) => (
                <div
                  key={`desc-${service.id}`}
                  ref={(el) => (descRefs.current[index] = el)}
                  className="absolute bottom-0 right-0 w-full"
                  style={{
                    opacity: index === 0 ? 1 : 0,
                    willChange: "transform, opacity",
                    pointerEvents: index === 0 ? "auto" : "none",
                  }}
                >
                  <p
                    className="text-[13px] lg:text-[12px] leading-[1.8] text-white/50 text-right max-w-[340px] ml-auto pl-13"
                    style={{ fontFamily: "'Gilroy', sans-serif" }}
                  >
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkWeDo;

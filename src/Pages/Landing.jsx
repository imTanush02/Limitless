import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  const container = useRef(null);
  const mouseParallax = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  // ── Mouse-tracking parallax ──────────────────────────────────────
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse position to -1…1 from center
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseParallax.current = { x: cx, y: cy };
    };

    const applyMouseParallax = () => {
      const { x, y } = mouseParallax.current;

      // Flowers — foreground, strongest response
      const flowers = document.querySelector(".parallax-flowers");
      if (flowers) {
        gsap.to(flowers, {
          x: x * -25,
          y: y * -15,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      // Astronaut — mid-layer, medium response
      const astro = document.querySelector("#astronaut-container");
      if (astro) {
        gsap.to(astro, {
          x: x * 18,
          y: y * 12,
          duration: 1,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      // Title text — subtle float
      const title = document.querySelector(".main-title");
      if (title) {
        gsap.to(title, {
          x: x * 10,
          y: y * 8,
          duration: 1.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      // Subtitle text — even subtler
      const subtitle = document.querySelector(".main-subtitle");
      if (subtitle) {
        gsap.to(subtitle, {
          x: x * 6,
          y: y * 5,
          duration: 1.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      // Portal — background, lightest response (opposite direction for depth)
      const portal = document.querySelector("#portal-container");
      if (portal) {
        gsap.to(portal, {
          x: x * -8,
          y: y * -5,
          duration: 1.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      rafId.current = requestAnimationFrame(applyMouseParallax);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafId.current = requestAnimationFrame(applyMouseParallax);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // ── Scroll-based parallax ────────────────────────────────────────
  useGSAP(
    () => {
      // Gentle floating idle animation for astronaut
      gsap.to("#astronaut-container img", {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
        },
      });

      // 1. Tunnel zoom: expand the mask hole proportionally so it swallows the screen
      const maskScale = { value: 1 };
      const baseRX = 17; // Starting x
      const baseRY = 50; // Starting y

      tl.to(
        maskScale,
        {
          value: 25, // Scale it up 25 times
          ease: "power2.inOut",
          onUpdate: () => {
            if (container.current) {
              const starsBg = document.querySelector(".stars-background");
              if (starsBg) {
                starsBg.style.setProperty(
                  "--mask-x",
                  `${baseRX * maskScale.value}%`,
                );
                starsBg.style.setProperty(
                  "--mask-y",
                  `${baseRY * maskScale.value}%`,
                );
              }
            }
          },
        },
        0,
      );


      // ── PARALLAX SCROLL LAYERS ──────────────────────────────────

      // Flowers (foreground) — move UP fastest → strong parallax
      tl.to(
        ".parallax-flowers-wrapper",
        {
          y: "-0vh",
          // scale: 1.15,
          ease: "power1.inOut",
        },
        0,
      );

      // Astronaut (mid-layer) — move up and out of view
      tl.to(
        "#astronaut-wrapper",
        {
          y: "-30vh",
          ease: "power2.inOut",
        },
        0,
      );

      // Portal (background layer) — scale up, barely move
      tl.to(
        "#portal-wrapper",
        {
          y: "-0vh",
          scale: 1.8,
          transformOrigin: "center bottom",
          ease: "power2.inOut",
        },
        0,
      );

      // Main title — medium speed, fades out
      tl.to(
        ".main-title-wrapper",
        {
          y: "-25vh",
          opacity: 0,
          ease: "power2.inOut",
        },
        0,
      );

      // Subtitle — slightly different speed than title for depth
      tl.to(
        ".main-subtitle-wrapper",
        {
          y: "-20vh",
          opacity: 0,
          ease: "power2.inOut",
        },
        0,
      );

      // 4. After tunnel text comes up and fades in
      tl.to(
        ".after-tunnel-text",
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
        },
        0.3,
      );
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="landing-section relative w-full h-screen   overflow-hidden font-sans text-white"
    >
      {/* Main Center Content */}
      <div className="relative w-full h-full flex flex-col items-center justify-end pb-0">
        {/* 1. SUNSET GATE (bg.png) - Bottom layer */}

        {/* 2. ASTRONAUT - Above sunset sky */}
        <div
          id="astronaut-wrapper"
          className="absolute z-[20]  left-[30vw] w-[40vw] h-[80vh]"
          style={{ willChange: "transform" }}
        >
          <div id="astronaut-container" className="w-full h-full relative">
            <img
              src="/images/astro.png"
              alt="Astronaut"
              className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] object-contain pointer-events-none drop-shadow-xl"
            />
          </div>
        </div>
        <div
          id="portal-wrapper"
          className="absolute z-10 bottom-0 left-0 w-full h-full scale-70"
          style={{ transformOrigin: "center bottom", willChange: "transform" }}
        >
          <div id="portal-container" className="w-full h-full relative">
            <img
              src="/images/portal.png"
              alt="portal"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 object-contain pointer-events-none"
            />
          </div>
        </div>

        {/* 4. LIMITLESS STUDIO TEXT & SUBTITLE - Above stars */}
        <div className="main-title-wrapper absolute top-[20vh] left-0 w-full text-center z-30 pointer-events-none mix-blend-difference" style={{ willChange: "transform, opacity" }}>
          <div className="main-title">
            <h1
              className="text-[64px] sm:text-[96px] xl:text-[128px] font-normal leading-none inline-block"
              style={{
                fontFamily: "'Catavalo', Georgia, serif",
                color: "#FFFBFE",
              }}
            >
              Limitless Studio
            </h1>
          </div>
        </div>

        {/* Subtitle */}
        <div className="main-subtitle-wrapper absolute top-[20vh] sm:top-[25vh] xl:top-[278px] left-0 w-full text-center z-30 pointer-events-none" style={{ willChange: "transform, opacity" }}>
          <div className="main-subtitle">
            <p
              className="text-sm sm:text-lg md:text-[20px] font-light text-white tracking-wide drop-shadow-md"
              style={{ fontFamily: "'Gilroy', sans-serif" }}
            >
              Where vision becomes experience
            </p>
          </div>
        </div>

        {/* New Text for after tunnel */}
        <div className="absolute top-[60vh] left-0 w-full text-center z-30 pointer-events-none opacity-0 after-tunnel-text translate-y-10 mix-blend-difference">
          <p
            className="text-[20px] sm:text-[24px] font-light text-white max-w-3xl mx-auto leading-relaxed drop-shadow-md"
            style={{ fontFamily: "'Gilroy', sans-serif" }}
          >
            <span
              className="text-[50px]"
              style={{
                fontFamily: "'Catavalo', Georgia, serif",
              }}
            >
              We
            </span>{" "}
            make ambitious ideas for ambitious brands. Five offices, one studio,
            united by optimism, collaboration, and craft. Find us in Los
            Angeles, New York, London, Berlin and Sydney.
          </p>
        </div>

        {/* 5. FLOWERS - Topmost layer (parallax foreground) */}
        <div className="parallax-flowers-wrapper absolute -bottom-5 left-0 w-full z-[999] pointer-events-none drop-shadow-2xl" style={{ willChange: "transform" }}>
          <img
            src="/images/flowers.png"
            alt="Foreground Flowers"
            className="parallax-flowers w-full object-cover object-bottom blur-[1px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;

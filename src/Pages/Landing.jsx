import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  const container = useRef(null);

  useGSAP(
    () => {
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
      tl.fromTo(
        "#sunset-gate img",
        { scale: 1 },
        {
          scale: 1.2,
          ease: "power2.inOut",
        },
        0,
      );

      // 2. Astronaut shifts up
      tl.to(
        "#astronaut-container",
        {
          y: "-30vh",
          ease: "power2.inOut",
        },
        0,
      );
      tl.to(
        "#portal-container",
        {
          scale: 1.8,

          transformOrigin: "center bottom",
          ease: "power2.inOut",
        },
        0,
      );

      // 3. Main title and subtitle shift up and fade out with stagger
      tl.to(
        ".main-title, .main-subtitle",
        {
          y: "-15vh",
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
          id="astronaut-container"
          className="absolute z-[20]  left-[30vw] w-[40vw] h-[80vh]"
        >
          <img
            src="/images/astro.png"
            alt="Astronaut"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] object-contain pointer-events-none drop-shadow-xl hover:-translate-y-[55%] transition-transform duration-700"
          />
        </div>
        <div
          id="portal-container"
          className="absolute z-10 bottom-0 left-0 w-full h-full scale-70"
          style={{ transformOrigin: "center bottom", willChange: "transform" }}
        >
          <img
            src="/images/portal.png"
            alt="portal"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 object-contain pointer-events-none"
          />
        </div>

        {/* 4. LIMITLESS STUDIO TEXT & SUBTITLE - Above stars */}
        <div className="main-title absolute top-[20vh] left-0 w-full text-center z-30 pointer-events-none mix-blend-difference">
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

        {/* Subtitle */}
        <div className="main-subtitle absolute top-[20vh] sm:top-[25vh] xl:top-[278px] left-0 w-full text-center z-30 pointer-events-none">
          <p
            className="text-sm sm:text-lg md:text-[20px] font-light text-white tracking-wide drop-shadow-md"
            style={{ fontFamily: "'Gilroy', sans-serif" }}
          >
            Where vision becomes experience
          </p>
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

        {/* 5. FLOWERS - Topmost layer */}
        <img
          src="/images/flowers.png"
          alt="Foreground Flowers"
          className="absolute -bottom-5 left-0 w-full object-cover object-bottom z-[999] pointer-events-none drop-shadow-2xl"
        />
      </div>
    </div>
  );
};

export default Landing;

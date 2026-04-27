import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AWARDS = [
  { year: "2024", title: "Google's Fitbit Ace LTE" },
  { year: "2024", title: "Tripadvisor" },
  { year: "2024", title: "2nd Runner up" },
];

const Work = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      // Staggered entrance for the grid cards
      gsap.fromTo(
        ".work-card",
        { opacity: 0, y: 60, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );

      // Left text block slide-in
      gsap.fromTo(
        ".work-left-content",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 75%",
            end: "top 35%",
            scrub: 1,
          },
        }
      );

      // Stats counter animation
      gsap.fromTo(
        ".work-stats",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".work-stats",
            start: "top 90%",
            end: "top 60%",
            scrub: 1,
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="work-section relative w-full h-[95%] bg-transparent font-sans text-white overflow-hidden"
    >

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* ── Main Content ── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24">

        {/* ── Bento Grid Layout ── */}
        <div className="grid grid-cols-12 gap-3 sm:gap-4 auto-rows-auto">
          {/* ── LEFT COLUMN: Text + Awards + Team ── */}
          <div className="col-span-12 lg:col-span-4 flex flex-col justify-between">
            {/* Title block */}
            <div className="work-left-content">
              <h2
                className="text-[36px] sm:text-[44px] lg:text-[35px] font-normal leading-[1.1]"
                style={{ fontFamily: "Gilroy", color: "#FFFBFE" }}
              >
                Our work
              </h2>
              <p
                className="text-[22px] sm:text-[28px] lg:text-[32px] font-light text-white/70 leading-tight"
                style={{ fontFamily: "'Gilroy', sans-serif" }}
              >
                Team Cyphers
              </p>
            </div>
            <div>

              {/* Description text */}
              <div className="work-left-content mt-4 lg:mt-8">
                <p
                  className="text-[12px] sm:text-[13px] leading-relaxed text-white/50 max-w-[340px]"
                  style={{ fontFamily: "'Gilroy', sans-serif" }}
                >
                  For 25 years, Tripadvisor has been the world's travel companion,
                  with real reviews, real advice, straight from real people. But in
                  a race to compete with booking engines and comparison sites on
                  price and capacity, the brand risked losing its edge. We set out
                  to refocus on what makes Tripadvisor unique: its community of
                  real travelers, and their real reviews.
                </p>
              </div>

              {/* Team member card */}
              <div className="work-left-content flex items-center gap-3 mt-6">
                <div className="w-[40px] h-[40px] bg-white/10 overflow-hidden border border-white/20 flex-shrink-0">
                  <img
                    src="/images/astro.png"
                    alt="Team Cyphers"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p
                    className="text-[13px] font-medium text-white"
                    style={{ fontFamily: "'Gilroy', sans-serif" }}
                  >
                    Team Cyphers
                  </p>
                  <p
                    className="text-[10px] text-white/40 tracking-wide"
                    style={{ fontFamily: "'Gilroy', sans-serif" }}
                  >
                    2024 &nbsp;·&nbsp; Hack-A-Thon
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT GRID: Images + Stats ── */}
          <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-[40%_60%] gap-3 sm:gap-4">

            {/* ── LEFT COLUMN ── */}
            <div className="flex flex-col gap-3 sm:gap-4">
              {/* Image 01 — tall with awards */}
              <div className="work-card relative rounded-md overflow-hidden group cursor-pointer flex-1 min-h-[400px] flex flex-col justify-end">
                <img
                  src="/images/work1.png"
                  alt="Project 01"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                <span
                  className="absolute top-4 left-4 text-[11px] tracking-[0.15em] text-white/60 z-10"
                  style={{ fontFamily: "'Gilroy', sans-serif" }}
                >
                  01
                </span>

                {/* ── Awards Timeline overlaid on Image 01 ── */}
                <div className="relative z-10 flex flex-col gap-3 p-5 pb-6 w-full mt-auto">
                  {AWARDS.map((award, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-4"
                    >
                      <span
                        className="text-[13px] text-white/90 tracking-wide shrink-0"
                        style={{ fontFamily: "'Gilroy', sans-serif" }}
                      >
                        {award.year}
                      </span>
                      <div className="flex-1 h-[1px] bg-white/30"></div>
                      <span
                        className="text-[13px] text-white tracking-wide text-right font-medium"
                        style={{ fontFamily: "'Gilroy', sans-serif" }}
                      >
                        {award.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Stats Counter + CTA ── */}
              <div className="work-stats work-card relative rounded-md overflow-hidden bg-white/[0.03] border border-white/10 p-5 sm:p-6 shrink-0 h-[160px] flex flex-col justify-between group cursor-pointer backdrop-blur-md">
                {/* CTA Row */}
                <div className="relative z-10 flex items-start justify-between">
                  <span
                    className="text-[12px] text-white/80"
                    style={{ fontFamily: "'Gilroy', sans-serif" }}
                  >
                    Visit now and experience
                  </span>
                  <div className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="w-7 h-7 text-white"
                    >
                      <path d="M7 17L17 7" strokeLinecap="square" strokeLinejoin="miter" />
                      <path d="M7 7h10v10" strokeLinecap="square" strokeLinejoin="miter" />
                    </svg>
                  </div>
                </div>

                {/* Big number */}
                <h3
                  className="relative z-10 text-[56px] sm:text-[64px] font-medium leading-none tracking-tight"
                  style={{ fontFamily: "'Gilroy', sans-serif", color: "#FFFBFE" }}
                >
                  10M+
                </h3>
              </div>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="flex flex-col gap-3 sm:gap-4">
              {/* Image 02 — wide */}
              <div className="work-card relative rounded-md overflow-hidden group cursor-pointer h-[240px] shrink-0">
                <img
                  src="/images/work2.png"
                  alt="Project 02"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                <span
                  className="absolute top-4 left-4 text-[11px] tracking-[0.15em] text-white/60 z-10"
                  style={{ fontFamily: "'Gilroy', sans-serif" }}
                >
                  02
                </span>
              </div>

              {/* Image 03 & 04 Row */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 flex-1">
                {/* Image 03 */}
                <div className="work-card relative rounded-md overflow-hidden group cursor-pointer min-h-[250px]">
                  <img
                    src="/images/work3.png"
                    alt="Project 03"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                  <span
                    className="absolute top-4 left-4 text-[11px] tracking-[0.15em] text-white/60 z-10"
                    style={{ fontFamily: "'Gilroy', sans-serif" }}
                  >
                    03
                  </span>
                </div>

                {/* Image 04 */}
                <div className="work-card relative rounded-md overflow-hidden group cursor-pointer min-h-[250px]">
                  <img
                    src="/images/work4.png"
                    alt="Project 04"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                  <span
                    className="absolute top-4 left-4 text-[11px] tracking-[0.15em] text-white/60 z-10"
                    style={{ fontFamily: "'Gilroy', sans-serif" }}
                  >
                    04
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


    </div>
  );
};

export default Work;

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
      className="work-section relative w-full min-h-screen bg-transparent font-sans text-white overflow-hidden"
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
        {/* Section label */}
        <p
          className="text-[11px] tracking-[0.3em] uppercase text-white/40 mb-12"
          style={{ fontFamily: "'Gilroy', sans-serif" }}
        >
          work
        </p>

        {/* ── Bento Grid Layout ── */}
        <div className="grid grid-cols-12 gap-3 sm:gap-4 auto-rows-auto">
          {/* ── LEFT COLUMN: Text + Awards + Team ── */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3 sm:gap-4">
            {/* Title block */}
            <div className="work-left-content">
              <h2
                className="text-[36px] sm:text-[44px] lg:text-[52px] font-normal leading-[1.1] mb-2"
                style={{ fontFamily: "'Catavalo', Georgia, serif", color: "#FFFBFE" }}
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
            <div className="work-left-content flex items-center gap-3 mt-6 lg:mt-10">
              <div className="w-[40px] h-[40px] rounded-full bg-white/10 overflow-hidden border border-white/20 flex-shrink-0">
                <img
                  src="/images/astro.png"
                  alt="Team Cyphers"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p
                  className="text-[13px] font-medium text-white underline underline-offset-2"
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

          {/* ── RIGHT GRID: Images + Stats ── */}
          <div className="col-span-12 lg:col-span-8 grid grid-cols-2 gap-3 sm:gap-4">
            {/* Image 01 — tall */}
            <div className="work-card relative rounded-md overflow-hidden row-span-2 group cursor-pointer">
              <img
                src="/images/work1.png"
                alt="Project 01"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ minHeight: "340px" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
              <span
                className="absolute top-4 left-4 text-[11px] tracking-[0.15em] text-white/60"
                style={{ fontFamily: "'Gilroy', sans-serif" }}
              >
                01
              </span>
            </div>

            {/* Image 02 — top right */}
            <div className="work-card relative rounded-md overflow-hidden group cursor-pointer">
              <img
                src="/images/work2.png"
                alt="Project 02"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ minHeight: "160px", aspectRatio: "16/10" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
              <span
                className="absolute top-4 left-4 text-[11px] tracking-[0.15em] text-white/60"
                style={{ fontFamily: "'Gilroy', sans-serif" }}
              >
                02
              </span>
            </div>

            {/* Awards + Images Row */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 col-span-1">
              {/* Image 03 */}
              <div className="work-card relative rounded-md overflow-hidden group cursor-pointer">
                <img
                  src="/images/work3.png"
                  alt="Project 03"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ minHeight: "160px", aspectRatio: "1/1" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                <span
                  className="absolute top-4 left-4 text-[11px] tracking-[0.15em] text-white/60"
                  style={{ fontFamily: "'Gilroy', sans-serif" }}
                >
                  03
                </span>
              </div>

              {/* Image 04 */}
              <div className="work-card relative rounded-md overflow-hidden group cursor-pointer">
                <img
                  src="/images/work4.png"
                  alt="Project 04"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ minHeight: "160px", aspectRatio: "1/1" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                <span
                  className="absolute top-4 left-4 text-[11px] tracking-[0.15em] text-white/60"
                  style={{ fontFamily: "'Gilroy', sans-serif" }}
                >
                  04
                </span>
              </div>
            </div>

            {/* ── Awards Timeline ── */}
            <div className="work-card col-span-2 lg:col-span-1 flex flex-col justify-center gap-3 px-5 py-4 rounded-md border border-white/10 bg-white/[0.03]">
              {AWARDS.map((award, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4"
                >
                  <span
                    className="text-[12px] text-white/50 tracking-wide shrink-0"
                    style={{ fontFamily: "'Gilroy', sans-serif" }}
                  >
                    {award.year}
                  </span>
                  <div className="flex-1 h-[1px] bg-white/10"></div>
                  <span
                    className="text-[12px] text-white/80 tracking-wide text-right"
                    style={{ fontFamily: "'Gilroy', sans-serif" }}
                  >
                    {award.title}
                  </span>
                </div>
              ))}
            </div>

            {/* ── Stats Counter + CTA ── */}
            <div className="work-stats work-card col-span-2 lg:col-span-1 flex flex-col justify-between rounded-md border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              {/* CTA Row */}
              <div className="flex items-center justify-between mb-6">
                <span
                  className="text-[10px] tracking-[0.2em] uppercase text-white/50"
                  style={{ fontFamily: "'Gilroy', sans-serif" }}
                >
                  Visit now and experience
                </span>
                <div className="w-[36px] h-[36px] rounded-md border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors duration-300">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-white/70"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </div>
              </div>

              {/* Big number */}
              <h3
                className="text-[56px] sm:text-[72px] lg:text-[80px] font-bold leading-none tracking-tight"
                style={{ fontFamily: "'Catavalo', Georgia, serif", color: "#FFFBFE" }}
              >
                10M+
              </h3>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Work;

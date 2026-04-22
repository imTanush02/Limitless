import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const VideoPage = () => {
  const container = useRef(null);
  const videoRef = useRef(null);
  const cursorRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);

  useGSAP(
    () => {
      gsap.fromTo(
        ".video-card",
        {
          scale: 0.2,
          y: "-70vh",
          borderRadius: "16px",
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          borderRadius: "4px",
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "top top",
            scrub: 1,
          },
        }
      );
    },
    { scope: container }
  );

  // Custom cursor follow effect
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      ref={container}
      style={{
        backgroundImage: "url('/images/stars.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="relative flex items-center justify-center w-full h-screen bg-black font-sans text-white"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>

      {/* Custom Cursor — follows mouse, only visible inside video card */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          opacity: cursorVisible ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
          {/* Circle with icon */}
          <div className="w-[70px] h-[70px] rounded-full bg-transparent border-[1px] border-white flex items-center justify-center shadow-lg shadow-orange-500/30">
            {isPlaying ? (
              /* Pause icon */
              <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
                <rect x="2" y="1" width="5" height="20" rx="1.5" fill="white" />
                <rect x="13" y="1" width="5" height="20" rx="1.5" fill="white" />
              </svg>
            ) : (
              /* Play icon */
              <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                <path d="M2 2L18 12L2 22V2Z" fill="white" />
              </svg>
            )}
          </div>
          {/* WATCH text */}
          <span
            className="text-[10px] font-medium tracking-[0.2em] uppercase text-white"
            style={{ fontFamily: "'Gilroy', sans-serif" }}
          >
            {isPlaying ? "PAUSE" : "WATCH"}
          </span>
        </div>
      </div>

      {/* Video Card */}
      <div
        className="video-card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[80%] z-[999] shadow-2xl rounded-lg overflow-hidden"
        style={{ cursor: "none" }}
        onMouseEnter={() => setCursorVisible(true)}
        onMouseLeave={() => setCursorVisible(false)}
        onClick={handleVideoClick}
      >
        <video
          ref={videoRef}
          className="w-fit h-fit object-cover"
          src="/video/limitless.mp4"
          loop
          playsInline
        />
      </div>
    </div>
  );
};

export default VideoPage;
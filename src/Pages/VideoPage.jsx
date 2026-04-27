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
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch devices — hide custom cursor on mobile/tablet
  useEffect(() => {
    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
  }, []);

  useGSAP(
    () => {
      gsap.fromTo(
        ".video-card",
        {
          scale: 0.2,
          yPercent: -140,
          borderRadius: "16px",
        },
        {
          scale: 1,
          opacity: 1,
          yPercent: -50,
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

  // Custom cursor follow effect (mouse only)
  useEffect(() => {
    if (isTouchDevice) return;
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
  }, [isTouchDevice]);

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
      className="video-page-section relative flex -mt-[0.1px] items-center justify-center w-full h-screen bg-transparent font-sans text-white"
    >


      {/* Custom Cursor — follows mouse, hidden on touch devices */}
      {!isTouchDevice && (
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
            <div className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px] rounded-full bg-transparent border border-white flex items-center justify-center shadow-lg shadow-orange-500/30">
              {isPlaying ? (
                /* Pause icon */
                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 20 22" fill="none">
                  <rect x="2" y="1" width="5" height="20" rx="1.5" fill="white" />
                  <rect x="13" y="1" width="5" height="20" rx="1.5" fill="white" />
                </svg>
              ) : (
                /* Play icon */
                <svg className="w-4 h-5 sm:w-5 sm:h-6" viewBox="0 0 20 24" fill="none">
                  <path d="M2 2L18 12L2 22V2Z" fill="white" />
                </svg>
              )}
            </div>
            {/* WATCH text */}
            <span
              className="text-[8px] sm:text-[10px] font-medium tracking-[0.2em] uppercase text-white"
              style={{ fontFamily: "'Gilroy', sans-serif" }}
            >
              {isPlaying ? "PAUSE" : "WATCH"}
            </span>
          </div>
        </div>
      )}

      {/* Video Card — responsive sizing */}
      <div
        className="video-card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] h-[50%] sm:w-[85%] sm:h-[60%] md:w-[80%] md:h-[70%] lg:w-[70%] lg:h-[80%] z-[999] shadow-2xl rounded-lg overflow-hidden"
        style={{
          cursor: isTouchDevice ? "pointer" : "none",
          willChange: "transform",
        }}
        onMouseEnter={() => !isTouchDevice && setCursorVisible(true)}
        onMouseLeave={() => !isTouchDevice && setCursorVisible(false)}
        onClick={handleVideoClick}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/video/limitless.mp4"
          loop
          playsInline
        />
      </div>
    </div>
  );
};

export default VideoPage;
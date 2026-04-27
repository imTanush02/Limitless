import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Landing from "./Pages/Landing";
import VideoPage from "./Pages/VideoPage";
import TextPage from "./Pages/TextPage";
import Work from "./Pages/Work";
import WorkWeDo from "./Pages/WorkWeDo";
import OurProcess from "./Pages/OurProcess";
import Talk from "./Pages/Talk";
import Footer from "./Pages/Footer";
import FixedUI from "./Components/FixedUI";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(ticker);
    };
  }, []);

  return (
    <div className="bg-black w-full h-screen">
      {/* Fixed stars background — global canvas, persists behind all pages */}
      <div className="fixed w-full h-screen z-0 bg-black stars-background">
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 border-[1px] bg-transparent border-white/20 rounded-full scale-110 w-[80vh] h-[80vh] pointer-events-none"></div>
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 border-[1px] bg-transparent border-white/20 rounded-full scale-120 w-[80vh] h-[80vh] pointer-events-none"></div>
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 border-[1px] bg-transparent border-white/20 rounded-full scale-130 w-[80vh] h-[80vh] pointer-events-none"></div>
        <img
          src="/images/stars.png"
          alt="Stars"
          className="absolute w-full h-full object-cover pointer-events-none opacity-90"
        />
      </div>
      <FixedUI />
      <Landing />
      <VideoPage />
      <TextPage />
      <Work />
      <WorkWeDo />
      <OurProcess />
      <Talk />
      <Footer />
    </div>
  );
};

export default App;

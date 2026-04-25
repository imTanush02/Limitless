import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Landing from "./Pages/Landing";
import VideoPage from "./Pages/VideoPage";
import TextPage from "./Pages/TextPage";
import Work from "./Pages/Work";
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
      <FixedUI />
      <Landing />
      <VideoPage />
      <TextPage />
      <Work />
    </div>
  );
};

export default App;
"use client";

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import CallToAction from "@/components/CallToAction";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  const particlesInit = async (engine) => {
    await loadFull(engine); // MUST do this
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 -z-10"
        options={{
          background: { color: "#0f172a" },
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
            modes: { repulse: { distance: 100 } },
          },
          particles: {
            color: { value: "#ffffff" },
            links: { enable: true, color: "#ffffff" },
            move: { enable: true, speed: 2 },
            number: { value: 50, density: { enable: true, area: 800 } },
            size: { value: { min: 1, max: 5 } },
          },
          detectRetina: true,
        }}
      />

      <div className="relative z-10">
        <HeroSection />
        <Features />
        <CallToAction />
        <Footer />
      </div>
    </div>
  );
}

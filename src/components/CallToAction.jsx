"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CallToAction() {
  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleStartNow = () => {
    router.push("/add-expense");
  };

  return (
    <section
      className="bg-base-200 text-white py-20 px-6 text-center"
      data-aos="zoom-in"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Ready to take control of your finances?
        </h2>
        <p className="text-lg sm:text-xl mb-8 text-white/90">
          Start tracking your expenses today and build a better financial future.
        </p>
        <button
          onClick={handleStartNow}
          className="bg-white cursor-pointer text-primary font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-base-100 hover:text-accent transition duration-300"
        >
          Start Now
        </button>
      </div>
    </section>
  );
}

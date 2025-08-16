"use client"

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaMoneyBillWave, FaChartPie, FaFolderOpen } from "react-icons/fa";

export default function Features() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const features = [
    {
      title: "Easy Tracking",
      desc: "Add your daily expenses in just a few clicks.",
      icon: <FaMoneyBillWave className="text-primary text-5xl mx-auto mb-4" />,
    },
    {
      title: "Smart Reports",
      desc: "Visualize your spending with clear charts and insights.",
      icon: <FaChartPie className="text-primary text-5xl mx-auto mb-4" />,
    },
    {
      title: "Stay Organized",
      desc: "Categorize your expenses for better management.",
      icon: <FaFolderOpen className="text-primary text-5xl mx-auto mb-4" />,
    },
  ];

  return (
    <section className="py-16 px-4 bg-base-100 mt-16">
      <h2 className="text-4xl font-bold text-center mb-12">
        Why Choose <span className="text-primary">Us?</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {features.map((f, idx) => (
          <div
            key={idx}
            data-aos="fade-up"
            data-aos-delay={idx * 150}
            className="bg-base-200 rounded-xl shadow-md p-6 text-center hover:shadow-xl transition duration-300"
          >
            {f.icon}
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

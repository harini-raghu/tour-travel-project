import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import mistyHills from "../assets/hero/mistyHillsAI.png";
import riverStream from "../assets/hero/riverStream1.png";
import sunsetAI from "../assets/hero/sunsetAI.png";
import waterfallAI from "../assets/hero/waterfall1.png";

const slides = [
  {
    image: mistyHills,
    title: "Discover the Beauty of Coorg",
    subtitle:
      "Explore waterfalls, plantations, safaris & scenic adventures with Coorg Shree Tours & Travels.",
  },
  {
    image: riverStream,
    title: "Relax in Nature",
    subtitle:
      "Experience Coorg’s rivers, forests, and peaceful natural surroundings.",
  },
  {
    image: sunsetAI,
    title: "Unforgettable Memories",
    subtitle:
      "Perfect for couples, families, and thrill-seekers — Coorg has it all.",
  },
  {
    image: waterfallAI,
    title: "Adventure Awaits",
    subtitle: "Trek, explore waterfalls, and enjoy thrilling jeep safaris.",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => nextSlide(), 6500);
    return () => clearInterval(timer);
  }, []);

 return (
    <div className="relative w-full h-[75vh] md:h-[80vh] overflow-hidden">

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-[3000ms] ease-out
            ${index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"}
          `}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 hero-text-animate">
            <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg mb-4">
              {slide.title}
            </h1>
            <p className="max-w-2xl text-lg md:text-xl opacity-90">
              {slide.subtitle}
            </p>

            <div className="flex gap-4">
  <Link
    to="/packages"
    className="mt-6 px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
    Explore Packages
  </Link>
</div>
          </div>
        </div>
      ))}

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/20 p-3 
        rounded-full text-white backdrop-blur-md hover:bg-white/40 transition"
      >
        <FaChevronLeft />
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/20 p-3 
        rounded-full text-white backdrop-blur-md hover:bg-white/40 transition"
      >
        <FaChevronRight />
      </button>

      {/* WAVE ANIMATION HERE — THIS IS CORRECT */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="block w-full h-32 md:h-40 wave-wiggle"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="M0,256 C360,300 1080,150 1440,240 V320 H0 Z"
          ></path>
        </svg>
      </div>
    </div>
);
}
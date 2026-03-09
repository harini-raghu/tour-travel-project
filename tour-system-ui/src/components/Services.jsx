import { useEffect, useRef } from "react";
import {
  FaMountain,
  FaCarSide,
  FaHome,
  FaMapSigns,
  FaHeart,
  FaTrain
} from "react-icons/fa";

import jeepImg from "../assets/services/jeep.jpg";
import taxiImg from "../assets/services/taxi.jpg";
import homeImg from "../assets/services/homestay.jpg";
import tourImg from "../assets/services/tour.jpg";
import honeymoonImg from "../assets/services/honeymoon.jpg";
import ticketImg from "../assets/services/tickets.jpg";

export default function Services() {
  const services = [
  {
    img: jeepImg,
    icon: <FaMountain className="text-white text-4xl" />,
    title: "Mandalpatti Jeep Safari",
    fullDesc: "Experience the thrilling Mandalpatti Jeep Safari — a rugged off-road adventure through verdant forests and winding trails, culminating at Mandalpatti Peak with panoramic views of lush valleys and hills.", // enriched text
  },
  {
    img: taxiImg,
    icon: <FaCarSide className="text-white text-4xl" />,
    title: "Taxi & Cab Services",
    fullDesc: "Reliable pickup, drop, and sightseeing taxi services across Coorg and neighboring destinations with professional drivers and comfortable vehicles available 24/7.",
  },
  {
    img: homeImg,
    icon: <FaHome className="text-white text-4xl" />,
    title: "Home Stay Booking",
    fullDesc: "Personalized homestay booking assistance with options from cozy local stays to mid-range hotels and resorts, ensuring comfort and warmth after a day of exploration.",
  },
  {
    img: tourImg,
    icon: <FaMapSigns className="text-white text-4xl" />,
    title: "Tour Packages",
    fullDesc: "Custom local sightseeing tour packages covering iconic places like Abbey Falls, Raja’s Seat, and more — tailored to your interests and travel schedule.",
  },
  {
    img: honeymoonImg,
    icon: <FaHeart className="text-white text-4xl" />,
    title: "Honeymoon / Group Packages",
    fullDesc: "Celebrate romance or group travel with specially curated itineraries for privacy, adventure, candlelight dinners, and unforgettable experiences amidst scenic Coorg landscapes.",
  },
  {
    img: ticketImg,
    icon: <FaTrain className="text-white text-4xl" />,
    title: "Bus & Rail Ticketing",
    fullDesc: "Assistance with booking hassle-free bus and rail tickets to and from Coorg or neighboring destinations, making travel seamless and stress-free.",
  },
];


  const cardsRef = useRef([]);

  // 🌟 Scroll Animation + Stagger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-service");
          }
        });
      },
      { threshold: 0.3 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });
  }, []);

  return (
    <section className="py-20 bg-white">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
        Our Services
      </h2>

      <p className="text-center max-w-2xl mx-auto mt-3 text-gray-600">
        From jeep safaris to cozy homestays — Coorg Shree Tours & Travels brings you the best experiences.
      </p>

      {/* Grid */}
      <div className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        gap-10 
        max-w-800
        mx-auto 
        mt-16 
        px-6
      ">
        {services.map((service, index) => (
          <div
  key={index}
  ref={(el) => (cardsRef.current[index] = el)}
  style={{ animationDelay: `${index * 0.15}s` }}
  className="
  relative rounded-2xl overflow-hidden shadow-xl
  group cursor-pointer transition duration-500
  card-glow card-magnetic
  w-full h-80 opacity-0
"

>
  {/* Image */}
  <img
    src={service.img}
    className="
      w-full h-full object-cover 
      transition-all duration-700 
      group-hover:blur-sm group-hover:scale-110
    "
    alt={service.title}
  />

  {/* Dark overlay (normal) */}
  <div className="
      absolute inset-0 
      bg-gradient-to-t from-black/40 via-black/10 to-transparent
      transition-all duration-500 
      group-hover:bg-black/70 group-hover:backdrop-blur-sm
  "></div>

  {/* ⭐ NORMAL: Icon + Title with background ⭐ */}
  <div
    className="
      absolute bottom-5 left-5
      flex flex-col gap-2
      transition-all duration-500
      group-hover:opacity-0
    "
  >
    <div className="
        bg-black/50 backdrop-blur-md px-3 py-1 rounded-lg 
        inline-flex items-center gap-2
        shadow-[0_0_10px_rgba(0,0,0,0.25)]
    ">
      {service.icon}
      <h3 className="text-lg font-bold text-white">{service.title}</h3>
    </div>
  </div>

  {/* ⭐ HOVER: Full Description ⭐ */}
  <div className="absolute inset-0 text-white p-6 flex flex-col justify-center items-start 
opacity-0 group-hover:opacity-100 transition-all duration-500">

  <div className="fade-delay-1 mb-4">
    {service.icon}
  </div>

  <h3 className="fade-delay-2 text-2xl font-bold leading-tight mb-3">
    {service.title}
  </h3>

  <p className="fade-delay-3 text-sm leading-relaxed">
    {service.fullDesc}
  </p>
</div>


</div>


        ))}
      </div>
    </section>
  );
}

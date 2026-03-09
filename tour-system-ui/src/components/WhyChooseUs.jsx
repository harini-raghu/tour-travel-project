import { useEffect } from "react";
import {
  FaCheckCircle,
  FaMapMarkedAlt,
  FaSuitcase,
  FaRupeeSign,
} from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaCheckCircle className="text-green-600 text-4xl" />,
      title: "Reliable & Professional",
      desc: "Trusted service with experienced drivers and safe travel.",
    },
    {
      icon: <FaMapMarkedAlt className="text-blue-600 text-4xl" />,
      title: "Local Expertise",
      desc: "We know Coorg’s hidden gems, scenic spots and best routes.",
    },
    {
      icon: <FaSuitcase className="text-orange-600 text-4xl" />,
      title: "Custom Tour Packages",
      desc: "Flexible itineraries tailored to your travel preferences.",
    },
    {
      icon: <FaRupeeSign className="text-teal-600 text-4xl" />,
      title: "Affordable Pricing",
      desc: "Comfortable travel at the most competitive rates.",
    },
  ];

  // CARD SCROLL ANIMATION
  useEffect(() => {
    const cards = document.querySelectorAll(".why-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("card-animate");
              entry.target.classList.remove("card-hidden");
            }, index * 150); // Delay between cards
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));
  }, []);

  return (
    <section className="relative bg-[#fafafa] py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
        Why Choose Us
      </h2>

      <p className="text-center max-w-2xl mx-auto mt-4 text-gray-600">
        Coorg Shree Tours & Travels offers trusted, comfortable, and personalized
        experiences to make your Coorg journey memorable.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-600 mx-auto mt-12">
        {features.map((item, index) => (
          <div
            key={index}
            className="
              why-card card-hidden
              bg-white shadow-lg rounded-2xl p-8 text-center 
              transition-all transform duration-300 hover:-translate-y-3 
              hover:shadow-2xl hover:bg-gray-50
            "
          >
            <div className="mb-4 transition-transform duration-300 hover:scale-125">
              {item.icon}
            </div>

            <h3 className="text-lg font-semibold text-gray-800">
              {item.title}
            </h3>

            <p className="text-gray-600 mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;

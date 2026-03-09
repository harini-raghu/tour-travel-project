import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Sathish Kumar",
    text:
      "Had an amazing experience with Coorg Shree Tours & Travels. The jeep safari was thrilling and the driver was very friendly.",
  },
  {
    name: "Ramani J.",
    text:
      "Our honeymoon trip was beautiful. They arranged a peaceful homestay and a perfect sightseeing schedule for us.",
  },
  {
    name: "Abdul Malik",
    text:
      "Very professional and reliable service. Highly recommended for families and groups visiting Coorg.",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          What Our Customers Say
        </h2>
        <p className="text-gray-500 mb-12">
          Real experiences from travelers who explored Coorg with us.
        </p>

        {/* Slider */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="min-w-full px-4"
              >
                <div className="bg-white rounded-xl shadow-lg px-8 py-10">
                  {/* Stars */}
                  <div className="flex justify-center mb-4 text-yellow-400">
                    ★★★★★
                  </div>

                  <p className="text-gray-600 italic mb-6">
                    “{t.text}”
                  </p>

                  <h4 className="font-semibold text-gray-800">
                    — {t.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

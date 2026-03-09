import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import jeepSafariData from "../data/jeepSafariData";

const JeepSafari = () => {
  return (
    <>
      <PageHero
        title="Jeep Safari in Coorg"
        subtitle="Choose from our exciting off-road safari experiences"
        bgImage="/src/assets/hero/mistyHillsAI.png"
      />

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {jeepSafariData.map((safari) => (
              <div
                key={safari.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition"
              >
                <img
                  src={safari.image}
                  alt={safari.title}
                  className="h-56 w-full object-cover rounded-t-xl"
                />

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {safari.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Duration: {safari.duration}
                  </p>

                  <p className="text-green-600 font-semibold mt-2">
                    {safari.price}
                  </p>

                <Link
  to="/contact"
  className="inline-block mt-4 text-blue-600 font-medium"
>
  Enquire Now →
</Link>
                    
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default JeepSafari;
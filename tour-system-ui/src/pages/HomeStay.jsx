import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import homestayData from "../data/homestayData";

const HomeStay = () => {
  return (
    <>
      <PageHero
        title="Homestays in Coorg"
        subtitle="Comfortable stays surrounded by nature"
        bgImage="/src/assets/hero/mistyHillsAI.png"
      />

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {homestayData.map((stay) => (
              <div
                key={stay.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition"
              >
                <img
                  src={stay.image}
                  alt={stay.title}
                  className="h-56 w-full object-cover rounded-t-xl"
                />

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {stay.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Location: {stay.location}
                  </p>

                  <p className="text-green-600 font-semibold mt-2">
                    {stay.price}
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

export default HomeStay;
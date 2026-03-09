import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import packagesData from "../data/packagesData";

const Packages = () => {
  return (
    <>
      <PageHero
        title="Our Tour Packages"
        subtitle="Carefully curated experiences to explore Coorg"
        bgImage="/assets/hero/mistyHillsAI.png"
      />

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {packagesData.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition"
              >
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="h-56 w-full object-cover rounded-t-xl"
                />

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {pkg.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Duration: {pkg.duration}
                  </p>

                  <p className="text-green-600 font-semibold mt-2">
                    {pkg.price}
                  </p>

                  <Link
                    to={`/packages/${pkg.id}`}
                    className="inline-block mt-4 text-blue-600 font-medium"
                  >
                    View Details →
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

export default Packages;

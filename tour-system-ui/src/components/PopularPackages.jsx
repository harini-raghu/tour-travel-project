import { Link } from "react-router-dom";

// ✅ Images
import localImg from "../assets/packages/local.jpg";
import mandalpattiImg from "../assets/packages/mandalpatti.jpg";
import days3Img from "../assets/packages/3days.jpg";
import waterfallsImg from "../assets/packages/waterfalls.jpg";

const packages = [
  {
    id: 1,
    title: "Coorg Local Sightseeing Tour",
    duration: "1 Day",
    places: "Abbey Falls, Raja’s Seat, Fort, Plantations",
    image: localImg,
  },
  {
    id: 2,
    title: "Mandalpatti Jeep Safari",
    duration: "3–4 Hours",
    places: "Off-road jeep ride, forest trail, viewpoint",
    image: mandalpattiImg,
  },
  {
    id: 3,
    title: "Coorg 2 Nights / 3 Days",
    duration: "2 Nights / 3 Days",
    places: "Dubare Camp, Abbey Falls, Talacauvery",
    image: days3Img,
  },
  {
    id: 4,
    title: "Waterfalls & Adventure Tour",
    duration: "1 Day",
    places: "Iruppu Falls, Chelavara Falls, trekking",
    image: waterfallsImg,
  },
];

const PopularPackages = () => {
  return (
    <section className="py-28 bg-gray-50">
      <div className="w-full max-w-[1800px] mx-auto px-8">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900">
          Popular Packages
        </h2>

        <p className="text-center max-w-3xl mx-auto mt-5 text-lg text-gray-600">
          Handpicked travel experiences crafted for comfort, nature,
          and unforgettable journeys across Coorg and beyond.
        </p>

        {/* ✅ GRID (THIS WAS THE ISSUE) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 mt-20">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-[260px] xl:h-[280px] object-cover group-hover:scale-105 transition duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900">
                  {pkg.title}
                </h3>

                <p className="mt-3 text-gray-600 text-base">
                  <span className="font-semibold">Duration:</span>{" "}
                  {pkg.duration}
                </p>

                <p className="mt-2 text-gray-600 text-base">
                  {pkg.places}
                </p>

                {/* CTA */}
                <Link
                  to={`/packages/${pkg.id}`}
                  className="mt-8 block w-full text-center bg-green-600 text-white py-4 rounded-xl text-lg font-medium hover:bg-green-700 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PopularPackages;

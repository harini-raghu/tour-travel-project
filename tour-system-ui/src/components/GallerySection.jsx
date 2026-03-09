const images = [
  "/assets/hero/waterfall1.png",
  "/assets/hero/riverStream1.png",
  "/assets/hero/mistyHillsAI.png",
  "/assets/hero/sunsetAI.png",
  "/assets/hero/waterfall1.png",
  "/assets/hero/riverStream1.png",
];

const GallerySection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
          Explore Coorg’s Beauty
        </h2>

        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          A glimpse into the breathtaking landscapes, waterfalls, hills, and serene
          nature that make Coorg a must-visit destination.
        </p>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {images.map((img, index) => (
            <div key={index} className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={img}
                alt="Coorg Scenic"
                className="w-full h-64 object-cover hover:scale-110 transition duration-500"
              />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default GallerySection;

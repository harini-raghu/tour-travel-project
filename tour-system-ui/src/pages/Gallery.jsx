import PageHero from "../components/PageHero";
import galleryData from "../data/galleryData";

const Gallery = () => {
  return (
    <>
      <PageHero
        title="Gallery"
        subtitle="Memories from our tours, safaris and stays in Coorg"
        bgImage="/src/assets/hero/mistyHillsAI.png"
      />

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryData.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-64 w-full object-cover"
                />

                <div className="p-4 text-center">
                  <p className="text-sm text-gray-600">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default Gallery;
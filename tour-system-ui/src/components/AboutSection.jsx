
import riverStream from "../assets/hero/riverStream1.png";const AboutSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-emerald-50/40">
  <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
    <div className="relative">
  <div className="absolute -top-6 -left-6 w-full h-full bg-emerald-100 rounded-3xl"></div>

  <div className="relative">
  <div className="absolute -top-6 -left-6 w-full h-full bg-emerald-100 rounded-3xl"></div>

  <img
    src={riverStream}
    alt="About Coorg Shree Tours"
    className="relative rounded-[2rem_4rem_2rem_4rem] shadow-xl"

  />
  <div className="absolute center-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow text-sm font-semibold text-emerald-700">
  🌿 Local Experts Since 2015
</div>

</div>



</div>


    {/* Text Content */}
    <div>
      <span className="inline-block mb-3 text-sm font-semibold tracking-wide text-emerald-600 uppercase">
        About Us
      </span>

      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
        About Coorg Shree Tours & Travels
      </h2>
<div className="w-16 h-1 bg-emerald-500 rounded-full mb-4"></div>

      <p className="text-gray-600 leading-relaxed mb-5">
        Coorg Shree Tours & Travels is a trusted local travel service based in
        Madikeri, offering memorable tour experiences across Coorg — from
        waterfalls and coffee plantations to thrilling jeep safaris and cozy
        homestays.
      </p>

      <p className="text-gray-600 leading-relaxed mb-8">
        With experienced drivers, dependable service, and deep local expertise,
        our mission is to make your Coorg visit safe, comfortable, and truly
        unforgettable.
      </p>

      {/* Highlights */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 mb-8">
        <li className="flex items-center gap-2">
          <span className="text-emerald-600 text-lg">✔</span>
          Trusted by thousands
        </li>
        <li className="flex items-center gap-2">
          <span className="text-emerald-600 text-lg">✔</span>
          Expert local guidance
        </li>
        <li className="flex items-center gap-2">
          <span className="text-emerald-600 text-lg">✔</span>
          Comfortable transport
        </li>
        <li className="flex items-center gap-2">
          <span className="text-emerald-600 text-lg">✔</span>
          Customized plans
        </li>
      </ul>

      {/* CTA */}
      <a
        href="/about"
        className="inline-block bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition shadow-lg"
      >
        Know More About Us
      </a>
    </div>

  </div>
</section>);
};

export default AboutSection;

const PageHero = ({ title, subtitle, bgImage }) => {
  return (
    <section
      className="relative h-[300px] md:h-[360px] flex items-center justify-center text-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-gray-200">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default PageHero;

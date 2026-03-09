import Navbar from "../components/Navbar";
import HeroSlider from "../components/HeroSlider";
import WhyChooseUs from "../components/WhyChooseUs";
import Services from "../components/Services";
import PopularPackages from "../components/PopularPackages";
import AboutSection from "../components/AboutSection";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSlider />
          <svg
  className="w-full h-40 wave-animate drop-shadow-2xl"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 1440 320"
  preserveAspectRatio="none"
>
  <path
    fill="url(#waveGradient)"
    d="M0,256 C360,300 1080,150 1440,240 V320 H0 Z"
  ></path>

  <defs>
    <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="white" stop-opacity="1" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.9" />
    </linearGradient>
  </defs>
</svg>


      <WhyChooseUs />
      <Services />
      <PopularPackages />
      <AboutSection />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Home;

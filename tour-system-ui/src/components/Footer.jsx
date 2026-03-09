import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaFacebookF, FaInstagram } from "react-icons/fa";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        {/* Brand */}
<div>
  <img
    src={logo}
    alt="Coorg Shree Tours & Travels"
    className="h-14 mb-4"
  />

  <p className="text-sm leading-relaxed text-gray-400">
    Established in the heart of Coorg, Coorg Shree Tours & Travels is a trusted
    provider of personalized travel experiences, jeep safaris, homestays, and
    reliable transport services across Kodagu.
  </p>

  <p className="mt-4 text-sm text-green-400">
    🌿 Local experts since 2015
  </p>
</div>


        {/* Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/jeep-safari" className="hover:text-white">Jeep Safari</a></li>
            <li><a href="/packages" className="hover:text-white">Packages</a></li>
            <li><a href="/home-stay" className="hover:text-white">Home Stay</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Contact Us
          </h4>

          <div className="space-y-3 text-sm">
            <p className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 text-green-400" />
              Near Balabavana, KSRTC Bus Stand, Madikeri – 571201, Coorg
            </p>

            <p className="flex items-center gap-3">
              <FaPhoneAlt className="text-green-400" />
              +91 63634 96182, +91 83102 51037
            </p>

            <p className="flex items-center gap-3">
              <FaEnvelope className="text-green-400" />
              coorgshreetoursandtravels@gmail.com
            </p>
          </div>

          {/* Social */}
          <div className="flex gap-4 mt-5">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 text-center py-4 text-sm text-gray-500">
        © 2026 Coorg Shree Tours & Travels. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

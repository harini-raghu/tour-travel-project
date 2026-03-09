import { useState } from "react";
import { FaWhatsapp, FaPhoneAlt, FaTimes, FaCommentDots } from "react-icons/fa";

const FloatingContact = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
       Book Now
      {/* Expanded buttons */}
      {open && (
        <>
          {/* Call */}
          <a
            href="tel:+916363496182"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:scale-110 transition"
          >
            <FaPhoneAlt />
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/916363496182"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-green-600 text-white shadow-lg hover:scale-110 transition"
          >
            <FaWhatsapp />
          </a>
        </>
      )}

      {/* Main toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-500 text-white shadow-xl hover:scale-110 transition"
      >
        {open ? <FaTimes size={20} /> : <FaCommentDots size={20} />}
      </button>
    </div>
  );
};

export default FloatingContact;

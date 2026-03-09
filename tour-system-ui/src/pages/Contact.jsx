import { useState, useRef, useEffect} from "react"
import PageHero from "../components/PageHero"

/* FAQ DATA */
const faqs = [
  {
    question: "What is your cancellation policy?",
    answer:
      "We offer flexible cancellation up to 7 days before the tour date with a refund of up to 90%."
  },
  {
    question: "Do you offer group discounts?",
    answer:
      "Yes, special discounts are available for group bookings. Contact us for custom quotes."
  },
  {
    question: "Are accommodations included?",
    answer:
      "Yes, accommodations are included as mentioned in the package itinerary."
  },
  {
    question: "What is the best time to book?",
    answer:
      "Booking 2–3 weeks in advance is recommended for best availability."
  },
  {
    question: "Do you offer customized tours?",
    answer:
      "Yes, we can customize tours based on your preferences and budget."
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept online transfers, credit/debit cards, and partial payments as per agreement."
  }
]

const Contact = () => {
  const [submitted, setSubmitted] = useState(false)
  const [currentFAQ, setCurrentFAQ] = useState(0)
  const formRef = useRef(null)
  useEffect(() => {
  const interval = setInterval(() => {
    setCurrentFAQ((prev) =>
      prev === faqs.length - 1 ? 0 : prev + 1
    )
  }, 3000) // slides every 3 seconds

  return () => clearInterval(interval)
}, [])


  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    formRef.current.reset()
  }

  return (
    <>
      {/* HERO */}
      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out with any questions or enquiries."
      />

      {/* CONTACT CARDS */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: "📞",
              title: "Phone",
              line1: "+91-XXX-XXXX-XXX",
              line2: "Mon–Fri: 9AM – 6PM IST"
            },
            {
              icon: "✉️",
              title: "Email",
              line1: "info@shreetours.com",
              line2: "Response within 24 hours"
            },
            {
              icon: "📍",
              title: "Office",
              line1: "Madikeri, Coorg",
              line2: "Karnataka, India"
            }
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white shadow-xl rounded-3xl p-10 text-center transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl animate-slide-up"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="w-16 h-16 mx-auto mb-5 bg-green-600 text-white flex items-center justify-center rounded-2xl text-2xl">
                {card.icon}
              </div>
              <h4 className="text-2xl font-semibold mb-2">
                {card.title}
              </h4>
              <p className="text-gray-700">{card.line1}</p>
              <p className="text-sm text-gray-500 mt-1">{card.line2}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ENQUIRY FORM */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-green-50 px-10 py-8 border-b">
            <h3 className="text-3xl font-bold text-gray-800">
              Send us an Enquiry
            </h3>
            <p className="text-gray-600 mt-2">
              Fill the form below and our team will contact you shortly
            </p>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="p-10 space-y-6"
          >
            <input
              type="text"
              placeholder="Full Name *"
              required
              className="w-full border rounded-xl px-5 py-4 text-lg"
            />

            <input
              type="email"
              placeholder="Email *"
              required
              className="w-full border rounded-xl px-5 py-4 text-lg"
            />

            <input
              type="tel"
              placeholder="Phone *"
              required
              className="w-full border rounded-xl px-5 py-4 text-lg"
            />

            <textarea
              rows="4"
              placeholder="Your Message *"
              required
              className="w-full border rounded-xl px-5 py-4 text-lg"
            />

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold text-xl transition"
            >
              Submit Enquiry
            </button>

            {submitted && (
              <div className="bg-green-50 border border-green-200 text-green-700 text-sm p-4 rounded-lg text-center">
                Enquiry submitted successfully. <br />
                We’ll contact you shortly.
              </div>
            )}
          </form>
        </div>
      </div>

      {/* FAQ CAROUSEL SECTION */}
<div className="bg-gray-50 py-28 overflow-hidden">
  <div className="max-w-7xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold mb-20">
      Frequently Asked Questions
    </h2>

    <div className="relative">

      {/* SLIDER TRACK */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentFAQ * 360}px)`
        }}
      >
        {faqs.map((faq, index) => {
          const isActive = index === currentFAQ

          return (
            <div
              key={index}
              className={`min-w-[320px] md:min-w-[360px] mx-4 p-10 rounded-3xl shadow-xl bg-white transition-all duration-500
                ${
                  isActive
                    ? "scale-105 opacity-100"
                    : "scale-95 opacity-50"
                }
              `}
            >
              <h4 className="text-xl font-semibold mb-4">
                {faq.question}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          )
        })}
      </div>

      {/* LEFT ARROW */}
      <button
        onClick={() =>
          setCurrentFAQ(
            currentFAQ === 0 ? faqs.length - 1 : currentFAQ - 1
          )
        }
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg w-12 h-12 rounded-full flex items-center justify-center text-xl hover:bg-green-50"
      >
        ‹
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={() =>
          setCurrentFAQ(
            currentFAQ === faqs.length - 1 ? 0 : currentFAQ + 1
          )
        }
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg w-12 h-12 rounded-full flex items-center justify-center text-xl hover:bg-green-50"
      >
        ›
      </button>
    </div>
  </div>
</div>


    </>
  )
}

export default Contact

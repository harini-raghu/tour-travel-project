import { useParams, Link } from "react-router-dom"
import { useState, useRef } from "react"
import packagesData from "../data/packagesData"
import PageHero from "../components/PageHero"

const PackageDetails = () => {
  const { id } = useParams()

  const packageItem = packagesData.find(
    (pkg) => pkg.id === Number(id)
  )

  // ✅ booking submit state
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef(null)

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)

      // ✅ reset form fields
  formRef.current.reset()
  }

  if (!packageItem) {
    return (
      <div className="pt-40 text-center">
        <h2 className="text-2xl font-bold">Package not found</h2>
        <Link to="/packages" className="text-blue-600 underline">
          Back to Packages
        </Link>
      </div>
    )
  }
  


  return (
    <>
      {/* HERO */}
      <PageHero
        title={packageItem.title}
        subtitle={packageItem.location}
        bgImage={packageItem.image}
      />

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2">

          {/* IMAGE */}
          <img
            src={packageItem.image}
            alt={packageItem.title}
            className="w-full h-[480px] object-cover rounded-2xl mb-10"
          />

          {/* TITLE */}
          <h1 className="text-3xl font-bold mb-2">
            {packageItem.title}
          </h1>

          {/* META */}
          <p className="text-sm text-gray-600 mb-6">
            <span className="font-semibold">Duration:</span> {packageItem.duration} &nbsp; | &nbsp;
            <span className="font-semibold">Location:</span> {packageItem.location} &nbsp; | &nbsp;
            <span className="text-green-600 font-semibold">{packageItem.price}</span>
          </p>

          {/* DESCRIPTION */}
          <p className="text-gray-700 leading-relaxed mb-10">
            {packageItem.description}
          </p>

          {/* HIGHLIGHTS */}
          <h3 className="text-2xl font-semibold mb-4">Tour Highlights</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {packageItem.highlights.map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-green-600">✔</span>
                {item}
              </li>
            ))}
          </ul>

          {/* ITINERARY */}
          <h3 className="text-2xl font-semibold mb-4">Itinerary</h3>

          <div className="space-y-3 mb-4">
            {packageItem.itinerary.map((day, i) => (
              <div
                key={i}
                className="border rounded-xl p-4 bg-gray-50"
              >
                <h4 className="font-semibold mb-1">
                  {day.day}
                </h4>
                <p className="text-gray-700 text-sm">
                  {day.details}
                </p>
              </div>
            ))}
          </div>

          <p className="text-gray-500 mb-10">
            Detailed itinerary will be shared upon booking confirmation.
          </p>

          {/* INCLUDES / EXCLUDES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div>
              <h4 className="font-semibold mb-3">Package Includes</h4>
              <ul className="list-disc pl-6 space-y-1">
                {packageItem.includes.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Package Excludes</h4>
              <ul className="list-disc pl-6 space-y-1">
                {packageItem.excludes.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <Link
            to="/packages"
            className="inline-block mt-12 text-blue-600 font-semibold"
          >
            ← Back to Packages
          </Link>
        </div>

        {/* RIGHT BOOKING PANEL */}
        <div className="lg:col-span-1">
          <div className="sticky top-28">
            <div className="bg-white border border-green-100 shadow-2xl rounded-3xl overflow-hidden">

              {/* HEADER */}
              <div className="bg-green-50 px-8 py-6 border-b">
                <h3 className="text-2xl font-bold text-gray-800">
                  Book This Tour
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Fill in your details and we’ll contact you shortly
                </p>
              </div>

              {/* FORM */}
              <form
  ref={formRef}
  onSubmit={handleBookingSubmit}
  className="p-8 space-y-5"
>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border rounded-xl px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full border rounded-xl px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full border rounded-xl px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Travel Date *
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full border rounded-xl px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Number of People *
                  </label>
                  <select className="w-full border rounded-xl px-4 py-3">
                    <option>1 Person</option>
                    <option>2 People</option>
                    <option>3 People</option>
                    <option>4 People</option>
                    <option>5+ People</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold text-lg"
                >
                  Request Booking
                </button>

                {submitted && (
                  <div className="bg-green-50 border border-green-200 text-green-700 text-sm p-3 rounded-lg text-center">
                    Booking request submitted successfully. <br />
                    <span className="font-semibold">Status: Pending</span>
                  </div>
                )}

                <Link
                  to="/contact"
                  className="block w-full text-center border border-green-600 text-green-700 py-3 rounded-xl font-semibold hover:bg-green-50"
                >
                  Send Enquiry
                </Link>

                <div className="pt-4 border-t text-sm text-gray-600 space-y-2">
                  <p>We’ll get back to you within 24 hours</p>
                  <p>📞 Call us: +91-XXX-XXXX-XXX</p>
                  <p>✉️ Email: info@shreetours.com</p>
                </div>
              </form>

            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default PackageDetails

import { useParams, Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import PageHero from "../components/PageHero"

const PackageDetails = () => {

  const { id } = useParams()

  const [packageItem, setPackageItem] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState("Preparing your journey...")

  const formRef = useRef(null)

  /* ================= FETCH PACKAGE ================= */

  useEffect(() => {
    fetch(`http://localhost:8000/api/tour-packages/${id}`)
      .then((res) => res.json())
      .then((data) => setPackageItem(data))
      .catch((err) => console.error("Failed to load package:", err))
  }, [id])

  /* ================= TRAVEL LOADER MESSAGES ================= */

  useEffect(() => {

    if (!loading) return

    const messages = [
      "🚙 Preparing your jeep...",
      "🌄 Checking scenic routes...",
      "📅 Confirming your travel date...",
      "🧭 Planning your adventure..."
    ]

    let i = 0

    const interval = setInterval(() => {
      setLoadingMessage(messages[i % messages.length])
      i++
    }, 1200)

    return () => clearInterval(interval)

  }, [loading])

  /* ================= BOOKING SUBMIT ================= */

  const handleBookingSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    const formData = new FormData(e.target)

    const payload = {
      tour_package_id: packageItem.id,
      customer_name: formData.get("customer_name"),
      customer_email: formData.get("customer_email"),
      customer_phone: formData.get("customer_phone"),
      travel_date: formData.get("travel_date"),
      number_of_people: parseInt(formData.get("number_of_people")),
      special_request: null
    }

    try {

      const response = await fetch(
        "http://localhost:8000/api/booking-requests",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      )

      const result = await response.json()

      if (response.ok) {
        setSubmitted(true)
        formRef.current.reset()
      }

    } catch (error) {
      console.error("Booking failed:", error)
    }

    setLoading(false)
  }

  /* ================= LOADING PACKAGE ================= */

  if (!packageItem) {
    return (
      <div className="pt-40 text-center">
        <h2 className="text-2xl font-bold">Loading package...</h2>
      </div>
    )
  }

  /* ================= PARSE JSON ================= */

  const highlights = JSON.parse(packageItem.highlights)
  const itinerary = JSON.parse(packageItem.itinerary)
  const includes = JSON.parse(packageItem.includes)
  const excludes = JSON.parse(packageItem.excludes)

  return (
    <>
      <PageHero
        title={packageItem.title}
        subtitle={packageItem.location}
        bgImage={`http://localhost:8000/images/packages/${packageItem.image}`}
      />

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* LEFT CONTENT */}

        <div className="lg:col-span-2">

          <img
            src={`http://localhost:8000/images/packages/${packageItem.image}`}
            alt={packageItem.title}
            className="w-full h-[480px] object-cover rounded-2xl mb-10"
          />

          <h1 className="text-3xl font-bold mb-2">{packageItem.title}</h1>

          <p className="text-sm text-gray-600 mb-6">
            <span className="font-semibold">Duration:</span> {packageItem.duration} |
            <span className="font-semibold"> Location:</span> {packageItem.location} |
            <span className="text-green-600 font-semibold"> {packageItem.price}</span>
          </p>

          <p className="text-gray-700 leading-relaxed mb-10">
            {packageItem.description}
          </p>

          {/* HIGHLIGHTS */}

          <h3 className="text-2xl font-semibold mb-4">Tour Highlights</h3>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {highlights.map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-green-600">✔</span>
                {item}
              </li>
            ))}
          </ul>

          {/* ITINERARY */}

          <h3 className="text-2xl font-semibold mb-4">Itinerary</h3>

          <div className="space-y-3 mb-4">
            {itinerary.map((day, i) => (
              <div key={i} className="border rounded-xl p-4 bg-gray-50">
                <h4 className="font-semibold mb-1">{day.day}</h4>
                <p className="text-gray-700 text-sm">{day.details}</p>
              </div>
            ))}
          </div>

          {/* INCLUDES / EXCLUDES */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-10">

            <div>
              <h4 className="font-semibold mb-3">Package Includes</h4>
              <ul className="list-disc pl-6 space-y-1">
                {includes.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Package Excludes</h4>
              <ul className="list-disc pl-6 space-y-1">
                {excludes.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

          </div>

          <Link to="/packages" className="inline-block mt-12 text-blue-600 font-semibold">
            ← Back to Packages
          </Link>

        </div>

        {/* BOOKING PANEL */}

        <div className="lg:col-span-1">

          <div className="sticky top-28 bg-white border shadow-xl rounded-2xl p-6">

            <h3 className="text-xl font-bold mb-4">
              Book This Tour
            </h3>

            <form ref={formRef} onSubmit={handleBookingSubmit} className="space-y-4">

              <input name="customer_name" placeholder="Full Name" required className="w-full border rounded-lg px-4 py-2" />

              <input name="customer_email" type="email" placeholder="Email" required className="w-full border rounded-lg px-4 py-2" />

              <input name="customer_phone" placeholder="Phone" required className="w-full border rounded-lg px-4 py-2" />

              <input name="travel_date" type="date" required className="w-full border rounded-lg px-4 py-2" />

              <select name="number_of_people" className="w-full border rounded-lg px-4 py-2">
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
                <option value="5">5 People</option>
              </select>

              <button
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold text-lg flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                    {loadingMessage}
                  </>
                ) : (
                  "Request Booking"
                )}
              </button>

              {submitted && (
                <div className="text-green-700 text-sm text-center">
                  Booking request submitted successfully
                </div>
              )}

            </form>

          </div>

        </div>

      </div>
    </>
  )
}

export default PackageDetails
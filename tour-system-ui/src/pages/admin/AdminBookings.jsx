import { useState, useEffect } from "react"

/* ================= ADMIN BOOKINGS ================= */

const AdminBookings = () => {
  const [bookings, setBookings] = useState([])
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [filter, setFilter] = useState("All")

  /* ---------------- FETCH BOOKINGS ---------------- */
  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/booking-requests")
      const data = await res.json()

      // normalize status + keep backend field names
      const normalized = data.map(b => ({
        ...b,
        status: b.status
          ? b.status.charAt(0).toUpperCase() + b.status.slice(1)
          : "Pending",
      }))

      setBookings(normalized)
    } catch (err) {
      console.error("Failed to fetch bookings", err)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  /* ---------------- DATE HELPERS ---------------- */
  const today = new Date()

  const daysBetween = (dateStr) => {
    const target = new Date(dateStr)
    return Math.ceil((target - today) / (1000 * 60 * 60 * 24))
  }

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredBookings = bookings.filter(b => {
    if (filter === "All") return true
    return b.status === filter
  })

  /* ---------------- STATUS UPDATE ---------------- */
  const updateStatus = async (status) => {
    if (!selectedBooking) return

    const endpoint = status === "Approved" ? "approve" : "reject"

    try {
      await fetch(
        `http://localhost:8000/api/booking-requests/${selectedBooking.id}/${endpoint}`,
        { method: "PUT" }
      )

      setSelectedBooking(null)
      fetchBookings()
    } catch (err) {
      console.error("Status update failed", err)
    }
  }

  return (
    <div className="space-y-8">

      {/* PAGE TITLE */}
      <div>
        <h1 className="text-3xl font-extrabold">Booking Management</h1>
        <p className="text-gray-500">
          Review and manage tour booking requests
        </p>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex gap-3">
        {["All", "Pending", "Approved", "Rejected"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === f
                ? "bg-green-600 text-white shadow"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* SPLIT VIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT: BOOKINGS LIST */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-5 space-y-4">
          <h2 className="text-lg font-semibold">
            Bookings ({filteredBookings.length})
          </h2>

          {filteredBookings.map(b => {
            const urgent =
              b.status === "Pending" && daysBetween(b.travel_date) <= 3

            return (
              <div
                key={b.id}
                onClick={() => setSelectedBooking(b)}
                className={`p-4 rounded-xl border cursor-pointer transition
                  ${
                    selectedBooking?.id === b.id
                      ? "ring-2 ring-green-500"
                      : "hover:shadow-md"
                  }
                  ${
                    b.status === "Approved"
                      ? "bg-green-50 border-green-300"
                      : b.status === "Rejected"
                      ? "bg-red-50 border-red-300"
                      : "bg-yellow-50 border-yellow-300"
                  }
                `}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">
                    #{b.id} – {b.customer_name}
                  </h3>
                  <StatusBadge status={b.status} />
                </div>

                <p className="text-sm text-gray-700">
                  {b.tour_package?.title || "Tour Package"}
                </p>

                <p className="text-sm text-gray-500">
                  {b.number_of_people} person(s) • {b.travel_date}
                </p>

                {urgent && (
                  <p className="text-sm text-red-600 mt-1 font-semibold">
                    🔥 Urgent – Travel within 3 days
                  </p>
                )}
              </div>
            )
          })}
        </div>

        {/* RIGHT: BOOKING DETAILS */}
        <div className="bg-white rounded-2xl shadow p-6">
          {!selectedBooking ? (
            <div className="text-gray-500 text-center mt-24">
              Select a booking to view details
            </div>
          ) : (
            <div className="space-y-5">

              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Booking Details</h2>
                <StatusBadge status={selectedBooking.status} />
              </div>

              <Detail label="Booking ID" value={`#${selectedBooking.id}`} />
              <Detail label="Customer Name" value={selectedBooking.customer_name} />
              <Detail label="Email" value={selectedBooking.customer_email} />
              <Detail label="Phone" value={selectedBooking.customer_phone} />
              <Detail label="Travel Date" value={selectedBooking.travel_date} />
              <Detail label="Number of People" value={selectedBooking.number_of_people} />
              <Detail label="Booking Date" value={selectedBooking.created_at} />

              {/* ACTIONS */}
              <div className="space-y-3 pt-4">

                <button
                  onClick={() => updateStatus("Approved")}
                  className="w-full py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                >
                  ✔ Approve Booking
                </button>

                <button
                  onClick={() => updateStatus("Rejected")}
                  className="w-full py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                >
                  ✖ Reject Booking
                </button>

                <button className="w-full py-2 rounded-lg border hover:bg-gray-50">
                  📧 Send Email to Customer
                </button>

                <button className="w-full py-2 rounded-lg border hover:bg-gray-50">
                  🖨 Print Booking Details
                </button>

              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  )
}

/* ---------------- SMALL COMPONENTS ---------------- */

const Detail = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
)

const StatusBadge = ({ status }) => {
  const map = {
    Pending: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    Approved: "bg-green-100 text-green-800 border border-green-300",
    Rejected: "bg-red-100 text-red-800 border border-red-300"
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${map[status]}`}>
      {status}
    </span>
  )
}

export default AdminBookings
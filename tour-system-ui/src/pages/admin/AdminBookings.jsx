import { useState, useEffect } from "react"

/* ================= ADMIN BOOKINGS ================= */

const AdminBookings = () => {

  const [actionLoading, setActionLoading] = useState(null)

  const [bookings, setBookings] = useState([])
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [filter, setFilter] = useState("All")
  const [showEmailBox, setShowEmailBox] = useState(false)
  const [emailMessage, setEmailMessage] = useState("")

  /* ---------------- FETCH BOOKINGS ---------------- */

  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/booking-requests")
      const data = await res.json()

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

  const isExpired = (dateStr) => {
    const target = new Date(dateStr)
    return target < today
  }

  /* ---------------- PRINT INVOICE ---------------- */

  const printInvoice = (booking) => {

    const printWindow = window.open('', '_blank')

    printWindow.document.write(`
      <html>
      <head>
      <title>Booking Invoice</title>

      <style>
      body{font-family:Arial;padding:40px}
      h1{text-align:center}

      .box{
      border:1px solid #ddd;
      padding:20px;
      margin-top:30px
      }

      .row{margin:10px 0}
      .label{font-weight:bold}

      .status{
      margin-top:20px;
      padding:10px;
      border-radius:5px;
      font-weight:bold
      }

      .approved{background:#e6ffed;color:#15803d}
      .rejected{background:#ffeaea;color:#b91c1c}
      .pending{background:#fff8e6;color:#92400e}

      </style>

      </head>

      <body>

      <h1>Coorg Shree Tours & Travels</h1>
      <h3 style="text-align:center">Booking Invoice</h3>

      <div class="box">

      <div class="row">
      <span class="label">Booking ID:</span>
      #${booking.id}
      </div>

      <div class="row">
      <span class="label">Customer Name:</span>
      ${booking.customer_name}
      </div>

      <div class="row">
      <span class="label">Email:</span>
      ${booking.customer_email}
      </div>

      <div class="row">
      <span class="label">Phone:</span>
      ${booking.customer_phone}
      </div>

      <div class="row">
      <span class="label">Tour Package:</span>
      ${booking.tour_package?.title || ""}
      </div>

      <div class="row">
      <span class="label">Travel Date:</span>
      ${booking.travel_date}
      </div>

      <div class="row">
      <span class="label">Number of People:</span>
      ${booking.number_of_people}
      </div>

      <div class="row">
      <span class="label">Booking Date:</span>
      ${booking.created_at}
      </div>

      <div class="status ${booking.status.toLowerCase()}">
      Status: ${booking.status}
      </div>

      </div>

      <script>
      window.print()
      window.onafterprint = () => window.close()
      </script>

      </body>
      </html>
    `)

    printWindow.document.close()
  }

  /* ---------------- FILTER ---------------- */

  const filteredBookings = bookings.filter(b => {
    if (filter === "All") return true
    return b.status === filter
  })

  /* ---------------- STATUS UPDATE ---------------- */

  const updateStatus = async (status) => {

  if (!selectedBooking) return
  if (selectedBooking.status !== "Pending") return

  const endpoint = status === "Approved" ? "approve" : "reject"

  const key = `${endpoint}_${selectedBooking.id}`

  setActionLoading(key)

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

  setActionLoading(null)
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

        {/* LEFT SIDE */}

        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-5 space-y-4">

          <h2 className="text-lg font-semibold">
            Bookings ({filteredBookings.length})
          </h2>

          {filteredBookings.map(b => {

            const urgent =
              b.status === "Pending" && daysBetween(b.travel_date) <= 3

            const expired = isExpired(b.travel_date)

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
                  expired
                    ? "bg-gray-100 opacity-60"
                    : b.status === "Approved"
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

                {expired && (
                  <p className="text-xs text-gray-500 mt-1">
                    Travel date passed
                  </p>
                )}

              </div>
            )
          })}
        </div>

        {/* RIGHT PANEL */}

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

                {selectedBooking.status === "Pending" && (

                  <>
                    <button
  onClick={() => updateStatus("Approved")}
  className="w-full py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
>
{actionLoading === `approve_${selectedBooking.id}` ? (
<>
<span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
Approving...
</>
) : (
"✔ Approve Booking"
)}
</button>

                    <button
  onClick={() => updateStatus("Rejected")}
  className="w-full py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2"
>
{actionLoading === `reject_${selectedBooking.id}` ? (
<>
<span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
Rejecting...
</>
) : (
"✖ Reject Booking"
)}
</button>
                  </>
                )}

                {selectedBooking.status !== "Pending" && (

                  <div className="text-center text-gray-500 font-semibold">
                    Booking decision already made
                  </div>

                )}

                <button
  onClick={() => setShowEmailBox(true)}
  className="w-full py-2 rounded-lg border hover:bg-gray-50"
>
  📧 Send Email to Customer
</button>


                <button
                  onClick={() => printInvoice(selectedBooking)}
                  className="w-full py-2 rounded-lg border hover:bg-gray-50"
                >
                  🖨 Print Booking Details
                </button>

                {showEmailBox && (

                  <div className="border rounded-lg p-4 mt-3 space-y-3">

                    <textarea
                      placeholder="Write your message to the customer..."
                      value={emailMessage}
                      onChange={(e) => setEmailMessage(e.target.value)}
                      className="w-full border rounded-lg p-2"
                      rows="4"
                    />

                    <div className="flex gap-3">

<button
onClick={async () => {

const key = `email_${selectedBooking.id}`
setActionLoading(key)

try {

await fetch(
`http://localhost:8000/api/booking-requests/${selectedBooking.id}/send-email`,
{
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ message: emailMessage })
}
)

alert("Email sent successfully")

setEmailMessage("")
setShowEmailBox(false)

} catch (err) {
alert("Failed to send email")
}

setActionLoading(null)

}}

className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
>

{actionLoading === `email_${selectedBooking.id}` ? (
<>
<span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
Sending...
</>
) : (
"Send Email"
)}

</button>

<button
onClick={() => setShowEmailBox(false)}
className="border px-4 py-2 rounded-lg hover:bg-gray-100"
>
Cancel
</button>

</div>


                  </div>

                )}

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
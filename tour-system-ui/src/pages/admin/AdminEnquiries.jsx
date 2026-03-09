import { useState } from "react"

/* ---------------- MOCK ENQUIRIES ---------------- */
const initialEnquiries = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+91-9876543210",
    message: "Interested in Coorg tour with family of 4.",
    date: "2025-01-04",
    read: false
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah@example.com",
    phone: "+91-9988776655",
    message: "Can you customize Kerala tour for honeymoon?",
    date: "2025-01-03",
    read: false
  }
]

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState(initialEnquiries)
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState("")
  const [showConvert, setShowConvert] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  /* Convert modal fields */
  const [packageName, setPackageName] = useState("")
  const [travelDate, setTravelDate] = useState("")

  /* ---------------- FILTER ---------------- */
  const filtered = enquiries.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.email.toLowerCase().includes(search.toLowerCase()) ||
    e.message.toLowerCase().includes(search.toLowerCase())
  )

  /* ---------------- ACTIONS ---------------- */
  const markAsRead = () => {
    setEnquiries(prev =>
      prev.map(e =>
        e.id === selected.id ? { ...e, read: true } : e
      )
    )
    setSelected(prev => ({ ...prev, read: true }))
  }

  const deleteEnquiry = () => {
    setEnquiries(prev => prev.filter(e => e.id !== selected.id))
    setSelected(null)
    setShowDelete(false)
  }

  const createBooking = () => {
    if (!packageName || !travelDate) {
      alert("Fill all fields")
      return
    }

    alert(
      `Booking Created:\n${selected.name}\n${packageName}\n${travelDate}`
    )

    setEnquiries(prev => prev.filter(e => e.id !== selected.id))
    setSelected(null)
    setShowConvert(false)
    setPackageName("")
    setTravelDate("")
  }

  return (
    <div className="space-y-8">

      {/* PAGE TITLE */}
      <div>
        <h1 className="text-3xl font-extrabold">Enquiry Management</h1>
        <p className="text-gray-500">
          View and respond to customer enquiries
        </p>
      </div>

      {/* SPLIT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT: ENQUIRY LIST */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">
              Enquiries ({filtered.length})
            </h2>
            <input
              placeholder="Search by name, email, or message..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border rounded-lg px-3 py-1 text-sm w-72"
            />
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-10">
              No enquiries found
            </p>
          ) : (
            filtered.map(e => (
              <div
                key={e.id}
                onClick={() => setSelected(e)}
                className={`p-4 rounded-xl border cursor-pointer transition
                  ${
                    selected?.id === e.id
                      ? "border-green-600 bg-green-50"
                      : "hover:bg-gray-50"
                  }
                `}
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">{e.name}</p>
                    <p className="text-sm text-gray-500">{e.email}</p>
                  </div>
                  <span className="text-sm text-gray-400">
                    {e.date}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mt-2">
                  {e.message}
                </p>

                {!e.read && (
                  <span className="text-xs text-blue-600 font-semibold">
                    ● New
                  </span>
                )}
              </div>
            ))
          )}
        </div>

        {/* RIGHT: DETAILS */}
        <div className="bg-white rounded-xl shadow p-6">
          {!selected ? (
            <div className="text-gray-400 text-center mt-24">
              Select an enquiry to view full details
            </div>
          ) : (
            <div className="space-y-4">

              <h2 className="text-xl font-bold">Details</h2>

              <Detail label="Name" value={selected.name} />
              <Detail label="Email" value={selected.email} />
              <Detail label="Phone" value={selected.phone} />
              <Detail label="Date Received" value={selected.date} />

              <div>
                <p className="text-xs text-gray-500">Message</p>
                <div className="bg-gray-100 rounded-lg p-3 mt-1 text-sm">
                  {selected.message}
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="space-y-3 pt-4">
                <button
                  onClick={() => alert("Reply feature (UI only)")}
                  className="w-full py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
                >
                  ✉ Send Reply
                </button>

                <button
                  onClick={markAsRead}
                  className="w-full py-2 border rounded-lg hover:bg-gray-50"
                >
                  ✔ Mark as Read
                </button>

                <button
                  onClick={() => setShowConvert(true)}
                  className="w-full py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50"
                >
                  ➜ Convert to Booking
                </button>

                <button
                  onClick={() => setShowDelete(true)}
                  className="w-full py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50"
                >
                  🗑 Delete
                </button>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* CONVERT MODAL */}
      {showConvert && (
        <Modal onClose={() => setShowConvert(false)}>
          <h2 className="text-xl font-bold mb-4">
            Convert Enquiry to Booking
          </h2>

          <div className="space-y-3 text-sm">
            <input disabled value={selected.name} className="w-full border px-3 py-2 rounded bg-gray-100" />
            <input disabled value={selected.email} className="w-full border px-3 py-2 rounded bg-gray-100" />

            <select
              value={packageName}
              onChange={e => setPackageName(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select package</option>
              <option>Coorg Family Tour</option>
              <option>Honeymoon Package</option>
              <option>Jeep Safari</option>
            </select>

            <input
              type="date"
              value={travelDate}
              onChange={e => setTravelDate(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button onClick={() => setShowConvert(false)} className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button onClick={createBooking} className="px-4 py-2 bg-green-600 text-white rounded">
              Create Booking
            </button>
          </div>
        </Modal>
      )}

      {/* DELETE MODAL */}
      {showDelete && (
        <Modal onClose={() => setShowDelete(false)}>
          <h2 className="text-lg font-bold mb-3">Delete Enquiry?</h2>
          <p className="text-sm text-gray-600">
            Are you sure you want to delete enquiry from <b>{selected.name}</b>?
            This action cannot be undone.
          </p>

          <div className="flex justify-end gap-3 mt-6">
            <button onClick={() => setShowDelete(false)} className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button onClick={deleteEnquiry} className="px-4 py-2 bg-red-600 text-white rounded">
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

/* ---------------- HELPERS ---------------- */

const Detail = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
)

const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
      {children}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400"
      >
        ✕
      </button>
    </div>
  </div>
)

export default AdminEnquiries

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"

const AdminAnalytics = () => {
  /* ---------------- ANALYTICS DATA (SIMULATED) ---------------- */

  const monthlyBookings = [
    { month: "Jan", bookings: 4 },
    { month: "Feb", bookings: 3 },
    { month: "Mar", bookings: 5 },
    { month: "Apr", bookings: 2 },
    { month: "May", bookings: 6 },
    { month: "Jun", bookings: 4 }
  ]

  const bookingStatus = [
    { name: "Approved", value: 6 },
    { name: "Pending", value: 3 },
    { name: "Rejected", value: 1 }
  ]

  const COLORS = ["#22c55e", "#facc15", "#ef4444"]

  return (
    <div className="space-y-10">

      {/* PAGE TITLE */}
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-gray-500 mt-1">
          Business insights and booking trends
        </p>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* MONTHLY BOOKINGS */}
        <div className="bg-white rounded-xl shadow p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">
            Monthly Bookings
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyBookings}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="bookings"
                fill="#22c55e"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* BOOKING STATUS */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Booking Status
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={bookingStatus}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
              >
                {bookingStatus.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="flex justify-center gap-4 mt-4 text-sm">
            <Legend label="Approved" color="bg-green-500" />
            <Legend label="Pending" color="bg-yellow-400" />
            <Legend label="Rejected" color="bg-red-500" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------- LEGEND ---------------- */

const Legend = ({ label, color }) => (
  <div className="flex items-center gap-2">
    <span className={`w-3 h-3 rounded-full ${color}`} />
    <span>{label}</span>
  </div>
)

export default AdminAnalytics

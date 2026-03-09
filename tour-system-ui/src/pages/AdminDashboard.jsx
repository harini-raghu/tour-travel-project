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

/* ---------------- MOCK DATA (OVERVIEW LEVEL) ---------------- */

// Bookings summary (used across dashboard)
const bookings = [
  { id: 1, date: "2025-02-15", status: "Pending" },
  { id: 2, date: "2025-02-20", status: "Approved" },
  { id: 3, date: "2025-02-16", status: "Pending" }
]

// Enquiries summary
const enquiries = [{ id: 1 }, { id: 2 }]

const AdminDashboard = () => {
  /* ---------------- KPI STATS ---------------- */
  const stats = {
    totalTours: 6,
    totalBookings: bookings.length,
    pendingBookings: bookings.filter(b => b.status === "Pending").length,
    totalEnquiries: enquiries.length
  }

  /* ---------------- DATE HELPERS ---------------- */
  const todayISO = new Date().toISOString().split("T")[0]

  const daysBetween = (dateStr) => {
    const target = new Date(dateStr)
    return Math.ceil((target - new Date()) / (1000 * 60 * 60 * 24))
  }

  /* ---------------- ACTION CENTER LOGIC ---------------- */
  const urgentBookings = bookings.filter(
    b => b.status === "Pending" && daysBetween(b.date) <= 3
  )

  const pendingApprovals = bookings.filter(
    b => b.status === "Pending"
  )

  const openEnquiries = enquiries.length

  /* ---------------- TODAY OVERVIEW ---------------- */
  const todayBookings = bookings.filter(b => b.date === todayISO)
  const todayPending = bookings.filter(
    b => b.date === todayISO && b.status === "Pending"
  )

  /* ---------------- RECENT ACTIVITY (OPTION A) ---------------- */
  const recentActivity = [...bookings]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)

  /* ---------------- CHART DATA ---------------- */
  const monthlyBookings = [
    { month: "Jan", bookings: 4 },
    { month: "Feb", bookings: 3 },
    { month: "Mar", bookings: 2 },
    { month: "Apr", bookings: 5 },
    { month: "May", bookings: 4 },
    { month: "Jun", bookings: 6 }
  ]

  const bookingStatus = [
    { name: "Approved", value: 1 },
    { name: "Pending", value: 2 },
    { name: "Rejected", value: 0 }
  ]

  const COLORS = ["#22c55e", "#facc15", "#ef4444"]

  return (
    <div className="space-y-12">

      {/* PAGE TITLE */}
      <div>
        <h1 className="text-4xl font-extrabold">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Welcome to your admin panel. Here's an overview of your business.
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <StatCard title="Total Tours" value={stats.totalTours} />
        <StatCard title="Total Bookings" value={stats.totalBookings} />
        <StatCard title="Pending Bookings" value={stats.pendingBookings} />
        <StatCard title="Total Enquiries" value={stats.totalEnquiries} />
      </div>

      {/* ACTION CENTER */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Action Center</h2>

        <ActionItem
          icon="🔥"
          title="Urgent Bookings"
          description="Travel date within next 3 days"
          count={urgentBookings.length}
          color="red"
        />

        <ActionItem
          icon="⏳"
          title="Pending Approvals"
          description="Bookings awaiting decision"
          count={pendingApprovals.length}
          color="yellow"
        />

        <ActionItem
          icon="💬"
          title="Customer Enquiries"
          description="Awaiting response"
          count={openEnquiries}
          color="blue"
        />
      </div>

      {/* TODAY OVERVIEW */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">Today Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TodayCard label="Bookings Today" value={todayBookings.length} icon="📅" />
          <TodayCard label="Pending Today" value={todayPending.length} icon="⏳" />
          <TodayCard label="New Enquiries" value={openEnquiries} icon="💬" />
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl shadow p-6 lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">
            Monthly Bookings Overview
          </h2>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyBookings}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#22c55e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">
            Booking Status
          </h2>

          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={bookingStatus}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
              >
                {bookingStatus.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
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

      {/* RECENT ACTIVITY */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-6">
          Recent Activity
        </h2>

        <table className="w-full text-sm">
          <thead className="border-b text-gray-500">
            <tr>
              <th className="pb-3 text-left">Booking ID</th>
              <th className="pb-3 text-left">Travel Date</th>
              <th className="pb-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentActivity.map(b => (
              <tr
  key={b.id}
  className={`border-b last:border-none ${
    b.status === "Pending" && daysBetween(b.date) <= 3
      ? "bg-red-50"
      : ""
  }`}
>

                <td className="py-4">#{b.id}</td>
                <td>{b.date}</td>
                <td>
                  <StatusBadge status={b.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

/* ---------------- REUSABLE COMPONENTS ---------------- */

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-2xl shadow p-6">
    <p className="text-gray-500 text-sm">{title}</p>
    <p className="text-4xl font-extrabold mt-2">{value}</p>
  </div>
)

const ActionItem = ({ icon, title, description, count, color }) => {
  const map = {
    red: "bg-red-100 text-red-700",
    yellow: "bg-yellow-100 text-yellow-700",
    blue: "bg-blue-100 text-blue-700"
  }

  return (
    <div className="flex justify-between items-center p-5 rounded-xl hover:bg-gray-50 mb-4">
      <div className="flex items-start gap-4">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <span className={`px-4 py-2 rounded-full font-bold ${map[color]}`}>
        {count}
      </span>
    </div>
  )
}

const TodayCard = ({ label, value, icon }) => (
  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
    <span className="text-2xl">{icon}</span>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
)

const StatusBadge = ({ status }) => {
  const map = {
    Pending: "bg-yellow-100 text-yellow-700",
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700"
  }

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${map[status]}`}>
      {status}
    </span>
  )
}

const Legend = ({ label, color }) => (
  <div className="flex items-center gap-2">
    <span className={`w-3 h-3 rounded-full ${color}`} />
    <span>{label}</span>
  </div>
)

export default AdminDashboard
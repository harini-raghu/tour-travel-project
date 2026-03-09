import { NavLink, Outlet, useNavigate } from "react-router-dom"

const AdminLayout = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn")
    navigate("/admin/login")
  }

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-gray-200 flex flex-col">
        <div className="px-6 py-5 text-2xl font-bold text-white border-b border-slate-700">
          Admin Panel
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 text-sm">
          <SidebarLink to="/admin/dashboard" label="Dashboard" />
          <SidebarLink to="/admin/bookings" label="Bookings" />
          <SidebarLink to="/admin/enquiries" label="Enquiries" />
          <SidebarLink to="/admin/tours" label="Tours" />
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            Admin Dashboard
          </h1>
          <span className="text-sm text-gray-500">
            Logged in as Admin
          </span>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 px-12 py-10 overflow-y-auto text-[16px]">
          <Outlet />
        </main>

      </div>
    </div>
  )
}

/* Sidebar link component */
const SidebarLink = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) => (
      `block px-4 py-2 rounded-lg transition ${
        isActive
          ? "bg-green-600 text-white"
          : "hover:bg-slate-800"
      }`
    )}
  >
    {label}
  </NavLink>
)

export default AdminLayout

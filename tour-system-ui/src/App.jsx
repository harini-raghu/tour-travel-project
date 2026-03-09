import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import PublicLayout from "./layouts/PublicLayout"
import AdminLayout from "./layouts/AdminLayout"

import Home from "./pages/Home"
import JeepSafari from "./pages/JeepSafari"
import Packages from "./pages/Packages"
import PackageDetails from "./pages/PackageDetails"
import HomeStay from "./pages/HomeStay"
import Gallery from "./pages/Gallery"
import Contact from "./pages/Contact"

import AdminLogin from "./pages/AdminLogin"
import AdminDashboard from "./pages/AdminDashboard"
import ProtectedAdminRoute from "./components/ProtectedAdminRoute"
import AdminBookings from "./pages/admin/AdminBookings"
import AdminEnquiries from "./pages/admin/AdminEnquiries"
import AdminAnalytics from "./pages/admin/AdminAnalytics"
import AdminEditTour from "./pages/admin/AdminEditTour"
import AdminAddTour from "./pages/admin/AdminAddTour"
import AdminTours from "./pages/admin/AdminTours"


function App() {
  return (
    <Router>
      <Routes>

        {/* ================= PUBLIC WEBSITE ================= */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/jeep-safari" element={<JeepSafari />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/:id" element={<PackageDetails />} />
          <Route path="/home-stay" element={<HomeStay />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* ================= ADMIN LOGIN ================= */}
        <Route path="/admin/login" element={<AdminLogin />} />

  {/* ================= ADMIN PANEL ================= */}
  <Route
    path="/admin"
    element={
      <ProtectedAdminRoute>
        <AdminLayout />
      </ProtectedAdminRoute>
    }
  >
    <Route path="dashboard" element={<AdminDashboard />} />
    <Route path="bookings" element={<AdminBookings />} />
    <Route path="enquiries" element={<AdminEnquiries />} />
    <Route path="analytics" element={<AdminAnalytics />} />
    <Route path="tours/:id/edit" element={<AdminEditTour />} />
    <Route path="tours/add" element={<AdminAddTour />} />
    <Route path="tours" element={<AdminTours />} />

  </Route>

      </Routes>
    </Router>
  )
}

export default App

import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import FloatingContact from "../components/FloatingContact"

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <FloatingContact />
      <Outlet />
      <Footer />
    </>
  )
}

export default PublicLayout

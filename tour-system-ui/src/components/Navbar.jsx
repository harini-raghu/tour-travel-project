import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200 z-50">
  <div className="w-full px-6">   {/* FIXED HERE */}
    <div className="flex justify-between items-center h-20 w-full">
      
      {/* LOGO LEFT */}
      <div className="flex items-center space-x-3 min-w-[200px]">
        <img
          src={logo}
          className="w-16 h-16 object-contain"
          alt="logo"
        />
        <span className="font-semibold text-gray-800 text-lg">
          Shree Tours & Travels
        </span>
      </div>

      {/* MENU ITEMS */}
      <ul className="hidden md:flex space-x-10 font-medium text-gray-700">
  <li>
    <Link to="/" className="hover:text-blue-600">
      Home
    </Link>
  </li>
  <li>
    <Link to="/jeep-safari" className="hover:text-blue-600">
      Jeep Safari
    </Link>
  </li>
  <li>
    <Link to="/packages" className="hover:text-blue-600">
      Packages
    </Link>
  </li>
  <li>
    <Link to="/home-stay" className="hover:text-blue-600">
      Home Stay
    </Link>
  </li>
  <li>
    <Link to="/gallery" className="hover:text-blue-600">
      Gallery
    </Link>
  </li>
  <li>
    <Link to="/contact" className="hover:text-blue-600">
      Contact
    </Link>
  </li>
</ul>


      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden text-3xl text-gray-900"
      >
        <HiMenu />
      </button>
    </div>
  </div>
</nav>
    </>
  );
};

export default Navbar;

import React, { useRef, useEffect } from 'react';
import Nav from '../public/nav';
import { Outlet, useLocation } from "react-router-dom";
import Footer from './footer';

const Home = () => {
  const aboutRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#about" && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* Nội dung chính (chiếm hết khoảng trống) */}
      <div className="flex-1 mt-[60px]">
        <Outlet />
      </div>

      {/* Footer cố định dưới */}
      <Footer />
    </div>
  );
};

export default Home;

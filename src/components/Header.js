import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Create a CSS file for styling

const Header = () => {
  return (
    <header className="main-header">
      <div className="logo">
        <img src="/images/image 1.jpg" alt="SR Constructions Logo" className="logo-img" />
      </div>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
        <a href="#services">Services</a>
        <a href="#catalog">Catalog</a>
        <a href="#careers">Careers</a>
        <a href="#contact">Contact</a>
        <Link to="/login">Login</Link>
        <a href="https://wa.me/yournumber" className="whatsapp-btn">WhatsApp</a>
      </nav>
    </header>
  );
};

export default Header;

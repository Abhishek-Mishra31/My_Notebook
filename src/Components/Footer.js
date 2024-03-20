import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="links">
        <a href="/">Home</a>
        <a href="/About">About</a>
        <a href="/Contact">Contact</a>
        <p>&copy;2023 Company ,India</p>
      </div>
    </div>
  );
};

export default Footer;

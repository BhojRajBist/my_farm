import React from 'react';
import './Footer.css'; // You can create a separate CSS file for the footer styles


function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-logo-container">
        {/* <img src={logo} alt="Logo" className="footer-logo" /> */}
      </div>
      <div className="footer-text">
        {/* Add any additional footer text or information here */}
        &copy; {new Date().getFullYear()} My Farm. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

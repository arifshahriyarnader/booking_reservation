import React from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./contact.css";

const Contact = () => {
  return (
    <>
      <div>
        <Navbar />
        <Header />
        <div className="contact-container">
          <h2>Contact Us</h2>
          <div className="contact-info">
            <div className="phone">
              <h3>Phone</h3>
              <p>123-456-7890</p>
            </div>
            <div className="email">
              <h3>Email</h3>
              <p>info@example.com</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Contact;

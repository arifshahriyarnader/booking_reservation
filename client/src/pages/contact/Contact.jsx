import React, { useState, useRef } from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import emailjs from "@emailjs/browser";
import "./contact.css";

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  //input field change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  //handlesubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    emailjs
      .sendForm(
        "service_5qq5pdp",
        "template_xk9w4yc",
        form.current,
        "Yy1hi1lvL5_cogJX3"
      )
      .then(
        (result) => {
          console.log(result.text);
          e.target.reset();
          console.log("Message Sent");
        },
        (error) => {
          console.log(error.text);
        }
      );

    setIsSubmitted(true);
  };
  return (
    <>
      <div>
        <Navbar />
        <Header />
        <div className="contact-container">
          <h2>Contact Us</h2>
          <div className="contact-info">
           <p>If you have any queries about booking reservation, 
            please fill up the contact form,
            our team will contact with you
           </p>
            
          </div>
          {!isSubmitted ? (
            <form ref={form} className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button type="submit">Send</button>
            </form>
          ) : (
            <p>Your message has been sent successfully</p>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Contact;

import React from "react";
import "./flights.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";

const Flights = () => {
  return (
    <>
      <Navbar />
      <Header />
      <section className="flights-coming-soon">
        <h2>Coming Soon</h2>
        <p>
          We're working on adding more flight features. Check back soon for
          updates!
        </p>
      </section>
      <MailList />
      <Footer />
    </>
  );
};

export default Flights;

import React from "react";
import "./carrentals.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";

const CarRentals = () => {
  return (
    <>
      <Navbar />
      <Header />
      <section className="car-coming-soon">
        <h2>Coming Soon</h2>
        <p>
          We're working on adding more car rentals features. Check back soon for
          updates!
        </p>
      </section>
      <MailList />
      <Footer />
    </>
  );
};

export default CarRentals;

import React from "react";
import "./airporttaxis.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";

const AirportTaxis = () => {
  return (
    <>
      <Navbar />
      <Header />
      <section className="airport-taxis">
        <h2>Coming Soon</h2>
        <p>
          We're working on adding more airport taxis features. Check back soon
          for updates!
        </p>
      </section>
      <MailList />
      <Footer />
    </>
  );
};

export default AirportTaxis;

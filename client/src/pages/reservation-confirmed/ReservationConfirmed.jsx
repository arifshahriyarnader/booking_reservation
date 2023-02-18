import React, { useContext } from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";

const ReservationConfirmed = () => {
  const { user } = useContext(AuthContext);
  function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  const cus_name = getParameterByName("cus_name");
  const tran_id = getParameterByName("tran_id");
  const amount = getParameterByName("amount");
  const payment_option = getParameterByName("payment_option");
  const reservation_no = getParameterByName("reservation_no");
  
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="container">
        <div className="mt-5" style={{ border: "2px solid" }}>
          <h4 className="text-center mt-3">
            <strong>
              {" "}
              Payment successful and reservation confirmed please check your
              email 
            </strong> <span className="text-success">({user.email})</span> 
          </h4>
          <div className="p-5">
            
            <table className="table text-danger">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Reservation No</th>
                  <th scope="col">Paid Amount</th>
                  <th scope="col">transaction Id</th>
                  <th scope="col">Payment Option</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">{cus_name}</th>
                  <td>{user.email}</td>
                  <td>{reservation_no}</td>
                  <td>{amount}</td>
                  <td>{tran_id}</td>
                  <td>{payment_option}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationConfirmed;

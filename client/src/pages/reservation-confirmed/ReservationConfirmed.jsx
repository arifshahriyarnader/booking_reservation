import React, { useContext } from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";

const ReservationConfirmed = () => {
  const { user } = useContext(AuthContext);
  function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
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
  console.log(
    "email: " + user.email,
    "cus_name: " + cus_name,
    "tran_id: #" + tran_id,
    "amount: " + amount,
    "payment_option " + payment_option
  );
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="container">
        <div className="mt-5" style={{ border: "2px solid" }}>
          <h2 className="text-center mt-3">
            Payment Successful and Reservation Confirmed
          </h2>
          <div className="p-5 ">
            {/* <div className="">
              <div className="d-flex align-items-center justify-content-center">
                <div className="mx-3">
                  <h5 className="text-center">Name:</h5>
                </div>
                <div className="">
                  <h6 className="">{cus_name}</h6>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <div className="mx-3">
                  <h5 className="">Email:</h5>
                </div>
                <div className="">
                  <h6 className="">{user.email}</h6>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <div className="mx-3">
                  <h5 className="">Reservation No:</h5>
                </div>
                <div className="">
                  <h6 className="">{reservation_no}</h6>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <div className="mx-3">
                  <h5 className="">Paid Amount:</h5>
                </div>
                <div className="">
                  <h6 className="">{amount}</h6>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <div className="mx-3">
                  <h5 className="">Payment Option:</h5>
                </div>
                <div className="">
                  <h6 className="">{payment_option}</h6>
                </div>
              </div>
            </div> */}
            <table class="table">
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
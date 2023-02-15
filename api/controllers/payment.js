import Payment from "../models/Payment.js";
import axios from "axios";
//require("colors");
import { v4 as uuid } from "uuid";

export const createReservation = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    destination,
    contact,
    totalBill,
    adult,
    children,
    room,
    nights,
    dates,
    billingAddress,
    hotelData,
  } = req.body;

  const newBookingWithPayment = new Payment({
    firstName,
    lastName,
    email,
    destination,
    contact,
    totalBill,
    adult,
    children,
    room,
    nights,
    dates,
    billingAddress,
    hotelData,
  });
  try {
    const savedBookingWithPayment = await newBookingWithPayment.save();

    const formData = {
      cus_name: `${firstName} ${lastName}`,
      cus_email: email,
      cus_phone: contact,
      amount: totalBill,
      tran_id: uuid(),
      signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
      store_id: "aamarpaytest",
      currency: "BDT",
      desc: { ...hotelData, destination, adult, children, room, nights, dates },
      cus_add1: billingAddress,
      cus_add2: "",
      cus_city: "Dhaka",
      cus_country: "Bangladesh",
      success_url: "http://localhost:5000/api/payments/callback",
      fail_url: "http://localhost:5000/api/payments/callback",
      cancel_url: "http://localhost:5000/api/payments/callback",
      type: "json", //This is must required for JSON request
    };
    const { data } = await axios.post(
      "https://sandbox.aamarpay.com/jsonpost.php",
      formData
    );
    if (data.result !== "true") {
      let errorMessage = "";
      for (let key in data) {
        errorMessage += data[key] + ". ";
      }
      return res.render("error", {
        title: "Error",
        errorMessage,
      });
    }
    console.log(data);

    res.status(200).send({data:data.payment_url, savedData:savedBookingWithPayment});
    console.log(req.body);
  } catch (error) {
    next(error);
  }
};

export const callBack = async (req, res, next) => {
  // Callback data
  // console.log(req.body);
  const {
    pay_status,
    cus_name,
    cus_phone,
    cus_email,
    currency,
    pay_time,
    amount,
  } = req.body;
  res.render("callback", {
    title: "Payment Status",
    pay_status,
    cus_name,
    cus_phone,
    cus_email,
    currency,
    pay_time,
    amount,
  });

  console.log(req.body);

  res.status(200).send();
};

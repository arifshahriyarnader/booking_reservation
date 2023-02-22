import Payment from "../models/Payment.js";
import axios from "axios";
//require("colors");
import { v4 as uuid } from "uuid";
import nodemailer from "nodemailer";

export const createReservation = async (req, res, next) => {
  const {
    firstName,
    lastName,
    rooms,
    roomData,
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
    reservationNo,
  } = req.body;

  //  console.log(req.body)

  const newBookingWithPayment = new Payment({
    firstName,
    lastName,
    rooms,
    roomData,
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
    reservationNo,
  });
  try {
    const savedBookingWithPayment = await newBookingWithPayment.save();

    const formData = {
      cus_name: `${firstName} ${lastName}`,
      cus_email: email,
      cus_phone: contact,
      amount: totalBill,
      opt_a: reservationNo,
      tran_id: uuid(),
      signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
      store_id: "aamarpaytest",
      currency: "BDT",
      desc: {
        ...hotelData,
        destination,
        adult,
        children,
        room,
        nights,
        dates,
        rooms,
      },
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
    //  console.log(savedBookingWithPayment, "saved");

    res
      .status(200)
      .send({ data: data.payment_url, savedData: savedBookingWithPayment });
    // console.log(data, "data");
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
    opt_a,
    card_number,
    card_holder,
    pg_txnid,
    epw_txnid,
    ip_address,
    bank_txn,
    card_type,
    mer_txnid,
    store_id,
    merchant_id,
  } = req.body;

  // res.render("callback", {
  //   title: "Payment Status",
  //   pay_status,
  //   cus_name,
  //   cus_phone,
  //   cus_email,
  //   currency,
  //   pay_time,
  //   amount,
  //   opt_a,
  // });

  try {
    const response = await Payment.updateOne(
      { reservationNo: opt_a },
      {
        paymentData: {
          pay_status,
          cus_name,
          cus_phone,
          cus_email,
          currency,
          pay_time,
          amount,
          reservationNo: opt_a,
          card_number,
          card_holder,
          pg_txnid,
          epw_txnid,
          ip_address,
          bank_txn,
          card_type,
          mer_txnid,
          store_id,
          merchant_id,
        },
      }
    );

    if (response.acknowledged && pay_status === "Successful") {
      // create reusable transporter object using the default SMTP transport

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "alnasimul.dev@gmail.com",
          pass: process.env.HOST_EMAIL_PASS,
        },
      });

      //console.log(process.env.HOST_EMAIL_PASS);

      // mail options

      let mailOptions = {
        from: `SHOHOZ BOOKING <alnasimul.dev@gmail.com>`, // sender address
        to: cus_email, // list of receivers
        subject: "Reservation Cofirmation #" + opt_a, // Subject line
        text: "Hello World", // plain text body
        html: `
        <h3>Message</h3>
        <p><strong> Thanks for your reservation from shohoz booking. </strong> &#128071;</p>
        <br>
              <h3>Client Details</h3>
                <p><strong>Name:</strong> ${cus_name} </p>
                <p><strong>Contact No:</strong> ${cus_phone} </p>
                <p><strong>Email:</strong> ${cus_email} </p>
                <p><strong>Reservation No:</strong> #${opt_a}</p>
                <p><strong>Paid Amount:</strong> ${amount}</p>
                <p><strong>Transaction Id:</strong> ${bank_txn}</p>
                <p><strong>Payment Method:</strong> ${card_type}</p>
            `, // html body
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      });

      // redirect to ui

      let baseUrl = "http://localhost:3000";
      let url = "/reservation-confirmed";
      let queryParams = `?cus_name=${cus_name}&tran_id=${bank_txn}&amount=${amount}&payment_option=${card_type}&reservation_no=${opt_a}`;

      res.redirect(301, `${baseUrl}${url}/payment_success${queryParams}`);
    }
  } catch (error) {}

  // console.log(req.body);

  // res.status(200).send();
};

export const getReservations = async (req, res, next) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (err) {
    next(err);
  }
};

export const updateReservationData = async (req, res, next) => {
  const id = req.params.id;

  console.log({ id, ...req.body });
  try {
    const updatedData = await Payment.updateOne(
      { _id: id },
      { $set: req.body }
    ).catch((error) => {
      console.log(error);
    });
    res.status(200).json(updatedData);
  } catch (error) {}
};

export const getDataByContact = async (req, res, next) => {
  const search = req.params.search;
  const regex = new RegExp(search, "i");
  console.log({search, regex})
  try {
    const results = await Payment.find({ contact: { $regex: regex } });
    res.status(200).json(results)
  } catch (error) {}
};

export const deleteById = async (req, res, next) => {
  const id = req.params.id;

  console.log(id)

  try {
    const results = await Payment.deleteOne({_id: id});
    res.status(200).json(results)
    console.log(results)
  } catch (error) {}
};

export const getUserReservations = async(req, res, next) => {
  const email = req.params.email;

  try {
    const results = await Payment.find({email})
    res.status(200).json(results)
  } catch (error) {
    
  }
}

import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    hotelData: {
      type: Object,
      required: true,
    },
    totalBill: {
      type: Number,
      required: true,
    },
    billingAddress: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    adult: {
      type: Number,
      required: true,
    },
    children: {
      type: Number,
      required: true,
    },
    room: {
      type: Number,
      required: true,
    },
    rooms:{
      type: [String],
      required: true
    },
    roomData:{
      type:[Object],
      required:true
    },
    dates: {
      type: Object,
      required: true,
    },
    nights: {
      type: Number,
      required: true,
    },
    paymentData: {
      type: Object,
      required: false,
    },
    reservationNo: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);



export default mongoose.model("Payment", PaymentSchema);

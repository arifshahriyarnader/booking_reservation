import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    roomType:{
      type:String,
      required:true
    },
    price: {
      type: Number,
      required: true,
    },
    photos: {
      type: [String],
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },

    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] }, price: {type: Number, required:true}  }],
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);

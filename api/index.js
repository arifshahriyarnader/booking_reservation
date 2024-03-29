import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRoute from './routes/auth.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import usersRoute from './routes/users.js';
import paymentsRoute from './routes/payments.js';

const app=express();
dotenv.config();

const connect =async ()  =>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("MongoDB is Connected")
      } catch (error) {
        throw error;
      }
}

mongoose.connection.on("disconnected", () =>{
    console.log("mongoDB disconnected")
})

const PORT= process.env.PORT || 5000;

//middlewares
app.use(cookieParser());
app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth",authRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);
app.use("/api/users",usersRoute);
app.use("/api/payments",paymentsRoute)
app.set("view engine", "ejs");

app.use((err, req,res,next) =>{
  const errorStatus= err.status || 500
  const errorMessage= err.message || "Something went wrong"
  return res.status(errorStatus).json({
    success:false,
    status:errorStatus,
    message:errorMessage,
    stack:err.stack,
  })
})
//Routes go here
// app.all('*', (req,res) => {
//   res.json({"every thing":"is awesome"})
// })

// Serve static files from the React app


app.listen(PORT,() =>{
    connect()
    console.log("Connected to backend.!");
})
import express from "express";
import { createReservation } from "../controllers/payment.js";

const router=express.Router();

router.post("/payment", createReservation)

export default router;
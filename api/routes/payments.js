import express from "express";
import { callBack, createReservation } from "../controllers/payment.js";

const router=express.Router();

router.post("/payment", createReservation)
router.post("/callback", callBack);

export default router;
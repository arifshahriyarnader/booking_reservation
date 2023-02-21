import express from "express";
import { callBack, createReservation, getDataByContact, getReservations, updateReservationData } from "../controllers/payment.js";

const router=express.Router();

router.get("/", getReservations);
router.post("/payment", createReservation)
router.post("/callback", callBack);
router.post("/update/:id", updateReservationData);
router.get("/getDataByContact/:search", getDataByContact)


export default router;
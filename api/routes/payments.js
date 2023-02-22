import express from "express";
import { callBack, createReservation, deleteById, getDataByContact, getReservations, getUserReservations, updateReservationData } from "../controllers/payment.js";

const router=express.Router();

router.get("/", getReservations);
router.post("/payment", createReservation)
router.post("/callback", callBack);
router.post("/update/:id", updateReservationData);
router.get("/:email", getUserReservations)
router.get("/getDataByContact/:search", getDataByContact)
router.delete("/deleteById/:id", deleteById)


export default router;
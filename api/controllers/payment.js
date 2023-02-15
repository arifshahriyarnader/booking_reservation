import Payment from "../models/Payment.js";

export const createReservation = async (req,res,next) => {
    try {
        console.log(req.body)
    } catch (error) {
        next(err)
    }
}
import express from 'express';
import { deleteUser, forgotPassword, getUser, getUsers, resetAfterPassword, resetPassword, searchUser, updateUser } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';
const router=express.Router();

router.get("/checkauthentication",verifyToken, (req,res,next) =>{
    res.send("Hello user, you are logged in");
})

router.get("/checkuser/:id",verifyUser, (req,res,next) =>{
    res.send("Hello user, you are logged in and you can delete your account");
})
router.get("/checkadmin/:id",verifyAdmin, (req,res,next) =>{
    res.send("Hello admin, you are logged in and you can delete all accounts");
})

//Update
router.put("/:id", verifyUser, updateUser);

//Delete
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);
router.get("/search/:search", verifyUser, searchUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);

//forgot password
router.post("/forgot-password",forgotPassword);

 //reset password
 router.get("/reset-password/:id/:token", resetPassword);
 router.post("/reset-password/:id/:token", resetAfterPassword)

export default router;
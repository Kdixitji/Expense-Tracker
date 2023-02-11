import { Router } from "express";
import express from "express";
import User from "../models/User.js"
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async (req, res) => {
   
   const { email, password, firstName, lastName } = req.body;
   const hashedPassword = await bcrypt.hash(password, 10);
   
   const userExists = await User.findOne({ email });

   if(userExists){
      res.status(406).json("User already exists, try with another mail");
      return
   }
      
   const user = new User(
      { 
         firstName, 
         password : hashedPassword, 
         lastName, 
         email, 
      }
   );

   await user.save();
   console.log(user);
   res.status(201).json({ "message" : "user is created"});
});

export default router;

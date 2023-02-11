import { Router } from "express";
import User from "../models/User.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/", async (req, res) => {
    const { email,password } = req.body;
    
    const user = await User.findOne({ email });
    if(!user){
       res.status(406).json({ message : "credentials not found"});
       return;
    }
 
    const matched =  await bcrypt.compare(password, user.password);
    if(!matched){
       res.status(406).json({ message : "Incorrect Password"});
       return;
    }
   
    const token = jwt.sign({}, 'some secrets.');
    res.json({ message : "successfully logged in", token });
 
 });

export default router;

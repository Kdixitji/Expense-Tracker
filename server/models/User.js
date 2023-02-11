import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
    {
        firstName : {type:String, required : ["Cannot be empty"]},
        lastName: {type:String, required : ["Cannot be empty"]},
        email: {type:String, required : ["Cannot be empty"]},
        password : {type:String, required : ["Cannot be empty"]},
    }, 
    {
        timestamp: true,
    }
);


export default new mongoose.model("User", userSchema);

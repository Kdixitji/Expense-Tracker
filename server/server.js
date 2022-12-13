import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const PORT = 4000
const app = express()

app.get(cors);

await mongoose.connect
    ("mongodb+srv://kdixitji:kdixitji@cluster0.k6rugek.mongodb.net/?retryWrites=true&w=majority",).
    then(() => console.log("connected to mongodb"));
app.get("/",(req,res) => {
    res.send("helloworld");
});

app.listen(PORT,() => {
    console.log("server is running on http://localhost:4000");
})
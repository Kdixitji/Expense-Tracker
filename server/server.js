import express from "express";
import connect from "./Database/mongodb.js";
import cors from "cors";
import bodyParser from "body-parser";
import TransactionAPI from "../server/routes/TransactionAPI.js";
import AuthAPI from "../server/routes/AuthAPI.js";
import LoginAPI from "../server/routes/LoginAPI.js"

const PORT = 4000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("helloworld");
});

app.use("/transaction", TransactionAPI);
app.use("/auth", AuthAPI);
app.use("/login", LoginAPI);

//connecting database
await connect();

app.listen(PORT,() => {
    console.log(`server is running on http://localhost:${PORT}`);
});
import { Router } from "express";
import Transaction from "../models/Transaction.js"

const router = Router();

router.get("/", 
async(req, res) => {
    const transaction = await Transaction.find({}).sort({createdAt : -1});
    res.json({data:transaction});
});

router.post("/transaction", async (req, res) => {
    const { amount,description,date } = req.body;
    const transaction = new Transaction ({
        amount,
        description,
        date,
    })
    await transaction.save();
    res.json({message : "success"});
});

router.patch("/:id", async (req, res) => {
    const id = req.params.id
    await Transaction.updateOne({_id:id}, {$set : req.body})
    res.json({
        message: "success"
    });
});
router.delete("/:id", async (req, res) => {
    await Transaction.deleteOne({_id : req.params.id })
    res.json({ 
        message : "success" 
    });
});


export default router;
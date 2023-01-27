import { mongoose } from "mongoose";

async function connect() {
    await mongoose.connect
        ("mongodb+srv://kdixitji:kdixitji@cluster0.k6rugek.mongodb.net/?retryWrites=true&w=majority",);
    console.log("connected to mongodb");

}

export default connect;
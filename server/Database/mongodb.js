import { mongoose } from "mongoose";

async function connect() {
    await mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log("connected to mongodb");
}

export default connect;

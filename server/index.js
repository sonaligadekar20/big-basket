import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
    if (conn) {
        console.log('MongoDB connected');
    }
    }catch(e){
        console.log(e.message)
    }
};
connectDB();

app.get("/", (req, res) => {
    res.send("bigBasket App");
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
dotenv.config();

const app = express();
app.use(express.json());

const MONGODB_URI = "";
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        if (conn) {
            console.log('MongoDB connected');
        }
    } catch (e) {
        console.log(e.message)
    }
};
connectDB();



// POST signup
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const user = new User({
        email: email,
        password: password
    });
    try {
        const savedUser = await user.save();

        res.json({
            success: true,
            data: savedUser,
            message: "Signup Successful"
        })
    }
    catch (e) {
        res.json({
            success: false,
            message: e.message
        })
    }
});

// Post login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            success: false,
            message: "Please provide email and password"
        })
    }

    const user = await User.findOne({
        email: email,
        password: password
    }).select("name email mobile")

    if (user) {
        return res.json({
            success: true,
            data: user,
            message: "Login successful"
        });
    } else {
        return res.json({
            success: false,
            message: "Invalid credentials"
        })
    }
});



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
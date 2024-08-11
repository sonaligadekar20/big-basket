import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Product from "./models/product.js";
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

//   Get products

// const products = [];
app.get('/products', async (req, res) => {
    const products = await Product.find();

    res.json({
        success: true,
        data: products,
        message: "Successfully featched all products."
    })
});

// Post product
app.post('/product', async (req, res) => {
    const { name, price, image, category, brand } = req.body;

    const product = new Product({
        name: name,
        price: price,
        image: image,
        category: category,
        brand: brand
    });
    try {
        const saveProduct = await product.save();
        res.json({
            success: true,
            data: saveProduct,
            message: "Successfully added new product"
        })
    }
    catch (e) {
        res.json({
            success: false,
            message: e.message
        })
    }
});

// Get product by id
app.get('/product/:id', async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id);
    res.json({
        success: true,
        data: product,
        message: "Get details of products."
    })
});

// Delete product by id
app.delete('/product/:id', async (req, res) => {
    const { id } = req.params;
    await Product.deleteOne({ _id: id });

    res.json({
        success: true,    
        message: `Successfully deleted product with id ${id}`,
    })
});

// Put product
app.put('/product/:id', async (req, res) => {
    const { id } = req.params;

    const { name, price, image, category, brand } = req.body;

    await Product.updateOne({ _id: id },
        {
            $set: {
                name: name,
                price: price,
                image: image,
                category: category,
                brand: brand
            }
        });

    const updatedProduct = await Product.findById(id);
    res.json({
        success: true,
        data: updatedProduct,
        message: "Product updated successfully."
    })
});

// GET /products/search?q=Sam
app.get("/products/search", async (req, res) => {
    const { q } = req.query;

    const products = await Product.find({ name: { $regex: q, $options: "i" } });

    res.json({
        success:true,
        data: products,
        message: "Products fetched successfully"
    });
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
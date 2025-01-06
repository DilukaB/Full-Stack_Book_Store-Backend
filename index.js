const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors({
    origin: ['http://localhost:5173'], // Allow requests from your frontend
    credentials: true,
}));

// Routes
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require("./src/orders/order.route")
const userRoutes = require("./src/users/user.route")
const adminRoutes = require("./src/stats/admin.stats")

app.use("/api/books", bookRoutes); // Mount book routes
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)


app.get('/', (req, res) => {
    res.send("Bookstore Server is running");
});

// MongoDB connection and server setup
async function main() {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
}

main();

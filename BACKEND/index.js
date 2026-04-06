const express = require("express");
const dotenv = require("dotenv"); // 1. Import the library first
const cors = require("cors");
const connectDB = require("./db");

// 2. Now initialize config after the library is imported
dotenv.config();

const app = express();

// middleware
app.use(cors()); 
app.use(express.json());

// connect database
connectDB();

// routes
app.use("/api/users", require("./routes/userRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
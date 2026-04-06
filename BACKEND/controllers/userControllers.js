const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const formatUser = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    savedWork: user.savedWork
});

// SIGNUP
const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });

        if (!process.env.JWT_SECRET) return res.status(500).json({ message: "JWT Secret is not defined in .env" });

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: formatUser(newUser)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// LOGIN
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        if (!process.env.JWT_SECRET) return res.status(500).json({ message: "JWT Secret is not defined in .env" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

        res.status(200).json({ token, user: formatUser(user) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// SAVE NEW CANVAS
const saveCanvasData = async (req, res) => {
    try {
        const { userId, canvasData, title } = req.body;

        // ✅ SECURITY: ensure logged-in user can only save to their own account
        if (req.userId !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            { $push: { savedWork: { dataUrl: canvasData, title: title || `Sketch ${new Date().toLocaleDateString()}` } } }, 
            { new: true }
        );
        res.status(200).json({ message: "Added!", user: formatUser(updatedUser) });
    } catch (error) { 
        res.status(500).json({ message: error.message }); 
    }
};

// UPDATE EXISTING CANVAS
const updateCanvasData = async (req, res) => {
    try {
        const { userId, workId, canvasData } = req.body;

        // ✅ SECURITY: ensure logged-in user can only update their own canvas
        if (req.userId !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: userId, "savedWork._id": workId },
            { $set: { "savedWork.$.dataUrl": canvasData } },
            { new: true }
        );

        if (!updatedUser) return res.status(404).json({ message: "Project not found" });
        res.status(200).json({ message: "Updated successfully!", user: formatUser(updatedUser) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE WORK
const deleteWork = async (req, res) => {
    try {
        const { userId, workId } = req.body;

        // ✅ SECURITY: ensure logged-in user can only delete their own work
        if (req.userId !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            { $pull: { savedWork: { _id: workId } } },
            { new: true } 
        );
        res.status(200).json({ message: "Deleted", user: formatUser(updatedUser) });
    } catch (error) { 
        res.status(500).json({ message: error.message }); 
    }
};

// RENAME WORK
const renameWork = async (req, res) => {
    try {
        const { userId, workId, newTitle } = req.body;

        // ✅ SECURITY: ensure logged-in user can only rename their own work
        if (req.userId !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: userId, "savedWork._id": workId },
            { $set: { "savedWork.$.title": newTitle } },
            { new: true }
        );
        res.status(200).json({ message: "Renamed", user: formatUser(updatedUser) });
    } catch (error) { 
        res.status(500).json({ message: error.message }); 
    }
};

module.exports = { 
    signupUser, 
    loginUser, 
    saveCanvasData, 
    updateCanvasData, 
    deleteWork, 
    renameWork 
};
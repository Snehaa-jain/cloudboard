const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    // Change this line
    savedWork: [{
        title: { type: String, default: "Untitled Drawing" },
        dataUrl: { type: String }, // The Base64 image string
        createdAt: { type: Date, default: Date.now }
    }]
}, {
    timestamps: true,
    collection: 'users'
});

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 200
    },
    // This stores the array of drawing elements
    content: {
      type: Array, 
      default: []
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true,
    collection: "whiteboard_projects"
  }
);

module.exports = mongoose.model("Posts", postsSchema);
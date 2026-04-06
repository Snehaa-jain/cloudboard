exports.updatePost = async (req, res) => {
  try {
    const { elements } = req.body; 
    // Simplified update logic
    const post = await Posts.findByIdAndUpdate(
      req.params.id, 
      { content: elements }, 
      { new: true, upsert: true } // upsert ensures it exists
    );
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
};
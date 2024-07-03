const mongoose = require("mongoose");

// Defining the Blog schema using Mongoose
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
});

// Define toJSON method to customize JSON representation
blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString(); // Assign _id to id property
    delete returnedObject._id; // Remove _id property
    delete returnedObject.__v; // Remove __v property
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;

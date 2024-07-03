const express = require("express");
const Blog = require("../models/blog");
const logger = require("../utils/logger");

// Creating a router instance
const blogsRouter = express.Router();

// GET route to fetch all blogs
blogsRouter.get("/", async (request, response) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

// POST route to create a new blog
blogsRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
    });

    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

// DELETE route to delete a new blog
blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

// PUT route to update a new blog
blogsRouter.put("/id:", async (request, response, next) => {
  try {
    const body = request.body;
    const blog = {
      likes: body.likes,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;

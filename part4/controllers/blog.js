const express = require("express");
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");
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
blogsRouter.post("/", (request, response, next) => {
  const blog = new Blog(request.body);
  logger.info(blog);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;

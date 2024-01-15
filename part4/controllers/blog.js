const express = require("express");
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");
const logger = require("../utils/logger");

const blogsRouter = express.Router();

blogsRouter.get("/", (request, response) => {
  blogsRouter.get("/", (request, response) => {
    Blog.find({}).then((blogs) => {
      response.json(blogs);
    });
  });
});

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

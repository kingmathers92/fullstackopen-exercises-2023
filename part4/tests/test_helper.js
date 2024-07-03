const Blog = require("../models/Blog");

const initialBlogs = [
  {
    title: "Blog 1",
    author: "Author 1",
    url: "http://example.com/blog1",
    likes: 10,
  },
  {
    title: "Blog 2",
    author: "Author 2",
    url: "http://example.com/blog2",
    likes: 15,
  },
];

const initializeTestDatabase = async () => {
  await Blog.deleteMany({});
  for (const blog of initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
};

module.exports = {
  initialBlogs,
  initializeTestDatabase,
};

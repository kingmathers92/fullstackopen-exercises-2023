// Helper functions for list manipulation
const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const maxLikesBlog = blogs.reduce(
    (max, blog) => (blog.likes > max.likes ? blog : max),
    blogs[0]
  );

  return {
    title: maxLikesBlog.title,
    author: maxLikesBlog.author,
    likes: maxLikesBlog.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const authorWithMostBlogs = _.chain(blogs)
    .groupBy("author")
    .map((blogs, author) => ({ author, blogs: blogs.length }))
    .maxBy("blogs")
    .value();

  return authorWithMostBlogs;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const likesByAuthor = blogs.reduce((likesMap, blog) => {
    likesMap[blog.author] = (likesMap[blog.author] || 0) + blog.likes;
    return likesMap;
  }, {});

  const topAuthor = Object.entries(likesByAuthor).reduce(
    (max, [author, likes]) => (likes > max.likes ? { author, likes } : max),
    { author: "", likes: 0 }
  );

  return {
    author: topAuthor.author,
    likes: topAuthor.likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};

const listHelper = require("../utils/list_helper");

describe("dummy", () => {
  test("return one", () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
});

describe("favorite blog", () => {
  const blogs = [
    { title: "Blog 1", author: "Author 1", likes: 10 },
    { title: "Blog 2", author: "Author 2", likes: 15 },
    { title: "Blog 3", author: "Author 3", likes: 5 },
  ];

  test("finds the blog with the most likes", () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({ title: "Blog 2", author: "Author 2", likes: 15 });
  });

  test("returns null for an empty list", () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toBeNull();
  });
});

describe("most blogs", () => {
  const blogs = [
    { author: "Author 1" },
    { author: "Author 1" },
    { author: "Author 2" },
    { author: "Author 3" },
  ];

  test("finds the author with the most blogs using lodash", () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({ author: "Author 1", blogs: 2 });
  });

  test("returns null for an empty list", () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toBeNull();
  });
});

describe("most likes", () => {
  const blogs = [
    { author: "Author 1", likes: 10 },
    { author: "Author 2", likes: 15 },
    { author: "Author 2", likes: 5 },
    { author: "Author 3", likes: 8 },
  ];

  test("finds the author with the most likes", () => {
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({ author: "Author 2", likes: 20 });
  });

  test("returns null for an empty list", () => {
    const result = listHelper.mostLikes([]);
    expect(result).toBeNull();
  });
});

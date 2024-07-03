const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const helper = require("./test_helper");

const api = supertest(app);

// Before running tests, set up a test database
beforeEach(async () => {
  await helper.initializeTestDatabase();
});

// After running tests, close the database connection
afterAll(async () => {
  await mongoose.connection.close();
});

// Test suite for blog list
describe("Blog list", () => {
  // Test to verify blogs are returned as JSON
  test("blogs are returned as JSON", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  // Test to verify the correct amount of blogs
  test("there are correct amount of blogs", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  // Test to verify the unique identifier property of blog posts is named id
  test("unique identifier property of blog posts is named id", async () => {
    const response = await api.get("/api/blogs");
    const blogs = response.body;
    blogs.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });

  // Test to verify a valid blog can be added
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "New Blog",
      author: "New Author",
      url: "http://example.com",
      likes: 0,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const titles = response.body.map((r) => r.title);
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(titles).toContain("New Blog");
  });

  // Test to verify blog without likes property defaults to 0
  test("blog without likes property defaults to 0", async () => {
    const newBlog = {
      title: "Blog without likes",
      author: "Author",
      url: "http://example.com",
    };

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(response.body.likes).toBe(0);
  });

  // Test to verify blog without title or url is not added
  test("blog without title or url is not added", async () => {
    const newBlog = {
      author: "Author",
      likes: 10,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  // Test to verify a blog can be deleted
  test("a blog can be deleted", async () => {
    const responseAtStart = await api.get("/api/blogs");
    const blogToDelete = responseAtStart.body[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const responseAtEnd = await api.get("/api/blogs");
    expect(responseAtEnd.body).toHaveLength(helper.initialBlogs.length - 1);

    const titles = responseAtEnd.body.map((r) => r.title);
    expect(titles).not.toContain(blogToDelete.title);
  });

  // Test to verify a blog's likes can be updated
  test("a blog's likes can be updated", async () => {
    const responseAtStart = await api.get("/api/blogs");
    const blogToUpdate = responseAtStart.body[0];

    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.likes).toBe(blogToUpdate.likes + 1);
  });
});

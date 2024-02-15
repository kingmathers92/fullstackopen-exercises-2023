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

// Test to verify correct amount of blog posts in JSON format
describe("Blog list", () => {
  test("blogs are returned as JSON", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are correct amount of blogs", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
});

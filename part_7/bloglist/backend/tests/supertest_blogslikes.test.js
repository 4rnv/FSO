const { test, after } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const { assert } = require("console");

const { strictEqual } = require("assert");

const api = supertest(app);

test("POST request to /api/blogs without likes", async () => {
  const newBlog = {
    title: "Test Blog without likes",
    author: "Oriko Mikuni",
    url: "http://ori.ko",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  strictEqual(response.body.likes, 0, "Likes defaulted to 0");
});

after(async () => {
  await mongoose.connection.close();
});

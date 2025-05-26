const { test, after } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const { assert } = require("console");

const { strictEqual } = require("assert");

const api = supertest(app);

test("POST request to /api/blogs without title", async () => {
  const newBlog = {
    author: "Oriko Mikuni",
    url: "http://testblogwithout.title",
    likes: 19,
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

test("POST request to /api/blogs without url", async () => {
  const newBlog = {
    title: "Test Blog without URL",
    author: "Oriko Mikuni",
    likes: 19,
  };

  const response = await api.post("/api/blogs").send(newBlog).expect(400);
});

after(async () => {
  await mongoose.connection.close();
});

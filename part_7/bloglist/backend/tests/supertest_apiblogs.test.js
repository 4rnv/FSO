const { test, after } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const { assert } = require("console");

const { strictEqual } = require("assert");

const api = supertest(app);

test("Blogs are returned as JSON, length is 2", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  strictEqual(response.body.length, 2);
});

after(async () => {
  await mongoose.connection.close();
});

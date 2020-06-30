const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./api_test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

describe("getting data from db", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.testBlogs);
  });

  test("blogs returned in json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body.length).toBe(helper.testBlogs.length);
  });


  test("correctly formatted id field", async () => {
    const response = await api.get("/api/blogs");
    response.body.forEach((blog) => expect(blog.id).toBeDefined());
  });
});


describe("adding data to db", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.testBlogs);
  });

  test("posting one blog (correct status code and new instance with correct title)", async () => {
    const newBlog = {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url:
        "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAfterPost = await helper.getBlogsFromDb();
    expect(blogsAfterPost.length).toBe(helper.testBlogs.length + 1);

    const titles = blogsAfterPost.map((x) => x.title);
    expect(titles).toContain("TDD harms architecture");
  });

  test("posting blog with no likes returns blog with zero likes", async () => {
    const newBlog = {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url:
        "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    };

    response = await api.post("/api/blogs").send(newBlog).expect(201);

    expect(response.body.likes).toEqual(0);
  });

  test("posting blog with no url or title returns status code 400", async () => {
    const newBlog = {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      likes: 0,
    };

    response = await api.post("/api/blogs").send(newBlog).expect(400);
  });

  test("creating user with too short password returns 400", async () => {
    
    const userWithTooShortPassword = {
      name: "Testi",
      password: "ab",
      username: "test_user"
    };

    const response = await api
      .post("/api/users")
      .send(userWithTooShortPassword)
      .expect(400);

    expect(response.body).toEqual({error:"bad request, username and password need to be atleast three characters long"});
  });
});


afterAll(() => {
  mongoose.connection.close();
});

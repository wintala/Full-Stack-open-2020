const listHelper = require("../utils/list_helper");

const listWithOneBlog = listHelper.listWithOneBlog
const listWithManyBlogs = listHelper.listWithManyBlogs

describe("total likes", () => {
  
  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
  
  test("list with many blogs returns the sum of likes", () => {
    const result = listHelper.totalLikes(listWithManyBlogs);
    expect(result).toBe(36);
  });

  test("list with no blogs returns 0", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

});


describe("most liked blog", () => {
  
  test("list with many blogs", () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs);
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    });
  });

  test("empty list", () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toEqual(null);
  });

});


describe("author with most posts", () => {
  
  test("list with many blogs", () => {
    const result = listHelper.authorWithMostBlogs(listWithManyBlogs);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3
    });
  });

  test("empty list", () => {
    const result = listHelper.authorWithMostBlogs([]);
    expect(result).toEqual(null);
  });

});


describe("author with most likes", () => {
  
  test("list with many blogs", () => {
    const result = listHelper.authorWithMostLikes(listWithManyBlogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    });
  });

  test("empty list", () => {
    const result = listHelper.authorWithMostLikes([]);
    expect(result).toEqual(null);
  });

});


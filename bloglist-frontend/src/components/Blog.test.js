import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";
import BlogCreationForm from "./BlogCreation"

const testBlog = {
  title: "Testiblogi",
  url: "www.blogi.fi",
  author: "Matti Mattila",
  likes: 0,
  user: {
    username: "villeee",
    name: "Ville",
    id: "5efb7627f333742bec377e52",
  },
  id: "5f04c5cb9f1df815e85286db",
};


test("renders correctly", () => {
  const component = render(<Blog blog={testBlog} />);

  expect(component.container).toHaveTextContent("Testiblogi");
  expect(component.container).toHaveTextContent("Matti Mattila");
  expect(component.container).not.toHaveTextContent("www.blogi.fi");
  expect(component.container).not.toHaveTextContent("Likes:");
});


test("url and likes showing after clicking info button", () => {
  const component = render(<Blog blog={testBlog} />);

  const detailButton = component.getByText("info");
  fireEvent.click(detailButton);

  expect(component.container).toHaveTextContent("Testiblogi");
  expect(component.container).toHaveTextContent("Matti Mattila");
  expect(component.container).toHaveTextContent("www.blogi.fi");
  expect(component.container).toHaveTextContent("Likes:");
});


test("like funktion gets called as many times as the like b utton is clicked", () => {
  const mockLikeFunction = jest.fn();

  const component = render(
    <Blog blog={testBlog} likeFunction={mockLikeFunction} />
  );

  const detailButton = component.getByText("info");
  fireEvent.click(detailButton);

  const likeButton = component.getByText("like");

  fireEvent.click(likeButton);
  fireEvent.click(likeButton);
  expect(mockLikeFunction.mock.calls).toHaveLength(2);

  fireEvent.click(likeButton);
  fireEvent.click(likeButton);
  expect(mockLikeFunction.mock.calls).toHaveLength(4);
});

test('blog creation function gets called with right parameters', () => {
  const addNewBlog = jest.fn()

  const component = render(
    <BlogCreationForm addNewBlog={addNewBlog} />
  )

  const setInputValue = (id, value) => {
    const input  = component.container.querySelector(`#${id}`)
    fireEvent.change(input, {target: { value: value } })
  }

  setInputValue("author", testBlog.author)
  setInputValue("title", testBlog.title)
  setInputValue("url", testBlog.url)

  const form = component.container.querySelector('form')
  fireEvent.submit(form)

  expect(addNewBlog.mock.calls[0][0]).toStrictEqual((({title, author, url}) => ({title, author, url}))(testBlog))
})

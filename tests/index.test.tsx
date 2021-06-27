import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../pages/index";
import Enzyme, {mount} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({adapter: new Adapter()});
const wrapper = mount(<App />);

test("renders documentation link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Documentation/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders powered by text', () => {
  expect(wrapper.find("footer")).toHaveText("Powered by ");
});

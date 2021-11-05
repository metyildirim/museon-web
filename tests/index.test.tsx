import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../pages/index";
import { Provider } from "react-redux";
import store from "../app/store";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import fetch from "cross-fetch";

const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: new HttpLink({
    uri: "http://localhost:4000",
    credentials: "include",
    fetch: fetch,
  }),
  cache: new InMemoryCache(),
});

Enzyme.configure({ adapter: new Adapter() });
const wrapper = mount(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>
);

test("renders Web Player link", () => {
  render(
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  );
  const linkElement = screen.getByText(/Web Player/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders copyright text", () => {
  expect(wrapper.find(".copyright")).toIncludeText("Museon");
});

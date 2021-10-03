import "../styles/globals.css";
import "../styles/main.sass";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../app/store";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import getConfig from "next/config";
import fetch from "cross-fetch";

const { publicRuntimeConfig } = getConfig();

const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: new HttpLink({
    uri: publicRuntimeConfig.graphqlEndpoint,
    credentials: "include",
    fetch: fetch,
  }),
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  );
}
export default MyApp;

import "../styles/globals.css";
import "../styles/main.sass";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../redux/store";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: new HttpLink({
    uri: publicRuntimeConfig.graphqlEndpoint,
    credentials: "same-origin",
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

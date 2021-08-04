import "../styles/globals.css";
import "../styles/main.sass";

import { Provider } from "react-redux";
import type { AppProps } from "next/app";

import store from "../redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;

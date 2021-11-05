import Header from "../../components/common/header";
import AppLogin from "../../components/login";
import Footer from "../../components/common/footer";
import Head from "next/head";

export default function Login() {
  return (
    <>
      <Head>
        <title>Museon - Login</title>
      </Head>
      <Header />
      <AppLogin />
      <Footer />
    </>
  );
}

import Header from "../../components/common/header";
import AppRegister from "../../components/signup";
import Footer from "../../components/common/footer";
import Head from "next/head";

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Museon - Sign Up</title>
      </Head>
      <Header />
      <AppRegister />
      <Footer />
    </>
  );
}

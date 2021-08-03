import Head from "next/head";
import Image from "next/image";
import Header from "../components/Common/Header/header";
import Jumbotron from "../components/Home/Jumbotron/jumbotron";
import Footer from "../components/Common/Footer/footer";

export default function Home() {
  return (
    <>
      <Header />
      <Jumbotron />
      <Footer />
    </>
  );
}

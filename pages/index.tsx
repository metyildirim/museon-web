import React from "react";
import Header from "../components/home/header";
import Jumbotron from "../components/home/jumbotron";
import Footer from "../components/common/footer";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Museon - Open-Source Music Platform</title>
      </Head>
      <Header />
      <Jumbotron />
      <Footer />
    </>
  );
}

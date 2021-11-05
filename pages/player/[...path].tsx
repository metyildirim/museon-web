import AppPlayer from "../../components/player";
import Head from "next/head";

export default function Player() {
  return (
    <>
      <Head>
        <title>Museon - Web Player</title>
      </Head>
      <AppPlayer />
    </>
  );
}

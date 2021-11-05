import Header from "../../components/common/header";
import Footer from "../../components/common/footer";
import DownloadSection from "../../components/download";
import Head from "next/head";

export default function Download() {
  return (
    <div className="common-container">
      <Head>
        <title>Museon - Download</title>
      </Head>
      <Header />
      <DownloadSection />
      <Footer />
    </div>
  );
}

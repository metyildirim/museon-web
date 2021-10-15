import Header from "../../components/common/header";
import Heading from "../../components/common/heading";
import Footer from "../../components/common/footer";
import DownloadItem from "../../components/download/item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindows,
  faApple,
  faLinux,
  faGooglePlay,
  faAppStoreIos,
} from "@fortawesome/free-brands-svg-icons";

const desktopApps = [
  { title: "PC", path: "/", icon: faWindows },
  { title: "Mac", path: "/", icon: faApple },
  { title: "Linux", path: "/", icon: faLinux },
];

const mobileApps = [
  { title: "Android", path: "/", icon: faGooglePlay },
  { title: "iOS", path: "/", icon: faAppStoreIos },
];

export default function Download() {
  return (
    <div className="common-container">
      <Header />
      <Heading id="desktop">Download for Desktop</Heading>
      <div className="download-item-container">
        {desktopApps.map(({ title, path, icon }) => (
          <DownloadItem key={title} title={title} path={path}>
            <FontAwesomeIcon icon={icon} className="download-item-icon" />
          </DownloadItem>
        ))}
      </div>
      <Heading id="mobile">Download for Mobile</Heading>
      <div className="download-item-container">
        {mobileApps.map(({ title, path, icon }) => (
          <DownloadItem key={title} title={title} path={path}>
            <FontAwesomeIcon icon={icon} className="download-item-icon" />
          </DownloadItem>
        ))}
      </div>
      <Footer />
    </div>
  );
}

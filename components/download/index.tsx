import Heading from "../common/heading";
import DownloadItem from "./item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindows,
  faApple,
  faLinux,
  faGooglePlay,
  faAppStoreIos,
} from "@fortawesome/free-brands-svg-icons";
import styles from "./download.module.sass";

const desktopApps = [
  { title: "PC", path: "/", icon: faWindows },
  { title: "Mac", path: "/", icon: faApple },
  { title: "Linux", path: "/", icon: faLinux },
];

const mobileApps = [
  { title: "Android", path: "/", icon: faGooglePlay },
  { title: "iOS", path: "/", icon: faAppStoreIos },
];

const Download = () => (
  <>
    <Heading id="desktop">Download for Desktop</Heading>
    <div className={styles.itemContainer}>
      {desktopApps.map(({ title, path, icon }) => (
        <DownloadItem key={title} title={title} path={path}>
          <FontAwesomeIcon icon={icon} className={styles.icon} />
        </DownloadItem>
      ))}
    </div>
    <Heading id="mobile">Download for Mobile</Heading>
    <div className={styles.itemContainer}>
      {mobileApps.map(({ title, path, icon }) => (
        <DownloadItem key={title} title={title} path={path}>
          <FontAwesomeIcon icon={icon} className={styles.icon} />
        </DownloadItem>
      ))}
    </div>
  </>
);

export default Download;

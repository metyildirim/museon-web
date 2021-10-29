import Link from "next/link";
import Image from "next/image";
import Section from "./section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import styles from "./footer.module.sass";

const sections = [
  {
    heading: "Download",
    links: [
      { title: "Desktop", path: "/download#desktop", target: "_self" },
      { title: "Mobile", path: "/download#mobile", target: "_self" },
    ],
  },
  {
    heading: "Project",
    links: [
      {
        title: "Github",
        path: "https://github.com/metyildirim/museon-web",
        target: "_blank",
      },
      { title: "Donors", path: "/donors", target: "_self" },
      {
        title: "Contributors",
        path: "https://github.com/metyildirim/museon-web/graphs/contributors",
        target: "_blank",
      },
    ],
  },
  {
    heading: "Support",
    links: [
      { title: "Docs", path: "/docs", target: "_self" },
      { title: "Contact Us", path: "/contact", target: "_self" },
    ],
  },
  {
    heading: "Musicians",
    links: [
      { title: "Artists", path: "/artists", target: "_self" },
      { title: "Indie", path: "/indie", target: "_self" },
    ],
  },
];

const links = [
  { title: "Terms", path: "/terms" },
  { title: "Privacy", path: "/privacy" },
  { title: "Cookies", path: "/cookies" },
  { title: "License", path: "/license" },
];

const socialIcons = [
  { icon: faFacebook, url: "https://www.facebook.com/" },
  { icon: faTwitter, url: "https://twitter.com/" },
  { icon: faInstagram, url: "https://www.instagram.com/" },
];

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.topContainer}>
        <Link href="/">
          <a>
            <div className={styles.logo}>
              <Image
                height="max-content"
                width="max-content"
                src="/logo.svg"
                alt="logo"
              />
            </div>
          </a>
        </Link>
        <div className={styles.sectionContainer}>
          {sections.map(({ heading, links }) => (
            <Section key={heading} heading={heading} links={links} />
          ))}
        </div>
        <div className={styles.language}>
          <Link href="/">
            <a className={styles.languageButton}>EN</a>
          </Link>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} Museon
        </div>
        <div className={styles.linksContainer}>
          {links.map(({ title, path }) => (
            <div key={title} className={styles.link}>
              <Link href={path}>
                <a>{title}</a>
              </Link>
            </div>
          ))}
        </div>
        <div className={styles.socialContainer}>
          {socialIcons.map(({ icon, url }) => (
            <div key={url} className={styles.icon}>
              <a href={url} target="_blink">
                <FontAwesomeIcon icon={icon} size="lg" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;

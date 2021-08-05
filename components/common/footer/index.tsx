import Link from "next/link";
import Image from "next/image";
import Section from "./section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

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
        path: "https://github.com/metyildirim/museon-frontend",
        target: "_blank",
      },
      { title: "Donors", path: "/donors", target: "_self" },
      {
        title: "Contributors",
        path: "https://github.com/metyildirim/museon-frontend/graphs/contributors",
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
    <div className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <Link href="/">
            <a>
              <div className="footer-logo">
                <Image height="50px" width="150px" src="/logo.svg" alt="logo" />
              </div>
            </a>
          </Link>
        </div>
        <div className="footer-section-container">
          {sections.map(({ heading, links }) => (
            <Section key={heading} heading={heading} links={links} />
          ))}
        </div>
        <div className="footer-language">
          <Link href="/">
            <a className="footer-language-btn">EN</a>
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-copyright">
          © {new Date().getFullYear()} Museon
        </div>
        <div className="footer-links-container">
          {links.map(({ title, path }) => (
            <div key={title} className="footer-link">
              <Link href={path}>
                <a>{title}</a>
              </Link>
            </div>
          ))}
        </div>
        <div className="footer-social-container">
          {socialIcons.map(({ icon, url }) => (
            <div key={url} className="footer-icon">
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

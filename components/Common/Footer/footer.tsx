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
      { title: "Mobile", path: "/" },
      { title: "Desktop", path: "/" },
    ],
  },
  {
    heading: "Project",
    links: [
      { title: "Github", path: "/" },
      { title: "Donors", path: "/" },
      { title: "Contributors", path: "/" },
    ],
  },
  {
    heading: "Support",
    links: [
      { title: "Docs", path: "/" },
      { title: "Contact Us", path: "/" },
    ],
  },
  {
    heading: "Musicians",
    links: [
      { title: "Artists", path: "/" },
      { title: "Indie", path: "/" },
    ],
  },
];

const links = [
  { title: "Terms", path: "/" },
  { title: "Privacy", path: "/" },
  { title: "Cookies", path: "/" },
  { title: "License", path: "/" },
];

const socialIcons = [
  { icon: faFacebook, path: "/" },
  { icon: faTwitter, path: "/" },
  { icon: faInstagram, path: "/" },
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
            <Section key="heading" heading={heading} links={links} />
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
            <div key="title" className="footer-link">
              <Link href={path}>
                <a>{title}</a>
              </Link>
            </div>
          ))}
        </div>
        <div className="footer-social-container">
          {socialIcons.map(({ icon, path }) => (
            <div key={path} className="footer-icon">
              <Link href={path}>
                <a>
                  <FontAwesomeIcon icon={icon} size="lg" />
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;

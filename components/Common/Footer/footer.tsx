import Link from "next/link";
import Image from "next/image";
import Section from "./section";

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

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <Link href="/">
            <a>
              <div className="footer-logo">
                <Image
                  height="50px"
                  width="50px"
                  src="/logo-simple.svg"
                  alt="logo"
                />
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
      <div className="footer-bottom"></div>
    </div>
  );
};

export default Footer;

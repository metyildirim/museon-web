import Link from "next/link";

type LinksType = {
  title: string;
  path: string;
};

type SectionProps = {
  heading: string;
  links: Array<LinksType>;
};

const Section = ({ heading, links }: SectionProps) => {
  return (
    <div className="footer-section">
      <span>{heading}</span>
      <div className="footer-link-container">
        {links.map(({ title, path }) => (
          <div key="title" className="footer-link">
            <Link href={path}>
              <a>{title}</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section;

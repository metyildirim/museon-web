import Link from "next/link";

type LinksType = {
  title: string;
  path: string;
  target: string;
};

type SectionProps = {
  heading: string;
  links: Array<LinksType>;
};

const Section = ({ heading, links }: SectionProps) => {
  return (
    <div className="footer-section">
      <span>{heading}</span>
      <div className="footer-section-link-container">
        {links.map(({ title, path, target }) => (
          <div key={title} className="footer-section-link">
            <Link href={path}>
              <a target={target}>{title}</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section;
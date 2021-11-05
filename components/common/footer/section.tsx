import Link from "next/link";
import styles from "./footer.module.sass";

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
    <div className={styles.section}>
      <span>{heading}</span>
      <div className={styles.sectionLinkContainer}>
        {links.map(({ title, path, target }) => (
          <div key={title} className={styles.sectionLink}>
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

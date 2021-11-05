import Link from "next/link";
import styles from "./download.module.sass";

type ItemProps = {
  title: string;
  path: string;
  children: JSX.Element;
};

const Item = ({ title, children, path }: ItemProps) => {
  return (
    <div className={styles.item}>
      <div className={styles.title}>{title}</div>
      <div className={styles.iconContainer}>{children}</div>
      <Link href={path}>
        <a>
          <div className={styles.button}>Download for {title}</div>
        </a>
      </Link>
    </div>
  );
};

export default Item;

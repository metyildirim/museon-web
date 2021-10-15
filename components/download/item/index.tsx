import Link from "next/link";

type ItemProps = {
  title: string;
  path: string;
  children: JSX.Element;
};

const Item = ({ title, children, path }: ItemProps) => {
  return (
    <div className="download-item">
      <div className="download-item-title">{title}</div>
      <div className="download-item-icon-container">{children}</div>
      <Link href={path}>
        <a>
          <div className="download-item-btn">Download for {title}</div>
        </a>
      </Link>
    </div>
  );
};

export default Item;

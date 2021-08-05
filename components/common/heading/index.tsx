type HeadingProps = {
  children: string;
  id: string;
};

const CommonHeading = ({ children, id }: HeadingProps) => {
  return (
    <div id={id} className="common-heading">
      {children}
    </div>
  );
};

export default CommonHeading;

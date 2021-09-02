import Link from "next/link";

const Jumbotron = () => {
  return (
    <div className="jumbotron-container">
      <span className="jumbotron-heading">Enjoy The Music Freedom</span>
      <span className="jumbotron-text">
        Free and open-source music platform.
      </span>
      <Link href="/signup">
        <a className="jumbotron-btn-join">Join</a>
      </Link>
    </div>
  );
};

export default Jumbotron;

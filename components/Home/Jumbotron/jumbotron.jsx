import Link from "next/link";

const Jumbotron = () => {
    return(<div className="jumbotron-container">
        <span className="jumbotron-heading">Enjoy The Music Freedom</span>
        <span className="jumbotron-text">Open source free music platform.</span>
        <Link href="/">
            <a className="jumbotron-join">Join</a>
        </Link>
    </div>);
}

export default Jumbotron;
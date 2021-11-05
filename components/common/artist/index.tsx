import Image from "next/image";
import Link from "next/link";
import styles from "./artist.module.sass";

type ArtistProps = {
  cover: string;
  artistId: string;
  children: string;
};

const Artist = ({ cover, artistId, children }: ArtistProps) => {
  return (
    <Link href={"/player/artist/" + artistId}>
      <a>
        <div className={styles.item}>
          <Image
            src={cover}
            className={styles.image}
            height="128px"
            width="128px"
            alt={children}
          />
          <span className={styles.title}>{children}</span>
        </div>
      </a>
    </Link>
  );
};

export default Artist;

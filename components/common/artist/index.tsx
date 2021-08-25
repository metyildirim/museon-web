import Image from "next/image";
import Link from "next/link";

type ArtistProps = {
  cover: string;
  artistId: string;
  children: string;
};

const Artist = ({ cover, artistId, children }: ArtistProps) => {
  return (
    <Link href={"/player/artist/" + artistId}>
      <a>
        <div className="artist-item">
          <Image
            src={cover}
            className="artist-image"
            height="128px"
            width="128px"
            alt={children}
          />
          <span className="artist-item-title">{children}</span>
        </div>
      </a>
    </Link>
  );
};

export default Artist;

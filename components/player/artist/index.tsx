import Image from "next/image";
import Album from "../../common/album-item";

type ArtistProps = {
  param: string;
};

const artistData = {
  profile:
    "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/artists%2FEverHigh.jpg?alt=media&token=2b5e044a-5901-4f4e-b3b5-1fa898b6f4c9",
  name: "EverHigh",
  appearsOn: [
    {
      title: "The Best of LMMS Vol. 6",
      cover:
        "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-6%2Fcover6.png?alt=media&token=ce39f255-e283-4c6b-bfaf-013da1a47a90",
      id: "1",
      playlist: [
        {
          song: "Other Side",
          album: "The Best of LMMS Vol. 6",
          artists: ["Umcaruje"],
          cover:
            "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-6%2Fcover6.png?alt=media&token=ce39f255-e283-4c6b-bfaf-013da1a47a90",
          src: "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-6%2FUmcaruje%20-%20The%20Best%20of%20LMMS%20Vol.%206%20-%2001%20Other%20side.mp3?alt=media&token=c6b46661-09d2-44dd-88b5-6ee7b6f94d8f",
        },
      ],
    },
    {
      title: "The Best of LMMS Vol. 7",
      cover:
        "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-7%2Fcover7.png?alt=media&token=36d5a7ed-3779-4fb6-9056-eabebc2003f8",
      id: "2",
      playlist: [
        {
          song: "Other Side",
          album: "The Best of LMMS Vol. 6",
          artists: ["Umcaruje"],
          cover:
            "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-6%2Fcover6.png?alt=media&token=ce39f255-e283-4c6b-bfaf-013da1a47a90",
          src: "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-6%2FUmcaruje%20-%20The%20Best%20of%20LMMS%20Vol.%206%20-%2001%20Other%20side.mp3?alt=media&token=c6b46661-09d2-44dd-88b5-6ee7b6f94d8f",
        },
      ],
    },
    {
      title: "The Best of LMMS Vol. 8",
      cover:
        "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-8%2Fcover8.png?alt=media&token=b7b7f2ac-a02a-49ce-b47b-eac849cdd1b7",
      id: "3",
      playlist: [
        {
          song: "Other Side",
          album: "The Best of LMMS Vol. 6",
          artists: ["Umcaruje"],
          cover:
            "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-6%2Fcover6.png?alt=media&token=ce39f255-e283-4c6b-bfaf-013da1a47a90",
          src: "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-6%2FUmcaruje%20-%20The%20Best%20of%20LMMS%20Vol.%206%20-%2001%20Other%20side.mp3?alt=media&token=c6b46661-09d2-44dd-88b5-6ee7b6f94d8f",
        },
      ],
    },
  ],
};

const Artist = ({ param }: ArtistProps) => {
  return (
    <div className="player-artist-section">
      <div className="player-artist-header">
        <Image
          src={artistData.profile}
          height="128px"
          width="128px"
          alt={artistData.profile}
        />
        <span className="player-artist-name">{artistData.name}</span>
      </div>
      <div className="player-artist-appears-on">
        <span className="text-appears-on">Appears On</span>
        <div className="artist-appears-on-container">
          {artistData.appearsOn.map(({ title, cover, id, playlist }) => (
            <Album
              key={id}
              playlist={playlist}
              playlistId={id}
              cover={cover}
              isPlaylist={false}
            >
              {title}
            </Album>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artist;

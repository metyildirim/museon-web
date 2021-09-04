import { faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import PlaylistItem from "./playlist-item";
import { gql, useQuery } from "@apollo/client";
import { ListType } from "../../../utils/museon-music-player";

type PlaylistSectionProps = {
  isAlbum?: boolean;
  id: string;
};

const GET_PLAYLIST = gql`
  query GetPlaylist($id: ID!) {
    album(id: $id) {
      title
      cover
      songs {
        title
        src
        artists {
          name
        }
      }
    }
  }
`;

const _playlist = [
  {
    song: "Other Side",
    album: "The Best of LMMS Vol. 6",
    artists: ["Umcaruje"],
    cover:
      "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-6%2Fcover6.png?alt=media&token=ce39f255-e283-4c6b-bfaf-013da1a47a90",
    src: "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-6%2FUmcaruje%20-%20The%20Best%20of%20LMMS%20Vol.%206%20-%2001%20Other%20side.mp3?alt=media&token=c6b46661-09d2-44dd-88b5-6ee7b6f94d8f",
  },
  {
    song: "Smile",
    album: "The Best of LMMS Vol. 6",
    artists: ["Xcalibur"],
    cover:
      "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-6%2Fcover6.png?alt=media&token=ce39f255-e283-4c6b-bfaf-013da1a47a90",
    src: "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-6%2FXcalibur%20-%20The%20Best%20of%20LMMS%20Vol.%206%20-%2002%20Smile.mp3?alt=media&token=489f796f-7ce9-4ce0-8cc5-682acac592c4",
  },
  {
    song: "Start Again",
    album: "The Best of LMMS Vol. 7",
    artists: ["Woods Λlive", "Stakeout Punch"],
    cover:
      "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-7%2Fcover7.png?alt=media&token=36d5a7ed-3779-4fb6-9056-eabebc2003f8",
    src: "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-7%2FWoods%20%CE%9Blive%2C%20Stakeout%20Punch%20-%20The%20Best%20of%20LMMS%20Vol.%207%20-%2001%20Start%20Again.mp3?alt=media&token=b73b814a-fe8f-49b7-8722-f1dc0f9772d1",
  },
  {
    song: "Appellation",
    album: "The Best of LMMS Vol. 7",
    artists: ["Squatro"],
    cover:
      "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-7%2Fcover7.png?alt=media&token=36d5a7ed-3779-4fb6-9056-eabebc2003f8",
    src: "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-7%2FSquatro%20-%20The%20Best%20of%20LMMS%20Vol.%207%20-%2002%20Appellation.mp3?alt=media&token=62443fed-b217-4820-8f64-c545896587f4",
  },
  {
    song: "Stay Awake",
    album: "The Best of LMMS Vol. 8",
    artists: ["Umcaruje"],
    cover:
      "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-8%2Fcover8.png?alt=media&token=b7b7f2ac-a02a-49ce-b47b-eac849cdd1b7",
    src: "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-8%2FUmcaruje%20-%20The%20Best%20of%20LMMS%20Vol.%208%20-%2001%20Stay%20Awake.mp3?alt=media&token=c44c77a8-2dfd-4d78-bd6a-4f9fe0e6a537",
  },
  {
    song: "Forever",
    album: "The Best of LMMS Vol. 8",
    artists: ["EverHigh"],
    cover:
      "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-8%2Fcover8.png?alt=media&token=b7b7f2ac-a02a-49ce-b47b-eac849cdd1b7",
    src: "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-8%2FEverHigh%20-%20The%20Best%20of%20LMMS%20Vol.%208%20-%2002%20Forever.mp3?alt=media&token=5a254c65-8946-4fc7-9786-b074b417b3bc",
  },
];

const PlaylistSection = ({ isAlbum, id }: PlaylistSectionProps) => {
  const { loading, error, data } = useQuery(GET_PLAYLIST, {
    variables: { id: id },
  });

  return loading ? (
    <div>LOADING...</div>
  ) : (
    <div className="player-playlist-section">
      <div className="player-playlist-header">
        <div className="player-playlist-image">
          <Image
            src={data.album.cover}
            height="144px"
            width="144px"
            alt={data.album.title}
          />
        </div>
        <span className="player-playlist-title">{data.album.title}</span>
        <div className="playlist-like-btn" onClick={() => {}}>
          <FontAwesomeIcon icon={faHeartOutline} />
        </div>
        <div className="playlist-play-btn" onClick={() => {}}>
          <FontAwesomeIcon icon={faPlay} />
        </div>
      </div>
      <div className="playlist-table-titles">
        <div className="playlist-table-title-item w-1/12">#</div>
        <div className="playlist-table-title-item w-3/12">TITLE</div>
        <div className="playlist-table-title-item w-3/12">ARTISTS</div>
        <div className="playlist-table-title-item w-3/12">ALBUM</div>
        <div className="playlist-table-title-item w-2/12"></div>
      </div>
      <div className="playlist-table-items">
        {data.album.songs.map(
          ({ title, src, artists }: ListType, index: number) => (
            <PlaylistItem
              key={index}
              title={title}
              album={data.album.title}
              artists={artists}
              cover={data.album.cover}
              src={src}
              index={index}
            />
          )
        )}
      </div>
    </div>
  );
};

export default PlaylistSection;

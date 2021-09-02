import Album from "../../common/album-item";
import Artist from "../../common/artist";

const featuredPlaylists = [
  {
    cover:
      "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-6%2Fcover6.png?alt=media&token=ce39f255-e283-4c6b-bfaf-013da1a47a90",
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
    playlistId: "1",
    title: "Daily Mix 1",
  },
  {
    cover:
      "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-6%2Fcover6.png?alt=media&token=ce39f255-e283-4c6b-bfaf-013da1a47a90",
    playlist: [
      {
        song: "Smile",
        album: "The Best of LMMS Vol. 6",
        artists: ["Xcalibur"],
        cover:
          "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-6%2Fcover6.png?alt=media&token=ce39f255-e283-4c6b-bfaf-013da1a47a90",
        src: "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-6%2FXcalibur%20-%20The%20Best%20of%20LMMS%20Vol.%206%20-%2002%20Smile.mp3?alt=media&token=489f796f-7ce9-4ce0-8cc5-682acac592c4",
      },
    ],
    playlistId: "2",
    title: "Daily Mix 2",
  },
  {
    cover:
      "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-7%2Fcover7.png?alt=media&token=36d5a7ed-3779-4fb6-9056-eabebc2003f8",
    playlist: [
      {
        song: "Start Again",
        album: "The Best of LMMS Vol. 7",
        artists: ["Woods Λlive", "Stakeout Punch"],
        cover:
          "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-7%2Fcover7.png?alt=media&token=36d5a7ed-3779-4fb6-9056-eabebc2003f8",
        src: "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-7%2FWoods%20%CE%9Blive%2C%20Stakeout%20Punch%20-%20The%20Best%20of%20LMMS%20Vol.%207%20-%2001%20Start%20Again.mp3?alt=media&token=b73b814a-fe8f-49b7-8722-f1dc0f9772d1",
      },
    ],
    playlistId: "3",
    title: "Pop Mix",
  },
  {
    cover:
      "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-8%2Fcover8.png?alt=media&token=b7b7f2ac-a02a-49ce-b47b-eac849cdd1b7",
    playlist: [
      {
        song: "Forever",
        album: "The Best of LMMS Vol. 8",
        artists: ["EverHigh"],
        cover:
          "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-8%2Fcover8.png?alt=media&token=b7b7f2ac-a02a-49ce-b47b-eac849cdd1b7",
        src: "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/lmms-vol-8%2FEverHigh%20-%20The%20Best%20of%20LMMS%20Vol.%208%20-%2002%20Forever.mp3?alt=media&token=5a254c65-8946-4fc7-9786-b074b417b3bc",
      },
    ],
    playlistId: "4",
    title: "Electro Mix",
  },
];

const featuredArtists = [
  {
    cover:
      "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/artists%2FEverHigh.jpg?alt=media&token=2b5e044a-5901-4f4e-b3b5-1fa898b6f4c9",
    artistId: "1",
    title: "EverHigh",
  },
  {
    cover:
      "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/artists%2Fumcaruje.jpg?alt=media&token=bc99dcbf-51ad-4791-b4c0-418710e2bed9",
    artistId: "2",
    title: "Umcaruje",
  },
  {
    cover:
      "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/artists%2FXcalibur.jpg?alt=media&token=722caa89-10f6-4813-abfa-f5de19b2e0ec",
    artistId: "3",
    title: "Xcalibur",
  },
  {
    cover:
      "https://firebasestorage.googleapis.com/v0/b/museon-873e6.appspot.com/o/artists%2Fstakeout%20punch.jpg?alt=media&token=4bd12362-e957-43c1-abd8-50941a547480",
    artistId: "4",
    title: "Stakeout Punch",
  },
];

const Home = () => {
  return (
    <div className="player-home">
      <span className="player-welcome-text">Welcome to Museon!</span>
      <span className="player-home-title">Featured playlists</span>
      <div className="player-album-container">
        {featuredPlaylists.map(({ cover, playlist, playlistId, title }) => (
          <Album
            key={title}
            cover={cover}
            playlist={playlist}
            playlistId={playlistId}
            isPlaylist={true}
          >
            {title}
          </Album>
        ))}
      </div>
      <span className="player-home-title">Featured artists</span>
      <div className="player-album-container">
        {featuredArtists.map(({ cover, artistId, title }) => (
          <Artist key={title} cover={cover} artistId={artistId}>
            {title}
          </Artist>
        ))}
      </div>
    </div>
  );
};

export default Home;

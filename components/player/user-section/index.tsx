import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faListUl,
  faHeart,
  faCompactDisc,
  faHeadphonesAlt,
} from "@fortawesome/free-solid-svg-icons";
import DropDown from "../../common/dropdown";
import PlaylistItem from "./playlist-item";

const playlists = [
  { text: "Pop", listId: "3" },
  { text: "Classical", listId: "4" },
];

const UserSection = () => {
  return (
    <div className="player-user-section">
      <div className="player-user-profile">
        <div className="profile-image">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <DropDown title="mehmetcts" />
      </div>
      <div className="player-playlists-header">
        My Playlists
        <FontAwesomeIcon icon={faListUl} />
      </div>
      <div className="player-playlists">
        <PlaylistItem text="Liked Songs" icon={faHeart} listId="likes" />
        <PlaylistItem text="Daily Mix" icon={faCompactDisc} listId="dailymix" />
        {playlists.map(({ text, listId }) => (
          <PlaylistItem
            key={listId}
            text={text}
            listId={listId}
            icon={faHeadphonesAlt}
          />
        ))}
      </div>
    </div>
  );
};

export default UserSection;

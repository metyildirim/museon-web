import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faListUl,
  faHeart,
  faCompactDisc,
} from "@fortawesome/free-solid-svg-icons";
import DropDown from "../../common/dropdown";
import PlaylistItem from "./playlist-item";
import { gql, useQuery } from "@apollo/client";
import { AlbumType } from "../../../utils/museon-music-player";

const GET_PLAYLISTS = gql`
  query {
    featured {
      playlists {
        id
        title
      }
    }
  }
`;

const UserSection = () => {
  const { loading, error, data } = useQuery(GET_PLAYLISTS);
  return !data ? (
    <div>LOADING...</div>
  ) : (
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
        {data.featured.playlists.map(({ id, title }: AlbumType) => (
          <PlaylistItem
            key={id}
            text={title}
            icon={faCompactDisc}
            listId={id}
          />
        ))}
      </div>
    </div>
  );
};

export default UserSection;

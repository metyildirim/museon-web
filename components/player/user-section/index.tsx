import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faListUl,
  faHeart,
  faCompactDisc,
} from "@fortawesome/free-solid-svg-icons";
import { selectUsername, signOut } from "../../../app/authSlice";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import DropDown from "../../common/dropdown";
import PlaylistItem from "./playlist-item";
import { useQuery, useMutation } from "@apollo/client";
import { GET_FEATURED_PLAYLISTS } from "../../../app/queries";
import { LOGOUT_MUTATION } from "../../../app/mutations";
import MMP, { AlbumType } from "../../../utils/museon-music-player";
import Spinner from "../../common/spinner";

const UserSection = () => {
  const dispatch = useAppDispatch();
  const username = useAppSelector(selectUsername);
  const { loading, error, data } = useQuery(GET_FEATURED_PLAYLISTS);
  const [logout] = useMutation(LOGOUT_MUTATION);
  const mmp = MMP.instance;

  const onSettingsClicked = () => {};

  const onLogoutClicked = () => {
    mmp.clearPlayer();
    logout();
    dispatch(signOut());
  };

  const dropdownItems = [
    {
      title: "Settings",
      action: onSettingsClicked,
    },
    { title: "Logout", action: onLogoutClicked },
  ];

  return (
    <div className="player-user-section">
      {!data ? (
        <Spinner />
      ) : (
        <>
          <div className="player-user-profile">
            <div className="profile-image">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <DropDown title={username} items={dropdownItems} />
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
        </>
      )}
    </div>
  );
};

export default UserSection;

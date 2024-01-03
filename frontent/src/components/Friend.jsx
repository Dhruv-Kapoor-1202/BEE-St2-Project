import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state/index.js";

import UserImage from "./UserImage.jsx";

const Friend = ({ friendId, name, subtitle, userPathPicture }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(`http://localhost:3001/users/${_id}/${friendId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <div>
      <div>
        <UserImage image={userPathPicture} size="55px" />
        <div
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <p>
            {name}
          </p>
          <p>
            {subtitle}
          </p>
        </div>
        <button
          type="submit"
          className="btn"
          onClick={() => patchFriend()}
        >
          {isFriend ? (
            <PersonRemoveOutlined />
          ) : (
            <PersonAddOutlined />
          )}
        </button>
      </div>
    </div>
  );
};

export default Friend;
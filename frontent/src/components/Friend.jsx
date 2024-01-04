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
    <div className="flex justify-between items-center gap-4 ">
      <div className="flex justify-start items-center gap-4">
        <UserImage image={userPathPicture} size="55px" />
        <div
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
          className="flex flex-col gap-0"
        >
          <p className="font-bold">
            {name}
          </p>
          <p className="text-sm">
            {subtitle}
          </p>
        </div>
      </div>

      <button
        type="submit"
        className="btn rounded-[50%] h-fit w-fit hover:bg-inherit"
        onClick={() => patchFriend()}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ fontSize: "1.25rem", p: 0 }} />
        ) : (
          <PersonAddOutlined sx={{ fontSize: "1.25rem" }} />
        )}
      </button>
    </div>
  );
};

export default Friend;
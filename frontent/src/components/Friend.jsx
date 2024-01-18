/* eslint-disable react/prop-types */
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
    <div className="flex justify-between items-center gap-4 p-2">
      <div className="flex justify-start items-center gap-4 " >
        <UserImage image={userPathPicture} classSize={`w-12 h-12 rounded-full`} size="55px" />
        <div
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
          className="flex flex-col gap-0"
        >
          <p className="text-lg font-bold leading-[22px] line-clamp-1">
            {name}
          </p>
          <p className="text-sm line-clamp-1">
            {subtitle}
          </p>
        </div>
      </div >


      <button
        type="submit"
        className="btn rounded-full"
        onClick={() => patchFriend()}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ fontSize: "1rem", p: 0 }} />
        ) : (
          <PersonAddOutlined sx={{ fontSize: "1rem", p: 0 }} />
        )}
      </button>

    </div >
  );
};

export default Friend;
/* eslint-disable react/prop-types */
import Friend from "../../components/Friend.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../state/index.js";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}/friends`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-2 flex flex-col gap-2 bg-base-200 rounded-lg">
      <p className="font-bold text-2xl">
        Friend List
      </p>
      <div className="flex flex-col gap-2 bg-base-300 rounded-lg">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPathPicture={friend.picturePath}
          />
        ))}
      </div>
    </div>
  )
}

export default FriendListWidget
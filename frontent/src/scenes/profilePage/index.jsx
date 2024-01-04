import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Navbar from "../../scenes/navbar/index.jsx"
import FriendListWidget from "../../scenes/widgets/FriendListWidget.jsx";
import MyPostWidget from "../../scenes/widgets/MyPostWidget";
import PostsWidget from "../../scenes/widgets/PostsWidget.jsx";
import UserWidget from "../../scenes/widgets/UserWidget";


const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    const data = await response.json();
    setUser(data);
  }

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) return null;


  return (
    <div className="flex flex-col gap-2">
      <div className="bg-pink-100 rounded-[33px] p-2">
        <Navbar />
      </div>
      <div className="flex gap-2 justify-between">
        <div className="flex  flex-col  bg-pink-100 rounded-[33px] p-2 gap-2 flex-grow-[4]">
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <FriendListWidget userId={userId} />
        </div>

        <div className="flex  flex-col  bg-pink-100 rounded-[33px] p-2 gap-2 flex-grow-[4]">
          <MyPostWidget picturePath={user.picturePath} />
          <PostsWidget userId={userId} isProfile />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
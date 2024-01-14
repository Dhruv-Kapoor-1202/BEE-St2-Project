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
    <div className="">
      <div className="">
        <Navbar />
      </div>
      <div className="">
        <div className="">
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <FriendListWidget userId={userId} />
        </div>

        <div className="">
          <MyPostWidget picturePath={user.picturePath} />
          <PostsWidget userId={userId} isProfile />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
import { useSelector } from "react-redux";
import Navbar from "../navbar/index.jsx";
import UserWidget from "../../scenes/widgets/UserWidget.jsx";
import MyPostWidget from "../../scenes/widgets/MyPostWidget.jsx";
import PostsWidget from "../../scenes/widgets/PostsWidget.jsx";
import FriendListWidget from "../../scenes/widgets/FriendListWidget.jsx";


const HomePage = () => {

  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <div className="">
      <div className="">
        <Navbar />
      </div>
      <div className="">
        <div className="">
          <UserWidget userId={_id} picturePath={picturePath} />
        </div>
        <div className="">
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </div>
        <div className="">
          <FriendListWidget userId={_id} />
        </div>
      </div>
    </div>
  )
}

export default HomePage
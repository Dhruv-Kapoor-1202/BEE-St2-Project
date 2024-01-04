import { useSelector } from "react-redux";
import Navbar from "../navbar/index.jsx";
import UserWidget from "../../scenes/widgets/UserWidget.jsx";
import MyPostWidget from "../../scenes/widgets/MyPostWidget.jsx";
import PostsWidget from "../../scenes/widgets/PostsWidget.jsx";
import FriendListWidget from "../../scenes/widgets/FriendListWidget.jsx";


const HomePage = () => {

  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-pink-100 rounded-[33px] p-2">
        <Navbar />
      </div>
      <div className="md:flex gap-2">
        <div className="flex flex-col flex-1 bg-pink-100 rounded-[33px] p-2 gap-2">
          <UserWidget userId={_id} picturePath={picturePath} />
        </div>
        <div className="flex flex-col flex-1 bg-pink-100 rounded-[33px] p-2 gap-2">
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </div>
        <div className="flex flex-col flex-1 bg-pink-100 rounded-[33px] p-2 gap-2">
          <FriendListWidget userId={_id} />
        </div>
      </div>
    </div>
  )
}

export default HomePage
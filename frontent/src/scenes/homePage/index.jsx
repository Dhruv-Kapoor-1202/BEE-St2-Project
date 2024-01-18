import { useSelector } from "react-redux";
import Navbar from "../navbar/index.jsx";
import UserWidget from "../../scenes/widgets/UserWidget.jsx";
import MyPostWidget from "../../scenes/widgets/MyPostWidget.jsx";
import PostsWidget from "../../scenes/widgets/PostsWidget.jsx";
import FriendListWidget from "../../scenes/widgets/FriendListWidget.jsx";


const HomePage = () => {

  const { _id, picturePath } = useSelector((state) => state.user);

  return (

    <div className="sm:flex h-[100vh] w-[100%] overflow-auto no-scrollbar">
      <div className="flex p-2">
        <Navbar />
      </div>
      <div className="hidden p-2 md:block overflow-auto no-scrollbar grow w-[30%]">
        <UserWidget userId={_id} picturePath={picturePath} />
      </div>
      <div className="overflow-auto no-scrollbar grow flex flex-col p-2 gap-2 sm:w-[60%]">
        <MyPostWidget picturePath={picturePath} />
        <PostsWidget userId={_id} />
      </div>
      <div className="hidden p-2 sm:block overflow-auto no-scrollbar grow sm:w-[40%]">
        <FriendListWidget userId={_id} />
      </div>
    </div>

  )
}

export default HomePage
/* eslint-disable react/prop-types */
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material"

import Friend from "../../components/Friend.jsx";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state/index.js";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <div className="bg-base-200 rounded-lg p-4 flex flex-col gap-2">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPathPicture={userPicturePath}
      />
      <p className=" flex justify-start items-center flex-wrap w-full line-clamp-1" >
        {description}
      </p>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          // className="aspect-[16/9]"
          // className="object-cover h-64 w-full"
          className=" w-full"
          style={{ borderRadius: "", marginTop: "0" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <div className=" flex justify-between">
        <div className="flex justify-start gap-2">
          <div className="flex justify-start items-center gap-1">
            <button
              type="submit"
              className="hover:bg-slate-200 p-2 rounded-[50%] active:bg-slate-300"
              onClick={patchLike}
            >
              {isLiked ? (
                <FavoriteOutlined />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </button>
            <p>{likeCount}</p>
          </div>

          <div className="flex justify-start items-center gap-1">
            <button
              type="submit"
              className="hover:bg-slate-200 p-2 rounded-[50%] active:bg-slate-300"
              onClick={() => setIsComments(!isComments)}
            >
              <ChatBubbleOutlineOutlined />
            </button>
            <p>{comments.length}</p>
          </div>
        </div>

        <button
          type="submit"
          className="hover:bg-slate-200 p-2 rounded-[50%] active:bg-slate-300"
        >
          <ShareOutlined />
        </button>
      </div>

      {isComments && (
        <div>
          {comments.map((comment, i) => (
            <div key={`${name}-${i}`}>
              {/* Divider */}
              <div className="divider m-0"></div>
              <p>
                {comment}
              </p>
            </div>
          ))}
          {/* Divider */}
          <div className="divider m-0"></div>
        </div>
      )}
    </div>
  )
}

export default PostWidget
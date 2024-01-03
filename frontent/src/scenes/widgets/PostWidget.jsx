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
    <div>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPathPicture={userPicturePath}
      />
      <p>
        {description}
      </p>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "33px", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <div>
        <div>
          <div>
            <button
              type="submit"
              className="btn"
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

          <div>
            <button
              type="submit"
              className="btn"
              onClick={() => setIsComments(!isComments)}
            >
              <ChatBubbleOutlineOutlined />
            </button>
            <p>{comments.length}</p>
          </div>
        </div>

        <button
          type="submit"
          className="btn"
        >
          <ShareOutlined />
        </button>
      </div>

      {isComments && (
        <div>
          {comments.map((comment, i) => (
            <div key={`${name}-${i}`}>
              {/* Divider */}
              <p>
                {comment}
              </p>
            </div>
          ))}
          {/* Divider */}
        </div>
      )}
    </div>
  )
}

export default PostWidget
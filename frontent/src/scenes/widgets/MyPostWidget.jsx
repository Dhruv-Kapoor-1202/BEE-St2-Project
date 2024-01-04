import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";

import Dropzone from "react-dropzone";
import UserImage from "../../components/UserImage.jsx";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/index.js";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();

  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");

  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);

    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };

  return (
    <div className="flex flex-col bg-pink-50 p-4 rounded-[33px] shadow-lg gap-4">
      <div className="flex gap-4 w-full justify-start items-center">
        <UserImage image={picturePath} />
        <input
          type="text"
          placeholder="What's on your mind..."
          className="input input-bordered input-md w-full rounded-[33px] bg-inherit"
          onChange={(e) => setPost(e.target.value)}
          value={post}
        />
      </div>
      {isImage && (
        <div>
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <div>
                <div
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <div>
                      <p>{image.name}</p>
                      <EditOutlined />
                    </div>
                  )}
                </div>
                {image && (
                  <button
                    type="submit"
                    className="btn"
                    onClick={() => setImage(null)}
                  >
                    <DeleteOutlined />
                  </button>
                )}
              </div>
            )}
          </Dropzone>
        </div>
      )}

      {/* Divider */}
      <div className="divider m-0"></div>

      <div className="flex justify-between items-center">
        <div
          onClick={() => setIsImage(!isImage)}
          className="flex justify-center items-start gap-2 cursor-pointer"
        >
          <ImageOutlined />
          <p>
            Image
          </p>
        </div>

        {/* Is Non Moblie Screens */}

        <button
          className="btn rounded-[33px] text-white"
          onClick={handlePost}
          disabled={!post}
        >
          POST
        </button>


      </div>
    </div>
  );
};

export default MyPostWidget;
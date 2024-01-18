/* eslint-disable react/prop-types */
import {
  EditOutlined,
  DeleteOutlined,
  ImageOutlined,
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
    <div className="bg-base-200 rounded-lg p-4 flex flex-col p-2 gap-2">
      <div className="flex gap-2 justify-start items-center">
        <UserImage image={picturePath} classSize={`w-12 h-12 rounded-full`} />
        <input
          type="text"
          placeholder="What's on your mind..."
          className="input input-bordered input-md w-full rounded-[33px] bg-inherit"
          onChange={(e) => setPost(e.target.value)}
          value={post}
        />
      </div>
      {isImage && (
        <div className=" cursor-pointer input input-bordered input-lg w-full h-full flex p-2">
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <div className="w-full text-center text-sm flex justify-between items-center rounded-md gap-2">
                <div
                  {...getRootProps()}
                  className="w-full text-center flex justify-between items-center border border-dashed border-base-content p-2 rounded-md "
                >
                  <input {...getInputProps()}
                    className="cursor-pointer"
                  />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <div className="flex gap-2 justify-between items-center w-full" >
                      <p
                        className="line-clamp-1"
                      >{image.name}</p>
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
      <div className="divider m-0 "></div>

      <div className=" flex justify-between items-center flex-col sm:flex-row">
        <div
          onClick={() => setIsImage(!isImage)}
          className="btn cursor-pointer flex w-full sm:w-fit"
        >
          <ImageOutlined />
          <p>
            Image
          </p>
        </div>

        {/* Is Non Moblie Screens */}

        <button
          className="btn btn-primary w-full sm:w-fit"
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
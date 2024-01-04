import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";

import UserImage from "../../components/UserImage.jsx";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
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
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <div className="bg-pink-50 rounded-[33px] p-4 pb-6 flex flex-col shadow-lg gap-2">
      {/* First Row */}
      <div
        onClick={() => navigate(`/profile/${userId}`)}
        className="flex justify-between items-center cursor-pointer gap-2"
      >
        <div className="flex justify-between items-center gap-4 ">
          <UserImage image={picturePath} />
          <div className="flex flex-col justify-center items-start">
            <p className="text-xl font-bold">
              {firstName} {lastName}
            </p>
            <p>
              {friends.length} {friends.length === 1 ? "friend" : "friends"}
            </p>
          </div>
        </div>
        <ManageAccountsOutlined />
      </div>

      {/* Divider */}
      <div className="divider m-0"></div>

      {/* Second Row */}
      <div>
        <div className="flex gap-4 justify-start items-center">
          <LocationOnOutlined fontSize="large" />
          <p>{location}</p>
        </div>
        <div className="flex gap-4 justify-start items-center">
          <WorkOutlineOutlined fontSize="large" />
          <p>{occupation}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="divider m-0"></div>

      {/* Third Row */}
      <div>
        <div className="flex justify-between items-baseline gap-2" >
          <p>Who's viewed your profile</p>
          <p className="font-bold">{viewedProfile}</p>
        </div>
        <div className="flex justify-between items-baseline gap-2" >
          <p>Impressions of your post</p>
          <p className="font-bold">{impressions}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="divider m-0"></div>

      {/* Fourth Row */}
      <div className="flex flex-col gap-2">
        <p className="font-bold text-lg">
          Social Profiles
        </p>

        <div className="flex justify-between items-center">
          <div className="flex justify-start gap-4">
            <img src="../assets/twitter.png" alt="twitter" />
            <div className="flex flex-col items-start justify-center">
              <p className="font-semibold text-md">Twitter</p>
              <p className="text-sm">Social Network</p>
            </div>
          </div>
          <EditOutlined />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex justify-start gap-4">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <div className="flex flex-col items-start justify-center">
              <p className="font-semibold text-md">LinkedIn</p>
              <p className="text-sm">Network Platform</p>
            </div>
          </div>
          <EditOutlined />
        </div>
      </div>
    </div >
  );
};

export default UserWidget;
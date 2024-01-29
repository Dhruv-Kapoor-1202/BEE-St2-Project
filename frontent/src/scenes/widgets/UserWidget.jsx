/* eslint-disable react/prop-types */
import {
  // ManageAccountsOutlined,
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
    await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    }).then(() => {

    }).catch((error) => {
      console.log(error)
    })



      ;
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
    // viewedProfile,
    // impressions,
    friends,
  } = user;

  return (
    <div className="bg-base-200 p-2 pb-6 flex flex-col rounded-lg">
      {/* First Row */}
      <div
        onClick={() => navigate(`/profile/${userId}`)}
        className=""
      >
        <div className="flex flex-col justify-center items-center text-center pt-6 p-4 gap-4">
          <UserImage image={picturePath} classSize={"w-20"} />
          <div className="flex flex-col justify-center items-center gap-1">
            <p className="text-2xl font-bold  leading-6">
              {firstName} {lastName}
            </p>
            <p className="text-sm">
              {friends.length} {friends.length === 1 ? "friend" : "friends"}
            </p>
          </div>
        </div>
        {/* <ManageAccountsOutlined /> */}
      </div>

      {/* Divider */}
      <div className="divider m-0"></div>

      {/* Second Row */}
      <div className="flex w-full gap-2">
        <div className="flex flex-col w-full justify-center items-center p-2 bg-base-300 rounded-lg">
          <LocationOnOutlined fontSize="small" />
          <p className="text-[0.75rem]">{location}</p>
        </div>
        <div className="flex flex-col w-full justify-center items-center p-2 bg-base-300 rounded-lg">
          <WorkOutlineOutlined fontSize="small" />
          <p className="text-[0.75rem]">{occupation}</p>
        </div>
      </div>

      {/* Divider */}
      {/* <div className="divider m-0"></div> */}

      {/* Third Row */}
      {/* <div>
        <div className="" >
          <p>Who&apos;s viewed your profile</p>
          <p className="font-bold">{viewedProfile}</p>
        </div>
        <div className="" >
          <p>Impressions of your post</p>
          <p className="font-bold">{impressions}</p>
        </div>
      </div> */}

      {/* Divider */}
      <div className="divider m-0"></div>

      {/* Fourth Row */}
      <div className="flex flex-col gap-2 p-2">
        <p className="font-bold text-lg">
          Social Profiles
        </p>

        <div className=" flex justify-between items-center">
          <div className=" flex justify-start gap-2 items-center">
            <img src="../assets/twitter.png" alt="twitter" className="w-7 h-7" />
            <div className="flex flex-col gap-0 ">
              <p className="font-semibold text-md leading-5">Twitter</p>
              <p className="text-[0.75rem] leading-[1rem] line-clamp-1">Social Network</p>
            </div>
          </div>
          <EditOutlined />
        </div>

        <div className=" flex justify-between items-center">
          <div className="flex justify-start gap-2 items-center">
            <img src="../assets/linkedin.png" alt="linkedin" className="w-7 h-7" />
            <div className="flex flex-col gap-0 ">
              <p className="font-semibold text-md leading-5">LinkedIn</p>
              <p className="text-[0.75rem] leading-[1rem] line-clamp-1">Network Platform</p>
            </div>
          </div>
          <EditOutlined />
        </div>
      </div>
    </div >
  );
};

export default UserWidget;
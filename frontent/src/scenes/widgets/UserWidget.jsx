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
    <div>
      {/* First Row */}
      <div
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <div>
          <UserImage image={picturePath} />
          <div>
            <p>
              {firstName} {lastName}
            </p>
            <p>
              {friends.length} friends
            </p>
          </div>
        </div>
        <ManageAccountsOutlined />
      </div>

      {/* Divider */}

      {/* Second Row */}




    </div>
  )
}
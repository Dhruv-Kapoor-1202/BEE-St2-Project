// import { useState } from "react"

// import {
//   Search,
//   Message,
//   DarkMode,
//   LightMode,
//   Notifications,
//   Help,
//   Menu,
//   Close,
// } from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux"
import { setLogout } from "../../state/index.js";
import { useNavigate } from "react-router-dom"
import HomeIcon from '@mui/icons-material/Home';

import UserImage from "../../components/UserImage.jsx";

const Navbar = () => {
  // const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div className=" flex-1 flex sm:flex-col justify-between items-center w-fit bg-base-200 rounded-lg p-1 pt-2">
      <div className="flex-1 rounded-full" onClick={() => navigate("/home")}>
        <a className="btn btn-ghost"><HomeIcon /></a>
      </div>

      <div className="flex-none">
        <div className="dropdown dropdown-end  sm:dropdown-top sm:dropdown-right">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="avatar online">
              <UserImage image={user.picturePath} />
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content  z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li
              onClick={() => navigate(`/profile/${user._id}`)}
            >
              <a>
                {fullName}
              </a>
            </li>
            <li><a>Settings</a></li>
            <li
              onClick={() => dispatch(setLogout())}
            >
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
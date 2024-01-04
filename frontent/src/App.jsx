import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import { useSelector } from "react-redux";

const App = () => {
  // const mode = useSelector((state) => state.mode);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app bg-pink-400 p-2">
      <div className=" bg-pink-300 p-2 rounded-[33px] shadow-lg">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
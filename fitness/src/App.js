import "./App.css";
import Diet from "./components/diet/Diet";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import { useEffect, useState } from "react";
import Login from "./components/login";
import Signup from "./components/signup/signup";
import Profile from "./components/Profile/profile";
import Supplements from "./components/supplements/Supplements";
import { Route, Routes } from "react-router-dom";

function App() {
  const unAuthRoutes = [
    { path: "/", element: <Login login={loginUser} updateUser={updateUser} /> },
    {
      path: "/login",
      element: <Login login={loginUser} updateUser={updateUser} />,
    },
    {
      path: "/signup",
      element: <Signup login={loginUser} updateUser={updateUser} />,
    },
  ];
  const [loggedIn, setLoggedIn] = useState(false);
  const [routes, setRoutes] = useState(unAuthRoutes);
  const [user, setUser] = useState();
  let authRoutes = [
    { path: "/", element: <Home /> },
    { path: "/diet", element: <Diet /> },
    { path: "/suppliment", element: <Supplements /> },
    {
      path: "/profile",
      element: <Profile user={user} />,
    },
  ];

  useEffect(() => {
    authenticateUser();
    authRoutes = [
      { path: "/", element: <Home /> },
      { path: "/diet", element: <Diet /> },
      { path: "/suppliment", element: <Supplements /> },
      {
        path: "/profile",
        element: <Profile user={user} />,
      },
    ];
  }, [user]);

  function authenticateUser() {
    if (isLoggedIn() === true) {
      setRoutes(authRoutes);
    }
  }

  function loginUser() {
    setLoggedIn(true);
    setRoutes(authRoutes);
  }

  function isLoggedIn() {
    return loggedIn;
  }

  function updateUser(user) {
    setUser(user);
  }

  console.log("User from app.js", user);

  return (
    <div className="App">
      {isLoggedIn() !== true ? <></> : <NavBar />}
      <Routes>
        {routes.map((item, index) => {
          return <Route key={index} path={item.path} element={item.element} />;
        })}
      </Routes>
    </div>
  );
}

export default App;

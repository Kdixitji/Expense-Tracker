import App from "./components/App.js";
import Login from "../src/pages/Login.js";
import Home from './pages/Home.js';
import Register from "../src/pages/Register.js"
import { createBrowserRouter, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export default createBrowserRouter([
    {
      element: <App />,
      children : [
        {
          path: "/",
          element: token? <Home /> : <Navigate to="/login" replace={true} />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
    ],
    },
  
  ])

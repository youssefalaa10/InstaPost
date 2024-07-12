import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFounded from "./components/NotFounded.jsx";
import LoginPage from "./pages/login.jsx";
import RegisterPage from "./pages/Register.jsx";
import SocialPost from "./components/SocialPost.jsx";
// primeicons

import Chats from "./pages/Chats.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/social",
    element: <SocialPost />,
  },
  {
    path: "/chat",
    element: <Chats />,
  },
  {
    path: "*",
    element: <NotFounded />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

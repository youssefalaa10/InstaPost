import HomePage from "./pages/Home";

import Layout from "./layouts/Layout";

import Chats from "./pages/Chats.jsx";

import { updateCurrentUser } from "firebase/auth";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/login.jsx";
import RegisterPage from "./pages/Register.jsx";
import SocialPost from "./components/SocialPost.jsx";
import NotFounded from "./components/NotFounded.jsx";
import Profile from "./components/Home/Profile/Profile.jsx";
import EditProfile from "./components/Home/Profile/EditProfile.jsx";

function App() {
  const AuthRoute = ({ children }) => {
    if (!updateCurrentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        // <AuthRoute>
          <Layout>
            <HomePage />
          </Layout>
        // </AuthRoute>
      ),
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
      path: "/profile/:username",
      element: (
        <AuthRoute>
          <Profile />
        </AuthRoute>
      ),
    },
    {
      path: "/editprofile",
      element: (
        // <AuthRoute>
          <EditProfile />
        // </AuthRoute>
      ),
    },
    {
      path: "*",
      element: <NotFounded />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

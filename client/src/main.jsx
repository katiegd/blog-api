import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./Home.jsx";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";
import Posts from "./Posts.jsx";
import Layout from "./Layout.jsx";
import NewPost from "./NewPost.jsx";
import PostPage from "./PostPage.jsx";
import EditPost from "./EditPost.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: ":username/dashboard",
        element: <Dashboard />,
      },
      {
        path: ":username/new-post",
        element: <NewPost />,
      },
      {
        path: ":username/edit-post/:postId",
        element: <EditPost />,
      },
      {
        path: "posts",
        element: <Posts />,
      },
      {
        path: "posts/:postId",
        element: <PostPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

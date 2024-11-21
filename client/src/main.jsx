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
        path: ":username",
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "new-post",
            element: <NewPost />,
          },
        ],
      },
      {
        path: "posts",
        element: <Posts />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

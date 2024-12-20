import { useEffect, useState } from "react";
import { useOutletContext, Link, useNavigate } from "react-router-dom";
import "../src/css/Dashboard.css";
import deleteIcon from "./assets/delete.svg";
import editIcon from "./assets/edit.svg";

const Dashboard = () => {
  const { userData, BASE_URL, setUserLoggedIn, logOut } = useOutletContext();
  const name = userData.username;
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [deleteBtn, setDeleteBtn] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getUserPostsAPI() {
      try {
        const response = await fetch(`${BASE_URL}/${name}/dashboard`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
        if (response.status === 401) {
          setUserLoggedIn(false);
          logOut();
          navigate("/login");
        } else if (!response.ok) {
          throw new Error("Failed to fetch posts.");
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError("Could not load posts.");
      }
    }

    getUserPostsAPI();
  }, []);

  async function deletePost(postId) {
    try {
      const response = await fetch(`${BASE_URL}/${name}/delete/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Unable to delete.", errorData.message);
        return;
      }

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      setDeleteBtn(null);
      setConfirmDelete(false);
    } catch (err) {
      console.error(err);
    }
  }

  function windowEventListener(e) {
    if (!e.target.closest(".action-buttons")) {
      setDeleteBtn(null);
      window.removeEventListener("click", windowEventListener);
    }
  }

  function handleDeleteButtonClick(postId) {
    setDeleteBtn(postId);
    setTimeout(() => {
      window.addEventListener("click", windowEventListener);
    }, 0);
  }

  function handleConfirmDelete(postId) {
    deletePost(postId);
    setDeleteBtn(null);
    window.removeEventListener("click", windowEventListener);
  }

  return (
    <div className="container">
      <div className="container-wrapper">
        <div className="header-posts-btn">
          <h2>Your Posts</h2>
          <Link to={`/${name}/new-post`} className="new-post-btn">
            New Post
          </Link>
        </div>
        <div className="user-post-container">
          {posts.length < 1 ? (
            <p>You don't have any posts yet!</p>
          ) : (
            posts.map((post, index) => (
              <div key={index} className="user-posts">
                <div className="post-info">
                  <Link to={`/posts/${post.id}`}>
                    <span className="post-title">{post.title}</span>
                  </Link>
                  <div className="post-tags">
                    {post.tags.map((tag, tagIndex) => (
                      <span className="tag" key={tagIndex}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="action-buttons">
                  {post.published ? (
                    <p className="published-status published">Published</p>
                  ) : (
                    <p className="published-status not-published">
                      Not Published
                    </p>
                  )}

                  <button className="edit-post-btn action-btn">
                    <Link to={`/${name}/edit-post/${post.id}`}>
                      <img src={editIcon} alt="" />
                    </Link>
                  </button>
                  {deleteBtn === post.id ? (
                    <>
                      <button
                        id={post.id}
                        onClick={() => handleConfirmDelete(post.id)}
                        className="confirm-delete-btn action-btn"
                      >
                        <img src={deleteIcon} alt="" />
                      </button>
                    </>
                  ) : (
                    <button
                      id={post.id}
                      onClick={() => handleDeleteButtonClick(post.id)}
                      className="delete-btn action-btn"
                    >
                      <img src={deleteIcon} alt="" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

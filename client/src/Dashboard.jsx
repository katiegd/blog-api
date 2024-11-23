import { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";

const Dashboard = () => {
  const { userData, BASE_URL } = useOutletContext();
  const name = userData.username;
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [deleteBtn, setDeleteBtn] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

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
        if (!response.ok) {
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

  return (
    <div className="container">
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
              <Link to={`/posts/${post.id}`}>
                <h3>{post.title}</h3>
              </Link>
              <div className="post-tags">
                {post.tags.map((tag, tagIndex) => (
                  <span className="tag" key={tagIndex}>
                    #{tag}
                  </span>
                ))}
              </div>
              <Link
                to={`/${name}/edit-post/${post.id}`}
                className="edit-post-btn"
              >
                Edit
              </Link>
              {deleteBtn ? (
                <>
                  <button
                    id={post.id}
                    onClick={() => {
                      deletePost(post.id);
                    }}
                    className="confirm-delete-btn"
                  >
                    Confirm Delete
                  </button>
                  <button
                    id={post.id}
                    onClick={() => setDeleteBtn(false)}
                    className="cancel-delete-btn"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  id={post.id}
                  onClick={() => setDeleteBtn(true)}
                  className="delete-btn"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;

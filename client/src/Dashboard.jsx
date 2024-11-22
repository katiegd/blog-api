import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const Dashboard = () => {
  const { userData } = useOutletContext();
  const name = userData.username;
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    async function getUserPostsAPI() {
      try {
        const response = await fetch(
          `http://localhost:3000/${name}/dashboard`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );
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
  }, [name, token]);

  return (
    <div className="container">
      <div>Welcome to your Dashboard.</div>{" "}
      <a href={`/${name}/new-post`}>New Post</a>
      <h2>Your Posts</h2>
      <div className="post-container">
        {error ? (
          <p>{error}</p>
        ) : (
          posts.map((post, index) => (
            <div key={index} className="post-tile">
              <h3>{post.title}</h3>
              <div className="post-tags">
                {post.tags.map((tag, tagIndex) => (
                  <span className="tag" key={tagIndex}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;

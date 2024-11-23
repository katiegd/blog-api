import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";

const Posts = () => {
  const { BASE_URL } = useOutletContext();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getPostsAPI() {
      try {
        const response = await fetch(`${BASE_URL}/posts`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
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

    getPostsAPI();
  }, []);

  return (
    <>
      <div className="container">
        <h2>Posts</h2>
        <div className="post-container">
          {error ? (
            <p>{error}</p>
          ) : (
            posts.map((post, index) => (
              <div key={index} className="post-tile">
                By: <p className="post-author">{post.user.username}</p>
                <Link to={`/posts/${post.id}`} className="post-link">
                  <h3>{post.title}</h3>
                </Link>
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
    </>
  );
};

export default Posts;

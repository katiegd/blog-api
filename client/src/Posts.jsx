import { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getPostsAPI() {
      try {
        const response = await fetch("http://localhost:3000/posts", {
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
    </>
  );
};

export default Posts;

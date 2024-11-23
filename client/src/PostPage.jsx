import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

const PostPage = () => {
  const { BASE_URL, userLoggedIn, userData } = useOutletContext();
  const { postId } = useParams();
  const [post, setPost] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPostById() {
      try {
        const response = await fetch(`${BASE_URL}/posts/${postId}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        });

        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err);
        console.error(err);
      }
    }

    fetchPostById();
  }, []);

  return (
    <>
      <div className="container">
        <h2>{post.title}</h2>
        <div className="post-container">
          <div className="post-content">
            By:{" "}
            <p className="post-author">
              {post.user?.username ?? "Unavailable"}
            </p>
            <div className="post-tags">
              {post.tags?.map((tag, tagIndex) => (
                <span className="tag" key={tagIndex}>
                  #{tag}
                </span>
              ))}
            </div>
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPage;

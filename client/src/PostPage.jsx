import "../src/css/Posts.css";
import { useCallback, useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

const PostPage = () => {
  const { BASE_URL, userLoggedIn, userData } = useOutletContext();
  const { postId } = useParams();
  const [post, setPost] = useState("");
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "comment") {
      setComment(value);
    }
  }

  const fetchPostById = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: "GET",
        mode: "cors",
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
  }, [post, BASE_URL, postId]);

  useEffect(() => {
    fetchPostById();
  }, [fetchPostById]);

  async function postNewComment(e) {
    e.preventDefault();

    const content = comment;
    const userId = userData.id || null;

    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}/new-comment`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          content,
          postId,
          userId,
        }),
      });
      if (response.ok) {
        fetchPostById();
        setComment("");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="container">
        <div className="container-wrapper">
          {" "}
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
          <div className="comments">
            <h3>Comments</h3>
            <form onSubmit={postNewComment} method="post">
              <input
                type="text"
                name="comment"
                id="comment"
                onChange={handleChange}
                value={comment}
              />{" "}
              <button type="submit">Add Comment</button>
            </form>
            {post.comments?.map((comment, index) => (
              <div className="comment-item" key={index}>
                <span className="comment-content">{comment.content}</span>
                <span className="comment-time">{comment.createdAt}</span>
                <span className="comment-author">
                  {comment.user?.username || "Anonymous"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPage;

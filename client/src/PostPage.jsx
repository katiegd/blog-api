import "../src/css/Posts.css";
import "../src/css/PostPage.css";
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

  function convertDate(isoDateString) {
    const date = new Date(isoDateString);

    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  }

  function convertTime(isoDateString) {
    const time = new Date(isoDateString);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };

    return time.toLocaleTimeString("en-US", options);
  }

  return (
    <>
      <div className="container">
        <div className="container-wrapper">
          {" "}
          <h2>{post.title}</h2>
          <div className="post-container">
            <div className="post-content">
              <p className="post-author">
                By: {post.user?.username ?? "Unavailable"}
              </p>
              <div className="view-post-tags">
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
            <div className="comments-form-wrapper">
              <form
                onSubmit={postNewComment}
                method="post"
                className="comment-form"
              >
                <input
                  type="text"
                  name="comment"
                  id="comment"
                  onChange={handleChange}
                  value={comment}
                />{" "}
                <button type="submit">Add Comment</button>
              </form>
            </div>
            <div className="comments-container">
              {post.comments?.length > 0 ? (
                post.comments.map((comment, index) => (
                  <div className="comment-item" key={index}>
                    <div className="time-author">
                      <span className="comment-author">
                        {comment.user?.username || "Anonymous"}
                      </span>
                      <span className="comment-time">
                        {convertDate(comment.createdAt)}
                      </span>
                      <span className="comment-time">
                        {convertTime(comment.createdAt)}
                      </span>
                    </div>
                    <span className="comment-content">"{comment.content}"</span>
                  </div>
                ))
              ) : (
                <div className="comment-item">No comments yet!</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPage;

import { useState, useRef, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

import QuillEditor from "./QuillEditor";
import Quill from "quill";

const EditPost = () => {
  const navigate = useNavigate();
  const { userData, BASE_URL } = useOutletContext();
  const { postId } = useParams();

  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [published, setPublished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tagsArray = tags.split(",").map((tag) => tag.trim());

  const token = localStorage.getItem("token");

  const quillRef = useRef(null);

  useEffect(() => {
    async function getPostInfo() {
      try {
        const response = await fetch(
          `${BASE_URL}/${userData.username}/edit-post/${postId}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );
        const data = await response.json();

        setContent(data.post.content);
        setTitle(data.post.title);
        setPublished(data.post.published);

        const tagString = data.post.tags.join(", ");
        setTags(tagString);

        const quill = quillRef.current;
        quill.root.innerHTML = data.post.content;
      } catch (err) {
        console.error(err);
      }
    }

    getPostInfo();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    setIsSubmitting(true);

    const user = userData.username;
    const userId = userData.id;
    const content = quillRef.current?.root.innerHTML;

    try {
      const response = await fetch(
        `${BASE_URL}/${userData.username}/edit-post/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            title,
            content,
            tags: tagsArray,
            published,
            userId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData.msg || "Submission failed.");
        return;
      }

      navigate(`/${user}/dashboard`);
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "tags") {
      setTags(value);
    }
  }

  function handleCheckbox(e) {
    setPublished(e.target.checked);
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="sign-up-form">
        <label htmlFor="title">Post Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={handleChange}
        />
        <QuillEditor
          ref={quillRef}
          readOnly={readOnly}
          onSelectionChange={setRange}
          onTextChange={setLastChange}
          id="content"
          name="content"
          value={content}
        />
        <label htmlFor="tags">Tags:</label>
        <input
          type="text"
          name="tags"
          id="tags"
          value={tags}
          onChange={handleChange}
        />
        <label htmlFor="published">Publish?:</label>
        <input
          type="checkbox"
          name="published"
          id="published"
          checked={published}
          onChange={handleCheckbox}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>{" "}
    </div>
  );
};

export default EditPost;

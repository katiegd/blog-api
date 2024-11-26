import { useState, useRef } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import QuillEditor from "./QuillEditor";
import Quill from "quill";
import "./css/NewPost.css";

const NewPost = () => {
  const navigate = useNavigate();
  const { userData, BASE_URL } = useOutletContext();

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

  function initializeQuill() {
    if (!quillRef.current) {
      const editor = new Quill("#editor-container", {
        theme: "snow",
      });
      quillRef.current = editor;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setIsSubmitting(true);

    const user = userData.username;
    const userId = userData.id;
    const content = quillRef.current?.root.innerHTML;

    try {
      const response = await fetch(`${BASE_URL}/${user}/new-post`, {
        method: "POST",
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
      });

      const data = await response.json();

      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData.msg || "Submission failed.");
        return;
      }

      console.log("Successful post!", data);
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
      <div className="container-wrapper">
        <h2>New Post</h2>
        <form onSubmit={handleSubmit} className="new-post-form">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleChange}
            required
          />
          <label htmlFor="post-body">Body:</label>
          <QuillEditor
            ref={quillRef}
            readOnly={readOnly}
            onSelectionChange={setRange}
            onTextChange={setLastChange}
            id="content"
            name="content"
            className="body-content"
          />
          <label htmlFor="tags">Tags: </label>
          <input
            type="text"
            name="tags"
            id="tags"
            value={tags}
            onChange={handleChange}
          />
          <div className="tags-note">Separate tags with commas.</div>
          <div className="publish-checkbox">
            <label htmlFor="published">Publish:</label>
            <input
              type="checkbox"
              name="published"
              id="published"
              checked={published}
              onChange={handleCheckbox}
            />
          </div>
          <div className="tags-note">
            Unpublished articles will be saved as drafts.
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>{" "}
      </div>
    </div>
  );
};

export default NewPost;

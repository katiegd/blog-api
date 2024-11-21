import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const NewPost = () => {
  const navigate = useNavigate();
  const { userData } = useOutletContext();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [published, setPublished] = useState(false);

  const tagsArray = tags.split(",").map((tag) => tag.trim());

  const token = localStorage.getItem("token");

  async function handleSubmit(e) {
    e.preventDefault();

    const user = userData.username;
    const userId = userData.id;
    try {
      const response = await fetch(`http://localhost:3000/${user}/new-post`, {
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
      console.log(response);
      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData.msg || "Signup failed.");
        return error;
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
    } else if (name === "content") {
      setContent(value);
    } else if (name === "tags") {
      setTags(value);
    }
  }

  function handleCheckbox(e) {
    setPublished(e.target.checked);
  }

  return (
    <div className="container">
      <div>
        <form onSubmit={handleSubmit} className="sign-up-form">
          <label htmlFor="title">Post Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleChange}
          />
          <label htmlFor="content">Content:</label>
          <textarea
            name="content"
            id="content"
            value={content}
            onChange={handleChange}
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
          <button type="submit">Submit</button>
        </form>{" "}
      </div>
    </div>
  );
};

export default NewPost;

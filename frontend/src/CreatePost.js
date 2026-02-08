import React, { useState } from "react";
import API from "./api";

function CreatePost({ refreshPosts }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("posts/", {
        title,
        content,
      });

      setTitle("");
      setContent("");
      setError("");

      refreshPosts();
    } catch {
      setError("You must be logged in to post");
    }
  };

  return (
    <>
      <h4 className="mb-3 text-center">
        ✍️ Create New Post
      </h4>

      {error && (
        <p className="text-danger text-center">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <input
            className="form-control"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Write your story..."
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-success w-100">
          Publish
        </button>

      </form>
    </>
  );
}

export default CreatePost;

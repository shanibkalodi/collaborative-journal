import React, { useState } from "react";
import API from "./api";

function EditPost({ post, onCancel, refresh }) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleUpdate = (e) => {
    e.preventDefault();

    API.put(`posts/${post.id}/`, {
      title: title,
      content: content,
    })
      .then(() => {
        refresh();
        onCancel();
      })
      .catch(() => {
        alert("Update failed");
      });
  };

  return (
    <div className="card p-3 mb-3 border-warning">
      <h5>Edit Post</h5>

      <form onSubmit={handleUpdate}>
        <input
          className="form-control mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="form-control mb-2"
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button className="btn btn-success me-2">
          Save
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditPost;

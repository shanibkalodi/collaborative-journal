import React, { useState } from "react";
import API from "./api";

function CommentBox({ postId, refresh }) {
  const [text, setText] = useState("");

  const submitComment = async (e) => {
    e.preventDefault();

    try {
      await API.post("comments/", {
        text,
        post: postId,
      });

      setText("");
      refresh();
    } catch {
      alert("Login required");
    }
  };

  return (
    <form onSubmit={submitComment}>
      <input
        placeholder="Write comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />

      <button type="submit">Send</button>
    </form>
  );
}

export default CommentBox;

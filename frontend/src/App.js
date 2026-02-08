import React, { useEffect, useState } from "react";
import API from "./api";
import Login from "./Login";
import CreatePost from "./CreatePost";
import CommentBox from "./CommentBox";
import Register from "./Register";
import EditPost from "./EditPost";
import ReadMore from "./ReadMore";

function App() {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [currentUser, setCurrentUser] = useState(null);
  const [editingPost, setEditingPost] = useState(null);


  // Control visibility
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Fetch posts
  const fetchPosts = () => {
    API.get("posts/")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
  fetchPosts();

  if (token) {
    fetchUser();
  }
}, [token]);


  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setShowLogin(false);
    setShowRegister(false);
  };

  const fetchUser = () => {
  API.get("me/")
    .then((res) => setCurrentUser(res.data))
    .catch(() => setCurrentUser(null));
};
   const handleDelete = (id) => {
  if (!window.confirm("Delete this post?")) return;

  API.delete(`posts/${id}/`)
    .then(() => {
      fetchPosts();
    })
    .catch(() => {
      alert("Not allowed");
    });
};


  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-primary mb-4 shadow">
        <div className="container d-flex justify-content-between">

          {/* App Name */}
          <span className="navbar-brand">
            📘 Collaborative Journal
          </span>

          {/* Buttons */}
          <div>
            {!token && (
              <>
                <button
                  className="btn btn-outline-light me-2"
                  onClick={() => {
                    setShowLogin(!showLogin);
                    setShowRegister(false);
                  }}
                >
                  Login
                </button>

                <button
                  className="btn btn-outline-warning"
                  onClick={() => {
                    setShowRegister(!showRegister);
                    setShowLogin(false);
                  }}
                >
                  Register
                </button>
              </>
            )}

            {token && (
              <button
                className="btn btn-outline-light"
                onClick={logout}
              >
                Logout
              </button>
            )}
          </div>

        </div>
      </nav>

      <div className="container">

        {/* Login Box */}
        {!token && showLogin && (
          <div className="row justify-content-center mb-4">
            <div className="col-md-5 card p-4 shadow">
              <Login
                setToken={(t) => {
                  setToken(t);
                  setShowLogin(false);
                }}
              />
            </div>
          </div>
        )}

        {/* Register Box */}
        {!token && showRegister && (
          <div className="row justify-content-center mb-4">
            <div className="col-md-5 card p-4 shadow">
              <Register
                onSuccess={() => {
                  setShowRegister(false);
                  setShowLogin(true);
                }}
              />
            </div>
          </div>
        )}

        {/* Create Post */}
        {token && (
          <div className="row justify-content-center mb-4">
            <div className="col-md-8 card p-4 shadow">
              <CreatePost refreshPosts={fetchPosts} />
            </div>
          </div>
        )}

        {/* Posts */}
        {posts.map((post) => (
          <div
            key={post.id}
            className="card mb-4 shadow border-0"
          > 
            {editingPost && editingPost.id === post.id && (
  <EditPost
    post={editingPost}
    refresh={fetchPosts}
    onCancel={() => setEditingPost(null)}
  />
)}
<div className="card-body">
           
              <h4 className="card-title">
                {post.title}
              </h4>
              
              <p className="card-text">
  <ReadMore text={post.content} maxLines={5} />
</p>

              <small className="text-muted">
                By {post.author.username}
              </small>
              {/* Edit/Delete Buttons */}
{token &&
  currentUser &&
  currentUser.username === post.author.username && (
    <div className="mt-2">

      <button  className="btn btn-sm btn-warning me-2"
  onClick={() => setEditingPost(post)}
>
  Edit
      </button>

      <button
        className="btn btn-sm btn-danger"
        onClick={() => handleDelete(post.id)}
      >
        Delete
      </button>

    </div>
)}


              <hr />

              <h6>Comments</h6>

              {post.comments.map((c) => (
                <p key={c.id}>
                  <b>{c.author.username}:</b> {c.text}
                </p>
              ))}

              {token && (
                <CommentBox
                  postId={post.id}
                  refresh={fetchPosts}
                />
              )}

            </div>
          </div>
        ))}

      </div>
    </>
  );
}

export default App;
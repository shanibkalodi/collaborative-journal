import React, { useState } from "react";
import API from "./api";

function Register({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    API.post("register/", {
      username: username,
      password: password,
    })
      .then((res) => {
        alert("✅ Registration Successful! Please Login.");
        setUsername("");
        setPassword("");
        setError("");
        onSuccess(); // Open login
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setError("❌ Username already exists. Try another.");
        } else {
          setError("❌ Registration failed. Try again.");
        }
      });
  };

  return (
    <>
      <h4 className="text-center mb-3">Register</h4>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-warning w-100"
        >
          Register
        </button>
      </form>
    </>
  );
}

export default Register;

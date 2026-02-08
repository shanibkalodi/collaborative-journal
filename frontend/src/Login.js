 import React, { useState } from "react";
import API from "./api";

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("login/", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
    } catch (err) {
      setError("Invalid login credentials");
    }
  };

  return (
    <>
      <h4 className="mb-3 text-center">Login</h4>

      {error && (
        <p className="text-danger text-center">
          {error}
        </p>
      )}

      <form onSubmit={handleLogin}>

        <div className="mb-3">
          <input
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </>
  );
}

export default Login;


import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { username, password });
      alert("🎉 User registered successfully!");
      nav("/");
    } catch (err) {
      alert("❌ Registration failed. Try a different username.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(4px)",
        overflow: "hidden",
      }}
    >
      <div
        className="card p-4 shadow-lg border-0"
        style={{
          maxWidth: "420px",
          width: "90%",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "16px",
        }}
      >
        <div className="text-center mb-4">
          <i
            className="bi bi-bus-front-fill text-success"
            style={{ fontSize: "2.5rem" }}
          ></i>
          <h3 className="mt-2 text-dark">Register</h3>
          <p className="text-muted mb-0">Create account for Pawar Tours</p>
        </div>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-person-plus-fill text-secondary"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-shield-lock-fill text-secondary"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Choose a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            className="btn btn-success w-100 fw-semibold rounded-pill mt-2"
            type="submit"
          >
            <i className="bi bi-person-check-fill me-2"></i> Register
          </button>
        </form>
      </div>
    </div>
  );
}

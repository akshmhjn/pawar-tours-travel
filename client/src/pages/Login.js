import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { username, password });
      localStorage.setItem("token", data.token);
      nav("/tickets");
    } catch (err) {
      alert("Incorrect credentials. Please try again.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(to right, #4facfe, #00f2fe)",overflow:"hidden"
      }}
    >
      <div className="card shadow-lg p-4 border-0" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="text-center mb-4">
          <i className="bi bi-ticket-perforated-fill text-primary" style={{ fontSize: "2.5rem" }}></i>
          <h3 className="mt-2 text-dark">Pawar Tours Login</h3>
        </div>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-person-fill"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-lock-fill"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            <i className="bi bi-box-arrow-in-right me-1"></i> Login
          </button>
          <div className="d-flex justify-content-between mt-3">
            <small className="text-muted">Don't share credentials</small>
            {/* Optional placeholders */}
            {/* <a href="#" className="text-decoration-none small">Forgot Password?</a> */}
          </div>
        </form>
      </div>
    </div>
  );
}

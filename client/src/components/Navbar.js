import { Link } from "react-router-dom";

export default function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  const navbarStyle = {
    background: "linear-gradient(90deg, #e3f2fd, #bbdefb)", // Faint gradient
    zIndex: 1030,

  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top shadow-sm " style={navbarStyle}>
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-semibold text-dark" to="/tickets">
          <i className="bi bi-bus-front-fill me-2"></i> Pawar Tours & Travels
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/tickets">
                <i className="bi bi-ticket-perforated me-1"></i> Tickets
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/add">
                <i className="bi bi-plus-circle me-1"></i> Add Ticket
              </Link>
            </li>
          </ul>

          <button className="btn btn-outline-dark btn-sm" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-1"></i> Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

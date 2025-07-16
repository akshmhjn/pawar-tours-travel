import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import TicketList from "./pages/TicketList";
import AddTicket from "./pages/AddTicket";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import EditTicket from "./pages/EditTicket";

function AppRoutes() {
  const location = useLocation();

  // Hide navbar on login and register pages
  const hideNavbar = location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tickets" element={<TicketList />} />
          <Route path="/add" element={<AddTicket />} />
          <Route path="/edit/:id" element={<EditTicket />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

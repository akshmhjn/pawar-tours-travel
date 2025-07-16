import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function AddTicket() {
  const nav = useNavigate();

  const initial = {
    customerName: "",
    source: "",
    destination: "",
    travellingDate: "",
    bookingDate: "",
    ticketNumber: "",
    ticketAmount: 0,
    commission: 0,
    totalAmount: 0,
  };

  const [form, setForm] = useState(initial);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/tickets", form);
    nav("/tickets");
  };

  const cancel = () => {
    if (window.confirm("Are you sure you want to cancel?")) {
      nav("/tickets");
    }
  };

  return (
    <div className="container" style={{ marginTop: "80px", maxWidth: "700px" }}>
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h3 className="mb-4 text-center text-primary">
            <i className="bi bi-plus-circle me-2"></i>
            Add New Ticket
          </h3>
          <form onSubmit={submit}>
            {Object.keys(initial).map((key) => (
              <div className="mb-3" key={key}>
                <label className="form-label fw-semibold text-capitalize">
                  {key.replace(/([A-Z])/g, " $1")}:
                </label>
                <input
                  className="form-control"
                  type={
                    key.includes("Date")
                      ? "date"
                      : key.includes("Amount") || key === "commission"
                      ? "number"
                      : "text"
                  }
                  name={key}
                  value={form[key]}
                  onChange={change}
                  required
                />
              </div>
            ))}


            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-success w-100">
                <i className="bi bi-check-circle me-1"></i> Save Ticket
              </button>
              <button type="button" className="btn btn-outline-danger w-100" onClick={cancel}>
                <i className="bi bi-x-circle me-1"></i> Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

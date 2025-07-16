import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";

export default function EditTicket() {
  const [form, setForm] = useState({});
  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    API.get(`/tickets/${id}`).then(res => setForm(res.data));
  }, [id]);

  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    await API.put(`/tickets/${id}`, form);
    nav("/tickets");
  };

  const cancel = () => {
    nav("/tickets");
  };

  const fields = [
    "customerName",
    "source",
    "destination",
    "travellingDate",
    "bookingDate",
    "ticketNumber",
    "ticketAmount",
    "commission",
    "totalAmount"
  ];

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4 col-md-6 mx-auto">
        <h3 className="mb-4 text-center">Edit Ticket – Pawar Tours</h3>
        <form onSubmit={submit} className="row g-3">
          {fields.map((field) => (
            <div key={field} className="mb-3">
              <label className="form-label text-capitalize">
                {field.replace(/([A-Z])/g, " $1")}:
              </label>
              <input
                className="form-control"
                name={field}
                type={
                  field.includes("Date")
                    ? "date"
                    : field.includes("Amount") || field === "commission"
                    ? "number"
                    : "text"
                }
                value={form[field] || ""}
                onChange={change}
                required
              />
            </div>
          ))}
          <div className="d-flex justify-content-between">
            <button className="btn btn-secondary" type="button" onClick={cancel}>
              Cancel
            </button>
            <button className="btn btn-primary" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

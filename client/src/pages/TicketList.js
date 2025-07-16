import { useEffect, useState, useCallback } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

export default function TicketList() {
  const nav = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [filterDate, setFilterDate] = useState("");

  const load = useCallback(async () => {
    const res = await API.get("/tickets", {
      params: filterDate ? { date: filterDate } : {},
    });
    setTickets(res.data);
  }, [filterDate]);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      await API.delete(`/tickets/${id}`);
      load();
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tickets);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tickets");
    XLSX.writeFile(workbook, "filtered_tickets.xlsx");
  };

  return (
    <div className="container" style={{ marginTop: '80px' }}>
      <div className="card shadow-sm rounded">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">🎫 Ticket List</h4>
        </div>

        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-3">
              <input
                type="date"
                className="form-control"
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </div>
            <div className="col-md-auto">
              <button className="btn btn-outline-secondary me-2" onClick={load}>
                Filter
              </button>
              <button className="btn btn-outline-success" onClick={exportToExcel}>
                Export to Excel
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle text-center">
              <thead className="table-light">
                <tr>
                  <th>Customer</th>
                  <th>Source</th>
                  <th>Destination</th>
                  <th>Travelling</th>
                  <th>Booking</th>
                  <th>Number</th>
                  <th>Amount</th>
                  <th>Comm</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((t) => (
                  <tr key={t._id}>
                    <td>{t.customerName}</td>
                    <td>{t.source}</td>
                    <td>{t.destination}</td>
                    <td>{new Date(t.travellingDate).toLocaleDateString()}</td>
                    <td>{new Date(t.bookingDate).toLocaleDateString()}</td>
                    <td>{t.ticketNumber}</td>
                    <td>₹{t.ticketAmount}</td>
                    <td>₹{t.commission}</td>
                    <td>₹{t.totalAmount}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-1"
                        onClick={() => nav(`/edit/${t._id}`)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(t._id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {tickets.length === 0 && (
                  <tr>
                    <td colSpan="10" className="text-muted text-center">
                      No tickets found for selected date.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

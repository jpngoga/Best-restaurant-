
import { CalendarDays, Users, Clock, Plus, Phone } from "lucide-react";
import "./ManagementPages.css";

const reservations = [
  { name: "James Peterson", guests: 4, date: "Nov 03, 2026", time: "12:30 PM", table: "Table 03", status: "Confirmed" },
  { name: "Sarah Williams", guests: 2, date: "Nov 03, 2026", time: "01:00 PM", table: "Table 06", status: "Pending" },
  { name: "Michael Brown", guests: 6, date: "Nov 03, 2026", time: "02:30 PM", table: "Table 01", status: "Confirmed" },
  { name: "Emma Wilson", guests: 3, date: "Nov 03, 2026", time: "04:00 PM", table: "Table 05", status: "Cancelled" },
];

function Reservations() {
  return (
    <main className="management-page">
      <div className="management-heading">
        <div><h2>Reservations</h2><p>Manage table bookings and guest reservations.</p></div>
        <button className="management-button"><Plus size={17} /> New Reservation</button>
      </div>

      <section className="management-stats">
        {[
          ["Total Reservations", "32", <CalendarDays />],
          ["Confirmed", "21", <Users />],
          ["Pending", "07", <Clock />],
          ["Available Tables", "12", <CalendarDays />],
        ].map(([label, value, icon]) => (
          <article className="management-stat" key={label}>
            <div className="management-stat-top">{label}<span className="management-stat-icon">{icon}</span></div>
            <h3>{value}</h3><p className="management-muted">Reservation overview</p>
          </article>
        ))}
      </section>

      <section className="management-panel">
        <div className="management-panel-heading">
          <h3>Recent Reservations</h3>
          <span className="management-muted">November 3, 2026</span>
        </div>
        <div className="management-table-wrap">
          <table className="management-table">
            <thead><tr><th>Guest</th><th>Guests</th><th>Date</th><th>Time</th><th>Table</th><th>Status</th></tr></thead>
            <tbody>{reservations.map((r) => (
              <tr key={r.name}>
                <td>{r.name}</td><td>{r.guests}</td><td>{r.date}</td><td>{r.time}</td><td>{r.table}</td>
                <td><span className={`management-status ${r.status === "Pending" ? "pending" : r.status === "Cancelled" ? "danger" : ""}`}>{r.status}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default Reservations;

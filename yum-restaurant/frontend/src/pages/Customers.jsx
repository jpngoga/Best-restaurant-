
import { Users, UserRound, Mail, Phone, Plus } from "lucide-react";
import "./ManagementPages.css";

const customers = [
  { name: "James Peterson", email: "james@example.com", phone: "+250 788 123 456", orders: 18, spent: "RWF 245,000" },
  { name: "Sarah Williams", email: "sarah@example.com", phone: "+250 789 234 567", orders: 12, spent: "RWF 180,000" },
  { name: "Michael Brown", email: "michael@example.com", phone: "+250 780 345 678", orders: 9, spent: "RWF 125,000" },
  { name: "Emma Wilson", email: "emma@example.com", phone: "+250 781 456 789", orders: 6, spent: "RWF 82,000" },
];

function Customers() {
  return (
    <main className="management-page">
      <div className="management-heading">
        <div><h2>Customers</h2><p>Manage customer profiles and track their activity.</p></div>
        <button className="management-button"><Plus size={17} /> Add Customer</button>
      </div>

      <section className="management-stats">
        {[
          ["Total Customers", "248", <Users />],
          ["New Customers", "18", <UserRound />],
          ["Returning Customers", "76", <Users />],
          ["Customer Growth", "+12%", <UserRound />],
        ].map(([label, value, icon]) => (
          <article className="management-stat" key={label}>
            <div className="management-stat-top">{label}<span className="management-stat-icon">{icon}</span></div>
            <h3>{value}</h3><p className="management-muted">Customer overview</p>
          </article>
        ))}
      </section>

      <section className="management-panel">
        <div className="management-panel-heading">
          <h3>Customer Directory</h3>
          <div className="management-search"><Users size={16} /><input placeholder="Search customers..." /></div>
        </div>
        <div className="management-table-wrap">
          <table className="management-table">
            <thead><tr><th>Customer</th><th>Email</th><th>Phone</th><th>Orders</th><th>Total Spent</th></tr></thead>
            <tbody>{customers.map((c) => (
              <tr key={c.email}>
                <td>{c.name}</td><td>{c.email}</td><td>{c.phone}</td><td>{c.orders}</td><td>{c.spent}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default Customers;

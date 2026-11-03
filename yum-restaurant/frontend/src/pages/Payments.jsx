
import { CreditCard, Wallet, CircleDollarSign, Download } from "lucide-react";
import "./ManagementPages.css";

const payments = [
  { id: "PAY-1001", customer: "James Peterson", date: "Nov 03, 2026", method: "Mobile Money", amount: "RWF 25,000", status: "Completed" },
  { id: "PAY-1002", customer: "Sarah Williams", date: "Nov 03, 2026", method: "Card", amount: "RWF 18,500", status: "Completed" },
  { id: "PAY-1003", customer: "Michael Brown", date: "Nov 02, 2026", method: "Cash", amount: "RWF 32,000", status: "Pending" },
  { id: "PAY-1004", customer: "Emma Wilson", date: "Nov 02, 2026", method: "Mobile Money", amount: "RWF 12,000", status: "Failed" },
];

function Payments() {
  return (
    <main className="management-page">
      <div className="management-heading">
        <div><h2>Payments</h2><p>Monitor transactions and payment activity.</p></div>
        <button className="management-button"><Download size={17} /> Export Payments</button>
      </div>

      <section className="management-stats">
        {[
          ["Total Revenue", "RWF 2.8M", <CircleDollarSign />],
          ["Completed Payments", "186", <CheckIcon />],
          ["Pending Payments", "08", <Wallet />],
          ["Transactions", "201", <CreditCard />],
        ].map(([label, value, icon]) => (
          <article className="management-stat" key={label}>
            <div className="management-stat-top">{label}<span className="management-stat-icon">{icon}</span></div>
            <h3>{value}</h3><p className="management-muted">Payment overview</p>
          </article>
        ))}
      </section>

      <section className="management-panel">
        <div className="management-panel-heading">
          <h3>Recent Transactions</h3>
          <span className="management-muted">Latest payment activity</span>
        </div>
        <div className="management-table-wrap">
          <table className="management-table">
            <thead><tr><th>Payment ID</th><th>Customer</th><th>Date</th><th>Method</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>{payments.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td><td>{p.customer}</td><td>{p.date}</td><td>{p.method}</td><td>{p.amount}</td>
                <td><span className={`management-status ${p.status === "Pending" ? "pending" : p.status === "Failed" ? "danger" : ""}`}>{p.status}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function CheckIcon() {
  return <CircleDollarSign />;
}

export default Payments;


import {
  BarChart3,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  CalendarDays,
} from "lucide-react";
import "./ManagementPages.css";

const weeklySales = [
  { day: "Mon", amount: 45, label: "RWF 450K" },
  { day: "Tue", amount: 65, label: "RWF 650K" },
  { day: "Wed", amount: 50, label: "RWF 500K" },
  { day: "Thu", amount: 80, label: "RWF 800K" },
  { day: "Fri", amount: 95, label: "RWF 950K" },
  { day: "Sat", amount: 70, label: "RWF 700K" },
  { day: "Sun", amount: 60, label: "RWF 600K" },
];

function Reports() {
  return (
    <main className="management-page">
      <div className="management-heading">
        <div><h2>Reports & Analytics</h2><p>Understand your restaurant's performance.</p></div>
        <button className="management-button"><CalendarDays size={17} /> This Week</button>
      </div>

      <section className="management-stats">
        {[
          ["Total Revenue", "RWF 4.65M", <DollarSign />],
          ["Total Orders", "524", <ShoppingBag />],
          ["Average Order", "RWF 8,874", <BarChart3 />],
          ["Revenue Growth", "+15.8%", <TrendingUp />],
        ].map(([label, value, icon]) => (
          <article className="management-stat" key={label}>
            <div className="management-stat-top">{label}<span className="management-stat-icon">{icon}</span></div>
            <h3>{value}</h3><p className="management-muted">Reporting overview</p>
          </article>
        ))}
      </section>

      <section className="management-panel">
        <div className="management-panel-heading">
          <div><h3>Weekly Sales Overview</h3><p className="management-muted">Illustrative daily sales figures</p></div>
          <span className="management-status info">This Week</span>
        </div>

        <div style={{ display: "flex", alignItems: "end", gap: "16px", height: "220px", padding: "20px 8px 0" }}>
          {weeklySales.map((item) => (
            <div key={item.day} style={{ flex: 1, textAlign: "center", height: "100%", display: "flex", flexDirection: "column", justifyContent: "end", gap: "8px" }}>
              <span style={{ fontSize: "10px", color: "#9297a6" }}>{item.label}</span>
              <div style={{ height: `${item.amount}%`, minHeight: "12px", background: "#f47b35", borderRadius: "7px 7px 0 0" }} />
              <span style={{ fontSize: "12px", color: "#9297a6" }}>{item.day}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="management-cards">
        <article className="management-item-card">
          <span className="management-item-icon"><ShoppingBag /></span>
          <h3>Orders Report</h3>
          <p>Review order volume and completion trends.</p>
        </article>
        <article className="management-item-card">
          <span className="management-item-icon"><DollarSign /></span>
          <h3>Revenue Report</h3>
          <p>Review sales totals and payment performance.</p>
        </article>
        <article className="management-item-card">
          <span className="management-item-icon"><TrendingUp /></span>
          <h3>Performance Report</h3>
          <p>Track key restaurant performance indicators.</p>
        </article>
      </section>
    </main>
  );
}

export default Reports;

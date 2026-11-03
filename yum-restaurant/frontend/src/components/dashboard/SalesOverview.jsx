import { TrendingUp } from "lucide-react";
import "./SalesOverview.css";

function SalesOverview() {
  return (
    <section className="sales-card">
      <div className="sales-header">
        <div>
          <h3>Sales Overview</h3>
          <p>Monitor your restaurant's sales performance</p>
        </div>

        <button className="sales-filter">This Week</button>
      </div>

      <div className="sales-empty">
        <div className="sales-empty-icon">
          <TrendingUp size={30} />
        </div>

        <h4>Sales analytics</h4>
        <p>
          Your sales performance will appear here once we connect
          the dashboard to your Django reports API.
        </p>
      </div>
    </section>
  );
}

export default SalesOverview;

import {
  ChefHat,
  Clock,
  CheckCircle2,
  Flame,
  MoreHorizontal,
} from "lucide-react";
import "./ManagementPages.css";

const kitchenOrders = [
  { id: "#ORD-1042", item: "Grilled Chicken", table: "Table 04", time: "5 min ago", status: "Preparing" },
  { id: "#ORD-1043", item: "Beef Burger", table: "Table 02", time: "8 min ago", status: "Pending" },
  { id: "#ORD-1044", item: "Chicken Pizza", table: "Table 07", time: "12 min ago", status: "Ready" },
  { id: "#ORD-1045", item: "Caesar Salad", table: "Table 01", time: "2 min ago", status: "Preparing" },
];

function Kitchen() {
  return (
    <main className="management-page">
      <div className="management-heading">
        <div>
          <h2>Kitchen Management</h2>
          <p>Monitor incoming orders and track food preparation.</p>
        </div>
        <button className="management-button"><ChefHat size={17} /> Kitchen Overview</button>
      </div>

      <section className="management-stats">
        {[
          ["New Orders", "08", <Clock />],
          ["Preparing", "05", <Flame />],
          ["Ready to Serve", "03", <CheckCircle2 />],
          ["Completed Today", "24", <ChefHat />],
        ].map(([label, value, icon]) => (
          <article className="management-stat" key={label}>
            <div className="management-stat-top">
              {label}<span className="management-stat-icon">{icon}</span>
            </div>
            <h3>{value}</h3>
            <p className="management-muted">Kitchen activity</p>
          </article>
        ))}
      </section>

      <section className="management-panel">
        <div className="management-panel-heading">
          <h3>Active Kitchen Orders</h3>
          <span className="management-muted">Today's orders</span>
        </div>
        <div className="management-table-wrap">
          <table className="management-table">
            <thead><tr><th>Order ID</th><th>Menu Item</th><th>Table</th><th>Received</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {kitchenOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td><td>{order.item}</td><td>{order.table}</td><td>{order.time}</td>
                  <td><span className={`management-status ${order.status === "Pending" ? "pending" : order.status === "Preparing" ? "info" : ""}`}>{order.status}</span></td>
                  <td><button aria-label={`More actions for ${order.id}`}><MoreHorizontal size={19} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default Kitchen;

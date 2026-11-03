
import { Package, AlertTriangle, TrendingDown, Plus } from "lucide-react";
import "./ManagementPages.css";

const ingredients = [
  { name: "Chicken Breast", category: "Meat", quantity: "25 kg", minimum: "10 kg", status: "In Stock" },
  { name: "Fresh Tomatoes", category: "Vegetables", quantity: "4 kg", minimum: "8 kg", status: "Low Stock" },
  { name: "Mozzarella Cheese", category: "Dairy", quantity: "15 kg", minimum: "5 kg", status: "In Stock" },
  { name: "Cooking Oil", category: "Supplies", quantity: "2 L", minimum: "5 L", status: "Low Stock" },
  { name: "Rice", category: "Grains", quantity: "40 kg", minimum: "10 kg", status: "In Stock" },
];

function Inventory() {
  return (
    <main className="management-page">
      <div className="management-heading">
        <div><h2>Inventory Management</h2><p>Track ingredients, stock levels, and supplies.</p></div>
        <button className="management-button"><Plus size={17} /> Add Ingredient</button>
      </div>

      <section className="management-stats">
        {[
          ["Total Ingredients", "56", <Package />],
          ["Low Stock Items", "08", <AlertTriangle />],
          ["Out of Stock", "02", <TrendingDown />],
          ["Stock Categories", "07", <Package />],
        ].map(([label, value, icon]) => (
          <article className="management-stat" key={label}>
            <div className="management-stat-top">{label}<span className="management-stat-icon">{icon}</span></div>
            <h3>{value}</h3><p className="management-muted">Inventory overview</p>
          </article>
        ))}
      </section>

      <section className="management-panel">
        <div className="management-panel-heading">
          <h3>Ingredient Stock</h3>
          <div className="management-search"><Package size={16} /><input placeholder="Search ingredients..." /></div>
        </div>
        <div className="management-table-wrap">
          <table className="management-table">
            <thead><tr><th>Ingredient</th><th>Category</th><th>Quantity</th><th>Minimum Level</th><th>Status</th></tr></thead>
            <tbody>{ingredients.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td><td>{item.category}</td><td>{item.quantity}</td><td>{item.minimum}</td>
                <td><span className={`management-status ${item.status === "Low Stock" ? "pending" : ""}`}>{item.status}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default Inventory;

import { ClipboardList, ArrowRight } from "lucide-react";
import "./RecentOrders.css";

function RecentOrders({ orders = [], onViewAll }) {
  return (
    <section className="recent-orders-card">
      <div className="recent-orders-header">
        <div>
          <h3>Recent Orders</h3>
          <p>Your latest restaurant orders</p>
        </div>

        <button onClick={onViewAll} className="recent-orders-view">
          View all <ArrowRight size={15} />
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="recent-orders-empty">
          <ClipboardList size={35} />
          <h4>No orders yet</h4>
          <p>New restaurant orders will appear here.</p>
        </div>
      ) : (
        <div className="recent-orders-table-wrapper">
          <table className="recent-orders-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customer_name || "Customer"}</td>
                  <td>
                    {Number(order.total_amount || 0).toLocaleString()}
                  </td>
                  <td>
                    <span className="recent-order-status">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default RecentOrders;
import { Clock, CheckCircle2, ChefHat } from "lucide-react";
import "./OrderActivity.css";

const activities = [
  {
    title: "New orders",
    description: "Orders received",
    value: "—",
    icon: Clock,
  },
  {
    title: "Preparing",
    description: "Orders being prepared",
    value: "—",
    icon: ChefHat,
  },
  {
    title: "Completed",
    description: "Orders completed",
    value: "—",
    icon: CheckCircle2,
  },
];

function OrderActivity() {
  return (
    <section className="activity-card">
      <div className="activity-header">
        <h3>Order Activity</h3>
        <span>Live overview</span>
      </div>

      <div className="activity-list">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div className="activity-item" key={activity.title}>
              <div className="activity-icon">
                <Icon size={19} />
              </div>

              <div className="activity-description">
                <strong>{activity.title}</strong>
                <span>{activity.description}</span>
              </div>

              <strong className="activity-value">
                {activity.value}
              </strong>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default OrderActivity;
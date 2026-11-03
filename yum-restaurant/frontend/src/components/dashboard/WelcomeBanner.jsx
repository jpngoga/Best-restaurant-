import { Plus, CalendarDays } from "lucide-react";
import "./WelcomeBanner.css";

function WelcomeBanner({ onNewOrder }) {
  return (
    <section className="welcome-banner">
      <div className="welcome-content">
        <span className="welcome-label">RESTAURANT OVERVIEW</span>
        <h2>Welcome back, Administrator!</h2>
        <p>
          Here's what's happening with your restaurant today.
          Manage your operations from one place.
        </p>

        <button className="welcome-button" onClick={onNewOrder}>
          <Plus size={18} />
          New Order
        </button>
      </div>

      <div className="welcome-decoration">
        <div className="welcome-decoration-icon">
          <CalendarDays size={38} />
        </div>
        <span>Manage your day</span>
      </div>
    </section>
  );
}

export default WelcomeBanner;
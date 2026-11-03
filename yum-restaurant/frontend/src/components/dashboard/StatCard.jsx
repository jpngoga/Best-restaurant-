import "./StatCard.css";

function StatCard({ title, value, subtitle, icon: Icon, trend }) {
  return (
    <article className="stat-card">
      <div className="stat-card-top">
        <span className="stat-card-title">{title}</span>

        <div className="stat-card-icon">
          <Icon size={20} />
        </div>
      </div>

      <h3 className="stat-card-value">{value}</h3>

      <div className="stat-card-bottom">
        {trend && <span className="stat-card-trend">{trend}</span>}
        <span className="stat-card-subtitle">{subtitle}</span>
      </div>
    </article>
  );
}

export default StatCard;
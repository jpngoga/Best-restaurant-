import {
  ClipboardList,
  DollarSign,
  Users,
  UtensilsCrossed,
} from "lucide-react";

import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import StatCard from "../components/dashboard/StatCard";
import SalesOverview from "../components/dashboard/SalesOverview";
import OrderActivity from "../components/dashboard/OrderActivity";
import RecentOrders from "../components/dashboard/RecentOrders";

import "./Dashboard.css";

function Dashboard({ onNavigate }) {
  const statistics = [
    {
      title: "Total Orders",
      value: "—",
      subtitle: "Live data from Django",
      icon: ClipboardList,
    },
    {
      title: "Total Revenue",
      value: "—",
      subtitle: "Live data from Django",
      icon: DollarSign,
    },
    {
      title: "Customers",
      value: "—",
      subtitle: "Live data from Django",
      icon: Users,
    },
    {
      title: "Menu Items",
      value: "—",
      subtitle: "Live data from Django",
      icon: UtensilsCrossed,
    },
  ];

  return (
    <main className="dashboard-page">
      <WelcomeBanner onNewOrder={() => onNavigate("Orders")} />

      <section className="dashboard-statistics">
        {statistics.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      <section className="dashboard-middle">
        <SalesOverview />
        <OrderActivity />
      </section>

      <RecentOrders onViewAll={() => onNavigate("Orders")} />
    </main>
  );
}

export default Dashboard;
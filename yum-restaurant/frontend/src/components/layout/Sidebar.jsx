
import {
  LayoutDashboard,
  ClipboardList,
  UtensilsCrossed,
  ChefHat,
  CalendarDays,
  Users,
  Package,
  CreditCard,
  BarChart3,
  Settings,
  X,
} from "lucide-react";

import "./Sidebar.css";

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Orders", icon: ClipboardList },
  { name: "Menu Management", icon: UtensilsCrossed },
  { name: "Kitchen", icon: ChefHat },
  { name: "Reservations", icon: CalendarDays },
  { name: "Customers", icon: Users },
  { name: "Inventory", icon: Package },
  { name: "Payments", icon: CreditCard },
  { name: "Reports", icon: BarChart3 },
];

function Sidebar({
  activePage,
  onNavigate,
  sidebarOpen,
  onClose,
  onProfileClick,
  currentUser,
}) {
  const displayName = currentUser
    ? `${currentUser.first_name || ""} ${currentUser.last_name || ""}`.trim()
      || currentUser.username
    : "Administrator";

  const role = currentUser?.role || "Restaurant Admin";

  const initials = currentUser
    ? (
        currentUser.first_name?.[0] ||
        currentUser.username?.[0] ||
        "A"
      ).toUpperCase()
    : "A";

  return (
    <>
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
        ></div>
      )}

      <aside
        className={`sidebar ${
          sidebarOpen ? "sidebar-open" : ""
        }`}
      >
        <div className="sidebar-brand">
          <div className="sidebar-logo">R</div>

          <div className="sidebar-brand-text">
            <h2>Restobit</h2>
            <span>Restaurant Management</span>
          </div>

          <button
            className="sidebar-close"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-section-label">
          MENU
        </div>

        <nav className="sidebar-navigation">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`sidebar-link ${
                  activePage === item.name ? "active" : ""
                }`}
                onClick={() => {
                  onNavigate(item.name);
                  onClose();
                }}
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <button
            className={`sidebar-link ${
              activePage === "Settings" ? "active" : ""
            }`}
            onClick={() => {
              onNavigate("Settings");
              onClose();
            }}
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>

          <button
            className="sidebar-profile"
            onClick={onProfileClick}
            aria-label="Open account and login"
          >
            <div className="sidebar-avatar">{initials}</div>

            <div className="sidebar-profile-text">
              <strong>{displayName}</strong>
              <span>{role}</span>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;

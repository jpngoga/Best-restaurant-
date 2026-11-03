
import {
  Menu,
  Search,
  Bell,
  ChevronRight,
} from "lucide-react";

import "./Header.css";

function Header({
  activePage,
  onMenuClick,
  onProfileClick,
  currentUser,
}) {
  const initials = currentUser
    ? (
        currentUser.first_name?.[0] ||
        currentUser.username?.[0] ||
        "A"
      ).toUpperCase()
    : "A";

  return (
    <header className="header">
      <div className="header-left">
        <button
          className="header-menu-button"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>

        <div className="header-heading">
          <div className="header-breadcrumb">
            <span>Restobit</span>
            <ChevronRight size={14} />
            <strong>{activePage}</strong>
          </div>

          <h1>{activePage}</h1>
        </div>
      </div>

      <div className="header-actions">
        <div className="header-search">
          <Search size={18} />
          <input
            type="search"
            placeholder="Search anything..."
            aria-label="Search"
          />
          <span>⌘ K</span>
        </div>

        <button
          className="header-notification"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <button
          className="header-user-avatar"
          onClick={onProfileClick}
          aria-label="Open account and login"
          title="Account / Login"
        >
          {initials}
        </button>
      </div>
    </header>
  );
}

export default Header;

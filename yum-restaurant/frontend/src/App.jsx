
import { useState } from "react";

import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import AuthModal from "./components/auth/AuthModal";

import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Menu from "./pages/Menu";
import Kitchen from "./pages/Kitchen";
import Reservations from "./pages/Reservations";
import Customers from "./pages/Customers";
import Inventory from "./pages/Inventory";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";

import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });

  const handleNavigate = (page) => {
    setActivePage(page);
  };

  const handleAuthenticated = (response) => {
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));

    setCurrentUser(response.user);
    setAuthOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setCurrentUser(null);
    setAuthOpen(false);
  };

  const implementedPages = [
    "Dashboard",
    "Orders",
    "Menu Management",
    "Kitchen",
    "Reservations",
    "Customers",
    "Inventory",
    "Payments",
    "Reports",
  ];

  return (
    <div className="app-container">
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onProfileClick={() => setAuthOpen(true)}
        currentUser={currentUser}
      />

      <div className="app-main">
        <Header
          activePage={activePage}
          onMenuClick={() => setSidebarOpen(true)}
          onProfileClick={() => setAuthOpen(true)}
          currentUser={currentUser}
        />

        {activePage === "Dashboard" && (
          <Dashboard onNavigate={handleNavigate} />
        )}

        {activePage === "Orders" && <Orders />}

        {activePage === "Kitchen" && <Kitchen />}

        {activePage === "Reservations" && <Reservations />}

        {activePage === "Customers" && <Customers />}

        {activePage === "Inventory" && <Inventory />}

        {activePage === "Payments" && <Payments />}

        {activePage === "Reports" && <Reports />}

        {activePage === "Menu Management" && <Menu />}

        {!implementedPages.includes(activePage) && (
          <main className="page-placeholder">
            <h2>{activePage}</h2>
            <p>This section is coming soon.</p>
          </main>
        )}
      </div>

      {authOpen && (
        <AuthModal
          onClose={() => setAuthOpen(false)}
          onAuthenticated={handleAuthenticated}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;

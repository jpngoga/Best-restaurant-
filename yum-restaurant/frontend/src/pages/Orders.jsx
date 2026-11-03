
import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  ShoppingBag,
  Clock,
  CheckCircle2,
  XCircle,
  Minus,
  Trash2,
  X,
  LoaderCircle,
  UtensilsCrossed,
} from "lucide-react";

import { apiRequest } from "../services/api";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const formatMoney = (amount) =>
    new Intl.NumberFormat("en-RW", {
      style: "currency",
      currency: "RWF",
      maximumFractionDigits: 0,
    }).format(Number(amount || 0));

 const loadMenuItems = async () => {
  try {
    const menuData = await apiRequest("menu/");

    const items = Array.isArray(menuData)
      ? menuData
      : menuData.results || [];

    setMenuItems(items.filter((item) => item.is_available === true));
  } catch (err) {
    setError(err.message || "Could not load menu items.");
  }
};

const loadOrders = async () => {
  setLoading(true);

  try {
    const orderData = await apiRequest("orders/");

    const savedOrders = Array.isArray(orderData)
      ? orderData
      : orderData.results || [];

    setOrders(savedOrders);
  } catch (err) {
    setError(err.message || "Could not load orders.");
  } finally {
    setLoading(false);
  }
};

const loadData = async () => {
  await Promise.all([loadMenuItems(), loadOrders()]);
};

useEffect(() => {
  loadData();
}, []);

  const filteredMenu = useMemo(() => {
    return menuItems.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [menuItems, search]);

  const addToCart = (item) => {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existing) {
        return currentCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...currentCart, { ...item, quantity: 1 }];
    });

    setError("");
    setMessage("");
  };

  const changeQuantity = (id, amount) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cartTotal = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (cart.length === 0) {
      setError("Please add at least one meal to your order.");
      return;
    }

    setSubmitting(true);
    setError("");
    setMessage("");

    try {
      const result = await apiRequest("orders/", {
        method: "POST",
        body: JSON.stringify({
          items: cart.map((item) => ({
            menu_item: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      setOrders((currentOrders) => [result, ...currentOrders]);
      setCart([]);
      setModalOpen(false);
      setMessage(`Order #${result.id} placed successfully!`);
    } catch (err) {
      setError(err.message || "Unable to place your order.");
    } finally {
      setSubmitting(false);
    }
  };

  const getOrderItemName = (orderItem) => {
    const menuItemId =
      typeof orderItem.menu_item === "object"
        ? orderItem.menu_item.id
        : orderItem.menu_item;

    const menuItem = menuItems.find(
      (item) => item.id === menuItemId
    );

    return menuItem?.name || `Menu item #${menuItemId}`;
  };

  const stats = [
    {
      title: "Total Orders",
      value: orders.length,
      icon: ShoppingBag,
    },
    {
      title: "Pending",
      value: orders.filter((order) => order.status === "PENDING").length,
      icon: Clock,
    },
    {
      title: "Completed",
      value: orders.filter((order) => order.status === "COMPLETED").length,
      icon: CheckCircle2,
    },
    {
      title: "Cancelled",
      value: orders.filter((order) => order.status === "CANCELLED").length,
      icon: XCircle,
    },
  ];

  return (
    <main className="orders-page">
      <div className="orders-heading">
        <div>
          <h2>Orders Management</h2>
          <p>Manage and track all restaurant orders.</p>
        </div>

        <button
          className="orders-new-button"
           onClick={() => {
            setModalOpen(true);
            setError("");
            setMessage("");
            setSearch("");
            loadMenuItems();
      }}
        >
          <Plus size={18} />
          Create Order
        </button>
      </div>

      {error && <p className="orders-message error">{error}</p>}
      {message && <p className="orders-message success">{message}</p>}

      <section className="orders-stat-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article className="orders-stat-card" key={stat.title}>
              <div className="orders-stat-icon">
                <Icon size={20} />
              </div>
              <p>{stat.title}</p>
              <h3>{stat.value}</h3>
            </article>
          );
        })}
      </section>

      <section className="orders-table-card">
        <div className="orders-table-heading">
          <div>
            <h3>All Orders</h3>
            <p>View and track your restaurant orders.</p>
          </div>

          <div className="orders-search">
            <Search size={17} />
            <input
              placeholder="Search orders..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="orders-empty">
            <LoaderCircle className="orders-spinner" size={28} />
            <p>Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="orders-empty">
            <ShoppingBag size={38} />
            <h3>No orders yet</h3>
            <p>
              Click Create Order to choose meals from your restaurant menu.
            </p>
          </div>
        ) : (
          <div className="orders-table-wrap">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {orders
                  .filter((order) =>
                    String(order.id).includes(search) ||
                    order.status.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((order) => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>
                        {order.items?.map((item) => (
                          <div key={item.id}>
                            {getOrderItemName(item)} × {item.quantity}
                          </div>
                        ))}
                      </td>
                      <td>{formatMoney(order.total_amount)}</td>
                      <td>
                        <span
                          className={`orders-status ${order.status.toLowerCase()}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td>
                        {order.created_at
                          ? new Date(order.created_at).toLocaleDateString()
                          : "—"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {modalOpen && (
        <div
          className="orders-modal-overlay"
          onClick={() => setModalOpen(false)}
        >
          <section
            className="orders-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="orders-modal-heading">
              <div>
                <h2>Create New Order</h2>
                <p>Select meals and add them to your order.</p>
              </div>

              <button
                className="orders-close-button"
                onClick={() => setModalOpen(false)}
                aria-label="Close order form"
              >
                <X size={21} />
              </button>
            </div>

            {error && <p className="orders-message error">{error}</p>}

            <div className="orders-modal-search">
              <Search size={17} />
              <input
                placeholder="Search available meals..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <div className="orders-menu-grid">
              {filteredMenu.map((item) => (
                <article className="orders-menu-item" key={item.id}>
                  {item.image ? (
                    <img src={item.image} alt={item.name} />
                  ) : (
                    <div className="orders-menu-placeholder">
                      <UtensilsCrossed size={28} />
                    </div>
                  )}

                  <div className="orders-menu-item-info">
                    <h3>{item.name}</h3>
                    <p>{item.category_name || "Restaurant meal"}</p>
                    <strong>{formatMoney(item.price)}</strong>

                    <button onClick={() => addToCart(item)}>
                      <Plus size={15} /> Add to order
                    </button>
                  </div>
                </article>
              ))}

              {filteredMenu.length === 0 && (
                <p className="orders-no-menu">
                  No available meals found. Import meals into your menu first.
                </p>
              )}
            </div>

            <div className="orders-cart">
              <h3>
                <ShoppingBag size={19} /> Your Order ({cart.length} items)
              </h3>

              {cart.length === 0 ? (
                <p className="orders-cart-empty">
                  Your cart is empty. Add a meal to get started.
                </p>
              ) : (
                <>
                  {cart.map((item) => (
                    <div className="orders-cart-row" key={item.id}>
                      <div>
                        <strong>{item.name}</strong>
                        <p>{formatMoney(item.price)} each</p>
                      </div>

                      <div className="orders-quantity">
                        <button
                          onClick={() => changeQuantity(item.id, -1)}
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          <Minus size={14} />
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() => changeQuantity(item.id, 1)}
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          <Plus size={14} />
                        </button>

                        <button
                          className="orders-remove"
                          onClick={() =>
                            setCart((current) =>
                              current.filter((entry) => entry.id !== item.id)
                            )
                          }
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <strong>
                        {formatMoney(Number(item.price) * item.quantity)}
                      </strong>
                    </div>
                  ))}

                  <div className="orders-cart-total">
                    <span>Total</span>
                    <strong>{formatMoney(cartTotal)}</strong>
                  </div>
                </>
              )}
            </div>

            <button
              className="orders-place-button"
              onClick={placeOrder}
              disabled={submitting || cart.length === 0}
            >
              {submitting ? (
                <>
                  <LoaderCircle className="orders-spinner" size={18} />
                  Placing Order...
                </>
              ) : (
                <>Place Order · {formatMoney(cartTotal)}</>
              )}
            </button>
          </section>
        </div>
      )}
    </main>
  );
}

export default Orders;

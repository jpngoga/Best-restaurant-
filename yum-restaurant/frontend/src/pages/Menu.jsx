import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  UtensilsCrossed,
  Coffee,
  Salad,
  MoreVertical,
  LoaderCircle,
  Check,
} from "lucide-react";

import { apiRequest } from "../services/api";
import "./Menu.css";

const MEAL_API = "https://www.themealdb.com/api/json/v1/1";
const BACKEND_API = "http://127.0.0.1:8001/api";

function Menu() {
  const [meals, setMeals] = useState([]);
  const [savedMeals, setSavedMeals] = useState([]);
  const [search, setSearch] = useState("chicken");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [adding, setAdding] = useState(null);

  const searchMeals = async (term = search) => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `${MEAL_API}/search.php?s=${encodeURIComponent(term)}`
      );

      if (!response.ok) {
        throw new Error("Unable to contact TheMealDB.");
      }

      const data = await response.json();
      setMeals(data.meals || []);

      if (!data.meals) {
        setMessage("No meals found. Try another search.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const loadSavedMeals = async () => {
    try {
      const data = await apiRequest("menu/");
      setSavedMeals(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      console.error("Could not load saved menu items:", err);
    }
  };

  useEffect(() => {
    searchMeals("chicken");
    loadSavedMeals();
  }, []);

  const isMealAdded = (meal) =>
    savedMeals.some(
      (saved) =>
        saved.name?.trim().toLowerCase() ===
        meal.strMeal?.trim().toLowerCase()
    );

  const addMeal = async (meal) => {
    if (isMealAdded(meal)) {
      setMessage(`${meal.strMeal} is already in your menu.`);
      return;
    }

    const price = window.prompt(
      `Enter the selling price for ${meal.strMeal} in RWF:`,
      "8000"
    );

    if (price === null) return;

    if (!/^\d+(\.\d{1,2})?$/.test(price) || Number(price) <= 0) {
      setError("Please enter a valid price greater than zero.");
      return;
    }

   setAdding(meal.idMeal);
setError("");
setMessage("");

try {
  const result = await apiRequest("menu/import-meal/", {
    method: "POST",
    body: JSON.stringify({
      meal_id: meal.idMeal,
      price,
    }),
  });

  setMessage(
    result.message || `${meal.strMeal} added to your menu.`
  );

  await loadSavedMeals();
} catch (err) {
  setError(err.message || "Could not add this dish.");
} finally {
  setAdding(null);
}

    if (!token) {
      setError("Please log in before adding dishes to your menu.");
      return;
    }

    setAdding(meal.idMeal);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `${BACKEND_API}/menu/import-meal/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            meal_id: meal.idMeal,
            price,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || result.detail || "Could not add this dish."
        );
      }

      setMessage(result.message || `${meal.strMeal} added to your menu.`);

      // Reload the saved dishes from Django.
      await loadSavedMeals();
    } catch (err) {
      setError(err.message || "Could not add this dish.");
    } finally {
      setAdding(null);
    }
  };

  const categories = new Set(
    meals.map((meal) => meal.strCategory).filter(Boolean)
  );

  return (
    <main className="menu-page">
      <div className="menu-heading">
        <div>
          <h2>Menu Management</h2>
          <p>Add dishes and manage the meals available in your restaurant.</p>
        </div>

        <button
          className="menu-add-button"
          onClick={() => searchMeals(search)}
        >
          <Search size={18} />
          Search Meals
        </button>
      </div>

      <section className="menu-stats">
        <article className="menu-stat-card">
          <UtensilsCrossed size={21} />
          <p>Meals Found</p>
          <h3>{meals.length}</h3>
        </article>

        <article className="menu-stat-card">
          <Coffee size={21} />
          <p>Food Categories</p>
          <h3>{categories.size}</h3>
        </article>

        <article className="menu-stat-card">
          <Salad size={21} />
          <p>Added to Your Menu</p>
          <h3>{savedMeals.length}</h3>
        </article>
      </section>

      <section className="menu-list-card">
        <div className="menu-list-heading">
          <div>
            <h3>Discover Dishes</h3>
            <p>Find dishes and add them to your restaurant menu.</p>
          </div>

          <form
            className="menu-search"
            onSubmit={(event) => {
              event.preventDefault();
              searchMeals();
            }}
          >
            <Search size={17} />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search food..."
            />

            <button type="submit">Search</button>
          </form>
        </div>

        {error && <p className="menu-message error">{error}</p>}
        {message && <p className="menu-message success">{message}</p>}

        {loading ? (
          <div className="menu-loading">
            <LoaderCircle className="menu-spinner" size={28} />
            <p>Loading delicious meals...</p>
          </div>
        ) : (
          <div className="menu-food-grid">
            {meals.map((meal) => {
              const alreadyAdded = isMealAdded(meal);
              const isAdding = adding === meal.idMeal;

              return (
                <article className="menu-food-card" key={meal.idMeal}>
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="menu-food-image"
                    loading="lazy"
                  />

                  <div className="menu-food-content">
                    <div className="menu-food-top">
                      <span className="menu-category">
                        {meal.strCategory || "Meal"}
                      </span>
                      <MoreVertical size={18} />
                    </div>

                    <h3>{meal.strMeal}</h3>

                    <p>{meal.strArea || "International"} cuisine</p>

                    <div className="menu-food-bottom">
                      <span className="menu-example-price">
                        {alreadyAdded ? "In your menu" : "Set price when adding"}
                      </span>

                      <button
                        className={`menu-import-button ${
                          alreadyAdded ? "added" : ""
                        }`}
                        onClick={() => addMeal(meal)}
                        disabled={alreadyAdded || isAdding}
                      >
                        {isAdding ? (
                          <LoaderCircle size={16} className="menu-spinner" />
                        ) : alreadyAdded ? (
                          <Check size={16} />
                        ) : (
                          <Plus size={16} />
                        )}

                        {isAdding
                          ? "Adding..."
                          : alreadyAdded
                            ? "Added"
                            : "Add"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <p className="menu-attribution">
        Recipe information and photographs provided by TheMealDB.
      </p>
    </main>
  );
}

export default Menu;
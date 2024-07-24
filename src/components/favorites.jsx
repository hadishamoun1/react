import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./favorites.css"; // Adjust path as needed

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("user_id");

  useEffect(() => {
    if (!userId) {
      console.error("User ID not found");
      return;
    }

    // Fetch user's favorite recipes
    fetch(
      `http://localhost/react/src/components/favorites-api/get_favorites.php?user_id=${userId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setFavorites(data);
      })
      .catch((error) => console.error("Error fetching favorites:", error));
  }, [userId]);

  const viewRecipe = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <div className="favorites-container">
      <h2>Your Favorite Recipes</h2>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((recipe) => (
            <li key={recipe.id} className="favorite-item">
              <p>Recipe name: {recipe.name}</p>
              <button
                className="btn-view"
                onClick={() => viewRecipe(recipe.id)}
              >
                View Recipe
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no favorite recipes.</p>
      )}
    </div>
  );
}

export default Favorites;

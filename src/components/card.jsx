import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import "./card.css";
import { useNavigate } from "react-router-dom";

function Cards() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    // Fetch recipes
    fetch("http://localhost/react/src/components/read.php")
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error fetching data:", error));

    // Fetch user favorites (assuming user_id is available)
    const userId = sessionStorage.getItem("user_id");
    if (userId) {
      fetch(
        `http://localhost/react/src/components/favorites-api/get_favorites.php?user_id=${userId}`
      )
        .then((response) => response.json())
        .then((data) => {
          const favoritesMap = data.reduce((acc, fav) => {
            acc[fav.recipe_id] = true;
            return acc;
          }, {});
          setFavorites(favoritesMap);
        })
        .catch((error) => console.error("Error fetching favorites:", error));
    }
  }, []);

  const handleToggleFavorite = (recipeId) => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId) {
      console.error("User ID not found");
      return;
    }

    const url = favorites[recipeId]
      ? `http://localhost/react/src/components/favorites-api/remove_favorite.php`
      : `http://localhost/react/src/components/favorites-api/add_favorite.php`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId, recipe_id: recipeId }),
    })
      .then((response) => response.json())
      .then(() => {
        setFavorites((prevFavorites) => ({
          ...prevFavorites,
          [recipeId]: !prevFavorites[recipeId],
        }));
      })
      .catch((error) => console.error("Error toggling favorite:", error));
  };

  const viewRecipe = (recipe) => {
    navigate(`/recipe/${recipe.id}`);
  };

  const shareRecipe = (recipe) => {
    const url = `${window.location.origin}/recipe/${recipe.id}`;
    navigator.clipboard.writeText(url).then(
      () => {
        alert("Recipe URL copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <div className="cards-container">
      {recipes.map((recipe, index) => (
        <div key={index} className="container">
          <p className="recipe-name">Recipe name: {recipe.name}</p>
          <h6 className="date-created">Date Created: {recipe.created_at}</h6>
          <FaStar
            onClick={() => handleToggleFavorite(recipe.id)}
            style={{
              color: favorites[recipe.id] ? "yellow" : "grey",
              cursor: "pointer",
              marginRight: "10px",
            }}
            className={favorites[recipe.id] ? "star-glow" : ""}
          />
          <div className="view-recipe-btn-container">
            <button
              onClick={() => viewRecipe(recipe)}
              className="view-recipe-btn"
            >
              View Recipe
            </button>
            <button
              onClick={() => shareRecipe(recipe)}
              className="share-recipe-btn"
            >
              Share Recipe
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;

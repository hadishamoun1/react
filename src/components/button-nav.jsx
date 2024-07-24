import React from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

export default function Button() {
  const navigate = useNavigate();

  const createRecipe = () => {
    navigate(`/create-recipe`);
  };

  return (
    <div className="btn-pos">
      <button onClick={() => createRecipe()} className="create-recipe-btn">
        Create recipe
      </button>
    </div>
  );
}

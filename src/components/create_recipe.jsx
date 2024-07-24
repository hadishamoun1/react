// src/components/CreateRecipe.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./create_recipe.css";

function CreateRecipe() {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [comments, setComment] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost/react/src/components/create.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            ingredients,
            steps,
            created_at: createdAt,
            comments,
          }),
        }
      );

      const data = await response.json();
      console.log("Success:", data);

      if (data.error) {
        setResponseMessage(`Error: ${data.error}`);
      } else {
        setResponseMessage(`Success: ${data.message}`);
        navigate("/");
      }
    } catch (error) {
      console.log("Error:", error);
      setResponseMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="center-wrapper">
      <div className="create-recipe-container">
        <h2>Create a New Recipe</h2>
        <form className="form-pos" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label-txt">Recipe Name:</label>
            <input
              className="input-field"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="label-txt">Ingredients:</label>
            <textarea
              className="input-field"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="label-txt">Steps:</label>
            <textarea
              className="input-field"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="label-txt">Created At:</label>
            <input
              className="input-field"
              type="datetime-local"
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="label-txt">Comments:</label>
            <textarea
              className="input-field"
              value={comments}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
          <button type="submit">Create Recipe</button>
        </form>
      </div>
    </div>
  );
}

export default CreateRecipe;

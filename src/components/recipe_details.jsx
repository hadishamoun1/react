import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./recipe_details.css";
import { useNavigate } from "react-router-dom";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);
  const navigate = useNavigate();

  const fetchRecipeDetails = () => {
    fetch(`http://localhost/react/src/components/read.php?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipe(data);
        console.log(id);
        console.log("Fetched data:", data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchRecipeDetails();
  }, [id]);
  const done_btn = () => {
    navigate(`/main`);
    console.log(recipe);
  };

  const downloadRecipe = () => {
    const recipeDetails = `
      Recipe Name: ${recipe[id - 1].name}
      Ingredients: ${recipe[id - 1].ingredients}
      Steps: ${recipe[id - 1].steps}
      Created At: ${recipe[id - 1].created_at}
      Comments: ${recipe[id - 1].comments}
    `;

    const blob = new Blob([recipeDetails], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${recipe[id - 1].name}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddComment = () => {
    fetch(`http://localhost/react/src/components/update.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, comments: newComment }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRecipe((prevRecipe) => ({
          ...prevRecipe,
          comments: newComment,
        }));
        setShowCommentForm(false);
        setNewComment("");
        fetchRecipeDetails();
      })
      .catch((error) => console.error("Error updating comment:", error));
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-recipedetails">
      <div className="view-recipe-container">
        <div>
          <h2 className="recipe-name">{recipe[id - 1].name}</h2>
          <p>Ingredients: {recipe[id - 1].ingredients}</p>
          <p>Steps: {recipe[id - 1].steps}</p>
          <p>Created_at: {recipe[id - 1].created_at}</p>
          <p>Comments: {recipe[id - 1].comments || "No comments yet"}</p>
        </div>

        <div className="btn-done">
          <button onClick={done_btn} className="btn-pos1">
            Done
          </button>
          <button onClick={downloadRecipe} className="btn-pos2">
            Download
          </button>
          {!recipe[id - 1].comments && (
            <button
              onClick={() => setShowCommentForm(true)}
              className="btn-add-comment"
            >
              Add Comment
            </button>
          )}
        </div>

        {showCommentForm && (
          <div className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add your comment here"
            />
            <button onClick={handleAddComment}>Submit Comment</button>
            <button onClick={() => setShowCommentForm(false)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeDetails;

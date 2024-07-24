import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cards from "./components/card";
import NavBar from "./components/navbar";
import RecipeDetails from "./components/recipe_details";
import Button from "./components/button-nav";
import CreateRecipe from "./components/create_recipe";
import Favorites from "./components/favorites";
import Login from "./components/login";

function MyApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/main"
          element={
            <div>
              <NavBar />
              <Button />
              <Cards />
            </div>
          }
        />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route
          path="/favorites"
          element={
            <div>
              <NavBar />

              <Favorites />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default MyApp;

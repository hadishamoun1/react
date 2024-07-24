import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="nav">
      <div className="my-recipe-txt">My Recipes</div>
      <Link className="nav-txt" to="/main">
        Home
      </Link>
      <Link className="nav-txt" to="/favorites">
        Favorites
      </Link>
    </nav>
  );
}

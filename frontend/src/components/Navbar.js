import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar navbar-expand navbar-light bg-light">
    <div className="container">
      <Link className="navbar-brand" to="/">Accueil</Link>
      {/* Ajoutez ici d'autres liens globaux si besoin */}
    </div>
  </nav>
);

export default Navbar;

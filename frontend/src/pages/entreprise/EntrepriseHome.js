import React from "react";
import { Link } from "react-router-dom";

const EntrepriseHome = () => (
  <div className="container mt-5">
    <h2 className="mb-4 text-center">Espace Entreprise</h2>
    <div className="row justify-content-center">
      <div className="col-md-6 mb-3">
        <div className="card shadow p-3 text-center">
          <h5>Demandes reçues</h5>
          <Link to="/entreprise/demandes" className="btn btn-primary mt-2">Voir les demandes</Link>
        </div>
      </div>
      {/* Ajoutez ici d'autres fonctionnalités spécifiques à l'entreprise */}
    </div>
  </div>
);

export default EntrepriseHome;

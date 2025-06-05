import React from "react";
import { Link } from "react-router-dom";

const AdminHome = () => (
  <div className="container mt-5">
    <h2 className="mb-4 text-center">Espace Administration</h2>
    <div className="row justify-content-center">
      <div className="col-md-3 mb-3">
        <div className="card shadow p-3 text-center">
          <h5>Gestion des comptes utilisateurs</h5>
          <Link to="/admin/utilisateurs" className="btn btn-primary mt-2">Gérer les utilisateurs</Link>
        </div>
      </div>
      <div className="col-md-3 mb-3">
        <div className="card shadow p-3 text-center">
          <h5>Statistiques</h5>
          <Link to="/admin/statistiques" className="btn btn-info mt-2">Voir les statistiques</Link>
        </div>
      </div>
      <div className="col-md-3 mb-3">
        <div className="card shadow p-3 text-center">
          <h5>Affectation entreprises/étudiants</h5>
          <Link to="/admin/affectation" className="btn btn-success mt-2">Affecter</Link>
        </div>
      </div>
      <div className="col-md-3 mb-3">
        <div className="card shadow p-3 text-center">
          <h5>Espace Tuteur</h5>
          <Link to="/tuteur" className="btn btn-secondary mt-2">Accéder</Link>
        </div>
      </div>
    </div>
  </div>
);

export default AdminHome;

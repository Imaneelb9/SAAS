import React from "react";
import { Link } from "react-router-dom";

const EtudiantHome = () => (
  <div className="container mt-5">
    <h2 className="mb-4 text-center">Espace Étudiant</h2>
    <div className="row justify-content-center">
      <div className="col-md-5 mb-3">
        <div className="card shadow p-3 text-center">
          <h5>Mes demandes de stage</h5>
          <Link to="/etudiant/mes-demandes" className="btn btn-primary mt-2">
            Voir mes demandes
          </Link>
        </div>
      </div>
      <div className="col-md-5 mb-3">
        <div className="card shadow p-3 text-center">
          <h5>Soumettre une nouvelle demande</h5>
          <Link to="/etudiant/ajouter-demande" className="btn btn-success mt-2">
            Ajouter une demande
          </Link>
        </div>
      </div>
      <div className="col-md-10 mb-3">
        <div className="card shadow p-3 text-center">
          <h5>Gérer mes documents</h5>
          <div className="d-flex justify-content-center gap-3 mt-2 flex-wrap">
            <Link to="/etudiant/cv" className="btn btn-outline-success">
              ✅ Gérer mon CV
            </Link>
            <Link to="/etudiant/lettre" className="btn btn-outline-primary">
              ✅ Gérer ma lettre de motivation
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default EtudiantHome;

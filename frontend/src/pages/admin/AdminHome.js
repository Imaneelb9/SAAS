import React from "react";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Espace Administration</h2>
      <div className="row justify-content-center">
        <div className="col-md-4 mb-3">
          <div className="card shadow p-3 text-center">
            <h5>Gestion des comptes utilisateurs</h5>
            <button className="btn btn-primary mt-2" onClick={() => navigate("/admin/utilisateurs")}>
              Activer / Désactiver des comptes
            </button>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow p-3 text-center">
            <h5>Gestion des comptes tuteurs</h5>
            <button className="btn btn-warning mt-2" onClick={() => navigate("/admin/tuteurs")}>
              Gérer les tuteurs
            </button>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow p-3 text-center">
            <h5>Statistiques des stages</h5>
            <button className="btn btn-info mt-2" onClick={() => navigate("/admin/statistiques")}>
              Voir les statistiques
            </button>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow p-3 text-center">
            <h5>Affectation d'entreprises aux étudiants</h5>
            <button className="btn btn-success mt-2" onClick={() => navigate("/admin/affectation")}>
              Affecter une entreprise
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

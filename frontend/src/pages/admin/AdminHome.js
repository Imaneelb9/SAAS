import React from "react";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Espace Administration</h2>
      <div className="d-flex flex-column align-items-center">
        <button className="btn btn-primary mb-2" onClick={() => navigate("/admin/utilisateurs")}>
          Gestion des comptes utilisateurs
        </button>
        <button className="btn btn-info mb-2" onClick={() => navigate("/admin/statistiques")}>
          Statistiques des stages
        </button>
        <button className="btn btn-success mb-2" onClick={() => navigate("/admin/affectation")}>
          Affectation entreprises/étudiants
        </button>
        <button className="btn btn-secondary" onClick={() => navigate("/tuteur")}>
          Espace Tuteur
        </button>
      </div>
    </div>
  );
};

export default AdminHome;

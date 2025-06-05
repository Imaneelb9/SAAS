import React, { useEffect, useState } from "react";
import axios from "axios";

const TuteurHome = () => {
  const [etudiants, setEtudiants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Remplacez l'URL par celle de votre backend pour récupérer les étudiants encadrés par ce tuteur
    axios
      .get("http://localhost:5000/api/tuteur/etudiants", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then((res) => setEtudiants(res.data))
      .catch(() => setEtudiants([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Espace Tuteur</h2>
      <div className="card shadow p-4 mb-4">
        <p>
          Bienvenue dans l’espace Tuteur.<br />
          Ici, vous pourrez suivre les étudiants encadrés, valider les rapports de stage, et communiquer avec l’administration ou les entreprises.
        </p>
      </div>
      <div className="card shadow p-4">
        <h4>Étudiants encadrés</h4>
        {loading ? (
          <p>Chargement...</p>
        ) : etudiants.length === 0 ? (
          <p>Aucun étudiant encadré pour le moment.</p>
        ) : (
          <ul>
            {etudiants.map((etudiant) => (
              <li key={etudiant.id}>
                {etudiant.nom} {etudiant.prenom} - {etudiant.email}
                {/* Ajoutez ici des boutons ou liens pour valider les rapports, voir les détails, etc. */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TuteurHome;

// frontend/src/pages/etudiant/MesDemandes.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MesDemandes = () => {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5000/api/stages/mes", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setDemandes(res.data))
      .catch(err => {
        alert("Erreur : " + (err.response?.data?.error || err.message));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Espace Étudiant - Mes demandes de stage</h2>
        <Link to="/etudiant/ajouter-demande" className="btn btn-primary">
          Ajouter une demande
        </Link>
      </div>
      {demandes.length === 0 ? (
        <p>Aucune demande trouvée.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Entreprise</th>
              <th>Durée</th>
              <th>Tuteur</th>
              <th>Statut</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {demandes.map(demande => (
              <tr key={demande.id}>
                <td>{demande.titre}</td>
                <td>{demande.entreprise}</td>
                <td>{demande.duree}</td>
                <td>{demande.tuteur}</td>
                <td>
                  <span className={
                    demande.status === "en attente" ? "badge bg-warning" :
                    demande.status === "valide" ? "badge bg-success" :
                    "badge bg-danger"
                  }>
                    {demande.status}
                  </span>
                </td>
                <td>{demande.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MesDemandes;
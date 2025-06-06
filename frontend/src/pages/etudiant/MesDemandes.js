// frontend/src/pages/etudiant/MesDemandes.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MesDemandes = () => {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fonction pour rafraîchir les demandes
  const fetchDemandes = () => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5000/api/stages/mes", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setDemandes(res.data))
      .catch(err => {
        alert("Erreur : " + (err.response?.data?.error || err.message));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDemandes();
    // Optionnel : rafraîchissement auto toutes les 10s
    // const interval = setInterval(fetchDemandes, 10000);
    // return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Espace Étudiant - Mes demandes de stage</h2>
        <Link to="/etudiant/ajouter-demande" className="btn btn-primary">
          Ajouter une demande
        </Link>
        <button className="btn btn-outline-secondary ms-2" onClick={fetchDemandes}>
          Rafraîchir
        </button>
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
                    demande.status === "accepté" ? "badge bg-success" :
                    demande.status === "refusé" ? "badge bg-danger" :
                    "badge bg-secondary"
                  }>
                    {demande.status === "accepté"
                      ? "Acceptée"
                      : demande.status === "refusé"
                      ? "Refusée"
                      : demande.status === "en attente"
                      ? "En attente"
                      : demande.status}
                  </span>
                </td>
                <td>{demande.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/*
      Le statut affiché dans l'espace étudiant est toujours synchronisé car il dépend du champ "status" de la table Stage.
      Quand l'admin affecte une entreprise à un étudiant ou quand l'entreprise accepte/refuse, le backend met à jour ce champ.
      Le frontend recharge la liste (fetchDemandes) pour afficher le statut à jour.
      */}
    </div>
  );
};

export default MesDemandes;
import React, { useEffect, useState } from "react";
import axios from "axios";

const DemandesRecues = () => {
  const [demandes, setDemandes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/entreprises/demandes", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => setDemandes(res.data))
      .catch(err => {
        alert("Erreur : " + (err.response?.data?.error || err.message));
      });
  }, []);

  const handleAction = (id, action, commentaire) => {
    axios.post(`/api/entreprises/demandes/${id}/${action}`, { commentaire }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(() => {
      setDemandes(demandes =>
        demandes.map(d =>
          d.id === id ? { ...d, statut: action, commentaireEntreprise: commentaire } : d
        )
      );
    });
  };

  return (
    <div className="container mt-5">
      <h2>Demandes reçues</h2>
      {demandes.length === 0 ? (
        <p>Aucune demande reçue.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Étudiant</th>
              <th>Titre</th>
              <th>Description</th>
              <th>Statut</th>
              <th>Commentaire</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {demandes.map(demande => (
              <tr key={demande.id}>
                <td>{demande.etudiantNom}</td>
                <td>{demande.titre}</td>
                <td>{demande.description}</td>
                <td>{demande.statut}</td>
                <td>
                  <input
                    type="text"
                    defaultValue={demande.commentaireEntreprise || ""}
                    onBlur={e => handleAction(demande.id, demande.statut, e.target.value)}
                  />
                </td>
                <td>
                  <button className="btn btn-success btn-sm m-1" onClick={() => handleAction(demande.id, "accepte", demande.commentaireEntreprise)}>
                    Accepter
                  </button>
                  <button className="btn btn-danger btn-sm m-1" onClick={() => handleAction(demande.id, "refuse", demande.commentaireEntreprise)}>
                    Refuser
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DemandesRecues;

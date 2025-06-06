import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EntrepriseHome = () => {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentaires, setCommentaires] = useState({});
  const navigate = useNavigate();

  // Fonction pour charger les demandes depuis le backend
  const fetchDemandes = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/entreprises/demandes", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then((res) => setDemandes(res.data))
      .catch(() => setDemandes([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDemandes();
  }, []);

  const handleAction = (id, action) => {
    axios
      .post(
        `http://localhost:5000/api/entreprises/demandes/${id}/${action}`,
        { commentaire: commentaires[id] || "" },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      .then(() => {
        fetchDemandes();
      })
      .catch(err => {
        alert(
          "Erreur lors de la mise à jour : " +
          (err.response?.data?.error || err.response?.data?.message || err.message) +
          "\nVérifiez que la route backend POST /api/entreprises/demandes/" + id + "/" + action + " existe bien sur le serveur.\n" +
          "Vérifiez aussi que le backend est bien démarré sur http://localhost:5000."
        );
        if (err.response) {
          console.error("Erreur HTTP", err.response.status, err.response.data);
        } else {
          console.error("Erreur réseau :", err.message);
        }
      });
  };

  const handleCommentChange = (id, value) => {
    setCommentaires({ ...commentaires, [id]: value });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* Flèche back pour revenir à l'accueil */}
        <span
          style={{ fontSize: "2rem", cursor: "pointer", marginRight: "1rem" }}
          title="Accueil"
          onClick={() => navigate("/")}
        >
          &#8592;
        </span>
        <h2 className="mb-0 flex-grow-1 text-center">Espace Entreprise</h2>
        <div>
          {/* Flèche de navigation interne uniquement vers les demandes reçues */}
          <span
            style={{ fontSize: "2rem", cursor: "pointer" }}
            title="Demandes reçues"
            onClick={() => navigate("/entreprise/demandes")}
          >
            &#8594;
          </span>
        </div>
      </div>
      <div className="mb-4">
        <h4>Consultation des demandes reçues</h4>
        <p>
          Vous pouvez accepter/refuser une demande et ajouter un commentaire pour chaque étudiant.
        </p>
      </div>
      {loading ? (
        <p>Chargement...</p>
      ) : demandes.length === 0 ? (
        <p>Aucune demande reçue.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Étudiant</th>
              <th>Titre</th>
              <th>Description</th>
              <th>Statut</th>
              <th>Date début</th>
              <th>Date fin</th>
              <th>Commentaire</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {demandes.map((demande) => (
              <tr key={demande.id}>
                <td>{demande.etudiantNom || demande.etudiantId}</td>
                <td>{demande.titre}</td>
                <td>{demande.description}</td>
                <td>
                  <span className={
                    demande.status === "en attente" ? "badge bg-warning" :
                    demande.status === "stagiaire" ? "badge bg-success text-white" :
                    demande.status === "refusé" ? "badge bg-danger" :
                    "badge bg-secondary"
                  }>
                    {demande.status === "stagiaire"
                      ? <span style={{ color: "#fff", fontWeight: "bold" }}>Stagiaire</span>
                      : demande.status === "refusé"
                      ? "Refusé"
                      : demande.status === "en attente"
                      ? "En attente"
                      : demande.status ? demande.status : "—"}
                  </span>
                </td>
                <td>
                  {demande.dateDebut
                    ? demande.dateDebut.substring(0, 10)
                    : ""}
                </td>
                <td>{demande.dateFin ? demande.dateFin.substring(0, 10) : ""}</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={commentaires[demande.id] ?? demande.commentaireEntreprise ?? ""}
                    onChange={e => handleCommentChange(demande.id, e.target.value)}
                    placeholder="Ajouter un commentaire"
                  />
                </td>
                <td>
                  <button
                    className="btn btn-success btn-sm m-1"
                    disabled={demande.status === "stagiaire"}
                    onClick={() => handleAction(demande.id, "accepter")}
                  >
                    Accepter
                  </button>
                  <button
                    className="btn btn-danger btn-sm m-1"
                    disabled={demande.status === "refusé"}
                    onClick={() => handleAction(demande.id, "refuser")}
                  >
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

export default EntrepriseHome;

// Les sous-pages classiques de l'espace entreprise sont maintenant :
// - /entreprise           => Accueil entreprise (EntrepriseHome.js)
// - /entreprise/demandes  => Consultation des demandes reçues (souvent la page principale)
// - /entreprise/ajouter   => (optionnel) Ajouter une offre de stage
// - /entreprise/etudiants => (optionnel) Liste des stagiaires acceptés

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const ListeTuteurs = () => {
  const [tuteurs, setTuteurs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/tuteurs", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => setTuteurs(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = (id, actif) => {
    axios.put(`http://localhost:5000/api/admin/tuteurs/${id}/toggle`, { actif: !actif }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(() => {
      setTuteurs(tuteurs =>
        tuteurs.map(t => t.id === id ? { ...t, actif: !actif } : t)
      );
    });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Liste des tuteurs</h2>
        <Link to="/admin/tuteurs/add" className="btn btn-primary">
          Ajouter un tuteur
        </Link>
      </div>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Fonction</th>
              <th>Entreprise</th>
              <th>Email</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tuteurs.map(t => (
              <tr key={t.id}>
                <td>{t.nom}</td>
                <td>{t.fonction}</td>
                <td>{t.entreprise}</td>
                <td>{t.email}</td>
                <td>
                  {t.actif ? (
                    <span className="badge bg-success">Actif</span>
                  ) : (
                    <span className="badge bg-danger">Inactif</span>
                  )}
                </td>
                <td>
                  <button
                    className={`btn btn-sm ${t.actif ? "btn-danger" : "btn-success"}`}
                    onClick={() => handleToggle(t.id, t.actif)}
                  >
                    {t.actif ? "Désactiver" : "Activer"}
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

export default ListeTuteurs;

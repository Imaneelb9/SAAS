import React, { useEffect, useState } from "react";
import axios from "axios";

const TuteurHome = () => {
  const [etudiants, setEtudiants] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/tuteur/etudiants", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => setEtudiants(res.data));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Espace Tuteur</h2>

      {/* Liste dynamique des étudiants encadrés */}
      <div className="mb-4">
        <h5>Étudiants encadrés</h5>
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Filière</th>
              <th>Entreprise d’accueil</th>
              <th>Date début</th>
              <th>Date fin</th>
            </tr>
          </thead>
          <tbody>
            {etudiants.map(e => (
              <tr key={e.id}>
                <td>{e.nom}</td>
                <td>{e.prenom}</td>
                <td>{e.filiere}</td>
                <td>{e.entreprise}</td>
                <td>{e.dateDebut}</td>
                <td>{e.dateFin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TuteurHome;

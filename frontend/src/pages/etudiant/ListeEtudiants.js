import React, { useEffect, useState } from "react";
import axios from "axios";

const ListeEtudiants = () => {
  const [etudiants, setEtudiants] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/students")
      .then(res => setEtudiants(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Liste des étudiants</h2>
      <ul>
        {etudiants.map(etudiant => (
          <li key={etudiant.id}>
            {etudiant.nom} {etudiant.prenom} - {etudiant.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListeEtudiants;

import React, { useEffect, useState } from "react";
import axios from "axios";

const ListeStagiaires = () => {
  const [stagiaires, setStagiaires] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/entreprises/etudiants", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => setStagiaires(res.data));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Liste des stagiaires</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Titre stage</th>
            <th>Date début</th>
            <th>Date fin</th>
          </tr>
        </thead>
        <tbody>
          {stagiaires.map(s => (
            <tr key={s.id}>
              <td>{s.nom}</td>
              <td>{s.prenom}</td>
              <td>{s.titre}</td>
              <td>{s.dateDebut ? s.dateDebut.substring(0, 10) : ""}</td>
              <td>{s.dateFin ? s.dateFin.substring(0, 10) : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListeStagiaires;

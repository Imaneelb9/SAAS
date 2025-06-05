import React, { useEffect, useState } from "react";
import axios from "axios";

const Statistiques = () => {
  const [stats, setStats] = useState({ attente: 0, valide: 0, refuse: 0 });

  useEffect(() => {
    axios
      .get("/api/admin/statistiques", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setStats(res.data));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Statistiques des stages</h2>
      <ul className="list-group">
        <li className="list-group-item">En attente : {stats.attente}</li>
        <li className="list-group-item">Validé : {stats.valide}</li>
        <li className="list-group-item">Refusé : {stats.refuse}</li>
      </ul>
    </div>
  );
};

export default Statistiques;

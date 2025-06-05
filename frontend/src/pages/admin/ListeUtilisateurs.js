import React, { useEffect, useState } from "react";
import axios from "axios";

const ListeUtilisateurs = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/utilisateurs", { // <-- URL absolue pour éviter les problèmes de proxy
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => {
        alert("Erreur : " + (err.response?.data?.error || err.message));
      });
  }, []);

  const toggleActivation = (id, actif) => {
    axios
      .put(
        `http://localhost:5000/api/admin/utilisateurs/${id}/activation`, // <-- URL absolue
        { actif: !actif },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(() => {
        setUsers((users) =>
          users.map((u) => (u.id === id ? { ...u, actif: !actif } : u))
        );
      });
  };

  return (
    <div className="container mt-5">
      <h2>Gestion des comptes utilisateurs</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.nom}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.actif ? "Actif" : "Désactivé"}</td>
              <td>
                <button
                  className={`btn btn-${u.actif ? "danger" : "success"} btn-sm`}
                  onClick={() => toggleActivation(u.id, u.actif)}
                >
                  {u.actif ? "Désactiver" : "Activer"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListeUtilisateurs;

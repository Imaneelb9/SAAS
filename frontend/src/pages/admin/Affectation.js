import React, { useEffect, useState } from "react";
import axios from "axios";

const Affectation = () => {
  const [etudiants, setEtudiants] = useState([]);
  const [entreprises, setEntreprises] = useState([]);
  const [affectations, setAffectations] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Récupère la liste des étudiants depuis l'API admin
    axios
      .get("http://localhost:5000/api/admin/etudiants", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setEtudiants(res.data))
      .catch(() => setEtudiants([]));
    // Récupère la liste des entreprises depuis l'API admin
    axios
      .get("http://localhost:5000/api/admin/entreprises", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setEntreprises(res.data))
      .catch(() => setEntreprises([]));
  }, []);

  const handleChange = (etudiantId, entrepriseId) => {
    setAffectations({ ...affectations, [etudiantId]: entrepriseId });
  };

  const handleAffecter = async (etudiantId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/admin/affectation",
        {
          etudiantId,
          entrepriseId: affectations[etudiantId],
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch {
      alert("Erreur lors de l'affectation");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Affectation d'entreprises aux étudiants</h2>
      {success && (
        <div
          className="alert alert-success text-center"
          style={{
            fontSize: "1.1rem",
            borderRadius: "1rem",
          }}
        >
          Affectation enregistrée !
        </div>
      )}
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Étudiant</th>
            <th>Entreprise à affecter</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {etudiants.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center">
                Aucun étudiant à afficher
              </td>
            </tr>
          ) : (
            etudiants.map((etudiant) => (
              <tr key={etudiant.id}>
                <td>
                  {etudiant.nom} {etudiant.prenom}
                </td>
                <td>
                  <select
                    className="form-select"
                    value={affectations[etudiant.id] || ""}
                    onChange={(e) => handleChange(etudiant.id, e.target.value)}
                  >
                    <option value="">Choisir une entreprise</option>
                    {entreprises.map((ent) => (
                      <option key={ent.id} value={ent.id}>
                        {ent.nom}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-success btn-sm"
                    disabled={!affectations[etudiant.id]}
                    onClick={() => handleAffecter(etudiant.id)}
                  >
                    Affecter
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Affectation;

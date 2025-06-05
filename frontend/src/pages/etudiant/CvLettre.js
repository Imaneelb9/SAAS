import React, { useState } from "react";
import axios from "axios";

const CvLettre = () => {
  const [cv, setCv] = useState(null);
  const [lettre, setLettre] = useState(null);
  const [success, setSuccess] = useState("");

  const handleCvChange = (e) => setCv(e.target.files[0]);
  const handleLettreChange = (e) => setLettre(e.target.files[0]);

  const handleUpload = async (type) => {
    const data = new FormData();
    if (type === "cv" && cv) data.append("cv", cv);
    if (type === "lettre" && lettre) data.append("lettreMotivation", lettre);
    try {
      await axios.post("http://localhost:5000/api/etudiants/upload", data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setSuccess(type === "cv" ? "CV importé avec succès !" : "Lettre de motivation importée avec succès !");
      setTimeout(() => setSuccess(""), 2000);
    } catch {
      setSuccess("Erreur lors de l'import.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Ajouter ou modifier mon CV et ma lettre de motivation</h2>
      {success && (
        <div className="alert alert-success text-center">{success}</div>
      )}
      <div className="row justify-content-center">
        <div className="col-md-5 mb-3">
          <div className="card shadow p-3 text-center">
            <h5>Importer mon CV (PDF)</h5>
            <input type="file" accept=".pdf" onChange={handleCvChange} className="form-control mb-2" />
            <button className="btn btn-primary" onClick={() => handleUpload("cv")} disabled={!cv}>
              Importer le CV
            </button>
          </div>
        </div>
        <div className="col-md-5 mb-3">
          <div className="card shadow p-3 text-center">
            <h5>Importer ma lettre de motivation (PDF)</h5>
            <input type="file" accept=".pdf" onChange={handleLettreChange} className="form-control mb-2" />
            <button className="btn btn-primary" onClick={() => handleUpload("lettre")} disabled={!lettre}>
              Importer la lettre de motivation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CvLettre;

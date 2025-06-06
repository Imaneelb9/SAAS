import React, { useState } from "react";
import axios from "axios";

const CvLettre = () => {
  const [cv, setCv] = useState(null);
  const [lettre, setLettre] = useState(null);
  const [successCv, setSuccessCv] = useState("");
  const [successLettre, setSuccessLettre] = useState("");

  const handleCvChange = (e) => setCv(e.target.files[0]);
  const handleLettreChange = (e) => setLettre(e.target.files[0]);

  const handleUploadCv = async () => {
    const data = new FormData();
    if (cv) data.append("cv", cv);
    try {
      await axios.post("http://localhost:5000/api/etudiants/upload-cv", data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSuccessCv("✅ CV importé avec succès !");
      setTimeout(() => setSuccessCv(""), 3000);
    } catch {
      setSuccessCv("❌ Erreur lors de l'import du CV.");
    }
  };

  const handleUploadLettre = async () => {
    const data = new FormData();
    if (lettre) data.append("lettreMotivation", lettre);
    try {
      await axios.post("http://localhost:5000/api/etudiants/upload-lettre", data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSuccessLettre("✅ Lettre de motivation importée avec succès !");
      setTimeout(() => setSuccessLettre(""), 3000);
    } catch {
      setSuccessLettre("❌ Erreur lors de l'import de la lettre de motivation.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">
        Ajouter ou modifier mon CV et ma lettre de motivation
      </h2>

      {/* Bloc CV */}
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow p-4">
            <h4 className="text-center mb-3">📄 Importer mon CV (PDF)</h4>
            <input
              type="file"
              accept=".pdf"
              onChange={handleCvChange}
              className="form-control mb-3"
            />
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={handleUploadCv}
                disabled={!cv}
              >
                Importer le CV
              </button>
            </div>
            {successCv && (
              <div className="alert alert-info text-center mt-3">{successCv}</div>
            )}
          </div>
        </div>
      </div>

      {/* Séparation visuelle */}
      <hr className="my-5" />

      {/* Bloc Lettre de motivation */}
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow p-4">
            <h4 className="text-center mb-3">✉️ Importer ma lettre de motivation (PDF)</h4>
            <input
              type="file"
              accept=".pdf"
              onChange={handleLettreChange}
              className="form-control mb-3"
            />
            <div className="text-center">
              <button
                className="btn btn-primary"
                onClick={handleUploadLettre}
                disabled={!lettre}
              >
                Importer la lettre de motivation
              </button>
            </div>
            {successLettre && (
              <div className="alert alert-info text-center mt-3">{successLettre}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CvLettre;

// Ce composant concerne l'espace étudiant, pas l'espace admin.
// Pour voir un changement dans l'affichage de l'espace admin, modifiez les fichiers dans src/pages/admin/ (ex: AdminHome.js, ListeUtilisateurs.js, etc.)

import React, { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EspaceEtudiant = () => {
  const navigate = useNavigate();
  const cvInputRef = useRef();
  const lettreInputRef = useRef();

  // Ouvre l'explorateur de fichiers pour le CV
  const handleCvClick = () => {
    if (cvInputRef.current) cvInputRef.current.click();
  };

  // Ouvre l'explorateur de fichiers pour la lettre
  const handleLettreClick = () => {
    if (lettreInputRef.current) lettreInputRef.current.click();
  };

  // Importe le CV avec axios et FormData
  const handleCvChange = async (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file || file.type !== "application/pdf") {
        alert("Fichier invalide");
        return;
      }
      const formData = new FormData();
      formData.append("cv", file);
      try {
        await axios.post("http://localhost:5000/api/etudiants/upload-cv", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
            // Pas besoin de Content-Type, axios le gère
          }
        });
        alert(`CV "${file.name}" importé avec succès.`);
      } catch (error) {
        console.error(error);
        alert(
          "Erreur lors de l’envoi du CV : " +
          (error.response?.data?.error || error.response?.data?.details || error.message)
        );
      }
    }
  };

  // Importe la lettre avec axios et FormData
  const handleLettreChange = async (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file || file.type !== "application/pdf") {
        alert("Fichier invalide");
        return;
      }
      const formData = new FormData();
      formData.append("lettreMotivation", file);
      try {
        await axios.post("http://localhost:5000/api/etudiants/upload-lettre", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        alert(`Lettre "${file.name}" importée avec succès.`);
      } catch (error) {
        console.error(error);
        alert(
          "Erreur lors de l’envoi de la lettre : " +
          (error.response?.data?.error || error.response?.data?.details || error.message)
        );
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Espace Étudiant</h2>

      <div className="row justify-content-center">
        {/* Carte 1 */}
        <div className="col-md-5 mb-3">
          <div className="card shadow text-center p-4">
            <h5 className="mb-3">Mes demandes de stage</h5>
            <button className="btn btn-primary" onClick={() => navigate("/etudiant/mes-demandes")}>
              Voir mes demandes
            </button>
          </div>
        </div>

        {/* Carte 2 */}
        <div className="col-md-5 mb-3">
          <div className="card shadow text-center p-4">
            <h5 className="mb-3">Soumettre une nouvelle demande</h5>
            <button className="btn btn-success" onClick={() => navigate("/etudiant/ajouter-demande")}>
              Ajouter une demande
            </button>
          </div>
        </div>

        {/* Carte 3 - deux boutons bien distincts */}
        <div className="col-md-10 mt-3">
          <div className="card shadow text-center p-4">
            <h5 className="mb-3">Ajouter ou modifier mon CV et ma lettre de motivation</h5>
            <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
              <button
                className="btn btn-info text-white"
                onClick={handleCvClick}
              >
                Importer mon CV (PDF)
              </button>
              <input
                type="file"
                accept="application/pdf"
                ref={cvInputRef}
                style={{ display: "none" }}
                onChange={handleCvChange}
              />
              <button
                className="btn btn-info text-white"
                onClick={handleLettreClick}
              >
                Importer ma lettre de motivation (PDF)
              </button>
              <input
                type="file"
                accept="application/pdf"
                ref={lettreInputRef}
                style={{ display: "none" }}
                onChange={handleLettreChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EspaceEtudiant;

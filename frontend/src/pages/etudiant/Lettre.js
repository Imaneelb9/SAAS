import React, { useState } from "react";
import axios from "axios";

const Lettre = () => {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMsg("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMsg("Veuillez sélectionner un fichier PDF.");
      return;
    }
    if (file.type !== "application/pdf") {
      setMsg("Le fichier doit être un PDF.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("lettreMotivation", file);
    try {
      await axios.post(
        "http://localhost:5000/api/etudiants/upload-lettre",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMsg("Lettre de motivation importée avec succès !");
    } catch (err) {
      setMsg("Erreur lors de l'import de la lettre de motivation");
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">Gérer ma lettre de motivation</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow p-4">
            <h4 className="text-center mb-3">
              ✉️ Importer ma lettre de motivation (PDF)
            </h4>
            <form onSubmit={handleUpload}>
              <div className="mb-3">
                <input
                  type="file"
                  accept="application/pdf"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>
              <div className="text-center">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Importation..." : "Importer ma lettre"}
                </button>
              </div>
            </form>
            {msg && (
              <div className="alert alert-info text-center mt-3">{msg}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lettre;

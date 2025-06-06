import React, { useState } from "react";
import axios from "axios";

const Cv = () => {
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
    formData.append("cv", file);
    try {
      await axios.post(
        "http://localhost:5000/api/etudiants/upload-cv",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );
      setMsg("CV importé avec succès !");
    } catch (err) {
      setMsg(
        "Erreur lors de l'import du CV : " +
        (err.response?.data?.error || err.response?.data?.message || err.message)
      );
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h2>Gérer mon CV</h2>
      <form onSubmit={handleUpload}>
        <div className="mb-3">
          <input
            type="file"
            accept="application/pdf"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Importation..." : "Importer mon CV"}
        </button>
      </form>
      {msg && <div className="alert alert-info mt-3">{msg}</div>}
    </div>
  );
};

export default Cv;

import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfilEntreprise = () => {
  const [profil, setProfil] = useState({ nom: "", secteur: "", adresse: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/entreprises/profil", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => setProfil(res.data));
  }, []);

  const handleChange = e => setProfil({ ...profil, [e.target.name]: e.target.value });

  const handleSave = () => {
    axios.put("http://localhost:5000/api/entreprises/profil", profil, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(() => setMsg("Profil mis à jour !"));
  };

  return (
    <div className="container mt-5">
      <h2>Profil Entreprise</h2>
      <div className="mb-3">
        <label>Nom</label>
        <input className="form-control" name="nom" value={profil.nom} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label>Secteur</label>
        <input className="form-control" name="secteur" value={profil.secteur} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label>Adresse</label>
        <input className="form-control" name="adresse" value={profil.adresse} onChange={handleChange} />
      </div>
      <button className="btn btn-primary" onClick={handleSave}>Enregistrer</button>
      {msg && <div className="alert alert-success mt-2">{msg}</div>}
    </div>
  );
};

export default ProfilEntreprise;

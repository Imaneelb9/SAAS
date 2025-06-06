import React, { useState } from "react";
import axios from "axios";

const AjouterOffre = () => {
  const [offre, setOffre] = useState({ titre: "", description: "", dateDebut: "", dateFin: "" });
  const [msg, setMsg] = useState("");

  const handleChange = e => setOffre({ ...offre, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/entreprises/offres", offre, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(() => setMsg("Offre ajoutée !"));
  };

  return (
    <div className="container mt-5">
      <h2>Ajouter une offre de stage</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Titre</label>
          <input className="form-control" name="titre" value={offre.titre} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea className="form-control" name="description" value={offre.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Date début</label>
          <input type="date" className="form-control" name="dateDebut" value={offre.dateDebut} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Date fin</label>
          <input type="date" className="form-control" name="dateFin" value={offre.dateFin} onChange={handleChange} required />
        </div>
        <button className="btn btn-success" type="submit">Ajouter</button>
      </form>
      {msg && <div className="alert alert-success mt-2">{msg}</div>}
    </div>
  );
};

export default AjouterOffre;

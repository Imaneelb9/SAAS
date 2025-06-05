// frontend/src/pages/RegisterEntreprise.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterEntreprise = () => {
  const [form, setForm] = useState({
    nom: "",
    secteur: "",
    adresse: "",
    siteWeb: "",
    description: "",
    email: "",
    motdepasse: "",
    telephone: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/entreprise/register-entreprise", form);
      alert("Entreprise inscrite avec succès !");
      navigate("/entreprise");
    } catch (err) {
      alert("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="card shadow p-4">
            <h2 className="mb-4 text-center">Inscription Entreprise</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input name="nom" className="form-control" placeholder="Nom de l'entreprise" value={form.nom} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <input name="secteur" className="form-control" placeholder="Secteur d'activité" value={form.secteur} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <input name="adresse" className="form-control" placeholder="Adresse" value={form.adresse} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <input name="siteWeb" className="form-control" placeholder="Site web" value={form.siteWeb} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <textarea name="description" className="form-control" placeholder="Description" value={form.description} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <input name="email" type="email" className="form-control" placeholder="Email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <input name="motdepasse" type="password" className="form-control" placeholder="Mot de passe" value={form.motdepasse} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <input name="telephone" className="form-control" placeholder="Téléphone" value={form.telephone} onChange={handleChange} required />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">S'inscrire</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterEntreprise;

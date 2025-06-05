import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterTuteur = () => {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    motdepasse: "",
    fonction: "",
    entreprise: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ...appel API...
    navigate("/tuteur");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="mb-4 text-center">Inscription Tuteur</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input type="text" className="form-control" name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <input type="email" className="form-control" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <input type="password" className="form-control" name="motdepasse" placeholder="Mot de passe" value={form.motdepasse} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" name="fonction" placeholder="Fonction" value={form.fonction} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" name="entreprise" placeholder="Entreprise" value={form.entreprise} onChange={handleChange} required />
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

export default RegisterTuteur;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    motdepasse: "",
    cne: "",
    filiere: "",
    telephone: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        ...form,
        role: "etudiant"
      });
      navigate("/etudiant");
    } catch (err) {
      alert("Erreur lors de l'inscription : " + (err.response?.data?.details || err.message));
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="mb-4 text-center">Inscription Étudiant</h2>
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
                <input type="text" className="form-control" name="cne" placeholder="CNE" value={form.cne} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" name="filiere" placeholder="Filière" value={form.filiere} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <input type="tel" className="form-control" name="telephone" placeholder="Téléphone" value={form.telephone} onChange={handleChange} required />
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

export default Register;

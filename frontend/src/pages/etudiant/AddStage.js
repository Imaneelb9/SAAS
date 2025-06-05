import React, { useState } from 'react';
import axios from 'axios';

const AddStage = () => {
  const [form, setForm] = useState({
    titre: '',
    entreprise: '',
    duree: '',
    tuteur: '',
    description: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/stages", form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      alert('Demande envoyée');
    } catch (err) {
      alert('Erreur lors de la soumission');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Nouvelle demande de stage</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input name="titre" className="form-control" onChange={handleChange} placeholder="Titre" required />
        </div>
        <div className="mb-3">
          <input name="entreprise" className="form-control" onChange={handleChange} placeholder="Entreprise" required />
        </div>
        <div className="mb-3">
          <input name="duree" className="form-control" onChange={handleChange} placeholder="Durée" required />
        </div>
        <div className="mb-3">
          <input name="tuteur" className="form-control" onChange={handleChange} placeholder="Tuteur" required />
        </div>
        <div className="mb-3">
          <textarea name="description" className="form-control" onChange={handleChange} placeholder="Description" required />
        </div>
        <button type="submit" className="btn btn-primary">Envoyer la demande</button>
      </form>
    </div>
  );
};

export default AddStage;

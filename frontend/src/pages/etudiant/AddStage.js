import React, { useState } from 'react';
import axios from 'axios';

const AddStage = () => {
  const [form, setForm] = useState({
    titre: '',
    entreprise: '',
    duree: '',
    tuteur: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    type: '' // Ajout du type de stage
  });
  const [success, setSuccess] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/stages", form, {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("token")}`
          // Ne pas ajouter Content-Type ici, axios le gère automatiquement pour les objets JS
        }
      });
      setSuccess(true);
      setForm({ titre: '', entreprise: '', duree: '', tuteur: '', description: '', dateDebut: '', dateFin: '', type: '' });
      setTimeout(() => setSuccess(false), 2500);
    } catch (err) {
      alert('Erreur lors de la soumission : ' + (err.response?.data?.details || err.message));
    }
  };

  return (
    <div className="container mt-5">
      <h2>Nouvelle demande de stage</h2>
      {success && (
        <div className="alert alert-success text-center" style={{ fontSize: "1.2rem", borderRadius: "1rem" }}>
          🎉 Demande envoyée avec succès !
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input name="titre" className="form-control" onChange={handleChange} value={form.titre} placeholder="Titre" required />
        </div>
        <div className="mb-3">
          <input name="entreprise" className="form-control" onChange={handleChange} value={form.entreprise} placeholder="Entreprise" required />
        </div>
        <div className="mb-3">
          <input name="duree" className="form-control" onChange={handleChange} value={form.duree} placeholder="Durée" required />
        </div>
        <div className="mb-3">
          <input name="tuteur" className="form-control" onChange={handleChange} value={form.tuteur} placeholder="Tuteur" required />
        </div>
        <div className="mb-3">
          <textarea name="description" className="form-control" onChange={handleChange} value={form.description} placeholder="Description" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Date de début</label>
          <input type="date" name="dateDebut" className="form-control" onChange={handleChange} value={form.dateDebut} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Date de fin</label>
          <input type="date" name="dateFin" className="form-control" onChange={handleChange} value={form.dateFin} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Type de stage</label>
          <select name="type" className="form-select" value={form.type} onChange={handleChange} required>
            <option value="">Choisir...</option>
            <option value="Sur Place">Sur Place</option>
            <option value="À distance">À distance</option>
            <option value="Mixte">Mixte</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Envoyer la demande</button>
      </form>
    </div>
  );
};

export default AddStage;

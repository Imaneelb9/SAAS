import React, { useState } from 'react';
import axios from 'axios';

const AdminAddTuteur = () => {
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    fonction: '',
    entreprise: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/admin/tuteurs',
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Tuteur ajouté avec succès');
      setForm({ nom: '', prenom: '', email: '', fonction: '', entreprise: '' });
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors de l'ajout du tuteur");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Ajouter un tuteur</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input type="text" className="form-control" name="nom" value={form.nom} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Prénom</label>
          <input type="text" className="form-control" name="prenom" value={form.prenom} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Fonction</label>
          <input type="text" className="form-control" name="fonction" value={form.fonction} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Entreprise</label>
          <input type="text" className="form-control" name="entreprise" value={form.entreprise} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Ajouter</button>
      </form>
      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default AdminAddTuteur;

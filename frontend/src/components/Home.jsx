import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [role, setRole] = useState('etudiant');
  const history = useHistory();

  const handleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { role });
      // Gérer la réponse (redirection, stockage du token, etc.)
      if (role === 'admin') {
        history.push('/admin/dashboard');
      } else {
        history.push('/etudiant/dashboard');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
    }
  };

  return (
    <div>
      <h1>Page d'accueil</h1>
      <form onSubmit={handleSubmit}>
        <select name="role" value={role} onChange={handleChange}>
          <option value="etudiant">Étudiant</option>
          <option value="admin">Admin</option>
          {/* <option value="tuteur">Tuteur</option>  <-- SUPPRIMER ou COMMENTER cette ligne */}
        </select>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Home;
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div
      className="container mt-5 home-main"
      style={{
        backgroundImage: "url('/images/bg-stage.jpg')", // Placez votre image dans public/images/bg-stage.jpg
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh"
      }}
    >
      <h1 className="text-center mb-5 home-title display-3 fw-bold" style={{ letterSpacing: "2px" }}>
        Bienvenue sur le Gestionnaire de Stages"IMH-Tech"
      </h1>
      <div className="row justify-content-center">

        {/* Étudiant */}
        <div className="col-md-3 mb-4">
          <div className="card text-center shadow home-card home-card-etudiant">
            <div className="card-body">
              <h4 className="card-title home-card-title">🎓 Espace Étudiant</h4>
              <p className="card-text home-card-text">
                <strong>Soumettez vos demandes de stage</strong>, suivez leur statut en temps réel et consultez l’historique de vos candidatures.
              </p>
              <Link to="/register" className="btn btn-primary m-1 home-btn">S'inscrire</Link>
              <Link to="/login" className="btn btn-outline-primary m-1 home-btn">Se connecter</Link>
            </div>
          </div>
        </div>

        {/* Entreprise */}
        <div className="col-md-3 mb-4">
          <div className="card text-center shadow home-card home-card-entreprise">
            <div className="card-body">
              <h4 className="card-title home-card-title">🏢 Espace Entreprise</h4>
              <p className="card-text home-card-text">
                <strong>Consultez et traitez les demandes de stage</strong> reçues, acceptez ou refusez les candidatures et ajoutez des commentaires pour chaque étudiant.
              </p>
              <Link to="/register-entreprise" className="btn btn-primary m-1 home-btn">S'inscrire</Link>
              <Link to="/login" className="btn btn-outline-primary m-1 home-btn">Se connecter</Link>
            </div>
          </div>
        </div>

        {/* Admin */}
        <div className="col-md-3 mb-4">
          <div className="card text-center shadow home-card home-card-admin">
            <div className="card-body">
              <h4 className="card-title home-card-title">👩‍💼 Espace Admin</h4>
              <p className="card-text home-card-text">
                <strong>Supervisez le processus global</strong> : gérez les comptes utilisateurs, visualisez les statistiques des stages et affectez les entreprises aux étudiants.
              </p>
              <Link to="/login-admin" className="btn btn-dark m-1 home-btn">Se connecter</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;

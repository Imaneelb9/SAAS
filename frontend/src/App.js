import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/etudiant/Login";
import Register from "./pages/etudiant/Register";
import RegisterEntreprise from "./pages/entreprise/RegisterEntreprise";
import Home from './pages/Home';
import AdminHome from "./pages/admin/AdminHome";
import ListeUtilisateurs from "./pages/admin/ListeUtilisateurs";
import Statistiques from "./pages/admin/Statistiques";
import Affectation from "./pages/admin/Affectation";
import TuteurHome from "./pages/tuteur/TuteurHome";
import LoginAdmin from "./pages/admin/LoginAdmin";
import RegisterTuteur from "./pages/tuteur/RegisterTuteur";
import LoginTuteur from "./pages/tuteur/LoginTuteur";
import MesDemandes from "./pages/etudiant/MesDemandes";
import AddStage from "./pages/etudiant/AddStage";
import EtudiantHome from "./pages/etudiant/EtudiantHome";
import EntrepriseHome from "./pages/entreprise/EntrepriseHome";
import Cv from "./pages/etudiant/Cv";
import Lettre from "./pages/etudiant/Lettre";
import ProfilEntreprise from "./pages/entreprise/ProfilEntreprise";
import AjouterOffre from "./pages/entreprise/AjouterOffre";
import ListeStagiaires from "./pages/entreprise/ListeStagiaires";
import ListeTuteurs from "./pages/admin/ListeTuteurs";
import EspaceEtudiant from "./pages/etudiant/EspaceEtudiant";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-entreprise" element={<RegisterEntreprise />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/utilisateurs" element={<ListeUtilisateurs />} />
        <Route path="/admin/tuteurs" element={<ListeTuteurs />} />
        <Route path="/admin/statistiques" element={<Statistiques />} />
        <Route path="/admin/affectation" element={<Affectation />} />
        <Route path="/tuteur" element={<TuteurHome />} />
        <Route path="/tuteur/register" element={<RegisterTuteur />} />
        <Route path="/tuteur/login" element={<LoginTuteur />} />
        <Route path="/etudiant/mes-demandes" element={<MesDemandes />} />
        <Route path="/etudiant/ajouter-demande" element={<AddStage />} />
        <Route path="/etudiant" element={<EspaceEtudiant />} />
        <Route path="/entreprise" element={<EntrepriseHome />} />
        {/* <Route path="/entreprise/profil" element={<ProfilEntreprise />} /> */}
        <Route path="/entreprise/demandes" element={<EntrepriseHome />} />
        <Route path="/entreprise/ajouter" element={<AjouterOffre />} />
        <Route path="/entreprise/etudiants" element={<ListeStagiaires />} />
      </Routes>
    </Router>
  );
}

export default App;

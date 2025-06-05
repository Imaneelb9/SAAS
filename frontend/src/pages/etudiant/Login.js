import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Login = () => {
  const [role, setRole] = useState("etudiant");
  const [form, setForm] = useState({ email: "", motdepasse: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Remplacez par votre appel axios de connexion
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email: form.email,
        motdepasse: form.motdepasse,
        role,
      });
      localStorage.setItem("token", response.data.token); // <-- stocke le token
      if (role === "etudiant") {
        navigate("/etudiant");
      } else if (role === "entreprise") {
        navigate("/entreprise");
      }
    } catch (err) {
      alert("Erreur de connexion : " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow p-4">
            <h2 className="mb-4 text-center">Connexion</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <select
                  className="form-select"
                  value={role}
                  onChange={handleRoleChange}
                >
                  <option value="etudiant">Étudiant</option>
                  <option value="entreprise">Entreprise</option>
                </select>
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="motdepasse"
                  placeholder="Mot de passe"
                  value={form.motdepasse}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Se connecter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

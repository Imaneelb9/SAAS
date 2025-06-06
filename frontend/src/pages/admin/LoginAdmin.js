import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_CODE = "ADMIN2024"; // Changez ce code selon votre besoin

const LoginAdmin = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === ADMIN_CODE) {
      localStorage.setItem("admin", "true");
      // Redirigez vers la page d'accueil admin principale
      navigate("/admin");
    } else {
      alert("Code incorrect !");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow p-4">
            <h2 className="mb-4 text-center">Accès Admin</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Code d'accès admin"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  required
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-dark">
                  Entrer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;

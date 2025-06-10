-- Jeu de données de test pour IMH-Tech

-- Utilisateurs
INSERT INTO Users (id, email, password, role, actif) VALUES
(1, 'etudiant1@imh.com', 'hashedpassword1', 'etudiant', 1),
(2, 'etudiant2@imh.com', 'hashedpassword2', 'etudiant', 1),
(3, 'entreprise1@imh.com', 'hashedpassword3', 'entreprise', 1),
(4, 'admin@imh.com', 'hashedpassword4', 'admin', 1),
(5, 'tuteur1@imh.com', 'hashedpassword5', 'tuteur', 1);

-- Étudiants
INSERT INTO Etudiants (id, userId, nom, prenom, filiere) VALUES
(1, 1, 'Dupont', 'Alice', 'Informatique'),
(2, 2, 'Martin', 'Bob', 'Mathématiques');

-- Entreprises
INSERT INTO Entreprises (id, userId, nom, secteur) VALUES
(1, 3, 'DXC', 'IT');

-- Tuteurs
INSERT INTO Tuteurs (id, userId, fonction, entreprise, actif) VALUES
(1, 5, 'Manager', 'DXC', 1);

-- Stages
INSERT INTO Stages (id, etudiantId, entrepriseId, titre, description, status, dateDebut, dateFin)
VALUES
(1, 1, 1, 'Développeur Web', 'Stage React/Node', 'en attente', '2024-07-01', '2024-09-01'),
(2, 2, 1, 'Data Analyst', 'Stage Data', 'stagiaire', '2024-07-15', '2024-09-15');

-- Candidatures (si applicable)
INSERT INTO Candidatures (id, etudiantId, stageId, status)
VALUES
(1, 1, 1, 'en attente'),
(2, 2, 2, 'acceptée');

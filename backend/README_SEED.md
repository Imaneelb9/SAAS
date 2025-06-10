# Comment tester avec le jeu de données généré

## 1. Pour un fichier SQL (`seed_test_data.sql`)
- Ouvrez votre outil de gestion de base de données (ex : DBeaver, phpMyAdmin, MySQL Workbench).
- Sélectionnez votre base de données du projet.
- Importez ou exécutez le script `seed_test_data.sql` pour insérer les données de test.
- Vérifiez que les tables (`Users`, `Etudiants`, `Tuteurs`, etc.) sont bien remplies.

## 2. Pour un fichier JSON (`seed_test_data.json`)
- Si vous utilisez Sequelize ou un ORM compatible, vous pouvez écrire un script Node.js pour lire ce JSON et insérer les données.
- Exemple rapide :
  ```javascript
  // filepath: c:\Users\Dell\Desktop\projetSaas-Imane-Maher\backend\seed.js
  const db = require('./models');
  const data = require('./seed_test_data.json');

  async function seed() {
    for (const entry of data) {
      const Model = db[entry.model];
      if (Model) {
        await Model.bulkCreate(entry.data, { ignoreDuplicates: true });
      }
    }
    console.log("Jeu de données inséré !");
    process.exit();
  }
  seed();
  ```
- Exécutez ce script avec :
  ```
  node seed.js
  ```

## 3. Redémarrez votre backend
- Après import, redémarrez votre backend (`npm run dev`).

## 4. Testez dans le frontend
- Connectez-vous avec les emails/mots de passe de test (ex : `etudiant1@imh.com`, etc.).
- Vérifiez que les listes (étudiants, tuteurs, stages, etc.) s’affichent bien avec les données insérées.

---
**Remarque :**  
Adaptez les champs et modèles selon votre structure réelle si besoin.

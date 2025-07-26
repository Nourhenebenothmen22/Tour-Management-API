# 🌍 Tour Management API

API RESTful complète pour la gestion de tours de voyage, développée avec Node.js, Express et MongoDB.

---

## 🚀 Fonctionnalités principales

- **Authentification** : inscription, (bientôt) connexion et déconnexion des utilisateurs
- **CRUD complet** pour les utilisateurs et les tours
- **Recherche avancée** de tours (ville, distance, taille du groupe)
- **Pagination** et **filtrage**
- **Comptage** du nombre total de tours et d’utilisateurs
- **Gestion des rôles** (utilisateurs admin)
- **Gestion des erreurs** centralisée
- **Code commenté et structuré**

---

## 🛠️ Technologies utilisées

- **Node.js** (runtime JavaScript)
- **Express.js** (framework web)
- **MongoDB** (base de données NoSQL)
- **Mongoose** (ODM pour MongoDB)
- **Git** (gestion de version)
- **Thunder Client / Postman** (tests d’API)
- **VS Code** (environnement de développement)

---

## 📁 Structure du projet

```
backend/
│
├── controllers/         # Logique métier (tours, utilisateurs, auth)
│   ├── tourController.js
│   ├── userController.js
│   └── authController.js
│
├── models/              # Schémas Mongoose
│   ├── Tour.js
│   └── User.js
│
├── routes/              # Définition des routes Express
│   ├── tours.js
│   ├── users.js
│   └── auth.js
│
├── index.js             # Point d’entrée de l’application
└── package.json         # Dépendances et scripts
```

---

## ⚡ Installation & Lancement

1. **Cloner le projet**
   ```bash
   git clone https://github.com/Nourhenebenothmen22/Tour-Management-API.git
   cd Tour-Management-API/backend
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer la base de données**
   - Crée un fichier `.env` à la racine avec ta chaîne de connexion MongoDB :
     ```
     MONGO_URI=mongodb://localhost:27017/tour_management
     PORT=5000
     ```

4. **Démarrer le serveur**
   ```bash
   npm start
   ```

---

## 📚 Exemples de routes

### 🔐 Authentification

- **Inscription utilisateur**
  - `POST /api/auth/register`  
    Corps attendu :
    ```json
    {
      "username": "nom_utilisateur",
      "email": "email@exemple.com",
      "password": "motdepasse",
      "photo": "url_photo",
      "role": "user" // optionnel
    }
    ```
    Retourne l'utilisateur créé avec un code 201 ou un message d'erreur en cas d'échec.

- **Connexion utilisateur** (à venir)
  - `POST /api/auth/login`  
    Permet à un utilisateur de se connecter et de recevoir un token d’authentification.

- **Déconnexion utilisateur** (à venir)
  - `POST /api/auth/logout`  
    Permet à un utilisateur de se déconnecter (invalidation du token côté client).

---

### 🧑 Utilisateurs

- `POST   /api/users`           : Créer un utilisateur
- `GET    /api/users`           : Récupérer tous les utilisateurs
- `GET    /api/users/:id`       : Détail d’un utilisateur
- `PUT    /api/users/:id`       : Modifier un utilisateur
- `DELETE /api/users/:id`       : Supprimer un utilisateur
- `GET    /api/users/count`     : Nombre total d’utilisateurs
- `GET    /api/users/admins`    : Liste des admins

---

### 🌐 Tours

- `POST   /api/tours`           : Créer un tour
- `GET    /api/tours`           : Récupérer tous les tours
- `GET    /api/tours/search`    : Recherche avancée
- `GET    /api/tours/:id`       : Détail d’un tour
- `PUT    /api/tours/:id`       : Modifier un tour
- `DELETE /api/tours/:id`       : Supprimer un tour
- `GET    /api/tours/count`     : Nombre total de tours

---

## 🧑‍💻 Auteur

- **Nourhene Ben Othmen**
- [LinkedIn](https://www.linkedin.com/in/nourhen-ben-othmen-a811ab221)  
- [GitHub](https://github.com/nourhene-ben-othmen)

---

## 📢 Contribution

Les contributions sont les bienvenues !  
N’hésitez pas à ouvrir une issue ou une pull request.

---

## 📝 Licence

Ce projet est sous licence MIT.

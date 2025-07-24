# 🌍 Tour Management API

Bienvenue dans **Tour Management**, une API RESTful complète et professionnelle pour la gestion de tours, utilisateurs et avis clients. Ce projet utilise **Node.js**, **Express**, **MongoDB**, **JWT**, **Multer** et bien d'autres pour fournir une solution robuste et scalable.

---

## 🚀 Fonctionnalités clés

### ✅ Authentification
- 🔐 JWT sécurisé (inscription, connexion, middleware de protection)
- Rôles d'utilisateur (admin, user, etc.)

### 🧭 Gestion des Tours (`Tour`)
- CRUD complet : création, lecture, mise à jour, suppression
- 📸 Upload de photo via **Multer** (stocké dans `/storage`)
- 🎯 Recherches : par nom, ville, prix
- 📄 Pagination intégrée pour les grandes listes

### 📝 Gestion des Avis (`Review`)
- Relation **1:N** (un tour peut avoir plusieurs avis)
- Population automatique avec `.populate("reviews")`
- Calcul de la moyenne des notes (optionnel)

### 👤 Gestion des Utilisateurs (`User`)
- Création de comptes utilisateurs
- Données personnelles protégées

### 🔗 Intégration Sequelize
- Implémentation démonstrative d'une relation `1:N` entre utilisateurs et avis avec Sequelize (ex : MySQL/PostgreSQL)

### 🧪 Validation
- Express-validator intégré pour vérifier les champs obligatoires et le format des données

### 📁 Upload de fichiers
- Intégration de **Multer** avec dossier personnalisé `/storage` pour les images de tours

---


## 🛠️ Stack technique

| 🧩 Technologie          | 🧪 Rôle                                               |
|------------------------|-------------------------------------------------------|
| **Node.js**            | Environnement d'exécution JavaScript                 |
| **Express**            | Framework léger pour construire des APIs REST        |
| **MongoDB + Mongoose** | Base de données NoSQL + ORM pour MongoDB             |
| **Sequelize**          | ORM SQL pour gérer des relations (1:* démonstratif)  |
| **JWT**                | Authentification basée sur token sécurisée           |
| **Multer**             | Upload de fichiers (ex: images des tours)            |
| **dotenv**             | Gestion des variables d'environnement (.env)         |
| **express-validator**  | Middleware de validation des données d'entrée        |
| **Thunder Client** / **Postman** | Outils pour tester les endpoints de l'API |

## 📚 Méthodes par Modèle

| 📦 Modèle | 🔧 Méthodes Implémentées | 📝 Description |
|----------|--------------------------|----------------|
| **Tour** | `createTour()`           | Créer un nouveau tour |
|          | `getAllTours()`          | Obtenir tous les tours avec pagination |
|          | `getTourById()`          | Détails d’un tour par ID |
|          | `updateTour()`           | Modifier les informations d’un tour |
|          | `deleteTour()`           | Supprimer un tour |
|          | `searchTour()`           | Rechercher un tour par nom, ville, etc. |




| **Review** | `createReview()`       | Créer un avis lié à un tour |
|            | `getReviewsByTourId()` | Obtenir tous les avis pour un tour |
|            | `deleteReview()`       | Supprimer un avis |






| **User** | `registerUser()`         | Inscription d’un nouvel utilisateur |
|         | `loginUser()`             | Authentification + génération de JWT |
|         | `getUserProfile()`        | Voir les infos personnelles d’un utilisateur connecté |
|         | `updateUser()`            | Modifier le profil utilisateur |
|         | `deleteUser()`            | Supprimer un utilisateur |




## 📦 Installation

```bash
git clone https://github.com/Nourhenebenothmen22/Tour-Management-API.git
cd tour_management
npm install

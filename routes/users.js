const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  getAdminUsers,
  getUserCount,
  updateUser,
  deleteUser,
} = require("../controllers/userController"); // Importer les contrôleurs utilisateur
router.post("/", createUser); // Créer un nouvel utilisateur
router.get("/", getAllUsers); // Récupérer tous les utilisateurs
router.get("/count", getUserCount); // Récupérer le nombre total d'utilisateurs
router.get("/admins", getAdminUsers);
router.get("/:id", getUserById); // Récupérer un utilisateur par ID
 // Récupérer les utilisateurs ayant le rôle "admin"
router.put("/:id", updateUser); // Mettre à jour un utilisateur par ID
router.delete("/:id", deleteUser); // Supprimer un utilisateur par ID
module.exports = router; // Exporter le routeur pour l'utiliser dans l'application principale
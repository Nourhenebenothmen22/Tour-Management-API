const express = require("express");
const router = express.Router();
router.post("/", createUser); // Créer un nouvel utilisateur
router.get("/", getAllUsers); // Récupérer tous les utilisateurs
router.get("/:id", getUserById); // Récupérer un utilisateur par ID
router.put("/:id", updateUser); // Mettre à jour un utilisateur par ID
router.delete("/:id", deleteUser); // Supprimer un utilisateur par ID
module.exports = router; // Exporter le routeur pour l'utiliser dans l'application principale
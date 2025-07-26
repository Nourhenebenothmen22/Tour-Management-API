const express = require("express");
const router = express.Router();
const { registerUser,loginUser} = require("../controllers/authController");
router.post("/register", registerUser); // Route pour l'enregistrement d'un nouvel utilisateur
router.post("/login", loginUser); // Route pour la connexion d'un utilisateur
module.exports = router;
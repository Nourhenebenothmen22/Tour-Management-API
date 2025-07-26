const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/authController");
router.post("/register", registerUser); // Route pour l'enregistrement d'un nouvel utilisateur
module.exports = router;
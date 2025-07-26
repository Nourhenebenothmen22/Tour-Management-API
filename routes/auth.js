const express = require("express");
const router = express.Router();

const { registerUser, loginUser, currentUser } = require("../controllers/authController");
const validateToken = require("../Middleware/validateToken");

router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ Route protégée : obtenir les infos de l'utilisateur connecté
router.get("/current", validateToken, currentUser);

module.exports = router;

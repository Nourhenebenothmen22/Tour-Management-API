const express = require("express");
const router = express.Router();

// Contrôleurs (à créer dans un fichier séparé)
const {
  createTour,
  getAllTours,
  getTourById,
  updateTour,
  deleteTour,getTourBySearch

} = require("../controllers/tourController");

// ➕ Créer un nouveau tour
router.post("/", createTour);

// 📥 Récupérer tous les tours
router.get("/", getAllTours);

// 🔍 Recherche de tours (doit être avant /:id)
router.get("/search", getTourBySearch);

// 🔍 Récupérer un seul tour par ID
router.get("/:id", getTourById);

// ✏️ Mettre à jour un tour
router.put("/:id", updateTour);

// ❌ Supprimer un tour
router.delete("/:id", deleteTour);

module.exports = router;
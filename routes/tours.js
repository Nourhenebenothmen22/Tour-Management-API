const express = require("express");
const router = express.Router();

// Contrôleurs (à créer dans un fichier séparé)
const {
  createTour,
  getAllTours,
  getTourById,
  updateTour,
  deleteTour,
  getTourBySearch,
  getFeaturedTours,
  getTourCount

} = require("../controllers/tourController");

// ➕ Créer un nouveau tour
router.post("/", createTour);

// 📥 Récupérer tous les tours
router.get("/", getAllTours);

// 🔍 Recherche de tours (doit être avant /:id)
router.get("/search", getTourBySearch);
router.get("/search/getFeaturedTours", getFeaturedTours);

router.get("/count", getTourCount); // Route GET pour récupérer le nombre total de tours disponibles dans la base de données

// 🔍 Récupérer un seul tour par ID
router.get("/:id", getTourById);

// ✏️ Mettre à jour un tour
router.put("/:id", updateTour);

// ❌ Supprimer un tour
router.delete("/:id", deleteTour);

module.exports = router;
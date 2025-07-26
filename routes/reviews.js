const express = require('express');
const router = express.Router();
const {
  createReview,getReviews,getReviewsbyId 
} = require('../controllers/reviewController'); // Importer les contrôleurs de revue
router.post("/:tourId", createReview); // Créer un nouvel avis
// Obtenir tous les avis d’un tour
router.get("/", getReviews);
router.get('/:id', getReviewsbyId ); // Récupérer un avis par ID
// Exporter le routeur pour l'utiliser dans l'application principale
module.exports = router;
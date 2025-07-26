const express = require('express');
const router = express.Router();
const {
  createReview,
} = require('../controllers/reviewController'); // Importer les contrôleurs de revue
router.post("/:tourId", createReview); // Créer un nouvel avis
module.exports = router;
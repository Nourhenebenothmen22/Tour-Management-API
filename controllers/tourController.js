const Tour = require("../models/Tour");
// Créer un tour
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json(newTour);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir tous les tours avec pagination
exports.getAllTours = async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      console.log(`Page: ${page}, Limit: ${limit}, Skip: ${skip}`);
  try {
    const tours = await Tour.find();
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir un seul tour par ID
exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour non trouvé" });
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un tour
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tour) return res.status(404).json({ message: "Tour non trouvé" });
    res.status(200).json(tour);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un tour
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour non trouvé" });
    res.status(200).json({ message: "Tour supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTourBySearch = async (req, res) => {
  try {
    // Extraction et nettoyage des paramètres
    const cityQuery = req.query.city || '';
    const distanceQuery = parseInt(req.query.distance, 10);
    const maxGroupSizeQuery = parseInt(req.query.maxGroupSize, 10);

    // Vérification de la validité des paramètres
    if (isNaN(distanceQuery) || isNaN(maxGroupSizeQuery)) {
      return res.status(400).json({
        success: false,
        message: 'Les paramètres "distance" et "maxGroupSize" doivent être des nombres valides.',
      });
    }

    // Création de l'expression régulière insensible à la casse pour la ville
    const cityRegex = new RegExp(cityQuery, 'i');

    // Requête MongoDB avec conditions
    const tours = await Tour.find({
  city: cityRegex,
  distance: { $lte: distanceQuery }, // Changer $gte en $lte
  maxGroupSize: { $gte: maxGroupSizeQuery },
});

    // Réponse avec les résultats
    res.status(200).json({
      success: true,
      message: 'Requête réussie',
      data: tours,
    });

  } catch (error) {
    // Gestion des erreurs
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message,
    });
  }
};


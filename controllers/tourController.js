const Tour = require("../models/Tour"); // Importe le modèle Tour

// Créer un tour
exports.createTour = async (req, res) => {
  try {
    // Crée un nouveau tour avec les données reçues dans le corps de la requête
    const newTour = await Tour.create(req.body);
    res.status(201).json(newTour); // Retourne le tour créé avec le code 201
  } catch (error) {
    res.status(400).json({ message: error.message }); // Retourne une erreur si la création échoue
  }
};

// Obtenir tous les tours avec pagination
exports.getAllTours = async (req, res) => {
  // Récupère les paramètres de pagination depuis la requête (page et limit)
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  console.log(`Page: ${page}, Limit: ${limit}, Skip: ${skip}`);
  try {
    // Récupère tous les tours (pagination non appliquée ici)
    const tours = await Tour.find();
    res.status(200).json(tours); // Retourne la liste des tours
  } catch (error) {
    res.status(500).json({ message: error.message }); // Retourne une erreur serveur
  }
};

// Obtenir un seul tour par ID
exports.getTourById = async (req, res) => {
  try {
    // Recherche un tour par son ID
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour non trouvé" }); // Si non trouvé
    res.status(200).json(tour); // Retourne le tour trouvé
  } catch (error) {
    res.status(500).json({ message: error.message }); // Retourne une erreur serveur
  }
};

// Mettre à jour un tour
exports.updateTour = async (req, res) => {
  try {
    // Met à jour un tour par son ID avec les nouvelles données
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tour) return res.status(404).json({ message: "Tour non trouvé" }); // Si non trouvé
    res.status(200).json(tour); // Retourne le tour mis à jour
  } catch (error) {
    res.status(400).json({ message: error.message }); // Retourne une erreur si la mise à jour échoue
  }
};

// Supprimer un tour
exports.deleteTour = async (req, res) => {
  try {
    // Supprime un tour par son ID
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour non trouvé" }); // Si non trouvé
    res.status(200).json({ message: "Tour supprimé avec succès" }); // Confirmation de suppression
  } catch (error) {
    res.status(500).json({ message: error.message }); // Retourne une erreur serveur
  }
};

// Rechercher des tours selon des critères (ville, distance, taille du groupe)
exports.getTourBySearch = async (req, res) => {
  try {
    // Extraction et nettoyage des paramètres de recherche
    const cityQuery = req.query.city || '';
    const distanceQuery = parseInt(req.query.distance, 10);
    const maxGroupSizeQuery = parseInt(req.query.maxGroupSize, 10);

    // Vérifie que les paramètres distance et maxGroupSize sont valides
    if (isNaN(distanceQuery) || isNaN(maxGroupSizeQuery)) {
      return res.status(400).json({
        success: false,
        message: 'Les paramètres "distance" et "maxGroupSize" doivent être des nombres valides.',
      });
    }

    // Crée une expression régulière insensible à la casse pour la ville
    const cityRegex = new RegExp(cityQuery, 'i');

    // Recherche les tours correspondant aux critères
    const tours = await Tour.find({
      city: cityRegex,
      distance: { $lte: distanceQuery }, // Distance inférieure ou égale à la valeur donnée
      maxGroupSize: { $gte: maxGroupSizeQuery }, // Taille du groupe supérieure ou égale à la valeur donnée
    });

    // Retourne les résultats de la recherche
    res.status(200).json({
      success: true,
      message: 'Requête réussie',
      data: tours,
    });

  } catch (error) {
    // Gestion des erreurs serveur
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message,
    });
  }
};

// Récupérer les tours mis en avant (featured)
exports.getFeaturedTours = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Limite le nombre de résultats
  try {
    // Recherche les tours où featured est true
    const tours = await Tour.find({ featured: true }).limit(limit);
    if (!tours || tours.length === 0) {
      return res.status(404).json({ message: "Aucun tour en vedette trouvé" }); // Si aucun tour trouvé
    }
    res.status(200).json(tours); // Retourne les tours en vedette
  } catch (error) {
    res.status(500).json({ message: error.message }); // Retourne une erreur serveur
  }
};

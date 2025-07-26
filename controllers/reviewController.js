const Review = require("../models/Review");
const Tour = require("../models/Tour");

exports.createReview = async (req, res) => {
  const tourId = req.params.tourId;

  try {
    // Créer et sauvegarder l'avis
    const newReview = new Review({ ...req.body});
    const savedReview = await newReview.save();

    // Ajouter la référence de l'avis dans le modèle Tour (relation)
    await Tour.findByIdAndUpdate(tourId, {
      $push: { reviews: savedReview._id },
    });

    res.status(201).json(savedReview);
  } catch (error) {
    console.error("Erreur lors de la création de l'avis :", error);
    res.status(500).json({ message: error.message });
  }
};

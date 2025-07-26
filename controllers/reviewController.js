const Review = require("../models/Review");
const Tour = require("../models/Tour");

// Créer une review
exports.createReview = async (req, res) => {
  const tourId = req.params.tourId;

  try {
    const newReview = new Review({ 
      ...req.body,
      tour: tourId
    });
    
    const savedReview = await newReview.save();

    await Tour.findByIdAndUpdate(tourId, {
      $push: { reviews: savedReview._id },
    });

    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toutes les reviews
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('tour', 'name location');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Review par ID
exports.getReviewsbyId = async (req, res) => {
  const id = req.params.id;

  try {
    const review = await Review.findById(id).populate('tour');

    if (!review) {
      return res.status(404).json({ message: 'Review non trouvé' });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reviews par Tour ID
exports.getReviewsByTourId = async (req, res) => {
  const tourId = req.params.tourId;

  try {
    const reviews = await Review.find({ tour: tourId });
    
    if (reviews.length === 0) {
      return res.status(404).json({ 
        message: 'Aucun avis trouvé pour ce tour' 
      });
    }

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// controllers/review.js
import Review from "../models/Review.js";

// Ajouter un avis
export const submitReview = async (req, res, next) => {
  try {
    const { rideId, comment, rate } = req.body;

    const review = new Review({
      user: req.user.id,
      ride: rideId,
      comment,
      rate,
    });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};

// Récupérer les avis d'un utilisateur
export const getReviewsByUser = async (req, res, next) => {
  try {
    const reviews = await Review.find({ user: req.params.userId }).populate("ride");
    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
};


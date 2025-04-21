
// Ajouter un avis
import Review from "../models/Review.js";
import Ride from "../models/Ride.js";
import mongoose from "mongoose";
export const submitReview = async (req, res, next) => {
  try {
    const { rideId, comment, rate } = req.body;

    if (!rideId || !rate) {
      return res.status(400).json({ message: "Ride ID and rate are required." });
    }

    // Check if the user already submitted a review for this ride
    const existingReview = await Review.findOne({ ride: rideId, user: req.user.id });
    if (existingReview) {
      return res.status(400).json({ message: "You have already submitted a review for this ride." });
    }

    const newReview = new Review({
      ride: rideId,
      user: req.user.id,
      comment,
      rate,
    });

    await newReview.save();

    // Update the ride creator's rating after a new review
    const ride = await Ride.findById(rideId).populate('creator');
    if (ride && ride.creator) {
      const creatorId = ride.creator._id;
      const creatorReviews = await Review.find({ user: creatorId });

      if (creatorReviews.length > 0) {
        const totalStars = creatorReviews.reduce((sum, review) => sum + review.rate, 0);
        const averageStars = totalStars / creatorReviews.length;
        
        await ride.creator.updateOne({ 
          stars: averageStars.toFixed(1),
          rating: creatorReviews.length
        });
      }
    }

    res.status(201).json({ message: "Review submitted successfully." });

  } catch (err) {
    next(err);
  }
};


export const getReviewsByUser = async (req, res, next) => {
  try {
    let { userId } = req.params;
    console.log("Fetching reviews for userId:", userId);

    userId = userId.trim(); // <-- très important

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID." });
    }

    const reviews = await Review.find({ user: new mongoose.Types.ObjectId(userId) });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      score: reviews.reduce((acc, review) => acc + review.rate, 0) / reviews.length,
      reviews
    });

  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};


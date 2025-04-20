import User from "../models/User.js";

export const warnUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Tu peux aussi stocker un tableau d'avertissements si tu veux
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Logique d’avertissement (à compléter selon besoin réel)
    res.status(200).json({ message: "User warned (mock)" });
  } catch (err) {
    next(err);
  }
};


export const banUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the user by their ID
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Set the user's isBanned field to true
    user.isBanned = true;

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: "User banned successfully!" });
  } catch (err) {
    next(err);
  }
};


export const unbanUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the user by their ID
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Set the user's isBanned field to true
    user.isBanned = false;

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: "User Unbanned successfully!" });
  } catch (err) {
    next(err);
  }
};
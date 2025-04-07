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

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "User banned (deleted)" });
  } catch (err) {
    next(err);
  }
};

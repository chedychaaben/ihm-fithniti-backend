import User from "../models/User.js";

// Get user details
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: ['ridesCreated', 'ridesJoined'], // Make sure these associations exist
      attributes: { exclude: ['password', 'updatedAt'] },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }, // Exclude password for security
    });
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// Update user
export const updateUser = async (req, res, next) => {
  try {
    const { name, phoneNumber, profilePicture, age, profile } = req.body;
    
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.update({ name, phoneNumber, profilePicture, age, profile });

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Delete user
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.status(200).json({ message: "User has been deleted." });
  } catch (err) {
    next(err);
  }
};

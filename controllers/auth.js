import bcrypt from "bcryptjs"
import User from "../models/User.js"
import jwt from "jsonwebtoken"

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  
  try {
    // Check if the user already exists in the database
    const userExists = await User.findOne({
      where: { email }
    });

    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password before saving to the database
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // Create the new user with hashed password
    const newUser = await User.create({
      name,
      email,
      password: hash, // Store hashed password
    });

    // Generate JWT token
    const accessToken = jwt.sign({ id: newUser.id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });

    const options = {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
      sameSite: 'strict',
    };

    // Exclude the password field before sending the response
    const { password: _, isAdmin, ...otherDetails } = newUser.toJSON();

    return res.status(200).cookie("accessToken", accessToken, options).json({ user: { ...otherDetails }, isAdmin });

  } catch (err) {
    next(err);
  }
};



export const login = async (req, res, next) => {
  try {
    // Use Sequelize's findOne to get the user by email
    const user = await User.findOne({
      where: { email: req.body.email }
    });

    if (!user || !await bcrypt.compare(req.body.password, user.password)) {
      return res.status(400).json({ message: "Wrong email or password" });
    }

    // Generate JWT token
    const accessToken = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });

    const options = {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
      sameSite: 'strict',
    };

    // Exclude the password field before sending the response
    const { password: _, isAdmin, ...otherDetails } = user.toJSON();

    return res.status(200).cookie("accessToken", accessToken, options).json({ user: { ...otherDetails }, isAdmin });

  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try{
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};
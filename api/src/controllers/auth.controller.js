import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

// Utility: Generate JWT token
const generateToken = (userId, isAdmin) => {
  return jwt.sign({ id: userId, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// Cookie options for local and production
const getCookieOptions = () => ({
  httpOnly: true,
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  secure: process.env.NODE_ENV === 'production',
});

// -------------------- SIGNUP --------------------
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = generateToken(newUser._id, newUser.isAdmin);
    const { password: pwd, ...rest } = newUser._doc;

    res
      .status(201)
      .cookie('access_token', token, getCookieOptions())
      .json({ success: true, user: rest });
  } catch (error) {
    next(error);
  }
};

// -------------------- SIGNIN --------------------
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(404, 'User not found'));

    const isPasswordValid = bcryptjs.compareSync(password, user.password);
    if (!isPasswordValid) return next(errorHandler(400, 'Invalid password'));

    const token = generateToken(user._id, user.isAdmin);
    const { password: pwd, ...rest } = user._doc;

    res
      .status(200)
      .cookie('access_token', token, getCookieOptions())
      .json({ success: true, user: rest });
  } catch (error) {
    next(error);
  }
};

// -------------------- GOOGLE SIGNIN --------------------
export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  if (!email) return next(errorHandler(400, 'Email is required'));

  try {
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      user = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await user.save();
    }

    // Generate JWT and return user
    const token = generateToken(user._id, user.isAdmin);
    const { password: pwd, ...rest } = user._doc;

    res
      .status(200)
      .cookie('access_token', token, getCookieOptions())
      .json({ success: true, user: rest });
  } catch (error) {
    next(error);
  }
};

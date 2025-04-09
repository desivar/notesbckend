// controllers/authController.js
import User from '../models/users.model.js'; // Adjust the path to your User model
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler'; // Optional: for cleaner async error handling

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
export const signup = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  // Basic validation
  if (!fullName || !email || !password) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error('Please provide all required fields');
  }

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(StatusCodes.CONFLICT);
    throw new Error('User with this email already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(StatusCodes.CREATED).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      token: generateToken(user._id), // Implement generateToken function
    });
  } else {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error('Invalid user data');
  }
});

// @desc    Login user and return JWT
// @route   POST /api/auth/signin
// @access  Public
export const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log("Signin attempt for email:", email); // ADDED LOG
  const user = await User.findOne({ email });
  console.log("User found during signin:", user); // ADDED LOG

  if (user && (await bcrypt.compare(password, user.password))) {
    console.log("bcrypt.compare result: true"); // ADDED LOG
    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    console.log("bcrypt.compare result: false OR user not found"); // ADDED LOG
    res.status(StatusCodes.UNAUTHORIZED);
    throw new Error('Invalid credentials');
  }
});

// @desc    Logout user (client-side action - clear token)
// @route   POST /api/auth/signout
// @access  Public (or Protected depending on implementation)
export const signout = (req, res) => {
  // For JWT, the client typically handles token deletion.
  // You might clear cookies or perform server-side session management here if used.
  res.status(StatusCodes.OK).json({ message: 'Logged out successfully' });
};

const generateToken = (id) => {
  console.log("JWT Secret:", process.env.JWT_SECRET); // ADDED LOG
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Example expiration
  });
};

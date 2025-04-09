// routes/auth.js
import express from 'express';
import { signup, signin, signout } from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * /api/auth/signup:
 * post:
 * summary: Register a new user
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * fullName:
 * type: string
 * email:
 * type: string
 * format: email
 * password:
 * type: string
 * minLength: 6
 * responses:
 * 201:
 * description: User registered successfully
 * 400:
 * description: Invalid input or email already exists
 */
router.post('/signup', signup);

/**
 * @swagger
 * /api/auth/signin:
 * post:
 * summary: Sign in an existing user and get a JWT
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * email:
 * type: string
 * format: email
 * password:
 * type: string
 * responses:
 * 200:
 * description: User signed in successfully, returns a JWT
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * token:
 * type: string
 * 401:
 * description: Invalid credentials
 */
router.post('/signin', signin);

/**
 * @swagger
 * /api/auth/signout:
 * post:
 * summary: Sign out the current user (client-side action, invalidates the token on the client)
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: User signed out successfully (client-side)
 */
router.post('/signout', signout);

export default router;
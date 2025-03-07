import express from 'express';
import {
  signup,
  login,
  getMe,
  updateProfile,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword,
  verifyEmail,
  getNotifications,
  markNotificationRead,
  toggleFavoriteRestaurant,
  sendOTP,
  verifyOTP
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Public routes
router.post('/signup', (req, res, next) => {
  console.log('Signup route hit');
  console.log('Request body:', req.body);
  signup(req, res, next);
});

router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/verify-email/:token', verifyEmail);

// Protected routes
router.use(protect);

router.get('/me', getMe);
router.put('/profile', updateProfile);
router.post('/logout', logout);
router.get('/notifications', getNotifications);
router.put('/notifications/:notificationId/read', markNotificationRead);
router.post('/favorites/restaurants/:restaurantId', toggleFavoriteRestaurant);

export default router;
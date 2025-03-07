import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', (req, res) => {
  res.json({ msg: 'Get all restaurants' });
});

router.get('/:id', (req, res) => {
  res.json({ msg: 'Get restaurant by ID' });
});

router.get('/:id/menu', (req, res) => {
  res.json({ msg: 'Get restaurant menu' });
});

// Protected routes
router.use(protect);

router.post('/', (req, res) => {
  res.json({ msg: 'Create restaurant' });
});

router.put('/:id', (req, res) => {
  res.json({ msg: 'Update restaurant' });
});

router.post('/:id/menu', (req, res) => {
  res.json({ msg: 'Add menu item' });
});

router.put('/:id/menu/:itemId', (req, res) => {
  res.json({ msg: 'Update menu item' });
});

router.delete('/:id/menu/:itemId', (req, res) => {
  res.json({ msg: 'Delete menu item' });
});

router.post('/:id/reviews', (req, res) => {
  res.json({ msg: 'Add review' });
});

export default router;
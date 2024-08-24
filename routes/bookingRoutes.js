// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const { getBookings, getBookingById, createBooking, updateBooking, deleteBooking } = require('../controllers/bookingController');

router.route('/')
  .get(authMiddleware, getBookings)
  .post(authMiddleware, createBooking);

router.route('/:id')
  .get(authMiddleware, getBookingById)
  .put(authMiddleware, updateBooking)
  .delete(authMiddleware, deleteBooking);

module.exports = router;

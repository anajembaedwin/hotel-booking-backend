const express = require('express');
const { createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new booking
router.post('/', protect, createBooking);

// Get all bookings
router.get('/', protect, getAllBookings);

// Get a booking by ID
router.get('/:id', protect, getBookingById);

// Update a booking
router.put('/:id', protect, updateBooking);

// Delete a booking
router.delete('/:id', protect, deleteBooking);

module.exports = router;

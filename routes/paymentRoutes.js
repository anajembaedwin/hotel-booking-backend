const express = require('express');
const { recordPayment, getAllPayments, getPaymentById, updatePayment, deletePayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new payment
router.post('/', protect, recordPayment);

// Get all payments
router.get('/', protect, getAllPayments);

// Get a payment by ID
router.get('/:id', protect, getPaymentById);

// Update a payment
router.put('/:id', protect, updatePayment);

// Delete a payment
router.delete('/:id', protect, deletePayment);

module.exports = router;

const express = require('express');
const { createCustomer, getAllCustomers, getCustomerById, updateCustomer, deleteCustomer } = require('../controllers/customerController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new customer
router.post('/', protect, createCustomer);

// Get all customers
router.get('/', protect, getAllCustomers);

// Get a customer by ID
router.get('/:id', protect, getCustomerById);

// Update a customer
router.put('/:id', protect, updateCustomer);

// Delete a customer
router.delete('/:id', protect, deleteCustomer);

module.exports = router;

const Payment = require('../models/Payment');

// Record a new payment
exports.recordPayment = async (req, res) => {
    try {
        const payment = new Payment(req.body);
        await payment.save();
        res.status(201).json({ message: 'Payment recorded successfully', payment });
    } catch (error) {
        res.status(400).json({ error: 'Error recording payment', details: error.message });
    }
};

// Get all payments
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving payments', details: error.message });
    }
};

// Get payment details by ID
exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving payment', details: error.message });
    }
};

// Update payment details
exports.updatePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.json({ message: 'Payment updated successfully', payment });
    } catch (error) {
        res.status(400).json({ error: 'Error updating payment', details: error.message });
    }
};

// Delete a payment
exports.deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id);
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.json({ message: 'Payment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting payment', details: error.message });
    }
};

const Payment = require('../models/Payment');

// Create a new payment
const createPayment = async (paymentData) => {
    const payment = new Payment(paymentData);
    await payment.save();
    return payment;
};

// Get all payments
const getPayments = async () => {
    const payments = await Payment.find();
    return payments;
};

// Get a payment by ID
const getPaymentById = async (paymentId) => {
    const payment = await Payment.findById(paymentId);
    if (!payment) {
        throw new Error('Payment not found');
    }
    return payment;
};

// Update a payment
const updatePayment = async (paymentId, updateData) => {
    const payment = await Payment.findByIdAndUpdate(paymentId, updateData, { new: true });
    if (!payment) {
        throw new Error('Payment not found');
    }
    return payment;
};

// Delete a payment
const deletePayment = async (paymentId) => {
    const payment = await Payment.findByIdAndDelete(paymentId);
    if (!payment) {
        throw new Error('Payment not found');
    }
    return payment;
};

module.exports = {
    createPayment,
    getPayments,
    getPaymentById,
    updatePayment,
    deletePayment,
};

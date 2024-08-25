const Customer = require('../models/Customer');

// Create a new customer
const createCustomer = async (customerData) => {
    const customer = new Customer(customerData);
    await customer.save();
    return customer;
};

// Get all customers
const getCustomers = async () => {
    const customers = await Customer.find();
    return customers;
};

// Get a customer by ID
const getCustomerById = async (customerId) => {
    const customer = await Customer.findById(customerId);
    if (!customer) {
        throw new Error('Customer not found');
    }
    return customer;
};

// Update a customer
const updateCustomer = async (customerId, updateData) => {
    const customer = await Customer.findByIdAndUpdate(customerId, updateData, { new: true });
    if (!customer) {
        throw new Error('Customer not found');
    }
    return customer;
};

// Delete a customer
const deleteCustomer = async (customerId) => {
    const customer = await Customer.findByIdAndDelete(customerId);
    if (!customer) {
        throw new Error('Customer not found');
    }
    return customer;
};

module.exports = {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
};

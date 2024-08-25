const mongoose = require('mongoose');
const Customer = require('../models/Customer');
const customerService = require('../services/customerService');

describe('Customer Service Tests', () => {

    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/hotel_booking_test', { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    it('should create a new customer', async () => {
        const customerData = {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '1234567890',
        };

        const customer = await customerService.createCustomer(customerData);
        expect(customer.name).toBe('John Doe');
        expect(customer.email).toBe('john@example.com');
    });

    it('should get all customers', async () => {
        const customers = await customerService.getCustomers();
        expect(customers.length).toBeGreaterThan(0);
    });

    it('should get a customer by ID', async () => {
        const customerData = {
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '0987654321',
        };

        const newCustomer = await customerService.createCustomer(customerData);
        const fetchedCustomer = await customerService.getCustomerById(newCustomer._id);
        expect(fetchedCustomer.name).toBe('Jane Smith');
        expect(fetchedCustomer.email).toBe('jane@example.com');
    });

    it('should update a customer', async () => {
        const customerData = {
            name: 'Alice Wonderland',
            email: 'alice@example.com',
            phone: '9876543210',
        };

        const newCustomer = await customerService.createCustomer(customerData);
        const updateData = { email: 'alice@wonderland.com' };
        const updatedCustomer = await customerService.updateCustomer(newCustomer._id, updateData);
        expect(updatedCustomer.email).toBe('alice@wonderland.com');
    });

    it('should delete a customer', async () => {
        const customerData = {
            name: 'Bob Marley',
            email: 'bob@example.com',
            phone: '5556667777',
        };

        const newCustomer = await customerService.createCustomer(customerData);
        await customerService.deleteCustomer(newCustomer._id);

        const fetchedCustomer = await customerService.getCustomerById(newCustomer._id);
        expect(fetchedCustomer).toBeNull();
    });
});

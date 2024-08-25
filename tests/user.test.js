const mongoose = require('mongoose');
const User = require('../models/User');
const authService = require('../services/authService'); // Assuming you have an authService

describe('User Authentication and Authorization Tests', () => {

    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/hotel_booking_test', { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    it('should register a new user', async () => {
        const userData = {
            username: 'admin',
            password: 'password123',
            role: 'Admin',
        };

        const user = await authService.registerUser(userData);
        expect(user.username).toBe('admin');
        expect(user.role).toBe('Admin');
    });

    it('should authenticate a user', async () => {
        const loginData = {
            username: 'admin',
            password: 'password123',
        };

        const token = await authService.loginUser(loginData);
        expect(token).toBeDefined();
    });

    it('should authorize a user based on role', async () => {
        const user = await authService.findUserByUsername('admin');
        const isAdmin = authService.authorizeRole(user, 'Admin');
        expect(isAdmin).toBe(true);
    });
});

const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const bookingService = require('../services/bookingService');

describe('Booking Service Tests', () => {

    beforeAll(async () => {
        // Set up the database connection before tests
        await mongoose.connect('mongodb://localhost:27017/hotel_booking_test', { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        // Clean up the database and close the connection after tests
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    it('should create a new booking', async () => {
        const bookingData = {
            customer: 'John Doe',
            hotelName: 'Hotel California',
            checkInDate: new Date(),
            checkOutDate: new Date(),
            totalPrice: 200,
        };

        const booking = await bookingService.createBooking(bookingData);
        expect(booking.customer).toBe('John Doe');
        expect(booking.hotelName).toBe('Hotel California');
        expect(booking.totalPrice).toBe(200);
    });

    it('should get all bookings', async () => {
        const bookings = await bookingService.getBookings();
        expect(bookings.length).toBeGreaterThan(0);
    });

    it('should get a booking by ID', async () => {
        const bookingData = {
            customer: 'Jane Smith',
            hotelName: 'The Grand Budapest Hotel',
            checkInDate: new Date(),
            checkOutDate: new Date(),
            totalPrice: 300,
        };

        const newBooking = await bookingService.createBooking(bookingData);
        const fetchedBooking = await bookingService.getBookingById(newBooking._id);
        expect(fetchedBooking.customer).toBe('Jane Smith');
        expect(fetchedBooking.hotelName).toBe('The Grand Budapest Hotel');
    });

    it('should update a booking', async () => {
        const bookingData = {
            customer: 'Bob Marley',
            hotelName: 'Rasta Resort',
            checkInDate: new Date(),
            checkOutDate: new Date(),
            totalPrice: 500,
        };

        const newBooking = await bookingService.createBooking(bookingData);
        const updateData = { totalPrice: 600 };
        const updatedBooking = await bookingService.updateBooking(newBooking._id, updateData);
        expect(updatedBooking.totalPrice).toBe(600);
    });

    it('should delete a booking', async () => {
        const bookingData = {
            customer: 'Alice Wonderland',
            hotelName: 'Wonderland Inn',
            checkInDate: new Date(),
            checkOutDate: new Date(),
            totalPrice: 150,
        };

        const newBooking = await bookingService.createBooking(bookingData);
        await bookingService.deleteBooking(newBooking._id);

        const fetchedBooking = await bookingService.getBookingById(newBooking._id);
        expect(fetchedBooking).toBeNull();
    });
});

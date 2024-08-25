const Booking = require('../models/Booking');

// Create a new booking
const createBooking = async (bookingData) => {
    const booking = new Booking(bookingData);
    await booking.save();
    return booking;
};

// Get all bookings
const getBookings = async () => {
    const bookings = await Booking.find();
    return bookings;
};

// Get a booking by ID
const getBookingById = async (bookingId) => {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
        throw new Error('Booking not found');
    }
    return booking;
};

// Update a booking
const updateBooking = async (bookingId, updateData) => {
    const booking = await Booking.findByIdAndUpdate(bookingId, updateData, { new: true });
    if (!booking) {
        throw new Error('Booking not found');
    }
    return booking;
};

// Delete a booking
const deleteBooking = async (bookingId) => {
    const booking = await Booking.findByIdAndDelete(bookingId);
    if (!booking) {
        throw new Error('Booking not found');
    }
    return booking;
};

module.exports = {
    createBooking,
    getBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
};

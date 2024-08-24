const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Booking = require('../models/Booking');
const Customer = require('../models/Customer');
const Payment = require('../models/Payment');
const logger = require('../utils/logger');
const { MONGO_URI } = require('./env');

// Load environment variables
dotenv.config();

const mongoUri = MONGO_URI;
if (!mongoUri) {
    console.error('MONGO_URI is not defined in .env file');
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

const seedUsers = async () => {
    await User.deleteMany({}); // Clear existing users
    const users = [
        { name: 'Admin User', email: 'admin@example.com', password: 'password123', role: 'Admin' },
        { name: 'John Doe', email: 'john@example.com', password: 'password123', role: 'Staff' },
        { name: 'Jane Smith', email: 'jane@example.com', password: 'password123', role: 'Staff' },
    ];
    await User.create(users);
    console.log('Users seeded successfully!');
};

const seedCustomers = async () => {
    await Customer.deleteMany({}); // Clear existing customers
    const customers = [
        { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St, Anytown, USA' },
        { name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210', address: '456 Elm St, Anytown, USA' },
    ];
    const createdCustomers = await Customer.create(customers);
    console.log('Customers seeded successfully!');
    return createdCustomers.map(customer => customer._id);
};


const seedBookings = async (customerIds) => {
    await Booking.deleteMany({}); // Clear existing bookings
    const bookings = [
        { customer: customerIds[0], hotelName: 'Hotel A', roomType: 'Deluxe', checkInDate: new Date(), checkOutDate: new Date(new Date().setDate(new Date().getDate() + 1)), paymentStatus: 'Completed', totalAmount: 100.00 },
        { customer: customerIds[1], hotelName: 'Hotel B', roomType: 'Suite', checkInDate: new Date(), checkOutDate: new Date(new Date().setDate(new Date().getDate() + 2)), paymentStatus: 'Pending', totalAmount: 200.00 },
    ];
    const createdBookings = await Booking.create(bookings);
    console.log('Bookings seeded successfully!');
    console.log('Created Bookings:', createdBookings);
};


// const seedBookings = async (customerIds) => {
//     await Booking.deleteMany({}); // Clear existing bookings
//     const bookings = [
//         { customer: customerIds[0], hotelName: 'Hotel A', roomType: 'Deluxe', checkInDate: new Date(), checkOutDate: new Date(new Date().setDate(new Date().getDate() + 1)), paymentStatus: 'Completed', totalAmount: 100.00 },
//         { customer: customerIds[1], hotelName: 'Hotel B', roomType: 'Suite', checkInDate: new Date(), checkOutDate: new Date(new Date().setDate(new Date().getDate() + 2)), paymentStatus: 'Pending', totalAmount: 200.00 },
//     ];
//     await Booking.create(bookings);
//     console.log('Bookings seeded successfully!');
// };

const seedPayments = async () => {
    await Payment.deleteMany({}); // Clear existing payments

    // Fetch all bookings from the database
    const bookings = await Booking.find().populate('customer');
    if (bookings.length === 0) {
        console.error('No bookings found in the database.');
        process.exit(1);
    }

    // Log the bookings to verify structure
    console.log('Bookings:', bookings);

    // Create payments based on the fetched bookings
    const payments = bookings.map(booking => ({
        booking: booking._id,
        customer: booking.customer._id,
        amount: booking.totalAmount,
        paymentDate: new Date(),
        paymentMethod: booking.paymentStatus === 'Completed' ? 'Credit Card' : 'PayPal' // Adjust paymentMethod as needed
    }));

    await Payment.create(payments);
    console.log('Payments seeded successfully!');
};

const seedDatabase = async () => {
    try {
        await seedUsers();
        const customerIds = await seedCustomers(); // Get customer IDs after seeding customers
        await seedBookings(customerIds);
        await seedPayments(); // No need to pass customerIds to seedPayments
        logger.info('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        logger.error('Failed to seed database', error);
        process.exit(1);
    }
};

seedDatabase();



// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const User = require('../models/User');
// const Booking = require('../models/Booking');
// const Customer = require('../models/Customer');
// const Payment = require('../models/Payment');
// const logger = require('../utils/logger');
// const { MONGO_URI } = require('./env');

// // Load environment variables
// dotenv.config();

// const mongoUri = MONGO_URI;
// if (!mongoUri) {
//     console.error('MONGO_URI is not defined in .env file');
//     process.exit(1);
// }

// // Connect to MongoDB
// mongoose.connect(mongoUri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => {
//     console.log('MongoDB connected');
// })
// .catch(err => {
//     console.error('MongoDB connection error:', err);
//     process.exit(1);
// });

// const seedUsers = async () => {
//     await User.deleteMany({}); // Clear existing users
//     const users = [
//         { name: 'Admin User', email: 'admin@example.com', password: 'password123', role: 'Admin' },
//         { name: 'John Doe', email: 'john@example.com', password: 'password123', role: 'Staff' },
//         { name: 'Jane Smith', email: 'jane@example.com', password: 'password123', role: 'Staff' },
//     ];
//     await User.create(users);
// };

// const seedCustomers = async () => {
//     await Customer.deleteMany({}); // Clear existing customers
//     const customers = [
//         { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St, Anytown, USA' },
//         { name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210', address: '456 Elm St, Anytown, USA' },
//     ];
//     const createdCustomers = await Customer.create(customers);
//     return createdCustomers.map(customer => customer._id);
// };

// const seedBookings = async (customerIds) => {
//     await Booking.deleteMany({}); // Clear existing bookings
//     const bookings = [
//         { customer: customerIds[0], hotelName: 'Hotel A', roomType: 'Deluxe', checkInDate: new Date(), checkOutDate: new Date(new Date().setDate(new Date().getDate() + 1)), paymentStatus: 'Completed', totalAmount: 100.00 },
//         { customer: customerIds[1], hotelName: 'Hotel B', roomType: 'Suite', checkInDate: new Date(), checkOutDate: new Date(new Date().setDate(new Date().getDate() + 2)), paymentStatus: 'Pending', totalAmount: 200.00 },
//     ];
//     const createdBookings = await Booking.create(bookings);
//     return createdBookings.map(booking => booking._id);
// };


// const seedPayments = async () => {
//     await Payment.deleteMany({}); // Clear existing payments

//     // Fetch all bookings from the database
//     const bookings = await Booking.find().populate('customer');
//     if (bookings.length === 0) {
//         console.error('No bookings found in the database.');
//         process.exit(1);
//     }

//     // // Log the bookings to verify structure
//     // console.log('Bookings:', bookings);

//     // Create payments based on the fetched bookings
//     const payments = bookings.map(booking => ({
//         booking: booking._id,
//         customer: booking.customer._id,
//         amount: booking.totalAmount,
//         date: new Date(),
//         paymentMethod: booking.paymentStatus === 'Completed' ? 'Credit Card' : 'PayPal' // Example logic
//     }));

//     await Payment.create(payments);
//     console.log('Payments seeded successfully!');
// };



// // const seedPayments = async (bookingIds) => {
// //     await Payment.deleteMany({}); // Clear existing payments

// //     // Log the bookingIds to verify structure
// //     console.log('Booking IDs:', bookingIds);

// //     const payments = [
// //         { booking: bookingIds[0], customer: bookingIds[0].customer, amount: 100.00, date: new Date(), paymentMethod: 'Credit Card' },
// //         { booking: bookingIds[1], customer: bookingIds[1].customer, amount: 200.00, date: new Date(), paymentMethod: 'PayPal' },
// //     ];

// //     await Payment.create(payments);
// // };


// // const seedPayments = async (bookingIds) => {
// //     await Payment.deleteMany({}); // Clear existing payments
// //     const payments = [
// //         { booking: bookingIds[0], customer: bookingIds[0].customer, amount: 100.00, date: new Date(), paymentMethod: 'Credit Card' },
// //         { booking: bookingIds[1], customer: bookingIds[1].customer, amount: 200.00, date: new Date(), paymentMethod: 'PayPal' },
// //     ];
// //     await Payment.create(payments);
// // };


// const seedDatabase = async () => {
//     try {
//         await seedUsers();
//         const customerIds = await seedCustomers(); // Get customer IDs after seeding customers
//         await seedBookings(customerIds);
//         await seedPayments(customerIds);
//         logger.info('Database seeded successfully!');
//         process.exit(0);
//     } catch (error) {
//         logger.error('Failed to seed database', error);
//         process.exit(1);
//     }
// };

// seedDatabase();

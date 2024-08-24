// backend/seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await User.deleteMany();

    const users = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123', // Note: In production, hash this password
        role: 'Admin',
      },
      // Add more users as needed
    ];

    await User.insertMany(users);

    console.log('Data seeded!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const resetData = async () => {
  try {
    await User.deleteMany();
    console.log('Data reset!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

connectDB().then(() => {
  if (process.argv[2] === '--reset') {
    resetData();
  } else {
    seedData();
  }
});

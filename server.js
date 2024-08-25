const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const logger = require('./utils/logger');

// Load environment variables
dotenv.config({ path: './config/env.js' }); // Ensure this path is correct

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => logger.info('MongoDB connected'))
    .catch((err) => logger.error('MongoDB connection failed', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

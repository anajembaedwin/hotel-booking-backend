const cors = require('cors');

const allowedOrigins = ['http://yourfrontend.com', 'http://anotherdomain.com']; // Add your allowed origins here

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow cookies to be sent
    optionsSuccessStatus: 200
};

module.exports = cors(corsOptions);

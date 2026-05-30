const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const sequelize = require('./config/database');

const app = express();

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            "img-src": ["'self'", "data:", "https://baroque.pk", "https://images.unsplash.com"],
        },
    },
}));
app.use(cors());
app.use(express.json());


app.use(compression());
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 1000, // Increased limit for dev
    message: { error: 'Too many requests' }
});
app.use('/api/', limiter);

app.use('/api/', limiter);


app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/orders', require('./routes/orders'));

app.use('/api/orders', require('./routes/orders'));


app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    res.status(status).json({
        error: {
            message: err.message || 'Internal Server Error',
            status: status
        }
    });
});


const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
        console.log('Connected to:', sequelize.options.dialect, 'database:', sequelize.config.database, 'on', sequelize.config.host);

        app.listen(PORT, () => {
            console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

startServer();
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection! Shutting down...');
    console.error(err);
    process.exit(1);
});

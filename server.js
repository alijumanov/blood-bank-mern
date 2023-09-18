const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');

// dotenv options

dotenv.config();

// mongodb connection

connectDB();

// use express option for app

const app = express();

// middleware options

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// routes options

app.use('/api/v1/test', require('./routes/testRoutes'));
app.use('/api/v1/auth', require('./routes/authRoutes'));

// port

const PORT = process.env.PORT || 8080;

// listen options

app.listen(PORT, () => {
    console.log(`Node server running in ${process.env.DEV_MODE} mode on port ${process.env.PORT}`.bgCyan.white)
});
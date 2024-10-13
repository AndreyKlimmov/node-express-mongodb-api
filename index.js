const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 8080;
const USER = process.env.USER_MONGO_DB;
const PASSWORD = process.env.PASSWORD_MONGO_DB;
console.log(USER);

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@cluster0.psnbsei.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0\'`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Routes
const itemsRouter = require('./routes/items');
app.use('/items', itemsRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

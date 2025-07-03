const express = require('express');
const dotenv = require('dotenv');
const path = require('path'); // To serve static files from client

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the client build directory if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
    });
} else {
    // In development, just log API requests
    console.log('Server running in development mode.');
}


// Basic API route
app.get('/api/message', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access at: http://localhost:${PORT}`);
});

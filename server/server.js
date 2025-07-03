const express = require('express');
const dotenv = require('dotenv');
const path = require('path'); 
const { default: mongoose } = require('mongoose');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; 

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed: ", err.message);
        process.exit(1);
    }
};

connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// // Serve static files from the client build directory if in production
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/dist')));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
//     });
// } else {
//     console.log('Server running in development mode.');
// }


// Basic API route
app.get('/', (req, res) => {
  res.send('Hello from the MERN server!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access at: http://localhost:${PORT}`);
});

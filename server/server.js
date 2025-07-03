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

app.use('/api/auth', require('./routes/auth'))

// Basic API route
app.get('/', (req, res) => {
  res.send('Hello from the MERN server!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access at: http://localhost:${PORT}`);
});

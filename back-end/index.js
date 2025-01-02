const express = require("express");
const app = express()
app.get("/", (req, resp)=> {
resp.send("app is working...")

});

app.listen(5000);

/* const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => res.send('API is running'));

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)); */ 
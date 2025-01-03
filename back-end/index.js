const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://javiwas:bhu8nji9@cluster0.ldl4m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
/*

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const { MongoClient } = require('mongodb');

// Connection URI
const uri = "mongodb+srv://javiwas:bhu8nji9@cluster0.mongodb.net.inlsv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Crear cliente
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    console.log("Conexión exitosa a MongoDB");
  } finally {
    await client.close();
  }
}

run().catch(console.error);


const app = express();


app.use(cors());
app.use(bodyParser.json());

const resultSchema = new mongoose.Schema({
  email: String,
  resultados: String,
});

const Result = mongoose.model('Result', resultSchema);

app.post('/api/results', async (req, res) => {
  const { email, resultados } = req.body;

  try {
    const newResult = new Result({ email, resultados });
    await newResult.save();
    res.status(200).json({ message: 'Resultado guardado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Hubo un error al guardar los datos', error });
  }
});

app.listen(5000, () => {
  console.log('Servidor en puerto 5000');
});


/*const express = require("express");
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
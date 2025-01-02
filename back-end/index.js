const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error de conexión a MongoDB', err));

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Esquema de los resultados
const resultSchema = new mongoose.Schema({
  email: String,
  resultados: String,
});

const Result = mongoose.model('Result', resultSchema);

// Ruta para guardar los resultados
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

// Iniciar el servidor
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
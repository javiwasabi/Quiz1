const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const uri = "mongodb+srv://javiwas:bhu8nji9@cluster0.ldl4m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDB() {
  try {
    await client.connect();
    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
  }
}

// Llama a la función para conectar
connectToDB();

// Ruta para recibir los datos del front-end
app.post("/api/results", async (req, res) => {
  const { email, resultados } = req.body;

  if (!email || !resultados) {
    return res.status(400).json({ error: "Todos los campos son obligatorios." });
  }

  try {
    const db = client.db("Cluster0"); // Cambia "Cluster0" por el nombre de tu base de datos
    const collection = db.collection("results"); // Cambia "results" por el nombre de tu colección

    // Insertar datos en la colección
    const result = await collection.insertOne({ email, resultados });

    res.status(200).json({ message: "Datos enviados correctamente", id: result.insertedId });
  } catch (error) {
    console.error("Error al insertar datos:", error);
    res.status(500).json({ error: "Error al insertar datos" });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

import React, { useState, useEffect } from "react";
import axios from "axios";

const Last: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const [finalScore, setFinalScore] = useState<string | null>("");

  useEffect(() => {
    
    const score = sessionStorage.getItem("finalScore");
    if (score) {
      setFinalScore(score);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !finalScore) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.post("http://localhost:5000/api/results", {
        email,
        resultados: finalScore,
      });

      setSuccess(true);
      setEmail("");
    } catch (error) {
      setError("Hubo un error al enviar los datos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-screen">
      {/* Imagen de fondo */}
      <img
        src="./final-image.webp"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover z-0"
      />

    
      <div className="relative flex flex-col items-center justify-center h-full bg-black bg-opacity-50 z-10">
        <h1 className="text-white text-5xl font-bold mb-8">
          SCORE: {finalScore}
        </h1>

        {success && (
          <div className="mb-4 text-green-500">
            <p>¡Datos enviados correctamente!</p>
          </div>
        )}

        {error && (
          <div className="mb-4 text-red-500">
            <p>{error}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-4 bg-white p-6 rounded-lg shadow-lg"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo Electrónico"
            className="p-3 border border-gray-300 rounded w-80"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-10 py-3 bg-blue-500 text-white text-xl rounded-full"
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Last;

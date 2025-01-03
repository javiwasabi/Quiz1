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
      setError("Please fill out all fields.");
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
      setError("There was an error submitting your data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-screen">
      <img
        src="./final-image.webp"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="relative flex flex-col items-center justify-center h-full bg-black bg-opacity-50">
        <h1 className="text-white text-3xl md:text-5xl font-bold mb-6">
          SCORE: {finalScore}
        </h1>
        {success && <p className="text-green-400 mb-4">Data sent successfully!</p>}
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg space-y-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="p-2 border border-gray-300 rounded-md w-full md:w-96"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Last;

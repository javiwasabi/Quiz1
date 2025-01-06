import React, { useState, useEffect } from 'react';
import { useAddUserMutation } from '../app/appi/apiSlice';

const Last: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [score, setScore] = useState<string | null>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const [addUser, { isLoading, isError, isSuccess }] = useAddUserMutation();

  useEffect(() => {
    const storedScore = sessionStorage.getItem('finalScore');
    if (storedScore) {
      setScore(storedScore);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userEmail || !score) {
      setError('Please fill out all fields.');
      return;
    }

    try {
      await addUser({ userEmail, score }).unwrap();
      setSuccess(true);
      setUserEmail('');
    } catch {
      setError('There was an error submitting your data.');
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
          SCORE: {score}
        </h1>
        {success && <p className="text-green-400 mb-4">Data sent successfully!</p>}
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg space-y-4"
        >
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Email Address"
            className="p-2 border border-gray-300 rounded-md w-full md:w-96"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          >
            {isLoading ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Last;

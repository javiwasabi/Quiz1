import React, { useState, useEffect } from 'react';
import { useAddUserMutation } from '../app/appi/apiSlice';
import { IoLogoInstagram, IoLogoFacebook } from "react-icons/io";

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
      // Llamar al API para agregar el usuario
      await addUser({ userEmail, score }).unwrap();

      // Aquí es donde puedes enviar un correo electrónico
      await sendEmail(userEmail, score);

      setSuccess(true);
      setUserEmail('');
    } catch {
      setError('There was an error submitting your data.');
    }
  };

  const sendEmail = async (email: string, score: string | null) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          score,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      setError('There was an error sending the email.');
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
          className="flex flex-col items-center bg-transparent p-6 rounded-lg shadow-md space-y-4 w-[75%]"
        >
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Email Address"
            className="p-6 border border-gray-300 rounded-md w-full md:w-100 text-lg"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded-md"
          >
            {isLoading ? 'Sending...' : 'Submit'}
          </button>
        </form>
        <div className="flex space-x-10 mt-9">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <IoLogoInstagram size={30} className="text-white hover:text-pink-500" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <IoLogoFacebook size={30} className="text-white hover:text-blue-600" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Last;

import React, { useState, useEffect } from 'react';
import { useAddUserMutation } from '../app/appi/apiSlice';
import { IoMdMail, IoLogoInstagram, IoLogoFacebook } from "react-icons/io"; 

const Last: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [score, setScore] = useState<string | null>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<boolean>(false);

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
        src="https://img.freepik.com/fotos-premium/hoja-papel-boligrafo-lupa-sobre-mesa-madera_200904-711.jpg"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="relative flex flex-col items-center justify-center h-full bg-black bg-opacity-50 p-6">
        <h1 className="text-white text-3xl md:text-5xl font-bold mb-6 items-center">
          SCORE: {score}
         
        </h1>
        {success && <p className="text-green-400 mb-4">Data sent successfully!</p>}
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <p className='font-bentham text-white text-3xl sm:text-4xl text-center items-center'>share your results</p>
      
        {showInput && (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center bg-transparent p-6 rounded-lg shadow-md space-y-4 w-[75%] max-w-md"
          >
           
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Email Address"
              className="p-4 border border-gray-300 rounded-md w-full text-lg"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded-md"
            >
              {isLoading ? 'Sending...' : 'Submit'}
            </button>
          </form>
        )}
        
        <div className="flex space-x-8 mt-8">
          <a 
            href="#"
            onClick={() => setShowInput(true)}
            >
            <IoMdMail size={40} className="text-white hover:text-yellow-500 transition-colors" />
          </a>
          
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <IoLogoInstagram size={40} className="text-white hover:text-pink-500 transition-colors" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <IoLogoFacebook size={40} className="text-white hover:text-blue-600 transition-colors" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Last;

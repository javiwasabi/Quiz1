import React, { useState, useEffect } from 'react';
import { useAddUserMutation } from '../app/appi/apiSlice';
import { IoMdMail, IoLogoInstagram, IoLogoFacebook } from "react-icons/io";

const Last: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [score, setScore] = useState<string | null>('');
  const [checklist1, setChecklist1] = useState<boolean>(false);
  const [checklist2, setChecklist2] = useState<boolean>(false);
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

    if (!userEmail) {
      setError('Please enter your email address.');
      return;
    }

    if (!userEmail.includes('@')) {
      setError('The email address must contain an "@" symbol.');
      return;
    }

    if (!score) {
      setError('Score is missing.');
      return;
    }

    try {
      await addUser({ userEmail, score, checklist1, checklist2 }).unwrap();
      setSuccess(true);
      setUserEmail('');
      setChecklist1(false);
      setChecklist2(false);
      setError(null);
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
        <p className="font-bentham text-white text-3xl sm:text-4xl text-center items-center">Share your results</p>

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
            <div className="flex flex-col items-start space-y-2 w-full">
              <label className="flex items-center space-x-2 text-white">
              <input
                  type="checkbox"
                  checked={checklist1}
                  onChange={(e) => setChecklist1(e.target.checked)}
                  className="form-checkbox"
                />

                <span>Would you like to receive information about x?</span>
              </label>
              <label className="flex items-center space-x-2 text-white">
                <input
                    type="checkbox"
                    checked={checklist2}
                    onChange={(e) => setChecklist2(e.target.checked)}
                    className="form-checkbox"
                  />
                <span>Send results to email</span>
              </label>
            </div>
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
            id='email-buttton'
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

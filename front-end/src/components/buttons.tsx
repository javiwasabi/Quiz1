import React from 'react';
import { Link } from 'react-router-dom';

/* Tengo hacer que estos botones sean dinamicos para las distintas preguntas más adelante */

export const ButtonStart: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Link to="/question">
        <button className="px-10 py-5 bg-red-800 text-white text-3xl rounded-full">
          START
        </button>
      </Link>
    </div>
  );
};


export const ButtonNext: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Link to="/final">
        <button className="px-10 py-5 bg-gray-800 text-white text-3xl rounded-full">
          NEXT
        </button>
      </Link>
    </div>
  );
};


interface ChoiceProps {
  title: string; 
  route: string; 
}

export const Choice: React.FC<ChoiceProps> = ({ title, route }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Link to={route}>
        <button className="px-10 py-5 bg-blue-500 text-white text-3xl rounded-full">
          {title}
        </button>
      </Link>
    </div>
  );
};

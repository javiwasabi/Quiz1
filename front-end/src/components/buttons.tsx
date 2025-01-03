import React from 'react';
import { Link } from 'react-router-dom';

/* Tengo hacer que estos botones sean dinamicos para las distintas preguntas más adelante */
export const ButtonStart: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[10%] w-full bg-gray-100">
      <Link to="/question">
        <button className="relative -top-1 -left-1 bg-gray-800 py-[85%] px-[88%] font-medium uppercase text-white text-3xl transition-all before:absolute before:top-1 before:left-1 before:-z-[1] before:h-full before:w-full before:border-2 before:border-gray-700 before:transition-all before:content-[''] hover:top-0 hover:left-0 before:hover:top-0 before:hover:left-0 rounded-md
        "
        style={{ transform: "rotate(-9deg)" }}>
          START
        </button>
      </Link>
    </div>
  );
};

interface ButtonNextProps {
  onClick?: () => void; // Propiedad opcional para manejar clics
}

export const ButtonNext: React.FC<ButtonNextProps> = ({ onClick }) => {
  return (
    <div className="flex flex-col h-[10%] bg-gray-100 rounded-full">
      <Link to="/final">
        <button
          className="px-10 py-5 bg-gray-800 text-white text-xl"
          onClick={onClick}
        >
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

export const Choice1: React.FC<ChoiceProps> = ({ title, route }) => {
  return (
    <div className="flex flex-col ">
      <Link to={route}>
        <button className="px-5 py-5 bg-blue-600 text-white text-md opacity-70 ">
          {title}
        </button>
      </Link>
    </div>
  );
};

export const Choice2: React.FC<ChoiceProps> = ({ title, route }) => {
  return (
    <div className="flex flex-col">
      <Link to={route}>
        <button className="px-5 py-5 bg-red-600 text-white text-md opacity-70">
          {title}
        </button>
      </Link>
    </div>
  );
};



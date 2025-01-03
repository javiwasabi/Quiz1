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
  onClick?: () => void;
}

export const ButtonNext: React.FC<ButtonNextProps> = ({ onClick }) => {
  return (
    <div className="flex flex-col h-[10%] rounded-full relative">
      <button
        className="relative px-10 py-5 bg-transparent text-white text-xl rounded-md transition-all hover:text-black"
        onClick={onClick} // Ejecuta la función onClick para pasar a la siguiente pregunta
      >
        {/* Imagen con fondo transparente que aparece al hacer hover */}
        <div className="absolute inset-0 opacity-0">
          <img
            src="https://i.pinimg.com/474x/e3/6e/3f/e36e3f0a7d64c126180302aa9f66d1ec.jpg"
            alt="Background"
            className="h-full w-full object-contain"
          />
        </div>
        {/* Texto del botón */}
        <span className="relative z-10">NEXT</span>
      </button>
    </div>
  );
};


interface ChoiceProps {
  title: string;
  route: string;
}

export const Choice1: React.FC<ChoiceProps> = ({ title, route }) => {
  return (
    <div className="flex flex-col items-center">
      <Link to={route}>
        <button className="relative bg-blue-600 text-white font-medium text-lg py-4 px-8 rounded-full transition-all before:absolute before:top-1 before:left-1 before:w-full before:h-full before:bg-blue-500 before:rounded-full before:content-[''] before:transition-all hover:top-0 hover:left-0 hover:before:top-0 hover:before:left-0 active:top-1 active:left-1 active:before:top-1 active:before:left-1">
          {title}
        </button>
      </Link>
    </div>
  );
};

export const Choice2: React.FC<ChoiceProps> = ({ title, route }) => {
  return (
    <div className="flex flex-col items-center">
      <Link to={route}>
        <button className="relative bg-red-600 text-white font-medium text-lg py-4 px-8 rounded-full transition-all before:absolute before:top-1 before:left-1 before:w-full before:h-full before:bg-red-500 before:rounded-full before:content-[''] before:transition-all hover:top-0 hover:left-0 hover:before:top-0 hover:before:left-0 active:top-1 active:left-1 active:before:top-1 active:before:left-1">
          {title}
        </button>
      </Link>
    </div>
  );
};

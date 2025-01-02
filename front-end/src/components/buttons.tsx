import React from 'react';
import { Link } from 'react-router-dom';

/* Tengo hacer que estos botones sean dinamicos para las distintas preguntas más adelante */

export const ButtonStart: React.FC = () => {
  return (
    <div className="flex flex-col h-[10%] w-0 bg-gray-100">
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
    <div className="flex flex-col h-[10%] bg-gray-100 rounded-full">
      <Link to="/final">
        <button className="px-10 py-5 bg-gray-800 text-white text-3xl rounded-full ">
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
    <div className="flex flex-col rounded-full bg-gray-100">
      <Link to={route}>
        <button className="px-5 py-5 bg-blue-500 text-white text-3xl rounded-full">
          {title}
        </button>
      </Link>
    </div>
  );
};

export const Choice2: React.FC<ChoiceProps> = ({ title, route }) => {
  return (
    <div className="flex flex-col rounded-full bg-gray-100">
      <Link to={route}>
        <button className="px-5 py-5 bg-red-500 text-white text-3xl rounded-full">
          {title}
        </button>
      </Link>
    </div>
  );
};



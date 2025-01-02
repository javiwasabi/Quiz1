import React from 'react';
import { ButtonStart, ButtonNext, Choice } from '../components/buttons';
const Vie: React.FC = () => {
  return (
    <div
      className="h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url(/images/first-image.jpg)' }}
    >
      <ButtonStart />
    </div>
  );
};

export default Vie;





import React from 'react';
import { ButtonStart, ButtonNext, Choice } from '../components/buttons';
const Middle: React.FC = () => {
  return (
    <div
      className="h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url(/images/first-image.jpg)' }}
    >
      <ButtonNext/>
      <Choice title="Murderer" route="/" />
      <Choice title="Inventor" route="/" />
     
    </div>
  );
};

export default Middle;
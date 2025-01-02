import React, { useEffect, useState } from 'react';

const LoadingPage: React.FC<{ onLoadComplete: () => void }> = ({ onLoadComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {

    setTimeout(() => {
      setFadeOut(true);  
      setTimeout(() => {
        onLoadComplete();  
      }, 500); 
    }, 2000);  
  }, [onLoadComplete]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="flex items-center justify-center h-full">
        <h1 className="text-white text-4xl">Loading...</h1>
      </div>
    </div>
  );
};

export default LoadingPage;

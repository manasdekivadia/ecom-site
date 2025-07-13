import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white/50">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-r-transparent border-b-primary border-l-primary animate-spin bg-gradient-to-tr from-purple-500 via-blue-500 to-purple-500 shadow-xl"></div>
        <div className="absolute inset-2 rounded-full bg-white"></div>
      </div>
    </div>
  );
};

export default Spinner;

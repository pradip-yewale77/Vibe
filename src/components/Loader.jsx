import Image from 'next/image';
import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur z-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Animated GIF Loader */}
        <Image
          src="/Ghost.gif"
          alt="Loading..."
          width={100}
          height={100}
          className="animate-pulse"
        />

        {/* Optional Spinner */}
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />

        {/* Loading Text */}
        <p className="text-lg text-gray-700 font-medium animate-pulse">
          Building the site...
        </p>
      </div>
    </div>
  );
};

export default Loader;

import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="bg-gray-900 text-white py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Your Body, <span className="text-red-600">Transform Your Life</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300">
              Join IRON FIT Gym and experience the ultimate fitness journey. Our expert trainers and state-of-the-art equipment will help you achieve your fitness goals faster than ever.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md text-lg transition duration-300 transform hover:scale-105">
                Start Your Journey
              </button>
              <button className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold py-3 px-8 rounded-md text-lg transition duration-300">
                View Programs
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center text-gray-500">
              Hero Image
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

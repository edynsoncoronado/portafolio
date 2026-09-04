import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center text-gray-500">
              About Image
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About IRON FIT Gym
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Founded in 2010, IRON FIT Gym has been a cornerstone of the fitness community for over a decade. Our mission is to provide a welcoming environment where everyone can achieve their health and fitness goals.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              With state-of-the-art equipment, certified trainers, and a variety of programs, we cater to all fitness levels from beginners to competitive athletes.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center">
                <div className="text-red-600 mr-2">✓</div>
                <span className="font-medium">Certified Trainers</span>
              </div>
              <div className="flex items-center">
                <div className="text-red-600 mr-2">✓</div>
                <span className="font-medium">Modern Equipment</span>
              </div>
              <div className="flex items-center">
                <div className="text-red-600 mr-2">✓</div>
                <span className="font-medium">Flexible Hours</span>
              </div>
              <div className="flex items-center">
                <div className="text-red-600 mr-2">✓</div>
                <span className="font-medium">Community Support</span>
              </div>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition duration-300">
              Meet Our Team
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

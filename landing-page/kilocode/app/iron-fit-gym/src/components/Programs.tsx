import React from 'react';

const Programs: React.FC = () => {
  const programs = [
    {
      title: "Strength Training",
      description: "Build muscle and increase strength with our specialized weight training programs.",
      duration: "60 min",
      level: "All Levels"
    },
    {
      title: "Cardio Blast",
      description: "High-intensity cardio workouts to burn fat and improve cardiovascular health.",
      duration: "45 min",
      level: "Beginner-Intermediate"
    },
    {
      title: "Yoga & Flexibility",
      description: "Improve flexibility, balance, and mental wellness through yoga practices.",
      duration: "60 min",
      level: "All Levels"
    },
    {
      title: "HIIT Challenge",
      description: "Short, intense workouts that combine cardio and strength training for maximum results.",
      duration: "30 min",
      level: "Intermediate-Advanced"
    }
  ];

  return (
    <section id="programs" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Training Programs
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our diverse range of training programs designed to meet your fitness goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-red-600 transition-colors duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
              <p className="text-gray-600 mb-4">{program.description}</p>
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>{program.duration}</span>
                <span>{program.level}</span>
              </div>
              <button className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-red-600 transition-colors duration-300">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;

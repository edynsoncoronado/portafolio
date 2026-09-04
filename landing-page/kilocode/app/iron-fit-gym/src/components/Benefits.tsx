import React from 'react';

const Benefits: React.FC = () => {
  const benefits = [
    {
      title: "Expert Trainers",
      description: "Our certified trainers have years of experience helping clients achieve their fitness goals.",
      icon: "🏋️"
    },
    {
      title: "Modern Equipment",
      description: "We provide state-of-the-art fitness equipment for all types of workouts.",
      icon: "💪"
    },
    {
      title: "Flexible Schedule",
      description: "Open 24/7 so you can workout whenever it's convenient for you.",
      icon: "🕒"
    },
    {
      title: "Personalized Plans",
      description: "Custom workout and nutrition plans tailored to your specific needs.",
      icon: "📋"
    }
  ];

  return (
    <section id="benefits" className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose IRON FIT?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We provide everything you need to achieve your fitness goals in a supportive and motivating environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;

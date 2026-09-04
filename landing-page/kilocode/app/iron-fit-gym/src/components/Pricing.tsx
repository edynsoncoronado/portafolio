import React from 'react';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: "Basic",
      price: "$29",
      period: "per month",
      features: [
        "Access to gym facilities",
        "Basic workout equipment",
        "Locker room access",
        "Free Wi-Fi"
      ],
      popular: false
    },
    {
      name: "Premium",
      price: "$49",
      period: "per month",
      features: [
        "All Basic features",
        "Access to all equipment",
        "Group classes included",
        "Personal trainer consultation",
        "Nutrition plan"
      ],
      popular: true
    },
    {
      name: "VIP",
      price: "$79",
      period: "per month",
      features: [
        "All Premium features",
        "Unlimited personal training",
        "Priority booking",
        "Exclusive events",
        "Spa access"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Membership Plans
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan that fits your fitness goals and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`border rounded-lg p-8 ${plan.popular ? 'border-red-600 ring-2 ring-red-600 ring-opacity-50 transform md:-translate-y-2' : 'border-gray-200'}`}
            >
              {plan.popular && (
                <div className="bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-full mb-4 inline-block">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600">/{plan.period}</span>
              </div>
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-md font-bold transition duration-300 ${
                  plan.popular
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

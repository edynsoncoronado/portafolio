import React, { useState } from 'react';

const CTA: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this to your backend
    alert(`Thank you! We'll send information to ${email}`);
    setEmail('');
  };

  return (
    <section className="py-16 bg-red-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Transform Your Life?
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Join today and get your first week free!
        </p>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-grow px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <button
            type="submit"
            className="bg-gray-900 hover:bg-black text-white font-bold py-3 px-6 rounded-md transition duration-300 whitespace-nowrap"
          >
            Sign Up Free
          </button>
        </form>

        <p className="mt-4 text-red-100 text-sm">
          Join thousands of satisfied members today!
        </p>
      </div>
    </section>
  );
};

export default CTA;

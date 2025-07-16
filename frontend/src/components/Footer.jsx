import React, { useState } from 'react'
import { useSnackbar } from 'notistack';
import axios from 'axios';

const Footer = () => {

    const [email, setEmail] = useState('');
    const { enqueueSnackbar } = useSnackbar();

    const handleSubscribe = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/subscriber`, { email });
          enqueueSnackbar(`Subscription successful: ${response.data.email}`, { variant: 'success' });
          setEmail('');
        } catch (error) {
            console.error('Error subscribing:', error);
            enqueueSnackbar('Error subscribing: ' + error.response.data, { variant: 'error' });
        }
      };
    

  return (
<footer className="bg-gray-900 text-gray-200 py-5 px-6 sm:px-12 mt-12 rounded-t-3xl">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

    <div>
      <h2 className="text-3xl font-bold text-white mb-4">Codemy</h2>
      <p className="text-gray-400">Providing reliable tech since 2025.</p>
    </div>

    <div>
      <h6 className="text-lg font-semibold mb-4">Social</h6>
      <div className="flex space-x-4">
        <a href="#" className="hover:text-teal-400 transition">
          <i className="fab fa-twitter text-2xl"></i>
        </a>
        <a href="#" className="hover:text-teal-400 transition">
          <i className="fab fa-youtube text-2xl"></i>
        </a>
        <a href="#" className="hover:text-teal-400 transition">
          <i className="fab fa-facebook text-2xl"></i>
        </a>
      </div>
    </div>

    {/* Support */}
    <div>
      <h6 className="text-lg font-semibold mb-4">Support</h6>
      <p className="mb-2 hover:text-teal-400 cursor-pointer transition">Codemy@test.com</p>
      <p className="hover:text-teal-400 cursor-pointer transition">+99 999 99</p>
    </div>

    {/* Newsletter */}
    <form onSubmit={handleSubscribe}>
      <h6 className="text-lg font-semibold mb-4">Newsletter</h6>
      <div className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="your@email.com"
          className="px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Subscribe
        </button>
      </div>
    </form>

  </div>

  <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm">
    © 2025 Codemy. All rights reserved.
  </div>
</footer>
  )
}

export default Footer
import React from 'react'
import { Link } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggleButton';
import CartIcon from './CartIcon';

const AdminNavbar = () => {

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = "/";
    }

  return (
      <div className="navbar max-w-[1200px] mx-auto p-4 bg-white dark:bg-gray-800 shadow-md rounded-xl my-4">

    <div className="navbar-start">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
    </div>

    <div className="navbar-center flex">
        <button
            onClick={logout}
            className="btn px-6 py-2 text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-full font-semibold transition duration-300"
        >
            Logout
        </button>
    </div>

    <div className="navbar-end gap-6">
        <ThemeToggleButton />
    </div>

</div>

  )
}

export default AdminNavbar
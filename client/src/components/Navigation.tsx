import React from 'react';
import { Link } from 'react-router';

function Navigation() {
  return (
    <nav className="flex justify-between items-center h-[70px] px-5 shadow-md bg-gray-500 text-white">
      <h3 className="font-bold">TJNS</h3>
      <span>
        <Link to="/" className="mr-2">
          Home
        </Link>
      </span>
    </nav>
  );
}

export default Navigation;

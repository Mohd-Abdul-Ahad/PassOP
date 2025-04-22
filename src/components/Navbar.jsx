import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-[#1D293B] flex justify-between items-center px-4 h-14">
      <div className="logo font-bold flex ">
        <h1 className="font-bold text-4xl text-white">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </h1>
      </div>
      <ul>
        <li className="flex gap-4 rounded-full">
          <a
            className="hover:font-bold bg-green-700 rounded-full px-6 py-2 text-white font-bold"
            href="#"
          >
            <button>Github</button>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

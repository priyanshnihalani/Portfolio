// src/components/Header.jsx
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Header({ onHireMe }) {  
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="w-full z-20 text-white font-orbitron bg-white">
            <nav className="w-full flex justify-between items-center px-4 md:px-8 py-4 text-gray-900">
                
                {/* Branding */}
                <h1 className="aladin-regular text-lg md:text-2xl font-bold drop-shadow-glow">
                    Priyansh Nihalani
                </h1>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-8 text-sm md:text-base">
                    <li className="cursor-pointer hover:underline">Portfolio</li>
                    <li className="relative cursor-pointer">
                        <div className="bg-blue-400 absolute -bottom-1 left-0 w-full h-2 -z-10 rounded-md"></div>
                        <span className="relative z-10 cursor-pointer hover:underline" onClick={onHireMe}>Hire Me</span>
                    </li>
                </ul>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden z-30" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <ul className="md:hidden flex flex-col items-center space-y-4 text-gray-800 bg-white py-4 shadow-md">
                    <li className="cursor-pointer hover:underline">Portfolio</li>
                    <li className="relative cursor-pointer">
                        <div className="bg-blue-400 absolute bottom-0 w-full h-2 -z-10 rounded-md"></div>
                        <span className="relative z-10 cursor-pointer hover:underline" onClick={onHireMe}>Hire Me</span>
                    </li>
                </ul>
            )}
        </header>
    );
}

export default Header;

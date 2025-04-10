// src/components/Footer.jsx
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

function Footer() {
    return (
        <footer className="w-full px-4 md:px-20 py-6 bg-white text-black font-orbitron">
            {/* Wrapper for Flex Layout */}
            <div className="flex flex-col md:flex-row justify-between items-center w-full space-y-4 md:space-y-0">

                {/* Left Side: Branding */}
                <h1 className="aladin-regular text-xl md:text-2xl font-bold drop-shadow-glow">
                    Priyansh Nihalani
                </h1>

                {/* Right Side: Links + Copyright */}
                <div className="flex flex-col items-center md:items-end w-full md:w-auto space-y-2">
                    {/* Social Links */}
                    <ul className="flex space-x-4 text-sm md:text-base">
                        <li className="bg-black text-white aladin-regular px-3 py-3 rounded-md hover:bg-gray-800 cursor-pointer transition-all "><a className="my-auto flex space-x-2 items-center" href="https://www.linkedin.com/in/priyansh-nihalani/"><span>LinkedIn</span> <FaLinkedin/></a></li>
                        <li className="bg-black text-white aladin-regular px-3 py-3 rounded-md hover:bg-gray-800 cursor-pointer transition-all"><a className="my-auto flex space-x-2 items-center" href="https://github.com/priyanshnihalani"><span>GitHub</span> <FaGithub/></a></li>
                        <li className="bg-black text-white aladin-regular px-3 py-3 rounded-md hover:bg-gray-800 cursor-pointer transition-all"><a className="my-auto flex space-x-2 items-center" href="https://www.instagram.com/priyansh_nihalani_16904/"><span>Instagram</span> <FaInstagram/></a></li>
                    </ul>

                    {/* Copyright */}
                    <p className="text-gray-500 text-xs md:text-sm text-center md:text-right">
                        &copy; {new Date().getFullYear()} Priyansh Nihalani. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

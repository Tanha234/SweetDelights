// components/Navbar.jsx

import { useState } from "react";
import { Menu, X, LogIn } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = ["Home", "Cakes", "About", "Gallery", "Contact"];

  return (
    <nav className="bg-sweetPink shadow-md sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-7 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-berryPink tracking-wide">
          🍰 SweetDelights
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-berryPink font-medium items-center">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`${link.toLowerCase()}`}
              className="hover:text-berryPink transition"
            >
              {link}
            </a>
          ))}

          {/* Login link */}
          <a
            href="/login"
            className="flex items-center gap-1 hover:text-berryPink transition"
          >
            <LogIn size={18} /> Login
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-berryPink"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4 bg-sweetPink text-berryPink">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="hover:text-pink-600"
              onClick={() => setIsOpen(false)}
            >
              {link}
            </a>
          ))}

          {/* Login link for mobile */}
          <a
            href="/login"
            className="flex items-center gap-1 hover:text-berryPink"
            onClick={() => setIsOpen(false)}
          >
            <LogIn size={18} /> Login
          </a>
        </div>
      )}
    </nav>
  );
}

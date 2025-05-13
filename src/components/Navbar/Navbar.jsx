import { useEffect, useState } from "react";
import { Menu, X, LogIn, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const navLinks = ["Home", "About", "Cakes", "Gallery", "Contact"];

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    updateCartCount(); // Initial load

    // Listen to cart updates
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <nav className="bg-sweetPink shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-7 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-berryPink tracking-wide">🍰 SweetDelights</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-berryPink font-medium items-center">
          {navLinks.map((link) => (
            <Link
              key={link}
              to={`/${link.toLowerCase()}`}
              className="hover:text-berryPink transition"
            >
              {link}
            </Link>
          ))}

          {/* Cart Icon with badge */}
          <Link to="/cart" className="relative">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Login link */}
          <Link
            to="/login"
            className="flex items-center gap-1 hover:text-berryPink transition"
          >
            <LogIn size={18} /> Login
          </Link>
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
            <Link
              key={link}
              to={`/${link.toLowerCase()}`}
              className="hover:text-pink-600"
              onClick={() => setIsOpen(false)}
            >
              {link}
            </Link>
          ))}

          {/* Login link for mobile */}
          <Link
            to="/login"
            className="flex items-center gap-1 hover:text-berryPink"
            onClick={() => setIsOpen(false)}
          >
            <LogIn size={18} /> Login
          </Link>
        </div>
      )}
    </nav>
  );
}

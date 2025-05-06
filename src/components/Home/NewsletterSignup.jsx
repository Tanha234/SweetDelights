import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }
    // Handle email submission (send to backend)
    setMessage("Thank you for signing up! 🎉 You'll get sweet deals in your inbox.");
    setEmail("");
  };

  return (
    <section className="bg-gradient-to-r from-pink-400 to-pink-600 py-16 px-4 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-6">
          🍰 Get Sweet Deals in Your Inbox!
        </h2>
        <p className="text-xl mb-8">Sign up for exclusive offers, discounts, and cake updates!</p>

        <form onSubmit={handleSubmit} className="flex justify-center items-center space-x-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="p-4 w-80 rounded-xl border-2 border-white bg-white text-black focus:outline-none focus:border-pink-300 transition"
            required
          />
          <button
            type="submit"
            className="bg-white text-pink-600 py-3 px-8 rounded-xl hover:bg-pink-100 transition ease-in-out duration-200"
          >
            Subscribe
          </button>
        </form>

        {message && (
          <div className="mt-6 text-lg font-semibold text-green-300">
            {message}
          </div>
        )}
      </div>
    </section>
  );
}

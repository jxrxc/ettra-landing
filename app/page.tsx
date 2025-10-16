"use client";

import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1000);
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-8 pb-16" style={{ backgroundColor: '#3A1A4F' }}>
      {/* Logo */}
      <div className="mb-20">
        <div className="relative responsive-logo">
          <Image
            src="/ettra-logo-md.png"
            alt="Ettra Logo"
            width={300}
            height={100}
            priority
            className="transition-opacity duration-300"
            sizes="(max-width: 640px) 120px, (max-width: 1024px) 180px, 300px"
          />
        </div>
      </div>

      {/* Main Text */}
      <div className="mb-8 max-w-2xl mx-auto">
        <p className="text-xl md:text-2xl leading-relaxed text-[#FF5277] mb-3">
          We&apos;re crafting the art and edge of selling beautifully.
        </p>
        <p className="text-xl md:text-2xl leading-relaxed text-[#FF5277]">
          Your listings. Cinematic. Branded. Effortless.
        </p>
      </div>

      {/* Email Form or Success Message */}
      <div className="max-w-md mx-auto w-full">
        {isSubmitted ? (
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-semibold text-[#FF5277] mb-4">
              Welcome to our Pilot Program! 🎉
            </div>
            <p className="text-lg text-[#FF5277] opacity-90">
              We&apos;ll be in touch soon with exclusive updates and early access.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input 
              type="email" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-6 py-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-[#FF5277] transition-colors bg-white text-center"
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-[#FFF8DC] to-white text-[#3A1A4F] px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all text-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Joining...' : 'Join Our Pilot Program'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
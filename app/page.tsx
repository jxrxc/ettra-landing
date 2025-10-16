"use client";

import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center text-center px-6" style={{ backgroundColor: '#3A1A4F' }}>
      {/* Logo */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative responsive-logo">
          <Image
            src="/ettra-logo-md.png"
            alt="Ettra Logo"
            width={200}
            height={67}
            priority
            className="transition-opacity duration-300"
            sizes="(max-width: 640px) 80px, (max-width: 1024px) 120px, 200px"
          />
        </div>
      </div>

      {/* Main Text */}
      <div className="flex-1 flex items-center justify-center max-w-2xl mx-auto">
        <div>
          <p className="text-xl md:text-2xl leading-relaxed text-[#FF5277] mb-4">
            We&apos;re crafting the art and edge of selling beautifully.
          </p>
          <p className="text-xl md:text-2xl leading-relaxed text-[#FF5277] mb-4">
            Your listings. Cinematic. Branded. Effortless.
          </p>
          <p className="text-xl md:text-2xl leading-relaxed text-[#FF5277]">
            Join the waitlist for updates.
          </p>
        </div>
      </div>

      {/* Email Form */}
      <div className="max-w-md mx-auto w-full mb-8">
        <div className="flex flex-col gap-4">
          <input 
            type="email" 
            placeholder="Enter your email"
            className="px-6 py-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-[#FF5277] transition-colors bg-white text-center"
          />
          <button className="bg-gradient-to-r from-[#FF5277] to-[#7B2CBF] text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all text-4xl">
            Join Our Pilot Program
          </button>
        </div>
      </div>
    </div>
  );
}
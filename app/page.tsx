"use client";

import Image from 'next/image';
import { useState, useRef } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!captchaToken) {
      alert('Please complete the hCaptcha verification.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          captchaToken,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setEmail(''); // Clear the form
        setCaptchaToken(null); // Reset captcha
        if (captchaRef.current) {
          captchaRef.current.resetCaptcha();
        }
      } else {
        alert(result.error || 'Failed to join waitlist. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-8 pb-16 bg-gradient-to-br from-[#140025] via-[#22003F] to-[#3A015C] text-[#F6EDE9]">
      {/* Logo */}
      <div className="mb-12 md:mb-16 lg:mb-24">
        <div className="relative responsive-logo">
          <Image
            src="/ettra-logo-md.png"
            alt="Ettra Logo"
            width={240}
            height={80}
            priority
            className="transition-opacity duration-300"
            sizes="(max-width: 640px) 120px, (max-width: 1024px) 180px, 240px"
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
      </div>

      {/* Main Text */}
      <div className="mb-8 max-w-2xl mx-auto">
        <p className="text-[20px] leading-relaxed text-[#F6EDE9] mb-3">
          Crafting the art & edge of selling beautifully.
        </p>
        <p className="text-[18px] md:text-[20px] leading-relaxed text-[#F6EDE9] font-bold">
          Your listings. Cinematic. Branded. Effortless.
        </p>
      </div>

      {/* Email Form or Success Message */}
      <div className="max-w-md mx-auto w-full">
        {isSubmitted ? (
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-semibold text-[#F6EDE9] mb-4">
              Welcome to our Pilot Program! 🎉
            </div>
            <p className="text-lg text-[#F6EDE9] opacity-90">
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
              style={{ color: '#008080', fontWeight: 'bold' }}
            />
            <div className="flex justify-center">
              <HCaptcha
                ref={captchaRef}
                sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || "10000000-ffff-ffff-ffff-000000000001"}
                onVerify={(token) => setCaptchaToken(token)}
                onExpire={() => setCaptchaToken(null)}
                onError={() => setCaptchaToken(null)}
              />
            </div>
            <button 
              type="submit"
              disabled={isLoading || !captchaToken}
              className="bg-gradient-to-r from-[#FF5277] to-[#7B2CBF] text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all text-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Joining...' : 'Join Our Pilot Program'}
            </button>
          </form>
        )}
      </div>

      {/* Footer */}
      <footer className="text-sm text-center text-[#F6EDE9] mt-12">
        <a href="/privacy" className="mx-2 hover:underline">Privacy</a>•
        <a href="/terms" className="mx-2 hover:underline">Terms</a>•
        <a href="mailto:hello@ettra.ai" className="mx-2 hover:underline">Contact</a>
        <p className="mt-3 text-xs text-[#F6EDE9] opacity-70">© 2025 Ettra.ai · Ettra Studio · Crafted with care.</p>
        <p className="mt-2 text-xs text-[#F6EDE9] opacity-70">
          Contact us: <a href="mailto:hello@ettra.ai" className="hover:underline">hello@ettra.ai</a> |{' '}
          <span className="inline-flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 inline-block">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            WhatsApp
          </span>
        </p>
      </footer>
    </div>
  );
}
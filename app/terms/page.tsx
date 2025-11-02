export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#3A1A4F] text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#FF5277]">
          Terms of Service (Ettra.ai)
        </h1>
        
        <p className="text-sm text-gray-400 mb-8">
          Effective Date: November 1, 2025
        </p>

        <div className="prose prose-invert max-w-none space-y-6 text-gray-200">
          <p>
            Welcome to Ettra.ai. These Terms of Service govern your access and use of our website and early-access program. By using Ettra.ai or joining our waitlist, you agree to these terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#FF5277]">1. Purpose of Ettra.ai</h2>
          <p>
            Ettra.ai is an early-stage creative technology product designed to help real estate professionals produce cinematic, branded, and effortless marketing materials.
          </p>
          <p className="mt-4">
            During our pilot phase, features may change, and access may be limited or invite-only.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#FF5277]">2. Use of the Site</h2>
          <p>
            You agree to use the website responsibly and only for its intended purposes — exploring Ettra.ai&apos;s offerings and joining our waitlist.
          </p>
          <p className="mt-4">
            You must not misuse the site, attempt unauthorized access, or interfere with its functionality.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#FF5277]">3. Communications</h2>
          <p>
            By joining the waitlist, you consent to receive occasional product updates, early-access information, or launch notices.
          </p>
          <p className="mt-4">
            You can opt out at any time by using the unsubscribe link in any email or by emailing <a href="mailto:hello@ettra.ai" className="text-[#FF5277] hover:underline">hello@ettra.ai</a>.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#FF5277]">4. Intellectual Property</h2>
          <p>
            All trademarks, designs, logos, visuals, and written content displayed on Ettra.ai are the exclusive property of Ettra.ai and its licensors.
          </p>
          <p className="mt-4">
            You may not copy, distribute, or reproduce them without written consent.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#FF5277]">5. Disclaimer</h2>
          <p>
            Ettra.ai is currently in pilot testing. We make no guarantees about uptime, feature availability, or specific results.
          </p>
          <p className="mt-4">
            The site and its content are provided &quot;as is,&quot; without warranties of any kind, expressed or implied.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#FF5277]">6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Ettra.ai shall not be liable for any indirect, incidental, or consequential damages arising from your use of the site or participation in the waitlist.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#FF5277]">7. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of the State of Florida, without regard to its conflict of law principles.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#FF5277]">Contact</h2>
          <p>
            For any questions about these Terms, please email <a href="mailto:hello@ettra.ai" className="text-[#FF5277] hover:underline">hello@ettra.ai</a>.
          </p>
        </div>

        <footer className="text-sm text-center text-gray-300 mt-12">
          <a href="/privacy" className="mx-2 hover:underline">Privacy</a>•
          <a href="/terms" className="mx-2 hover:underline">Terms</a>•
          <a href="mailto:hello@ettra.ai" className="mx-2 hover:underline">Contact</a>
          <p className="mt-3 text-xs text-gray-500">© 2025 Ettra.ai · Crafted with care.</p>
        </footer>
      </div>
    </div>
  );
}

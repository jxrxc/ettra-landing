export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#3A1A4F] text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#FF5277]">
          Privacy Policy (Ettra.ai)
        </h1>
        
        <p className="text-sm text-gray-400 mb-8">
          Effective Date: November 1, 2025
        </p>

        <div className="prose prose-invert max-w-none space-y-6 text-gray-200">
          <p>
            Welcome to Ettra.ai, a creative technology platform crafted to elevate how real estate professionals present their listings.
          </p>
          
          <p>
            This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or join our waitlist.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#FF5277]">1. Information We Collect</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Email address:</strong> collected when you join our waitlist or subscribe for early access.</li>
            <li><strong>Optional communications:</strong> if you reply to our emails or contact us directly, we may retain those communications for context and support.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#FF5277]">2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Confirm your waitlist registration and provide early access updates.</li>
            <li>Share relevant product news, launch announcements, and invitations to pilot programs.</li>
            <li>Improve Ettra.ai&apos;s user experience and communication effectiveness.</li>
          </ul>
          <p className="mt-4">
            We do not sell, rent, or share your data with third parties for marketing purposes.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#FF5277]">3. Data Storage & Security</h2>
          <p>
            All data is securely stored and managed using reputable service providers (such as Supabase and SendGrid) with encryption and industry-standard security practices.
          </p>
          <p className="mt-4">
            Access is limited to authorized Ettra team members for operational purposes only.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#FF5277]">4. Cookies & Analytics</h2>
          <p>
            Our site may use basic cookies or analytics tools to monitor website performance and improve usability. No tracking cookies or third-party advertising scripts are used at this stage.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#FF5277]">5. Your Rights</h2>
          <p>
            You may request deletion or modification of your information at any time by contacting <a href="mailto:hello@ettra.ai" className="text-[#FF5277] hover:underline">hello@ettra.ai</a>.
          </p>
          <p className="mt-4">
            To unsubscribe from communications, simply follow the link in any email or email us directly.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#FF5277]">6. Updates to This Policy</h2>
          <p>
            As Ettra evolves, we may update this Privacy Policy. All changes will be posted here with a revised &quot;Effective Date.&quot;
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#FF5277]">Contact</h2>
          <p>
            For questions about this policy or your data, please reach us at <a href="mailto:hello@ettra.ai" className="text-[#FF5277] hover:underline">hello@ettra.ai</a>.
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

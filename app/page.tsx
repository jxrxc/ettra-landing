"use client";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#FF5277] to-[#7B2CBF] bg-clip-text text-transparent">
              Ettra
            </span>
            <div className="bg-[#FF5277] text-white text-xs font-bold px-2 py-1 rounded-full">
              AI
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://app.ettra.ai/login" className="text-[#1A1021] hover:text-[#7E667F] px-4 py-2 transition-colors">
              Sign In
            </a>
            <a href="#waitlist" className="border-2 border-[#FF5277] text-[#1A1021] px-6 py-2 rounded-full font-semibold hover:bg-[#FF5277] hover:text-white transition-all">
              Get Early Access
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-b from-[#FFF7F3] to-[#FAF5EF] flex flex-col justify-center items-center text-center px-6 pt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold text-[#1A1021] mb-8 leading-tight">
            The Future of{" "}
            <span className="text-[#FF5277]">Real Estate</span>{" "}
            Content Creation.
          </h1>
          
          <p className="text-xl md:text-2xl text-[#7E667F] mb-12 max-w-2xl mx-auto leading-relaxed">
            Ettra helps agents generate intelligent, local-market content. 
            Faster. in your voice, and in your brand&apos;s tone.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a href="#waitlist" className="bg-[#FF5277] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all">
              Join the Waitlist
            </a>
            <a href="#demo" className="border-2 border-[#FF5277] text-[#1A1021] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#FF5277] hover:text-white transition-all">
              Watch Demo
            </a>
          </div>
          
          <div className="flex flex-col items-center text-[#7E667F]">
            <div className="text-2xl mb-2 animate-bounce">↓</div>
            <span className="text-sm">Scroll to learn how</span>
          </div>
        </div>
      </section>

      {/* How Ettra Works Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#FAF5EF] to-[#FFF7F3]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-[#1A1021] text-center mb-16">
            How Ettra Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* CopyCasa Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-[#FF5277] to-[#F98FAF] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📝</span>
              </div>
              <h3 className="text-2xl font-bold text-[#1A1021] text-center mb-2">CopyCasa</h3>
              <p className="text-[#7E667F] text-center mb-4 font-medium">Content Intelligence</p>
              <p className="text-[#7E667F] text-center leading-relaxed">
                Generates tailored, compelling property descriptions that sound like you.
              </p>
            </div>

            {/* Shiprr Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-[#14B8A6] to-[#3B82F6] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📱</span>
              </div>
              <h3 className="text-2xl font-bold text-[#1A1021] text-center mb-2">Shiprr</h3>
              <p className="text-[#7E667F] text-center mb-4 font-medium">Social Intelligence</p>
              <p className="text-[#7E667F] text-center leading-relaxed">
                Transforms long-form content into social-ready reels, posts and captions.
              </p>
            </div>

            {/* Assembler Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-[#7B2CBF] to-[#FF5277] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-[#1A1021] text-center mb-2">Assembler</h3>
              <p className="text-[#7E667F] text-center mb-4 font-medium">Strategic Automation</p>
              <p className="text-[#7E667F] text-center leading-relaxed">
                Connects every touchpoint to keep your brand voice consistent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 px-6 bg-[#2A003D]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Mockup Card */}
          <div className="flex justify-center lg:justify-start">
            <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-600">MS Delta</span>
                  <span className="text-sm">↑</span>
                </div>
                <h4 className="text-lg font-semibold mb-4">Instagram Reel Captions</h4>
                
                <div className="space-y-3">
                  <div className="text-sm text-gray-700">Bedrooms: 4 - Bathrooms: 3</div>
                  <div className="text-sm text-gray-700">Flooring: Hardwood</div>
                  <div className="text-sm text-gray-700">Area: 2,405 sq ft</div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-800">
                    New Listings Live in a beautiful home in the heart
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Content */}
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              See Ettra&apos;s AI in action
            </h2>
            <p className="text-xl mb-8 text-gray-300 leading-relaxed">
              Launch our free interactive demo to see how Ettra transforms an MLS 
              into social media in seconds.
            </p>
            <a href="https://app.ettra.ai/demo" className="bg-[#FF5277] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all inline-block">
              Launch Demo
            </a>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-20 px-6 bg-gradient-to-b from-[#FFF7F3] to-[#FAF5EF]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1021] mb-8">
            Ready to Transform Your Real Estate Marketing?
          </h2>
          <p className="text-xl text-[#7E667F] mb-12 leading-relaxed">
            Join thousands of agents already using Ettra to create compelling content in seconds.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full border-2 border-[#F7C8A8] focus:outline-none focus:border-[#FF5277] transition-colors"
              />
              <button className="bg-[#FF5277] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#E85A7C] transition-colors">
                Get Early Access
              </button>
            </div>
            <p className="text-sm text-[#7E667F] mt-4">
              No spam. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#1A1021] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-xl font-bold">Ettra</span>
              <div className="bg-[#FF5277] text-white text-xs font-bold px-2 py-1 rounded-full">
                AI
              </div>
            </div>
            <div className="flex space-x-6">
              <a href="https://app.ettra.ai/login" className="hover:text-[#FF5277] transition-colors">Sign In</a>
              <a href="https://app.ettra.ai" className="hover:text-[#FF5277] transition-colors">App</a>
              <a href="#demo" className="hover:text-[#FF5277] transition-colors">Demo</a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Ettra AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
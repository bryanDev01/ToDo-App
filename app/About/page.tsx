import Image from 'next/image';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Task Management Reimagined
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Simplify your daily workflow with our intuitive and elegant task management solution.
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <Image
            src="/productivity.svg"
            alt="Productivity Illustration"
            width={300}
            height={300}
            priority
            className="w-full max-w-sm opacity-90 hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:-translate-y-1 transition-transform duration-300">
          <div className="text-4xl mb-4">✨</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Intuitive Design</h3>
          <p className="text-gray-600">Clean and modern interface that makes task management a breeze</p>
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:-translate-y-1 transition-transform duration-300">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Smart Search</h3>
          <p className="text-gray-600">Find any task instantly with our powerful search functionality</p>
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:-translate-y-1 transition-transform duration-300">
          <div className="text-4xl mb-4">📱</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Responsive</h3>
          <p className="text-gray-600">Works seamlessly across all your devices</p>
        </div>
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:-translate-y-1 transition-transform duration-300">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Lightning Fast</h3>
          <p className="text-gray-600">Built with Next.js for optimal performance</p>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="text-center mb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Built with Modern Technology
        </h2>
        <div className="flex justify-center flex-wrap gap-12">
          <div className="flex flex-col items-center gap-4">
            <Image 
              src="/nextjs.svg" 
              alt="Next.js" 
              width={60} 
              height={60}
              className="opacity-80 hover:opacity-100 transition-opacity duration-300" 
            />
            <span className="text-gray-600 font-medium">Next.js</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Image 
              src="/typescript.svg" 
              alt="TypeScript" 
              width={60} 
              height={60}
              className="opacity-80 hover:opacity-100 transition-opacity duration-300" 
            />
            <span className="text-gray-600 font-medium">TypeScript</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Image 
              src="/tailwindcss.svg" 
              alt="Tailwind CSS" 
              width={60} 
              height={60}
              className="opacity-80 hover:opacity-100 transition-opacity duration-300" 
            />
            <span className="text-gray-600 font-medium">Tailwind CSS</span>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-12 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Get in Touch
        </h2>
        <p className="text-gray-600 mb-8">
          Have questions or suggestions? We&apos;d love to hear from you!
        </p>
        <a
          href="mailto:contact@taskapp.com"
          className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg hover:-translate-y-1 transition-transform duration-300"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
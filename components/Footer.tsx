import Link from "next/link"


function Footer() {
  return (
    <footer className="w-full bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-indigo-500 mb-4">TaskMaster</h3>
                <p className="text-gray-400 text-sm">
                  Simplify your day with our modern task management solution.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-300 mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-300 mb-4">Connect</h4>
                <p className="text-gray-400 text-sm">
                  Follow us for updates and tips on productivity.
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
              <p>&copy; {new Date().getFullYear()} TaskMaster. All rights reserved.</p>
            </div>
          </div>
        </footer>
  )
}

export default Footer
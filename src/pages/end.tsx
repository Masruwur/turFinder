"use client";
import {
  Code,
  Database,
  Zap,
  Shield,
  Github,
  Figma,
  Chrome,
  Smartphone,
  ArrowUpRight,
} from "lucide-react";
import team from "../assets/dummy-team.jpeg";

export default function EndPage() {
  return (
    <div className="w-full min-h-screen bg-black text-white">
      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Image */}
        <div className="relative bg-gradient-to-br from-red-900/20 via-orange-900/20 to-yellow-900/20 flex items-center justify-center p-8 lg:p-16">
          <div className="relative w-full max-w-md aspect-square">
            {/* Abstract geometric background similar to reference */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 via-orange-500/30 to-yellow-500/30 rounded-full blur-3xl"></div>
            <div className="absolute inset-4 bg-gradient-to-br from-red-600/40 via-orange-600/40 to-yellow-600/40 rounded-full blur-2xl"></div>
            <div className="absolute inset-8 bg-gradient-to-br from-red-700/50 via-orange-700/50 to-yellow-700/50 rounded-full blur-xl"></div>

            {/* You can replace this with your actual image */}
            <div className="relative z-10 w-full h-full bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center">
              <img
                src={team}
                alt="Team"
                className="rounded-2xl object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Story Content */}
        <div className="flex flex-col justify-center p-8 lg:p-16 space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 bg-red-500/20 text-red-400 text-sm font-medium rounded-full">
              Our Story
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold font-unbounded leading-tight">
              Connecting people through{" "}
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                football
              </span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
              Three sleep-deprived sport loving developers from across the globe
              came together to revolutionize how people find and connect through
              this beautiful game
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* User-Centric Design */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Figma className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  User-Centric Design
                </h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Made for every device and for everywhere.
              </p>
              <div className="flex space-x-3">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <Figma className="w-4 h-4 text-purple-400" />
                </div>
                <div className="p-2 bg-gray-800 rounded-lg">
                  <Chrome className="w-4 h-4 text-yellow-400" />
                </div>
                <div className="p-2 bg-gray-800 rounded-lg">
                  <Smartphone className="w-4 h-4 text-green-400" />
                </div>
              </div>
            </div>

            {/* Global Collaboration */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Zap className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Global Collaboration
                </h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Everyone's on a leash.
              </p>
              <div className="space-y-1 text-xs text-gray-500">
                <div>
                  &#127462;&#127482; Sydney • &#127482;&#127480; Tempe •
                  &#127463;&#127465; Dhaka
                </div>
              </div>
            </div>

            {/* Secure & Reliable */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <Shield className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Secure & Reliable
                </h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Ainnoway anyone's hacking your account to play football.
              </p>
              <div className="flex space-x-3">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <Shield className="w-4 h-4 text-red-400" />
                </div>
                <div className="p-2 bg-gray-800 rounded-lg">
                  <Database className="w-4 h-4 text-blue-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="space-y-4 pt-4 border-t border-gray-800">
            <h3 className="text-xl font-semibold text-white">Meet the Team</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center space-y-1">
                <div className="text-sm font-semibold text-white">Rawnak</div>
                <div className="text-xs text-gray-400">UNSW, Sydney</div>
                <div className="text-xs text-red-400">Full-Stack Developer</div>
              </div>
              <div className="text-center space-y-1">
                <div className="text-sm font-semibold text-white">Maheer</div>
                <div className="text-xs text-gray-400">ASU, Tempe</div>
                <div className="text-xs text-orange-400">Frontend Engineer</div>
              </div>
              <div className="text-center space-y-1">
                <div className="text-sm font-semibold text-white">Masroor</div>
                <div className="text-xs text-gray-400">BUET, Dhaka</div>
                <div className="text-xs text-yellow-400">Backend Engineer</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-4 pt-6">
            <div className="text-center lg:text-left">
              <div className="text-2xl lg:text-3xl font-bold text-white mb-2">
                LAUNCHING FALL 2025!
              </div>
              <p className="text-sm text-gray-400 uppercase tracking-wide mb-4">
                Sign up for early access!
              </p>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-3  bg-gradient-to-r from-amber-500 to-yellow-800 text-white font-semibold rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-200 flex items-center justify-center space-x-2">
                <span>Join Waitlist</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

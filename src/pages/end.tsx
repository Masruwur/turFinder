"use client";
import { BanknoteArrowUp, ArrowUpRight } from "lucide-react";
import depto from "../assets/depto.jpeg";
import mas from "../assets/mas.jpeg";
import mhr from "../assets/mhr.jpeg";
import all from "../assets/all.jpeg";

export default function EndPage() {
  return (
    <div className="w-full min-h-screen bg-black text-white">
      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Image */}
        <div className="relative bg-gradient-to-br from-red-900/20 via-orange-900/20 to-yellow-900/20 flex items-center justify-center p-8 lg:p-16">
          <div className="relative w-full max-w-md aspect-square">
            {/* Abstract geometric background similar to reference */}

            {/* Image grid inside the orange container */}
            <div className="relative z-10 w-full h-full bg-gradient-to-br rounded-2xl p-3">
              <div className="grid grid-cols-2 grid-rows-2 gap-3 w-full h-full">
                {/* Top-left: Depto */}
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={depto}
                    alt="ceo"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Top-right: All */}
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={all}
                    alt="all"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Bottom-left: Mhr */}
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={mhr}
                    alt="co1"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Bottom-right: Mas */}
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={mas}
                    alt="co2"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Story Content */}
        <div className="flex flex-col justify-center p-8 lg:p-16 space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 bg-yellow text-black text-sm font-medium rounded-full">
              Our Story
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black font-polysans leading-tight">
              Connecting people through{" "}
              <span className="bg-gradient-to-r from-green-900 to-green-700 bg-clip-text text-transparent">
                football
              </span>
            </h1>
            <p className="text-lg text-gray-400 font-redhatmono leading-relaxed max-w-lg">
              Three sleep-deprived sport loving developers from across the globe
              came together to revolutionize how people{" "}
              <span className="text-yellow">find</span> and{" "}
              <span className="text-yellow">connect</span> through this
              beautiful game. Ever since we left our country to study abroad we
              noticed that our friends were struggling to find players to fill
              up our spots. That's how i came up with turFinder and my friends
              Maheer and Masroor are making that dream come true.
            </p>
          </div>

          {/* support */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-yellow rounded-lg">
                  <BanknoteArrowUp className="w-5 h-5 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Support this journey
                </h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed font-redhatmono">
                if you wannna see the game grow come join us
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="space-y-4 pt-4 border-t border-gray-800">
            <h3 className="text-xl font-semibold font-unbounded text-white">
              Meet the Team
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center space-y-1 font-redhatmono">
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
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 
                rounded-lg text-white placeholder:text-gray-400 focus:outline-none 
                focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-yellow text-white font-semibold rounded-lg hover:from-red-600 hover:to-orange-600 transition-all cursor-pointer duration-200 flex items-center justify-center space-x-2">
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

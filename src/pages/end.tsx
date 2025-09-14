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
          <div className="relative w-full max-w-md ">
            {/* Abstract geometric background similar to reference */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/40 via-red-500/30 to-yellow-500/20 rounded-full blur-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-yellow-400/30 via-orange-400/25 to-red-400/15 rounded-full blur-3xl"></div>
            <div className="absolute inset-6 bg-gradient-to-tr from-orange-600/35 via-yellow-500/25 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute inset-6 bg-gradient-to-bl from-red-500/30 via-orange-500/20 to-transparent rounded-full blur-2xl"></div>
            {/* Image grid inside the orange container */}
            <div className="relative z-10 w-full h-full bg-gradient-to-br rounded-2xl ">
              <div className="flex  items-center justify-center">
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={all}
                    alt="all"
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
            <div className="inline-block px-3 py-1 bg-yellow text-black text-sm font-redhatmono rounded-full">
              Our Story
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bureau font-medium text-center ">
              Connecting people through{" "}
              <span className="text-almostwhite font-bureau font-medium">
                football
              </span>
            </h1>
            <div className="text-lg text-gray-400 font-redhatmono max-w-lg bg-almostblack/50 rounded-3xl p-2">
              Three sleep-deprived sport loving developers from across the globe
              came together to revolutionize how people{" "}
              <span className="text-yellow">find</span> and{" "}
              <span className="text-yellow">connect</span> through this
              beautiful game. Ever since we left our country to study abroad we
              noticed that our friends were struggling to find players to fill
              up our spots. That's how i came up with turFinder and my friends
              Maheer and Masroor are making that dream come true.
            </div>
          </div>
          {/* Support and Contact Section */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Support */}
            <div className="flex-1 bg-almostblack/50 rounded-2xl p-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-yellow rounded-lg">
                    <BanknoteArrowUp className="w-5 h-5 text-black" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    Support us
                  </h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed font-redhatmono">
                  if you wannna see the game grow come join us
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="flex-1 bg-almostblack/50 rounded-2xl p-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-yellow rounded-lg">
                    <ArrowUpRight className="w-5 h-5 text-black" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Contact</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed font-redhatmono">
                  reach out to us for any queries or feedback
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="space-y-4 pt-4 border-t border-gray-800">
            <h3 className="text-3xl font-bureau  text-white">Meet the Team</h3>
            <div className="flex flex-col space-y-3">
              {/* Rawnak */}
              <div className="flex items-center space-x-4 bg-almostblack/30 rounded-xl p-3 hover:bg-almostblack/50 transition-colors">
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={depto}
                    alt="Rawnak"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 font-redhatmono">
                  <div className="text-sm text-white">Rawnak</div>
                  <div className="text-xs text-gray-400">UNSW, Sydney</div>
                  <div className="text-xs text-red-400">
                    Full-Stack Developer
                  </div>
                </div>
              </div>

              {/* Maheer */}
              <div className="flex items-center space-x-4 bg-almostblack/30 rounded-xl p-3 hover:bg-almostblack/50 transition-colors">
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={mhr}
                    alt="Maheer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 font-redhatmono">
                  <div className="text-sm  text-white">Maheer</div>
                  <div className="text-xs text-gray-400">ASU, Tempe</div>
                  <div className="text-xs text-orange-400">
                    Frontend Engineer
                  </div>
                </div>
              </div>

              {/* Masroor */}
              <div className="flex items-center space-x-4 bg-almostblack/30 rounded-xl p-3 hover:bg-almostblack/50 transition-colors">
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={mas}
                    alt="Masroor"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 font-redhatmono">
                  <div className="text-sm text-white">Masroor</div>
                  <div className="text-xs text-gray-400">BUET, Dhaka</div>
                  <div className="text-xs text-yellow-400">
                    Backend Engineer
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-4 pt-6 pb-20">
            <div className="text-center lg:text-left">
              <div className="text-2xl lg:text-3xl font-bureau text-white mb-2">
                LAUNCHING FALL 2025!
              </div>
              <p className="text-sm font-redhatmono text-gray-400 uppercase tracking-wide mb-4">
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
                focus:ring-2 focus:ring-red-500 focus:border-transparent font-redhatmono"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-yellow text-white font-redhatmono rounded-lg hover:from-red-600 hover:to-orange-600 transition-all cursor-pointer duration-200 flex items-center justify-center space-x-2">
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

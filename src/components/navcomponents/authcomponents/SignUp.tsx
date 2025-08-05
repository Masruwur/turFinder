interface SignUpProps {
  isProfileOpen: boolean;
  toggleProfile: () => void;
  handleSignUp: () => void;
  OnClickingLogin: () => void;
}

export default function SignUp({
  isProfileOpen,
  toggleProfile,
  handleSignUp,
  OnClickingLogin,
}: SignUpProps) {
  return (
    <>
      <div
        className={`fixed top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6/7 
          w-11/12 max-w-md sm:w-full bg-yellow/90
          rounded-2xl z-50 transition-all backdrop-blur-md
          duration-300 ease-in-out overflow-hidden ${
            isProfileOpen ? "translate-y-0" : "-translate-y-full"
          }`}>
        <div className="flex flex-col h-full">
          {/* header */}
          <div className="flex justify-start items-center p-6">
            <button
              onClick={OnClickingLogin}
              className="text-almostblack font-redhatmono text-sm cursor-pointer">
              <span className="text-lg">&lsaquo;</span> back
            </button>
          </div>

          {/* signup form */}
          <form className="flex-1 overflow-y-auto p-6 font-redhatmono">
            <div className="space-y-6">
              {/* first name input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="name"
                  id="name"
                  required
                  placeholder="Enter your first name"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition-colors"
                />
              </div>

              {/* last name input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="name"
                  id="name"
                  required
                  placeholder="Enter your last name"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition-colors"
                />
              </div>

              {/* player role input */}
              <div>
                <label
                  htmlFor="text"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Player Role
                </label>
                <input
                  type="text"
                  id="text"
                  required
                  placeholder="Enter your role (ST/CM/CB/etc)"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition-colors"
                />
              </div>

              {/* username input */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="username"
                  id="username"
                  required
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition-colors"
                />
              </div>

              {/* phone number input */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="phone"
                  id="phone"
                  required
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition-colors"
                />
              </div>

              {/* NID input */}
              <div>
                <label
                  htmlFor="number"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  National Identification (NID)
                </label>
                <input
                  type="number"
                  id="number"
                  placeholder="Enter your NID"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition-colors"
                />
              </div>

              {/* email input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition-colors"
                />
              </div>

              {/* password input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition-colors"
                />
              </div>

              {/* confirm password */}
              <div>
                <label
                  htmlFor="confirm"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm"
                  required
                  placeholder="Re-enter your password"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition-colors"
                />
              </div>

              {/* t&c checkbox */}
              <div className="flex gap-3 items-start mt-10">
                <input
                  type="checkbox"
                  id="checkbox"
                  required
                  className="mt-1 w-10"
                />
                <label
                  htmlFor="confirm"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  I have read and accept the Terms and Conditions.
                </label>
              </div>

              {/* signup button */}
              <div className="flex justify-center">
                <button
                  onClick={handleSignUp}
                  className="w-min rounded-2xl py-3 px-4 hover:bg-blue-600 text-black hover:text-white transition-colors font-medium cursor-pointer duration-300">
                  Create Account
                </button>
              </div>

              {/* signup with google */}
              <button
                type="button"
                className="w-full py-3 px-4 border rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center space-x-2 cursor-pointer">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-gray-700">Sign up with Google</span>
              </button>

              {/* login redirect */}
              <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={OnClickingLogin}
                  className="text-blue-600 hover:text-blue-800 transition-colors font-medium cursor-pointer">
                  Log in
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {isProfileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 
          transition-all duration-500 ease-in-out"
          onClick={toggleProfile}></div>
      )}
    </>
  );
}

import { useState } from "react";
import api from "../../../util/api";

interface SignUpProps {
  isProfileOpen: boolean;
  toggleProfile: () => void;
  handleSignUp: (name:string,email:string,password:string,confirmPassword:string,isChecked:boolean) => void;
  OnClickingLogin: () => void;
}

export default function SignUp({
  isProfileOpen,
  toggleProfile,
  handleSignUp,
  OnClickingLogin,
}: SignUpProps) {
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [isChecked,setIsChecked] = useState(false);
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
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              {/* last name input */}
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="name"
                  id="last-name"
                  required
                  placeholder="Enter your last name"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition-colors"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {/* t&c checkbox */}
              <div className="flex gap-3 items-start mt-10">
                <input
                  type="checkbox"
                  id="checkbox"
                  required
                  className="mt-1 w-10"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
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
                  type="button"
                  onClick={()=>handleSignUp(firstName+" "+lastName,email,password,confirmPassword,isChecked)}
                  className="w-min rounded-2xl py-3 px-4 hover:bg-blue-600 text-black hover:text-white transition-colors font-medium cursor-pointer duration-300">
                  Create Account
                </button>
              </div>

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

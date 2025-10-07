import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import api from "../../../util/api";
import { useUser } from "../../../util/user";
import { User } from "../../../util/user";

interface LoginProps {
  isProfileOpen: boolean;
  toggleProfile: () => void;
  handleLogin: (email: string, password: string) => void;
  OnClickingSignUp: () => void;
}

export default function Login({
  isProfileOpen,
  toggleProfile,
  handleLogin,
  OnClickingSignUp,
}: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser } = useUser();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-3/3.5 
          w-11/12 max-w-md sm:w-96 bg-yellow/90
           rounded-l-2xl z-50 transition-all backdrop-blur-md
           duration-300 ease-in-out ${
             isProfileOpen
               ? "transform translate-x-0"
               : "transform translate-x-full"
           }`}>
        <div className="flex flex-col h-full">
          {/* header */}
          <div className="flex justify-end items-center p-3">
            <button
              onClick={toggleProfile}
              className="text-almostblack font-redhatmono text-sm cursor-pointer">
              close
            </button>
          </div>

          {/* If user is logged in, show logout screen */}
          {user ? (
            <div className="flex-1 p-6 font-redhatmono">
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl text-almostblack font-medium">
                    Welcome, {user.name}
                  </h2>
                  <p className="text-gray-600 mt-2">{user.email}</p>
                </div>

                {/* logout button */}
                <div className="flex justify-center">
                  <button
                    onClick={handleLogout}
                    className="w-min rounded-2xl py-3 px-4 bg-red-500 hover:bg-red-600 text-white transition-colors font-medium cursor-pointer duration-300">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* login form */
            <div className="flex-1 overflow-y-auto p-6 font-redhatmono">
              <div className="space-y-6">
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
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition-colors te "
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition-colors"
                  />
                </div>

                {/* login button */}
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      handleLogin(email, password);
                      setEmail("");
                      setPassword("");
                    }}
                    className="w-min rounded-2xl py-3 px-4 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium cursor-pointer duration-300">
                    Login
                  </button>
                </div>

                {/* login with google */}
                <div>
                  <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                      if (credentialResponse.credential) {
                        const decodedToken = jwtDecode(
                          credentialResponse.credential
                        );
                        const { name, email, sub } = decodedToken as {
                          name: string;
                          email: string;
                          sub: string;
                        };
                        try {
                          const response = await api.post(
                            "/users/google/login",
                            { name, email, providerId: sub }
                          );
                          if (response.status === 200) {
                            const token = response.data.token;
                            localStorage.setItem("accessToken", token);
                            const user: User = {
                              id: response.data.id,
                              name: response.data.name,
                              email: response.data.email,
                            };
                            setUser(user);
                            localStorage.setItem("user", JSON.stringify(user));
                            toggleProfile();
                          }
                        } catch (err) {
                          console.error("Google Login Failed", err);
                        }
                      }
                    }}
                    onError={() => console.error("Login Failed")}
                    containerProps={{
                      className:
                        "flex items-center justify-center space-x-2 cursor-pointer",
                    }}
                  />
                </div>

                {/* forgot password link */}
                <div className="text-center">
                  <a
                    href="#"
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                    Forgot your password?
                  </a>
                </div>

                {/* sign up link */}
                <div className="text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <a
                    onClick={OnClickingSignUp}
                    className="text-blue-600 hover:text-blue-800 transition-colors font-medium cursor-pointer">
                    Sign up
                  </a>
                </div>
              </div>
            </div>
          )}
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

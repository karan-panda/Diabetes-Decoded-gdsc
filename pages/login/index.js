import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../lib/firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const [isGoogleLoginSuccessful, setIsGoogleLoginSuccessful] = useState(false);
  const handleClose = () => {
    setShow(false);
    setShowGoogleModal(false);
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((value) => {
        setMessage("User Logined successfully!🎉🎊");
        setShow(true);
        setIsLoginSuccessful(true);
      })
      .catch(error => {
        setMessage(error.message);
        setShow(true);
        setIsLoginSuccessful(false);
      });
  };

  const handleContinue = () => {
    router.push('/home');
  }

  const signupWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setMessage("User Logined successfully!🎉 You can now go to the home page.");
        setShowGoogleModal(true);
        setIsGoogleLoginSuccessful(true);
      }).catch((error) => {
        setMessage(error.message);
        setShow(true);
        setIsGoogleLoginSuccessful(false);
      });
  }

  const handleGoogleContinue = () => {
    router.push('/home');
  }

  return (
    <div className="flex items-center justify-center h-screen bg-white px-4">
      <div className="shadow-lg border border-gray-200 rounded-lg p-6 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-10 justify-center items-center">
          <div className="w-full mt-10 sm:w-1/3 flex justify-center items-center relative">
            <img
              className="max-w-full max-h-[60vh] object-contain"
              src="./images/doctor.png"
              alt="Doctor illustration"
            />
          </div>
          <div className="w-full sm:w-1/3 max-w-md">
            <h2 className="text-2xl font-bold text-black text-center mb-6">
              Login
            </h2>
            <div className="mb-6">
              <div className="mb-4">
                <h3 className="mb-2 text-black">Email</h3>
                <input
                  type="email"
                  placeholder="Email address"
                  className="border p-2 w-full text-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <h3 className="mb-2 text-black">Password</h3>
                <input
                  type="password"
                  placeholder="Password"
                  className="border p-2 w-full text-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogin}
              className="w-full py-3 px-4 text-lg bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition-colors duration-200"
            >
              Login
            </button>
            <button
              type="submit"
              onClick={signupWithGoogle}
              className="w-full py-3 px-4 text-lg bg-red-300 text-black font-semibold rounded-full hover:bg-red-400 transition-colors duration-200 mt-4 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faGoogle} className="h-6 w-6 mr-4" />
              Sign In with Google
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="mt-4 text-center">
              <span className="text-black">Not yet Registered? </span>
              <Link href="/register" className="text-blue-600 hover:underline">
                Register Now
              </Link>
            </div>
          </div>
        </div>

        {/* DaisyUI Modal */}
        {show && (
          <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Notification
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleContinue} style={{ display: isLoginSuccessful ? 'inline-flex' : 'none' }}>
                    Continue to Home
                  </button>
                  <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setShow(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Google Sign-in Modal */}
        {showGoogleModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Notification
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleGoogleContinue} style={{ display: isGoogleLoginSuccessful ? 'inline-flex' : 'none' }}>
                    Continue to Home
                  </button>
                  <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleClose}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
        }

      </div>
    </div>
  );
}

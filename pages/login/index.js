import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (email === "nishantpandey2004@gmail.com" && password === "Nis@IT05") {
      // Redirect to /home page
      router.push("/home");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white px-4">
      <div className="shadow-lg border border-gray-200 rounded-lg p-6 max-w-4xl mx-auto">
        <div className="flex gap-10 justify-center items-center">
          <div className="w-1/3 flex justify-center items-center relative">
            <img
              className="max-w-full max-h-[60vh] object-contain"
              src="./images/doctor.png"
              alt="Doctor illustration"
            />
          </div>
          <div className="w-1/3 max-w-md">
            <h2 className="text-2xl font-bold text-black text-center mb-6">
              Login
            </h2>
            <div className="mb-6">
              <div className="mb-4">
                <h3 className="mb-2 text-black">Email</h3>
                <input
                  type="text"
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
              className="w-full py-3 px-4 text-lg bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors duration-200"
            >
              Login
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
      </div>
    </div>
  );
}

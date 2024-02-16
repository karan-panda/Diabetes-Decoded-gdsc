import Link from "next/link";

export default function Home() {
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
              Create Account
            </h2>

            <div className="mb-6">
              <div className="mb-4">
                <h3 className="mb-2 text-black">Name</h3>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border p-2 w-full text-black"
                />
              </div>
              <div className="mb-4">
                <h3 className="mb-2 text-black">Email</h3>
                <input
                  type="text"
                  placeholder="Email address"
                  className="border p-2 w-full text-black"
                />
              </div>
            </div>
            <div className="mb-6">
              <div className="mb-4">
                <h3 className="mb-2 text-black">Password</h3>
                <input
                  type="password"
                  placeholder="Password"
                  className="border p-2 w-full text-black"
                />
              </div>
              <div>
                <h3 className="mb-2 text-black">Confirm Password</h3>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="border p-2 w-full text-black"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 text-lg bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors duration-200"
            >
              Register
            </button>
            <div className="mt-4 text-center">
              <span className="text-black">Already have an account? </span>
              <Link href="/login">
                <span
                  className="text-blue-600 hover:underline"
                  style={{ cursor: "pointer" }}
                >
                  Login Now
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white text-black">
      <header className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="../images/logo.png"
                alt="Logo"
                className="h-40 w-auto"
              />
              <h1 className="text-5xl font-bold text-gray-900 ml-4">
                DIABETES DECODED
              </h1>
            </div>
          </div>
        </div>
      </header>
      <h2 className="mx-40 my-4 text-4xl text-gray-600 font-bold">
        Decode diabetes, embrace wellness
      </h2>

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:flex lg:items-start lg:justify-between">
          <div className="lg:w-1/2">
            <ol className="list-decimal space-y-4 ml-4 text-lg">
              <li>
                <strong>Precision Predictions:</strong> Harness the power of
                machine learning for accurate diabetes predictions.
              </li>
              <li>
                <strong>Personalized Wellness Roadmap:</strong> Receive tailored
                medical guidance, customized exercise routines, and expert diet
                plans for a personalized approach to health.
              </li>
              <li>
                <strong>Comprehensive Diabetes Tracker:</strong> Stay in control
                with our intuitive diabetes tracker, ensuring you have the tools
                you need for a healthier, well-managed life.
              </li>
            </ol>
            <div className="flex items-center mt-8">
              <img
                src="../images/hand.png"
                alt="Doctor consulting with patient"
                className="mr-4"
              />{" "}
              {/* Add margin-right to separate the image from the button */}
              <Link href="/get-started">
                <span className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-3xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 mt-8 cursor-pointer">
                  Start Now
                </span>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center lg:justify-end m-8 lg:mt-0 lg:-mt-40">
            <img
              className="max-w-xs lg:max-w-sm xl:max-w-lg"
              src="../images/care.png"
              alt="Doctor consulting with patient"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

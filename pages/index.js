import Image from "next/image";
import Link from "next/link";
import Head from "next/head"; 

export default function Home() {
  return (
    <>
      <Head>
        <style global jsx>{`
          body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden; // This prevents scrolling by hiding overflow.
          }
        `}</style>
      </Head>
      <div
        className="bg-white text-black shadow-lg rounded-lg"
        style={{
          backgroundImage: "url('../images/scenery.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          backgroundBlendMode: 'overlay',
          width: '100vw', // Ensure the width is 100% of the viewport width
          height: '100vh', // Ensure the height is 100% of the viewport height
          overflow: 'hidden', // Ensure that any content that overflows is hidden (adjust if needed)
        }}
      >
        <main className="rounded-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:flex lg:items-start lg:justify-between mt-0">
            <div className="lg:w-3/5">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:flex lg:items-center lg:justify-between mt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img src="../images/logo.png" alt="Logo" className="h-40 w-auto" />
                    <h1 className="text-4xl font-bold text-gray-900 ml-4">DIABETES DECODED</h1>
                  </div>
                </div>
              </div>
              <h2 className="px-12 pb-4 text-2xl text-black font-bold">Decode diabetes, embrace wellness</h2>
              <ol className="list-decimal ml-4 text-xl ">
                <li>
                  <strong>Precision Predictions:</strong> Harness the power of machine learning for accurate diabetes predictions.
                </li>
                <li>
                  <strong>Personalized Wellness Roadmap:</strong> Receive tailored medical guidance, customized exercise routines, and expert diet plans for a personalized approach to health.
                </li>
                <li>
                  <strong>Comprehensive Diabetes Tracker:</strong> Stay in control with our intuitive diabetes tracker, ensuring you have the tools you need for a healthier, well-managed life.
                </li>
              </ol>
              <div className="flex items-center mt-8">
                <img src="../images/hand.png" alt="Doctor consulting with patient" className="mr-4" />
                <Link href="/landing">
                  <span className="inline-flex items-center px-6 py-4 border border-transparent text-lg font-medium rounded-3xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 mt-8 cursor-pointer">
                    Start Now
                  </span>
                </Link>
              </div>
            </div>
            <div className="lg:w-2/5 flex justify-center lg:justify-end m-8 lg:mt-10 ">
              <img className="max-w-xs lg:max-w-sm xl:max-w-lg" src="../images/care.png" alt="Doctor consulting with patient" />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

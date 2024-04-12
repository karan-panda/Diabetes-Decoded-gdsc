import Image from "next/image";
import Link from "next/link";
import { FaCheck } from "react-icons/fa"; // Importing tick mark icon

export default function Second() {
  return (
    <>
      <div
        className="w-full h-screen bg-white text-black flex flex-col justify-between sm:flex-row sm:justify-start"
        style={{
          backgroundImage: "url('../images/scenery.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'rgba(255, 255, 255, 0.5)', // Controls the transparency. Adjust the alpha value as needed.
          backgroundBlendMode: 'overlay',
        }}
      >
        <img src="/images/right-top.png" alt="" className="absolute right-0 top-0 m-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32" />
        <img src="/images/left-bottom.png" alt="" className="absolute left-0 bottom-0 m-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32" />

        <div className="flex flex-1 items-center justify-center px-10 sm:flex-row sm:justify-start">
          <div className="flex-1 flex justify-center sm:w-1/2">
            <Image src="/images/second.png" alt="" width={500} height={500} objectFit="contain" />
          </div>

          <div className="flex-1 space-y-6 sm:w-1/2">
            {/* Using Image component to display the .ico file as an icon */}
            <div className="flex items-center">
              <Image src="/images/syr.ico" alt="" width={45} height={45} />
              <h1 className="text-3xl font-bold ml-4 sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl">Diabetes decoded</h1>
            </div>
            <p className="text-2xl max-w-md">
              Diabetes Decoded: Your one-stop destination for personalized guidance, expert insights, and community support on the journey to better health.
            </p>
            <div className="flex items-center">
              <h2 className="text-3xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl">Before Checking</h2>
              <FaCheck className="text-4xl ml-2" /> {/* Tick mark icon after h2 */}
            </div>
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4">
              <Link href="/register" passHref>
                <button className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-3xl text-xl w-full sm:w-auto">Sign Up</button>
              </Link>
              <Link href="/login" passHref>
                <button className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-3xl text-xl w-full sm:w-auto">Login</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
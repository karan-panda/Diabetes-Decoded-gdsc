import Image from "next/image";
import Link from "next/link";
import { FaCheck } from "react-icons/fa"; // Importing tick mark icon

export default function Second() {
  return (
    <>
      <div className="w-full h-screen bg-white text-black flex flex-col justify-between">
        <img src="/images/right-top.png" alt="" className="absolute right-0 top-0 m-4 w-24 h-24" />
        <img src="/images/left-bottom.png" alt="" className="absolute left-0 bottom-0 m-4 w-24 h-24" />

        <div className="flex flex-1 items-center justify-center px-10">
          <div className="flex-1 flex justify-center">
            <Image src="/images/second.png" alt="" width={500} height={500} objectFit="contain" />
          </div>

          <div className="flex-1 space-y-6">
            {/* Using Image component to display the .ico file as an icon */}
            <div className="flex items-center">
              <Image src="/images/syr.ico" alt="" width={45} height={45} />
              <h1 className="text-6xl font-bold ml-4">Diabetes decoded</h1>
            </div>
            <p className="text-2xl max-w-md">
              Diabetes Decoded: Your one-stop destination for personalized guidance, expert insights, and community support on the journey to better health.
            </p>
            <div className="flex items-center">
              <h2 className="text-3xl font-semibold">Before Checking</h2>
              <FaCheck className="text-4xl ml-2" /> {/* Tick mark icon after h2 */}
            </div>
            <div className="space-x-4">
              <Link href="/register" passHref>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-3xl text-lg">Sign Up</button>
              </Link>
              <Link href="/login" passHref>
                <button className="bg-gray-300 px-6 py-2 rounded-3xl text-lg">Login</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

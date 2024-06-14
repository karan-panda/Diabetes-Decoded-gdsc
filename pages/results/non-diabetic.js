import Image from "next/image";
import Link from "next/link";

export default function Green() {
  return (
    <>
      <div className="bg-green-200 relative h-screen w-full text-black">
        <img src="/images/top-left.png" alt="" className="absolute top-0 left-0 m-4 w-40 h-40" />
        <img src="/images/right-bottom.png" alt="" className="absolute bottom-0 right-0 m-4 w-40 h-40" />
        
        <div className="flex justify-center items-center h-full">
          <div className="flex-1 flex justify-center">
            <img src="/images/girl.png" alt="" className="w-96 h-auto" />
          </div>

          <div className="flex-1 text-center space-y-4 mr-20">
          <div className="inline-flex items-center">
  <h1 className="text-6xl text-green-600 font-bold">You are Not DIABETIC</h1>
  {/* Adjusted alignment of sui.png image with text */}
  <img src="/images/sui.png" alt="" className="w-14 h-12 ml-4 align-middle" />
</div>

            <p className="text-2xl">
            Great news! You have an 85% chance of not being diabetic. Rest assured, we are here to support you in maintaining your health and well-being. Even with a lower risk, our platform is dedicated to guiding you toward a healthier future. Let's work together for your continued well-being.

</p>
            <div className="inline-block">
              <h2 className="text-3xl font-semibold inline">Your Path to Healthier Tomorrow Begins Here</h2>
              {/* down.png image right after h2 */}
              <img src="/images/down.png" alt="" className="inline w-8 h-8 ml-2" />
            </div>
            <button className="bg-green-500 text-white px-8 py-3 rounded-3xl text-xl font-bold w-auto min-w-[200px]">Get now</button>
          </div>
        </div>
      </div>
    </>
  );
}

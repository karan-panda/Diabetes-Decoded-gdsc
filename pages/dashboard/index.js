import Sidenav from '../../components/sidenav';
import Calendar from '../../components/Calendar';
import { IoRadioButtonOn } from "react-icons/io5";

export default function Layout() {
  return (
    <div className="flex h-screen bg-white">
      <Sidenav />
      <div className="flex flex-col p-8 w-full">
        <h1 className="text-2xl font-bold mb-4">Hello User</h1>
        <p className="">Welcome to Diabetes Track</p>

        <div className="flex space-x-8 mt-8">
          <div className="calendar-wrapper">
            <Calendar />
          </div>

          <div className="bg-gray-200 rounded-md p-4 flex-grow">
            <h2 className="text-lg font-semibold mb-4">Tasks</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <IoRadioButtonOn className="mr-2" />
                <span>Daily test</span>
              </div>

              <hr className="my-2" />
              <div className="flex items-center">
                <IoRadioButtonOn className="mr-2" />
                <span>Follow diet</span>
              </div>
              <hr className="my-2" />
              <div className="flex items-center">
                <IoRadioButtonOn className="mr-2" />
                <span>Follow exercise</span>
              </div>
              <hr className="my-2" />
            </div>
          </div>
        </div>

        <div className="flex mt-8">
          <div className="bg-gray-200 rounded-md p-4 flex-grow">
            <h2 className="text-lg font-semibold mb-4">News on Diabetes</h2>
            <div className='bg-white rounded-md'>
              News_1
            </div>
            <div className='bg-white rounded-md'>
              News_2
            </div>
          </div>

          <div className="bg-gray-200 rounded-md p-4 ml-8 flex space-x-6">
            <div className='bg-pink-200'>Healty diet plan</div>
            <div className='bg-green-200'>Exercise Plan</div>
            <div className='bg-blue-200'>Test diabetes</div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { FaGripfire,FaArrowDownUpAcrossLine ,FaWeightHanging} from "react-icons/fa6";
import { BiSolidUpArrowAlt, BiSolidDownArrowAlt } from "react-icons/bi";
import { GiAppleSeeds } from "react-icons/gi";
import { CgGym } from "react-icons/cg";



function Example() {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        datasets: [
          {
            data: [86, 114, 106, 106, 107, 111, 133],
            label: "Glucose",
            borderColor: "rgb(62,149,205)",
            backgroundColor: "rgb(62,149,205,0.1)",
          },
          {
            data: [70, 90, 44, 60, 83, 90, 100],
            label: "Blood Pressure",
            borderColor: "rgb(60,186,159)",
            backgroundColor: "rgb(60,186,159,0.1)",
          },
          {
            data: [10, 21, 60, 44, 17, 21, 17],
            label: "BMI",
            borderColor: "rgb(255,165,0)",
            backgroundColor: "rgb(255,165,0,0.1)",
          },
          {
            data: [6, 3, 2, 2, 7, 0, 16],
            label: "Insulin",
            borderColor: "rgb(196,88,80)",
            backgroundColor: "rgb(196,88,80,0.1)",
          },
        ],
      },
    });

    return () => {
      myChart.destroy(); // This is important to prevent memory leaks
    };
  }, []);

  return (
    <>
      <div className="w-[600px] h-[400px] mx-auto my-auto">
        <h1 className="text-2xl font-bold text-center">
          Weekly Health Summary
        </h1>
        <div className="border border-gray-400 pt-0 rounded-xl w-full h-full my-auto shadow-xl">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>


    <div className="flex gap-2 ">
      <div className="p-3 w-[170px] h-[90px] bg-white shadow-lg rounded-lg hover:border-gray-400 hover:border-2 transition-all duration-75">
        <h3 className="font-bold text-xl  leading-tight">2000</h3>
        <div className="flex items-center gap-2 ">
          <p className="leading-tight">Calories burned</p>
          <FaGripfire />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-green-600 leading-tight">+2.45% </p>
          <BiSolidUpArrowAlt className="text-green-600" />
        </div>
      </div>


     <div className="p-3 w-[190px] h-[90px] bg-white shadow-lg rounded-lg  hover:border-2 hover:border-gray-400 transition-all duration-75">
  <h3 className="font-bold text-xl leading-tight">Low</h3>
  <div className="flex items-center gap-2">
    <p className="leading-tight">Glucose variation</p>
    <FaArrowDownUpAcrossLine />

  </div>
  <div className="flex items-center gap-2">
    <p className="text-red-600 leading-tight">-2.45% </p>
    {/* <BiSolidUpArrowAlt className="text-red-600" /> */}
    <BiSolidDownArrowAlt className="text-red-600" />

  </div>
</div>



      <div className="p-3 w-[190px] h-[90px] bg-white shadow-lg rounded-lg hover:border-gray-400 hover:border-2 transition-all duration-75">
        <h3 className="font-bold text-xl  leading-tight">1800 kcal/day</h3>
        <div className="flex items-center gap-2 ">
          <p className="leading-tight">Nutritional intake</p>
          <GiAppleSeeds />

        </div>
        {/* <div className="flex items-center gap-2">
          <p className="text-green-600 leading-tight">+2.45% </p>
          <BiSolidUpArrowAlt className="text-green-600" />
        </div> */}
      </div>

      <div className="p-3 w-[190px] h-[90px] bg-white shadow-lg rounded-lg hover:border-gray-400 hover:border-2 transition-all duration-75">
        <h3 className="font-bold text-xl  leading-tight">150 min/week</h3>
        <div className="flex items-center gap-2 ">
          <p className="leading-tight">Physical Activity</p>
          <CgGym />

        </div>
        <div className="flex items-center gap-2">
          <p className="text-red-600 leading-tight">-15% </p>
          <BiSolidDownArrowAlt className="text-red-600" />
        </div>
      </div>

      <div className="p-3 w-[190px] h-[90px] bg-white shadow-lg rounded-lg hover:border-gray-400 hover:border-2 transition-all duration-75">
        <h3 className="font-bold text-xl  leading-tight">-2kg</h3>
        <div className="flex items-center gap-2 ">
          <p className="leading-tight">Weight Change</p>
          <FaWeightHanging />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-red-600 leading-tight">-1.2% </p>
          <BiSolidDownArrowAlt className="text-red-600" />      
            </div>
        </div>
        <div className="p-3 w-[190px] h-[90px] bg-white shadow-lg rounded-lg hover:border-gray-400 hover:border-2 transition-all duration-75">
        <h3 className="font-bold text-xl  leading-tight">2000</h3>
        <div className="flex items-center gap-2 ">
          <p className="leading-tight">Calories burned</p>
          <FaGripfire />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-green-600 leading-tight">+2.45% </p>
          <BiSolidUpArrowAlt className="text-green-600" />
        </div>
        </div>
      </div>
      
      
    </>
  );
}

export default Example;

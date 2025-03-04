import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../pages/firebase";
import {
  FaGripfire,
  FaArrowDownUpAcrossLine,
  FaWeightHanging,
  FaTachometerAlt,
  FaArrowRightLong,
} from "react-icons/fa6";
import {
  BiSolidUpArrowAlt,
  BiSolidDownArrowAlt,
  BiSolidDonateBlood,
} from "react-icons/bi";
import { GiAppleSeeds } from "react-icons/gi";
import { CgGym } from "react-icons/cg";
import BarGraph from "./BarGraph";
import { BsRobot } from "react-icons/bs";

const HealthChart = () => {
  const chartRef = useRef(null);
  const [selectedParameter, setSelectedParameter] = useState("Glucose");
  const [data, setData] = useState({
    Glucose: [],
    "Blood Pressure": [],
    BMI: [],
    Insulin: [],
  });
  const [labels, setLabels] = useState([]);

  const colors = {
    Glucose: "rgb(62,14,205)",
    "Blood Pressure": "rgb(255,0,0)",
    BMI: "rgb(255,165,0)",
    Insulin: "rgb(0,0,255)",
  };

  const backgroundColors = {
    Glucose: "rgba(62,14,205,0.2)",
    "Blood Pressure": "rgba(255,0,0,0.2)",
    BMI: "rgba(255,165,0,0.2)",
    Insulin: "rgba(0,0,255,0.2)",
  };

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "healthData"), orderBy("timestamp", "desc"), limit(7));
      const querySnapshot = await getDocs(q);
      const fetchedData = {
        Glucose: [],
        "Blood Pressure": [],
        BMI: [],
        Insulin: [],
      };
      const fetchedLabels = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedLabels.push(data.timestamp.toDate().toLocaleDateString());
        fetchedData.Glucose.push(data.Glucose);
        fetchedData["Blood Pressure"].push(data["Blood Pressure"]);
        fetchedData.BMI.push(data.BMI);
        fetchedData.Insulin.push(data.Insulin);
      });
      setData(fetchedData);
      setLabels(fetchedLabels.reverse()); // Reverse to show the latest date last
    };

    fetchData();
  }, []);

  useEffect(() => {
    const myChart = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            data: data[selectedParameter],
            label: selectedParameter,
            borderColor: colors[selectedParameter],
            backgroundColor: backgroundColors[selectedParameter],
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        animation: {
          duration: 2000,
        },
        scales: {
          x: {
            grid: {
              color: "rgba(0,0,0,0.3)",
            },
            title: {
              display: true,
              text: "Date",
              color: "rgba(0,0,0,1)",
              font: {
                size: 15,
              },
            },
          },
          y: {
            grid: {
              color: "rgba(0,0,0,0.3)",
            },
            title: {
              display: true,
              text: "Values",
              color: "rgba(0,0,0,1)",
              font: {
                size: 15,
              },
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "rgba(0,0,0,1)",
            },
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [selectedParameter, data, labels]);

  return (
    <>
      <div className="w-[600px] h-[400px]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Weekly Health Summary</h1>
        </div>
        <div className="flex gap-2 mb-4">
          <button
            className="bg-blue-200 text-sm hover:bg-blue-300 text-black font-medium py-1 px-2 rounded"
            onClick={() => setSelectedParameter("Glucose")}
          >
            Glucose
          </button>
          <button
            className="bg-green-200 text-sm hover:bg-green-300 text-black font-medium py-1 px-2 rounded"
            onClick={() => setSelectedParameter("Blood Pressure")}
          >
            Blood Pressure
          </button>
          <button
            className="bg-yellow-200 text-sm hover:bg-yellow-300 text-black font-medium py-1 px-2 rounded"
            onClick={() => setSelectedParameter("BMI")}
          >
            BMI
          </button>
          <button
            className="bg-purple-200 text-sm hover:bg-purple-300 text-black font-medium py-1 px-2 rounded"
            onClick={() => setSelectedParameter("Insulin")}
          >
            Insulin
          </button>
        </div>
        <div className="flex justify-between">
          <canvas ref={chartRef}></canvas>
          <BarGraph />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <div className="p-3 w-[170px] h-[90px] bg-white shadow-lg rounded-lg hover:border-gray-400 hover:border-2 transition-all duration-75">
          <h3 className="font-bold text-xl leading-tight">2000</h3>
          <div className="flex items-center gap-2">
            <p className="leading-tight">Calories burned</p>
            <FaGripfire />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-green-600 leading-tight">+2.45% </p>
            <BiSolidUpArrowAlt className="text-green-600" />
          </div>
        </div>
        <div className="p-3 w-[190px] h-[90px] bg-white shadow-lg rounded-lg hover:border-2 hover:border-gray-400 transition-all duration-75">
          <h3 className="font-bold text-xl leading-tight">Low</h3>
          <div className="flex items-center gap-2">
            <p className="leading-tight">Glucose variation</p>
            <FaArrowDownUpAcrossLine />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-red-600 leading-tight">-2.45% </p>
            <BiSolidDownArrowAlt className="text-red-600" />
          </div>
        </div>
        <div className="p-3 w-[190px] h-[90px] bg-white shadow-lg rounded-lg hover:border-gray-400 hover:border-2 transition-all duration-75">
          <h3 className="font-bold text-xl leading-tight">1800 kcal/day</h3>
          <div className="flex items-center gap-2">
            <p className="leading-tight">Nutritional intake</p>
            <GiAppleSeeds />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-green-600 leading-tight">Great Going </p>
            <BiSolidUpArrowAlt className="text-green-600" />
          </div>
        </div>
        <div className="p-3 w-[190px] h-[90px] bg-white shadow-lg rounded-lg hover:border-gray-400 hover:border-2 transition-all duration-75">
          <h3 className="font-bold text-xl leading-tight">150 min/week</h3>
          <div className="flex items-center gap-2">
            <p className="leading-tight">Physical Activity</p>
            <CgGym />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-red-600 leading-tight">-15% </p>
            <BiSolidDownArrowAlt className="text-red-600" />
          </div>
        </div>
        <div className="p-3 w-[190px] h-[90px] bg-white shadow-lg rounded-lg hover:border-gray-400 hover:border-2 transition-all duration-75">
          <h3 className="font-bold text-xl leading-tight">-2kg</h3>
          <div className="flex items-center gap-2">
            <p className="leading-tight">Weight Change</p>
            <FaWeightHanging />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-red-600 leading-tight">-1.2% </p>
            <BiSolidDownArrowAlt className="text-red-600" />
          </div>
        </div>
        <div className="p-3 w-[190px] h-[90px] bg-white shadow-lg rounded-lg hover:border-gray-400 hover:border-2 transition-all duration-75">
          <h3 className="font-bold text-xl leading-tight">3 Dose</h3>
          <div className="flex items-center gap-2">
            <p className="leading-tight">Insulin Injected</p>
            <BiSolidDonateBlood />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-green-600 leading-tight">Recovering </p>
            <BiSolidUpArrowAlt className="text-green-600" />
          </div>
        </div>
      </div>
      <div className="flex items-center ml-4 relative mt-3 w-[1100px] border-2 border-gray-200  p-3 rounded-md">
        <div className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 flex items-center justify-center bg-green-300 rounded-full w-10 h-10">
          <BsRobot />
        </div>
        <p className="ml-3">
          Hello User, based on the statistics, it appears your glucose levels are in a good range. Keep up the healthy habits! If you ever have concerns or want personalized tips for maintaining your glucose levels, just let me know. I'm here to help you on your journey to better health!
        </p>
      </div>
    </>
  );
};

export default HealthChart;
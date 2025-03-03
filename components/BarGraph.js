import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../pages/firebase';

const BarGraph = () => {
  const chartRef = useRef(null);
  const [stepData, setstepData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [totalSteps, setTotalSteps] = useState(0);

  useEffect(() => {
    const fetchstepData = async () => {
      try {
        const q = query(collection(db, "stepData"), orderBy("timestamp", "desc"), limit(7));
        const querySnapshot = await getDocs(q);
        const fetchedstepData = [];
        const fetchedLabels = [];
        let stepsSum = 0;
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.Steps && data.timestamp) {
            fetchedLabels.push(new Date(data.timestamp.seconds * 1000).toLocaleDateString());
            fetchedstepData.push(data.Steps);
            stepsSum += data.Steps;
          } else {
            console.warn("Document missing required fields:", doc.id);
          }
        });
        setstepData(fetchedstepData.reverse()); // Reverse to show the latest date last
        setLabels(fetchedLabels.reverse()); // Reverse to show the latest date last
        setTotalSteps(stepsSum);
      } catch (error) {
        console.error("Error fetching steps data:", error);
      }
    };

    fetchstepData();
  }, []);

  useEffect(() => {
    if (stepData.length > 0 && labels.length > 0) {
      const myChart = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              data: stepData,
              label: "Steps",
              borderColor: "rgb(62,14,205)",
              backgroundColor: "rgba(31,210,134,1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              barThickness: 20,
              grid: {
                display: false,
              },
            },
            y: {
              display: true,
              grid: {
                display: true,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });

      return () => {
        myChart.destroy();
      };
    }
  }, [stepData, labels]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <p className='font-bold text-2xl mb-4 text-center'>Last 7 Days Steps Count</p>
      <div className="flex justify-center items-center mb-4">
        <div className="text-center">
          <h1 className='font-bold text-3xl text-blue-600'>{totalSteps.toLocaleString()}</h1>
          <p className='text-gray-600'>Steps Walked</p>
        </div>
      </div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default BarGraph;
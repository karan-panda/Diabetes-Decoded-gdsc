import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const BarGraph = () => {
  const chartRef = useRef(null);
  const [selectedSteps, setSelectedSteps] = useState("Steps");

  const stepsData = {
    "Steps": [7000, 11400, 10600, 4700, 10700, 11100, 13300],
  };

  const stepsColors = {
    "Steps": "rgb(62,14,205)",
  };

  const stepsBackgroundColors = {
    "Steps": "rgba(31,210,134,1)",
  };

  useEffect(() => {
    const myChart = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: ["12", "13", "14", "15", "16", "17", "18"],
        datasets: [
          {
            data: stepsData[selectedSteps],
            label: selectedSteps,
            borderColor: stepsColors[selectedSteps],
            backgroundColor: stepsBackgroundColors[selectedSteps],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            barThickness: {
              barPercentage: 0.01,
              categoryPercentage: 0.01
            },
          },
          y: {
            display: false,
            
            grid: {
              display: false,
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
  }, [selectedSteps]);


  return (
    <div className="w-[600px] h-[400px] ">
      
      <p className='font-bold text-2xl'>Last 7 Days Steps Count</p>
      <div>
      <h1 className='font-bold text-xl'>20,338</h1>
      <p>Steps Walked</p>
      </div>
      <div>
      <h1 className='font-bold text-xl'>88,123</h1>
      <p>Calories Burned</p>
      </div>
      <canvas ref={chartRef} />
      
      
    </div>
  );
};

export default BarGraph;
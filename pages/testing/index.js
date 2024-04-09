import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidenav from '../../components/sidenav';
// import '../../public/design/style.css'

export default function Layout() {
  const [htmlContent, setHtmlContent] = useState('');
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetch('../index.html')
      .then(response => response.text())
      .then(data => setHtmlContent(data));
  }, []);

  

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = {
      age: parseFloat(event.target.age.value),
      gender: event.target.gender.value,
      bloodGlucose: parseFloat(event.target.bloodGlucose.value),
      bloodPressure: parseFloat(event.target.bloodPressure.value),
      bmi: parseFloat(event.target.bmi.value),
      skinThickness: parseFloat(event.target.skinThickness.value),
      insulin: parseFloat(event.target.insulin.value),
      hypertension: event.target.hypertension.value,
      diabetesFamilyHistory: event.target.diabetesFamilyHistory.value,
      physicallyActive: event.target.physicallyActive.value,
    };

    setFormData(formData);
    predictDiabetes(formData);
  };
  

  const predictDiabetes = (formData) => {
    // Define threshold values
    const ageThreshold = 40;
    const bloodGlucoseThreshold = 140; // Example threshold value
    const bloodPressureThreshold = 80; // Example threshold value
    const bmiThreshold = 25; // Example threshold value
    const skinThicknessThreshold = 25; // Example threshold value
    const insulinThreshold = 100; // Example threshold value

    // Compare input values with threshold values
    const isDiabetic =
      formData.age > ageThreshold ||
      formData.bloodGlucose > bloodGlucoseThreshold ||
      formData.bloodPressure > bloodPressureThreshold ||
      formData.bmi > bmiThreshold ||
      formData.skinThickness > skinThicknessThreshold ||
      formData.insulin > insulinThreshold;

    // Navigate based on the prediction
    if (isDiabetic) {
      window.location.href = '/red';
    } else {
      window.location.href = '/green';
    }
  };
  

  return (
    <div className="flex bg-white">
      <Sidenav />
      <div className="overflow-y-scroll h-screen">
        <h1 className="text-2xl font-semibold mb-4">Test Diabetes</h1>
        <div className="bg-white rounded p-6 shadow-md">
        <form onSubmit={handleFormSubmit} className="flex">
          
          <div className="w-1/2">
              <div className="mb-4">
                  <div className="mb-4">
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age:</label>
                      <input type="number" id="age" name="age" className="mt-1 p-2 border border-gray-300 rounded w-full" />
                  </div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender:</label>
                  <div className="mt-1">
                      <input id="male" name="gender" type="radio" className="mr-2" value="male" />
                      <label htmlFor="male" className="text-sm font-medium text-gray-700"> Male </label>
                      <input id="female" name="gender" type="radio" className="mr-2 ml-4" value="female" />
                      <label htmlFor="female" className="text-sm font-medium text-gray-700"> Female </label>
                  </div>
              </div>
              {/* <div class="mb-4">
    <label for="testType" class="block text-sm font-medium text-gray-700">Type of Test:</label>
    <select id="testType" name="testType" class="mt-1 p-2 border border-gray-300 rounded w-full" onchange="updateLabel()">
        <option value="a1c">A1C Test (% for A1C)</option>
        <option value="fasting">Fasting Blood Sugar Test (mg/dL)</option>
        <option value="glucoseTolerance">Glucose Tolerance Test (mg/dL)</option>
        <option value="random">Random Blood Sugar Test (mg/dL)</option>
    </select>
</div> */}
<div class="mb-4 relative">
    <label for="bloodGlucose" class="block text-sm font-medium text-gray-700">Blood Glucose Level:</label>
    <div class="flex mt-1">
        <input type="number" id="bloodGlucose" name="bloodGlucose" class="p-2 border border-r-0 border-gray-300 rounded-l w-full" />
        <select id="unit" name="unit" class="border border-gray-300 rounded-r p-2 -ml-1">
            <option value="mg/dL">mg/dL</option>
            <option value="mmol/L">mmol/L</option>
            <option value="%">% (A1C)</option>
        </select>
    </div>
</div>



<div className="mb-4">
    <label htmlFor="bloodPressure" className="block text-sm font-medium text-gray-700">
        Blood Pressure (systolic/diastolic in mmHg):
    </label>
    <input 
        type="text" 
        id="bloodPressure" 
        name="bloodPressure" 
        placeholder="e.g., 120/80" 
        pattern="\d{1,3}\/\d{1,3}" 
        title="Format: systolic/diastolic e.g., 120/80" 
        className="mt-1 p-2 border border-gray-300 rounded w-full" 
    />
    <p className="mt-1 text-sm text-gray-600">
        Enter as 'Systolic/Diastolic', both in mmHg (e.g., 120/80).
    </p>
</div>

<div className="mb-4 relative">
    <label htmlFor="bmi" className="block text-sm font-medium text-gray-700">BMI (kg/m²):</label>
    <div className="flex mt-1 items-center">
        <input 
            type="number" 
            id="bmi" 
            name="bmi" 
            placeholder="Enter your BMI" 
            step="0.01" 
            className="p-2 border border-r-0 border-gray-300 rounded-l w-full"
        />
        <div className="tooltip border border-gray-300 rounded-r p-2 -ml-1 bg-gray-200 relative">
            <span className="tooltiptext absolute z-10 w-64 p-2 -mt-12 ml-4 bg-gray-600 text-white text-sm rounded transition-opacity">
                BMI Formula: BMI = weight (kg) / [height (m)]².{" "}
                <br />Example: Weight = 70kg, Height = 1.75m, BMI = 70 / (1.75)² = 22.86 kg/m².     
            </span>
            {' ℹ️'}
        </div>
    </div>
    <p className="mt-1 text-sm text-gray-600">
        Hover over the info icon for the BMI formula and example.
    </p>
</div>


<div className="mb-4 relative">
    <label htmlFor="skinThickness" className="block text-sm font-medium text-gray-700">Skin Thickness (mm):</label>
    <div className="flex mt-1 items-center">
        <input 
            type="number" 
            id="skinThickness" 
            name="skinThickness" 
            placeholder="Enter skin thickness in mm" 
            className="p-2 border border-r-0 border-gray-300 rounded-l w-full"
        />
        <div className="tooltip border border-gray-300 rounded-r p-2 -ml-1 bg-gray-200 relative">
            <span className="tooltiptext absolute z-10 w-64 p-2 -mt-12 ml-4 bg-gray-600 text-white text-sm rounded transition-opacity">
                Skin thickness measurement is often used in the assessment of body fat and insulin resistance. It's particularly useful in studies of diabetes and obesity. Higher skin thickness can indicate greater body fat and potential insulin resistance.
            </span>
            {' ℹ️'}
        </div>
    </div>
    <p className="mt-1 text-sm text-gray-600">
        Hover over the info icon for more about skin thickness measurement.
    </p>
</div>




<div className="mb-4 relative">
    <label htmlFor="insulin" className="block text-sm font-medium text-gray-700">Insulin:</label>
    <div className="flex mt-1 items-center">
        <div className="flex w-full">
            <input 
                type="text" 
                id="insulin" 
                name="insulin" 
                placeholder="Enter insulin level" 
                className="p-2 border border-gray-300 rounded-l w-3/4"
            />
            <select id="insulinUnit" name="insulinUnit" className="p-2 border border-gray-300 rounded-r w-1/4">
                <option value="microU/ml">microU/ml</option>
                <option value="pmol/L">pmol/L</option>
            </select>
        </div>
        <div className="tooltip insulin-tooltip ml-2 border border-gray-300 rounded p-2 bg-gray-200 relative flex items-center justify-center">
            <span className="info-icon flex items-center justify-center">
                ℹ️
                <span className="tooltiptext hidden absolute z-10 w-64 p-2 -mt-12 ml-4 bg-gray-600 text-white text-sm rounded transition-opacity">
                    Insulin levels in the blood are measured in microU/ml or pmol/L. They're an essential marker for diabetes management, indicating how much insulin is being produced by the body. Normal fasting levels range from 3 to 20 microU/ml (21.9 to 144.9 pmol/L).
                </span>
            </span>
        </div>
    </div>
    <p className="mt-1 text-sm text-gray-600">
        Hover over the info icon for more about insulin levels.
    </p>
</div>


              <div className="mb-4">
                  <label htmlFor="hypertension" className="block text-sm font-medium text-gray-700">Hypertension:</label>

                  <select id="hypertension" name="hypertension" className="mt-1 p-2 border border-gray-300 rounded w-full">
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                  </select>
              </div>

              <div className="mb-4">
                  <label htmlFor="diabetesFamilyHistory" className="block text-sm font-medium text-gray-700">Family history of diabetes:</label>
                  <select id="diabetesFamilyHistory" name="diabetesFamilyHistory" className="mt-1 p-2 border border-gray-300 rounded w-full">
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                  </select>
              </div>
              <div className="mb-4">
    <label htmlFor="physicallyActive" className="block text-sm font-medium text-gray-700">Physical Activity Level:</label>
    <select id="physicallyActive" name="physicallyActive" className="mt-1 p-2 border border-gray-300 rounded w-full">
        <option value="not_active">Not Active</option>
        <option value="rarely_active">Rarely Active (less than once a week)</option>
        <option value="moderately_active">Moderately Active (1-3 days a week)</option>
        <option value="active">Active (3-5 days a week)</option>
        <option value="very_active">Very Active (6-7 days a week)</option>
        <option value="daily_exercise">Daily Exercise or Intense Exercise 3-4 days a week</option>
        <option value="intense_daily_exercise">Intense Exercise Daily or Physical Job</option>
    </select>
</div>

          </div>

          <div className="w-1/2">
              <img src="hero.png" alt="Hero Image" />
              <div className="flex justify-center items-center">
                  <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800">Test Now</button>
              </div>
          </div>
      
</form>
        </div>
      </div>
    </div>
  );
}


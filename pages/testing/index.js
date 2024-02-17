import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidenav from '../../components/sidenav';

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
              <div className="mb-4">
                  <label htmlFor="bloodGlucose" className="block text-sm font-medium text-gray-700">Blood Glucose Level:</label>
                  <input type="number" id="bloodGlucose" name="bloodGlucose" className="mt-1 p-2 border border-gray-300 rounded w-full" />
              </div>
              <div className="mb-4">
                  <label htmlFor="bloodPressure" className="block text-sm font-medium text-gray-700">Blood Pressure:</label>
                  <input type="text" id="bloodPressure" name="bloodPressure" className="mt-1 p-2 border border-gray-300 rounded w-full" />
              </div>
              <div className="mb-4">
                  <label htmlFor="bmi" className="block text-sm font-medium text-gray-700">BMI:</label>
                  <input type="number" id="bmi" name="bmi" className="mt-1 p-2 border border-gray-300 rounded w-full" />
              </div>
              <div className="mb-4">
                  <label htmlFor="skinThickness" className="block text-sm font-medium text-gray-700">Skin Thickness:</label>
                  <input type="number" id="skinThickness" name="skinThickness" className="mt-1 p-2 border border-gray-300 rounded w-full" />
              </div>
              <div className="mb-4">
                  <label htmlFor="insulin" className="block text-sm font-medium text-gray-700">Insulin:</label>
                  <input type="text" id="insulin" name="insulin" className="mt-1 p-2 border border-gray-300 rounded w-full" />
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
                  <label htmlFor="physicallyActive" className="block text-sm font-medium text-gray-700">Physically active:</label>
                  <select id="physicallyActive" name="physicallyActive" className="mt-1 p-2 border border-gray-300 rounded w-full">
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
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

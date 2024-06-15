import React, { useState } from 'react';
import axios from 'axios';
import Sidenav from '../../components/sidenav';

export default function Layout() {
    const [inputData, setInputData] = useState({
        age: '',
        gender: '',
        pregnancies: 0,
        bloodGlucose: '',
        bloodPressure: '',
        bmi: '',
        skinThickness: '',
        insulin: '',
        diabetesPedigreeFunction: '',
    });
    const [prediction, setPrediction] = useState(null);

    const [errors, setErrors] = useState({
        age: false,
        gender: false,
        bloodGlucose: false,
        bloodPressure: false,
        bmi: false,
        skinThickness: false,
        insulin: false,
        diabetesPedigreeFunction: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
        setErrors({ ...errors, [name]: false }); // Remove error if user starts typing in the field
    };

    const handleGenderChange = (e) => {
        const { value } = e.target;
        setInputData({
            ...inputData,
            gender: value,
            pregnancies: value === 'female' ? inputData.pregnancies : 0
        });
    };

   const handleSubmit = async (event) => {
        event.preventDefault();

        // Check for any empty fields
        const validationErrors = {};
        let hasError = false;
        Object.keys(inputData).forEach((key) => {
            if (!inputData[key]) {
                validationErrors[key] = true;
                hasError = true;
            } else {
                validationErrors[key] = false;
            }
        });

        if (hasError) {
            setErrors(validationErrors);
            return;
        }

        const payload = {
            Pregnancies: inputData.gender === 'female' ? parseInt(inputData.pregnancies) : 0,
            Glucose: parseInt(inputData.bloodGlucose),
            BloodPressure: parseInt(inputData.bloodPressure.split('/')[0]), // Assuming we need systolic
            SkinThickness: parseInt(inputData.skinThickness),
            Insulin: parseInt(inputData.insulin),
            BMI: parseFloat(inputData.bmi),
            DiabetesPedigreeFunction: parseFloat(inputData.diabetesPedigreeFunction),
            Age: parseInt(inputData.age)
        };

        try {
            const response = await axios.post('http://localhost:5000/predict', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = response.data.prediction;
            setPrediction(result);
            window.location.href = `/results/${result}`;
        } catch (error) {
            console.error('Error making prediction:', error);
        }
    };

    return (
        <div className="flex bg-white">
            <Sidenav />
            <div className="overflow-y-scroll h-screen">
                <h1 className="text-2xl font-semibold mb-4">Test Diabetes</h1>
                <div className="bg-white rounded p-6 shadow-md">
                    <form onSubmit={handleSubmit} className="flex">
                        <div className="w-1/2">
                            <div className="mb-4">
                                <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age:</label>
                                <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    value={inputData.age}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                />
                                {errors.age && <p className="mt-1 text-sm text-red-500">* Age is required.</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender:</label>
                                <div className="mt-1">
                                    <input
                                        id="male"
                                        name="gender"
                                        type="radio"
                                        value="male"
                                        checked={inputData.gender === 'male'}
                                        onChange={handleGenderChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor="male" className="text-sm font-medium text-gray-700">Male</label>
                                    <input
                                        id="female"
                                        name="gender"
                                        type="radio"
                                        value="female"
                                        checked={inputData.gender === 'female'}
                                        onChange={handleGenderChange}
                                        className="mr-2 ml-4"
                                    />
                                    <label htmlFor="female" className="text-sm font-medium text-gray-700">Female</label>
                                </div>
                                {errors.gender && <p className="mt-1 text-sm text-red-500">* Gender is required.</p>}
                            </div>

                            {inputData.gender === 'female' && (
                                <div className="mb-4">
                                    <label htmlFor="pregnancies" className="block text-sm font-medium text-gray-700">Pregnancies:</label>
                                    <input
                                        type="number"
                                        id="pregnancies"
                                        name="pregnancies"
                                        value={inputData.pregnancies}
                                        onChange={handleChange}
                                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                                    />
                                </div>
                            )}

                            <div className="mb-4 relative">
                                <label htmlFor="bloodGlucose" className="block text-sm font-medium text-gray-700">Blood Glucose Level:</label>
                                <div className="flex mt-1">
                                    <input
                                        type="number"
                                        id="bloodGlucose"
                                        name="bloodGlucose"
                                        value={inputData.bloodGlucose}
                                        onChange={handleChange}
                                        className="p-2 border border-r-0 border-gray-300 rounded-l w-full"
                                    />
                                    <select
                                        id="unit"
                                        name="unit"
                                        className="border border-gray-300 rounded-r p-2 -ml-1"
                                    >
                                        <option value="mg/dL">mg/dL</option>
                                        <option value="mmol/L">mmol/L</option>
                                        <option value="%">% (A1C)</option>
                                    </select>
                                </div>
                                {errors.bloodGlucose && <p className="mt-1 text-sm text-red-500">* Blood Glucose Level is required.</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="bloodPressure" className="block text-sm font-medium text-gray-700">
                                    Blood Pressure (diastolic in mmHg):
                                </label>
                                <input
                                    type="text"
                                    id="bloodPressure"
                                    name="bloodPressure"
                                    placeholder="e.g., 80"
                                    pattern="\d{1,3}"
                                    title="Enter diastolic blood pressure in mmHg"
                                    value={inputData.bloodPressure}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                />
                                <p className="mt-1 text-sm text-gray-600">
                                    Enter diastolic blood pressure in mmHg (e.g., 80).
                                </p>
                                {errors.bloodPressure && <p className="mt-1 text-sm text-red-500">* Blood Pressure is required.</p>}
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
                                        value={inputData.bmi}
                                        onChange={handleChange}
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
                                {errors.bmi && <p className="mt-1 text-sm text-red-500">* BMI is required.</p>}
                            </div>

                            <div className="mb-4 relative">
                                <label htmlFor="skinThickness" className="block text-sm font-medium text-gray-700">Skin Thickness (mm):</label>
                                <div className="flex mt-1 items-center">
                                    <input
                                        type="number"
                                        id="skinThickness"
                                        name="skinThickness"
                                        placeholder="Enter skin thickness in mm"
                                        value={inputData.skinThickness}
                                        onChange={handleChange}
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
                                {errors.skinThickness && <p className="mt-1 text-sm text-red-500">* Skin Thickness is required.</p>}
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
                                            value={inputData.insulin}
                                            onChange={handleChange}
                                            className="p-2 border border-gray-300 rounded-l w-3/4"
                                        />
                                        <select
                                            id="insulinUnit"
                                            name="insulinUnit"
                                            className="p-2 border border-gray-300 rounded-r w-1/4"
                                        >
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
                                {errors.insulin && <p className="mt-1 text-sm text-red-500">* Insulin is required.</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="diabetesPedigreeFunction" className="block text-sm font-medium text-gray-700">Diabetes Pedigree Function:</label>
                                <input
                                    type="number"
                                    id="diabetesPedigreeFunction"
                                    name="diabetesPedigreeFunction"
                                    value={inputData.diabetesPedigreeFunction}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                    step="0.01"
                                />
                                {errors.diabetesPedigreeFunction && <p className="mt-1 text-sm text-red-500">* Diabetes Pedigree Function is required.</p>}
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

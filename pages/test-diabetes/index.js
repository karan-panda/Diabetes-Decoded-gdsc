import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidenav from '../../components/sidenav';
import Tesseract from 'tesseract.js';
import ChatBot from '@/components/Chatbot';

export default function Layout() {
    const [inputData, setInputData] = useState({
        age: '',
        gender: '',
        pregnancies: '',
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
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
        setErrors({ ...errors, [name]: false });
    };

    const handleGenderChange = (e) => {
        const { value } = e.target;
        setInputData({
            ...inputData,
            gender: value,
            pregnancies: value === 'female' ? inputData.pregnancies : ''
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleImageUpload = async () => {
        if (!image) return;

        try {
            const { data: { text } } = await Tesseract.recognize(
                image,
                'eng',
                { logger: info => console.log(info) }
            );

            console.log('Extracted Text:', text); // Log the raw text

            const parsedData = parseTextToData(text);
            console.log('Parsed Data:', parsedData);

            // Update inputData with parsed data, empty values will replace existing values
            setInputData({
                age: parsedData.age || '',
                gender: parsedData.gender || '',
                pregnancies: parsedData.pregnancies || '',
                bloodGlucose: parsedData.bloodGlucose || '',
                bloodPressure: parsedData.bloodPressure || '',
                bmi: parsedData.bmi || '',
                skinThickness: parsedData.skinThickness || '',
                insulin: parsedData.insulin || '',
                diabetesPedigreeFunction: parsedData.diabetesPedigreeFunction || ''
            });

            // Clear any error state for a smooth user experience
            setErrors({
                age: false,
                gender: false,
                bloodGlucose: false,
                bloodPressure: false,
                bmi: false,
                skinThickness: false,
                insulin: false,
                diabetesPedigreeFunction: false,
            });

        } catch (error) {
            console.error('Error processing image:', error);
        }
    };

    const parseTextToData = (text) => {
        const data = {
            age: '',
            gender: '',
            pregnancies: '',
            bloodGlucose: '',
            bloodPressure: '',
            bmi: '',
            skinThickness: '',
            insulin: '',
            diabetesPedigreeFunction: ''
        };
    
        const lines = text.split('\n').map(line => line.trim());
    
        for (let i = 0; i < lines.length - 1; i++) {
            const label = lines[i];
            const value = lines[i + 1] ? lines[i + 1].trim() : '';
    
            if (label === 'Age:') {
                data.age = value;
            } else if (label === 'Gender:') {
                data.gender = value;
            } else if (label === 'Pregnancies:') {
                data.pregnancies = value;
            } else if (label === 'Blood Glucose:') {
                data.bloodGlucose = value;
            } else if (label === 'Blood Pressure (mmHg):') {
                data.bloodPressure = value;
            } else if (label === 'BMI:') {
                data.bmi = value;
            } else if (label === 'Skin Thickness:') {
                data.skinThickness = value;
            } else if (label === 'Insulin:') {
                data.insulin = value;
            } else if (label === 'Diabetes Pedigree Function:') {
                data.diabetesPedigreeFunction = value;
            }
        }
    
        return data;
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = {};
        let hasError = false;
        Object.keys(inputData).forEach((key) => {
            if (!inputData[key] && inputData[key] !== '') {
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
            BloodPressure: parseInt(inputData.bloodPressure.split('/')[0]),
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

    useEffect(() => {
        console.log('Input Data:', inputData);
    }, [inputData]);

    return (
        <div className="flex bg-white">
            <ChatBot></ChatBot>
            <Sidenav />
            <div className="overflow-y-scroll h-screen">
                <h1 className="text-2xl font-semibold mb-4">Test Diabetes</h1>
                <div className="bg-white rounded p-6 shadow-md">
                    <form onSubmit={handleSubmit} className="flex">
                        <div className="w-1/2">
                            <div className="mb-4">
                                <label htmlFor="upload" className="block text-sm font-medium text-gray-700">Upload Image:</label>
                                <input
                                    type="file"
                                    id="upload"
                                    onChange={handleFileChange}
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                />
                                <button
                                    type="button"
                                    onClick={handleImageUpload}
                                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
                                >
                                    Extract Data from Image
                                </button>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age:</label>
                                <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    value={inputData.age || ''}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                />
                                {errors.age && <p className="mt-1 text-sm text-red-500">* Age is required.</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender:</label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={inputData.gender || ''}
                                    onChange={handleGenderChange}
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                </select>
                                {errors.gender && <p className="mt-1 text-sm text-red-500">* Gender is required.</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="pregnancies" className="block text-sm font-medium text-gray-700">Pregnancies:</label>
                                <input
                                    type="number"
                                    id="pregnancies"
                                    name="pregnancies"
                                    value={inputData.pregnancies || ''}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                    disabled={inputData.gender !== 'female'}
                                />
                                {errors.pregnancies && <p className="mt-1 text-sm text-red-500">* Number of Pregnancies is required for females.</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="bloodGlucose" className="block text-sm font-medium text-gray-700">Blood Glucose:</label>
                                <div className="flex items-center">
                                    <input
                                        type="number"
                                        id="bloodGlucose"
                                        name="bloodGlucose"
                                        value={inputData.bloodGlucose || ''}
                                        onChange={handleChange}
                                        className="p-2 border border-gray-300 rounded w-full"
                                    />
                                    <select
                                        id="glucoseUnits"
                                        name="glucoseUnits"
                                        className="ml-2 p-2 border border-gray-300 rounded"
                                    >
                                        <option value="mg/dL">mg/dL</option>
                                        <option value="mmol/L">mmol/L</option>
                                    </select>
                                </div>
                                {errors.bloodGlucose && <p className="mt-1 text-sm text-red-500">* Blood Glucose Level is required.</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="bloodPressure" className="block text-sm font-medium text-gray-700">Blood Pressure (mmHg):</label>
                                <input
                                    type="text"
                                    id="bloodPressure"
                                    name="bloodPressure"
                                    value={inputData.bloodPressure || ''}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                />
                                {errors.bloodPressure && <p className="mt-1 text-sm text-red-500">* Blood Pressure is required.</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="bmi" className="block text-sm font-medium text-gray-700">BMI:</label>
                                <input
                                    type="number"
                                    id="bmi"
                                    name="bmi"
                                    step="0.01"
                                    value={inputData.bmi || ''}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                />
                                {errors.bmi && <p className="mt-1 text-sm text-red-500">* BMI is required.</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="skinThickness" className="block text-sm font-medium text-gray-700">Skin Thickness:</label>
                                <input
                                    type="number"
                                    id="skinThickness"
                                    name="skinThickness"
                                    value={inputData.skinThickness || ''}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                />
                                {errors.skinThickness && <p className="mt-1 text-sm text-red-500">* Skin Thickness is required.</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="insulin" className="block text-sm font-medium text-gray-700">Insulin:</label>
                                <input
                                    type="number"
                                    id="insulin"
                                    name="insulin"
                                    value={inputData.insulin || ''}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                />
                                {errors.insulin && <p className="mt-1 text-sm text-red-500">* Insulin is required.</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="diabetesPedigreeFunction" className="block text-sm font-medium text-gray-700">Diabetes Pedigree Function:</label>
                                <input
                                    type="number"
                                    id="diabetesPedigreeFunction"
                                    name="diabetesPedigreeFunction"
                                    step="0.01"
                                    value={inputData.diabetesPedigreeFunction || ''}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                />
                                {errors.diabetesPedigreeFunction && <p className="mt-1 text-sm text-red-500">* Diabetes Pedigree Function is required.</p>}
                            </div>

                            <div className="flex justify-center items-center mt-4">
                                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800">Test Now</button>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <img src="hero.png" alt="Hero Image" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

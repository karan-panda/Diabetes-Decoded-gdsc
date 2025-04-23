// // import React from 'react';
// // import Sidenav from '../../components/sidenav';
// // import Graph from '../../components/LineGraph';
// // import ChatBot from '../../components/Chatbot'; // Import the AlanAssistant component

// // const Layout = () => {
// //   return (
// //     <div className="flex bg-white">
// //       <ChatBot /> 
// //       <Sidenav />
// //       <div className='p-4 '>
// //         <Graph /> 
        
// //       </div>
// //     </div>
// //   );
// // };

// // export default Layout;




// "use client"

// import { useState, useEffect } from "react"
// import Sidenav from "../../components/sidenav"
// import HealthChart from "../../components/LineGraph"
// import ChatBot from "../../components/Chatbot"
// import BarGraph from "../../components/BarGraph"
// import { 
//   FaChartLine, 
//   FaChartBar, 
//   FaChartPie, 
//   FaChartArea, 
//   FaDownload, 
//   FaShareAlt, 
//   FaCalendarAlt,
//   FaFilePdf,
//   FaFileExcel,
//   FaPrint,
//   FaUserMd,
//   FaClipboardCheck,
//   FaExclamationTriangle
// } from "react-icons/fa"
// import { TbCalendarStats, TbReportMedical } from "react-icons/tb"
// import { GiMedicinePills, GiHeartBeats } from "react-icons/gi"
// import { MdTrendingUp, MdTrendingDown, MdOutlineBloodtype } from "react-icons/md"
// import { BsClockHistory } from "react-icons/bs"

// const Layout = () => {
//   const [activeTab, setActiveTab] = useState("overview")
//   const [timeRange, setTimeRange] = useState("week")
//   const [showChatbot, setShowChatbot] = useState(true)
//   const [exportMenuOpen, setExportMenuOpen] = useState(false)

//   const handleExportData = (format) => {
//     alert(Exporting data report as ${format}...)
//     setExportMenuOpen(false)
//     // Implementation for actual export would go here
//   }

//   const handleShareData = () => {
//     alert("Share feature opened. You can share with your healthcare provider.")
//     // Implementation for actual sharing would go here
//   }

//   // Content for different tabs
//   const renderTabContent = () => {
//     switch(activeTab) {
//       case 'overview':
//         return <OverviewTab timeRange={timeRange} />
//       case 'glucose':
//         return <GlucoseTab timeRange={timeRange} />
//       case 'activity':
//         return <ActivityTab timeRange={timeRange} />
//       case 'medication':
//         return <MedicationTab timeRange={timeRange} />
//       case 'reports':
//         return <ReportsTab timeRange={timeRange} />
//       default:
//         return <OverviewTab timeRange={timeRange} />
//     }
//   }

//   return (
//     <div className="flex bg-gray-50 min-h-screen">
//       {showChatbot && <ChatBot />}
//       <Sidenav />
//       <div className="flex-1 p-6 overflow-auto">
//         <div className="mb-8">
//           <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//             <div>
//               <h1 className="text-3xl font-bold mb-2">Health Analytics Dashboard</h1>
//               <p className="text-gray-600">Track your diabetes metrics and stay informed about your health progress</p>
//             </div>
//             <div className="flex mt-4 md:mt-0 space-x-3">
//               <div className="relative">
//                 <button 
//                   onClick={() => setExportMenuOpen(!exportMenuOpen)}
//                   className="flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
//                 >
//                   <FaDownload className="mr-2" /> Export
//                 </button>
//                 {exportMenuOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
//                     <div className="py-1">
//                       <button 
//                         onClick={() => handleExportData('PDF')}
//                         className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       >
//                         <FaFilePdf className="mr-2 text-red-500" /> Export as PDF
//                       </button>
//                       <button 
//                         onClick={() => handleExportData('Excel')}
//                         className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       >
//                         <FaFileExcel className="mr-2 text-green-500" /> Export as Excel
//                       </button>
//                       <button 
//                         onClick={() => handleExportData('Print')}
//                         className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       >
//                         <FaPrint className="mr-2 text-blue-500" /> Print Report
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//               <button 
//                 onClick={handleShareData}
//                 className="flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100"
//               >
//                 <FaShareAlt className="mr-2" /> Share
//               </button>
//               <button 
//                 onClick={() => setShowChatbot(!showChatbot)}
//                 className="flex items-center px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100"
//               >
//                 {showChatbot ? "Hide Assistant" : "Show Assistant"}
//               </button>
//             </div>
//           </div>
          
//           {/* Time Range Selector */}
//           <div className="flex flex-wrap items-center mb-6">
//             <div className="flex items-center mr-6 mb-2 sm:mb-0">
//               <FaCalendarAlt className="text-gray-500 mr-2" />
//               <span className="mr-3 text-gray-700">Time Range:</span>
//             </div>
//             <div className="flex border rounded-lg overflow-hidden flex-wrap">
//               {[
//                 { id: "day", label: "Day" },
//                 { id: "week", label: "Week" },
//                 { id: "month", label: "Month" },
//                 { id: "3month", label: "3 Months" },
//                 { id: "year", label: "Year" }
//               ].map((range) => (
//                 <button
//                   key={range.id}
//                   onClick={() => setTimeRange(range.id)}
//                   className={px-4 py-2 ${
//                     timeRange === range.id ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
//                   }}
//                 >
//                   {range.label}
//                 </button>
//               ))}
//             </div>
//           </div>
          
//           {/* Dashboard Tabs */}
//           <div className="flex flex-wrap border-b mb-6 overflow-x-auto">
//             {[
//               { id: "overview", label: "Overview", icon: <FaChartArea /> },
//               { id: "glucose", label: "Glucose Trends", icon: <FaChartLine /> },
//               { id: "activity", label: "Activity", icon: <FaChartBar /> },
//               { id: "medication", label: "Medication", icon: <GiMedicinePills /> },
//               { id: "reports", label: "Reports", icon: <TbCalendarStats /> },
//             ].map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={flex items-center px-5 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
//                   activeTab === tab.id
//                     ? "border-b-2 border-blue-500 text-blue-700"
//                     : "text-gray-600 hover:text-blue-500"
//                 }}
//               >
//                 <span className="mr-2">{tab.icon}</span>
//                 {tab.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Dynamic Tab Content */}
//         {renderTabContent()}
//       </div>
//     </div>
//   )
// }

// // Tab Components
// const OverviewTab = ({ timeRange }) => {
//   return (
//     <>
//       {/* Main Content Area */}
//       <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
//         {/* Main Analytics Area - Takes up more space */}
//         <div className="xl:col-span-3 bg-white p-6 rounded-lg shadow-sm">
//           {/* <HealthChart /> */}
//         </div>
        
//         {/* Secondary Analytics - Takes up less space */}
//         <div className="xl:col-span-2 bg-white p-6 rounded-lg shadow-sm">
//           <BarGraph />
//         </div>
//       </div>
      
//       {/* Additional Analytics Sections */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
//         {/* Health Insights Card */}
//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           <h2 className="text-xl font-bold mb-4 flex items-center">
//             <FaChartPie className="mr-2 text-blue-500" /> Health Insights
//           </h2>
//           <div className="space-y-4">
//             <div className="flex justify-between items-center">
//               <span className="text-gray-700">Average Glucose</span>
//               <span className="font-semibold">124 mg/dL</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2.5">
//               <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "70%" }}></div>
//             </div>
            
//             <div className="flex justify-between items-center">
//               <span className="text-gray-700">Time in Range</span>
//               <span className="font-semibold">78%</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2.5">
//               <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "78%" }}></div>
//             </div>
            
//             <div className="flex justify-between items-center">
//               <span className="text-gray-700">A1C Estimate</span>
//               <span className="font-semibold">6.2%</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2.5">
//               <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "62%" }}></div>
//             </div>
//           </div>
//         </div>
        
//         {/* Recent Events Card */}
//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           <h2 className="text-xl font-bold mb-4">Recent Events</h2>
//           <div className="space-y-4">
//             <div className="border-l-4 border-yellow-500 pl-3 py-1">
//               <p className="font-semibold">High Glucose Alert</p>
//               <p className="text-sm text-gray-600">Today, 2:30 PM - 182 mg/dL</p>
//             </div>
//             <div className="border-l-4 border-green-500 pl-3 py-1">
//               <p className="font-semibold">Workout Completed</p>
//               <p className="text-sm text-gray-600">Yesterday, 6:15 PM - 45 minutes</p>
//             </div>
//             <div className="border-l-4 border-blue-500 pl-3 py-1">
//               <p className="font-semibold">Medication Taken</p>
//               <p className="text-sm text-gray-600">Yesterday, 8:00 AM - 500mg Metformin</p>
//             </div>
//             <div className="border-l-4 border-purple-500 pl-3 py-1">
//               <p className="font-semibold">Doctor Appointment</p>
//               <p className="text-sm text-gray-600">Next Tuesday, 10:00 AM</p>
//             </div>
//           </div>
//         </div>
        
//         {/* Recommendations Card */}
//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           <h2 className="text-xl font-bold mb-4">Personalized Recommendations</h2>
//           <ul className="space-y-3">
//             <li className="flex items-start">
//               <div className="bg-blue-100 p-2 rounded-full mr-3">
//                 <FaChartLine className="text-blue-500" />
//               </div>
//               <div>
//                 <p className="font-medium">Consider post-meal walks</p>
//                 <p className="text-sm text-gray-600">
//                   Walking for 15 minutes after meals can help reduce post-meal glucose spikes.
//                 </p>
//               </div>
//             </li>
//             <li className="flex items-start">
//               <div className="bg-green-100 p-2 rounded-full mr-3">
//                 <GiMedicinePills className="text-green-500" />
//               </div>
//               <div>
//                 <p className="font-medium">Medication adjustment</p>
//                 <p className="text-sm text-gray-600">
//                   Based on your morning readings, discuss adjusting your evening insulin with your doctor.
//                 </p>
//               </div>
//             </li>
//             <li className="flex items-start">
//               <div className="bg-purple-100 p-2 rounded-full mr-3">
//                 <FaCalendarAlt className="text-purple-500" />
//               </div>
//               <div>
//                 <p className="font-medium">Schedule lab tests</p>
//                 <p className="text-sm text-gray-600">
//                   It's been 3 months since your last A1C test. Consider scheduling one soon.
//                 </p>
//               </div>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </>
//   )
// }

// const GlucoseTab = ({ timeRange }) => {
//   return (
//     <div className="space-y-6">
//       {/* Glucose Trends Overview */}
//       <div className="bg-white p-6 rounded-lg shadow-sm">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-bold">Glucose Trends</h2>
//           <div className="flex items-center space-x-2">
//             <span className="text-sm text-gray-500">Last updated: Today, 3:45 PM</span>
//             <button className="p-2 bg-gray-100 rounded-full">
//               <BsClockHistory className="text-gray-500" />
//             </button>
//           </div>
//         </div>
        
//         {/* Glucose Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <div className="bg-blue-50 p-4 rounded-lg">
//             <div className="flex justify-between items-center">
//               <h3 className="text-sm font-medium text-gray-500">Average</h3>
//               <MdOutlineBloodtype className="text-blue-500" />
//             </div>
//             <p className="text-2xl font-bold mt-2">124 mg/dL</p>
//             <div className="flex items-center mt-2 text-sm">
//               <MdTrendingDown className="text-green-500 mr-1" />
//               <span className="text-green-500">3% from last {timeRange}</span>
//             </div>
//           </div>
          
//           <div className="bg-green-50 p-4 rounded-lg">
//             <div className="flex justify-between items-center">
//               <h3 className="text-sm font-medium text-gray-500">Time in Range</h3>
//               <GiHeartBeats className="text-green-500" />
//             </div>
//             <p className="text-2xl font-bold mt-2">78%</p>
//             <div className="flex items-center mt-2 text-sm">
//               <MdTrendingUp className="text-green-500 mr-1" />
//               <span className="text-green-500">5% from last {timeRange}</span>
//             </div>
//           </div>
          
//           <div className="bg-yellow-50 p-4 rounded-lg">
//             <div className="flex justify-between items-center">
//               <h3 className="text-sm font-medium text-gray-500">Highs</h3>
//               <FaExclamationTriangle className="text-yellow-500" />
//             </div>
//             <p className="text-2xl font-bold mt-2">15%</p>
//             <div className="flex items-center mt-2 text-sm">
//               <MdTrendingDown className="text-green-500 mr-1" />
//               <span className="text-green-500">2% from last {timeRange}</span>
//             </div>
//           </div>
          
//           <div className="bg-red-50 p-4 rounded-lg">
//             <div className="flex justify-between items-center">
//               <h3 className="text-sm font-medium text-gray-500">Lows</h3>
//               <FaExclamationTriangle className="text-red-500" />
//             </div>
//             <p className="text-2xl font-bold mt-2">7%</p>
//             <div className="flex items-center mt-2 text-sm">
//               <MdTrendingUp className="text-red-500 mr-1" />
//               <span className="text-red-500">1% from last {timeRange}</span>
//             </div>
//           </div>
//         </div>
        
//         {/* Glucose Chart */}
//         <div className="h-80">
//           {/* <HealthChart /> */}
//         </div>
//       </div>
      
//       {/* Glucose Patterns */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           <h2 className="text-lg font-bold mb-4">Daily Patterns</h2>
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="font-medium">Morning Spike</h3>
//                 <p className="text-sm text-gray-600">Between 7:00 AM - 9:00 AM</p>
//               </div>
//               <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Moderate</span>
//             </div>
            
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="font-medium">Post-Lunch Dip</h3>
//                 <p className="text-sm text-gray-600">Between 2:00 PM - 3:00 PM</p>
//               </div>
//               <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Significant</span>
//             </div>
            
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="font-medium">Overnight Stability</h3>
//                 <p className="text-sm text-gray-600">Between 11:00 PM - 6:00 AM</p>
//               </div>
//               <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Good</span>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           <h2 className="text-lg font-bold mb-4">Factors Affecting Glucose</h2>
//           <ul className="space-y-3">
//             <li className="flex items-start">
//               <div className="bg-blue-100 p-2 rounded-full mr-3">
//                 <GiMedicinePills className="text-blue-500" />
//               </div>
//               <div>
//                 <p className="font-medium">Medication Timing</p>
//                 <p className="text-sm text-gray-600">
//                   Taking insulin 15-20 minutes before meals shows better glucose control.
//                 </p>
//               </div>
//             </li>
            
//             <li className="flex items-start">
//               <div className="bg-green-100 p-2 rounded-full mr-3">
//                 <FaChartBar className="text-green-500" />
//               </div>
//               <div>
//                 <p className="font-medium">Exercise Impact</p>
//                 <p className="text-sm text-gray-600">
//                   Your glucose levels improve for up to 24 hours after moderate exercise.
//                 </p>
//               </div>
//             </li>
            
//             <li className="flex items-start">
//               <div className="bg-yellow-100 p-2 rounded-full mr-3">
//                 <FaExclamationTriangle className="text-yellow-500" />
//               </div>
//               <div>
//                 <p className="font-medium">Stress Response</p>
//                 <p className="text-sm text-gray-600">
//                   High stress days correlate with 15-20% higher glucose readings.
//                 </p>
//               </div>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   )
// }

// const ActivityTab = ({ timeRange }) => {
//   return (
//     <div className="space-y-6">
//       {/* Activity Overview */}
//       <div className="bg-white p-6 rounded-lg shadow-sm">
//         <h2 className="text-xl font-bold mb-6">Activity Overview</h2>
        
//         {/* Activity Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           <div className="bg-blue-50 p-4 rounded-lg">
//             <div className="flex justify-between items-center">
//               <h3 className="text-sm font-medium text-gray-500">Steps</h3>
//               <FaChartBar className="text-blue-500" />
//             </div>
//             <p className="text-2xl font-bold mt-2">8,742 / day</p>
//             <div className="flex items-center mt-2 text-sm">
//               <MdTrendingUp className="text-green-500 mr-1" />
//               <span className="text-green-500">12% from last {timeRange}</span>
//             </div>
//           </div>
          
//           <div className="bg-green-50 p-4 rounded-lg">
//             <div className="flex justify-between items-center">
//               <h3 className="text-sm font-medium text-gray-500">Active Minutes</h3>
//               <FaChartLine className="text-green-500" />
//             </div>
//             <p className="text-2xl font-bold mt-2">42 min / day</p>
//             <div className="flex items-center mt-2 text-sm">
//               <MdTrendingUp className="text-green-500 mr-1" />
//               <span className="text-green-500">8% from last {timeRange}</span>
//             </div>
//           </div>
          
//           <div className="bg-purple-50 p-4 rounded-lg">
//             <div className="flex justify-between items-center">
//               <h3 className="text-sm font-medium text-gray-500">Calories Burned</h3>
//               <FaChartPie className="text-purple-500" />
//             </div>
//             <p className="text-2xl font-bold mt-2">2,145 / day</p>
//             <div className="flex items-center mt-2 text-sm">
//               <MdTrendingUp className="text-green-500 mr-1" />
//               <span className="text-green-500">5% from last {timeRange}</span>
//             </div>
//           </div>
//         </div>
        
//         {/* Activity Chart */}
//         <div className="h-80">
//           <BarGraph />
//         </div>
//       </div>
      
//       {/* Activity Details */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           <h2 className="text-lg font-bold mb-8">Activity Impact on Glucose</h2>
//           <div className="space-y-4">
//             <div className="p-4 border border-gray-200 rounded-lg">
//               <div className="flex items-center mb-2">
//                 <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
//                 <h3 className="font-medium">Walking (30 min)</h3>
//               </div>
//               <p className="text-sm text-gray-600 mb-2">Average glucose reduction: 15-20 mg/dL</p>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div className="bg-green-500 h-2 rounded-full" style={{ width: "65%" }}></div>
//               </div>
//             </div>
            
//             <div className="p-4 border border-gray-200 rounded-lg">
//               <div className="flex items-center mb-2">
//                 <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
//                 <h3 className="font-medium">Strength Training (45 min)</h3>
//               </div>
//               <p className="text-sm text-gray-600 mb-2">Average glucose reduction: 25-30 mg/dL</p>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div className="bg-blue-500 h-2 rounded-full" style={{ width: "85%" }}></div>
//               </div>
//             </div>
            
//             <div className="p-4 border border-gray-200 rounded-lg">
//               <div className="flex items-center mb-2">
//                 <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
//                 <h3 className="font-medium">Cycling (20 min)</h3>
//               </div>
//               <p className="text-sm text-gray-600 mb-2">Average glucose reduction: 10-15 mg/dL</p>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div className="bg-purple-500 h-2 rounded-full" style={{ width: "45%" }}></div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white mb-3 p-6 rounded-lg shadow-sm">
//           <h2 className="text-lg font-bold mb-8">Activity Recommendations</h2>
//           <ul className="space-y-3">
//             <li className="flex items-start">
//               <div className="bg-blue-100 p-2 rounded-full mr-3">
//                 <FaChartLine className="text-blue-500" />
//               </div>
//               <div>
//                 <p className="font-medium">Increase Morning Activity</p>
//                 <p className="text-sm text-gray-600">
//                   Morning exercise can help regulate glucose levels throughout the day.
//                 </p>
//               </div>
//             </li>
            
//             <li className="flex items-start">
//               <div className="bg-green-100 p-2 rounded-full mr-3">
//                 <FaChartBar className="text-green-500" />
//               </div>
//               <div>
//                 <p className="font-medium">Post-Meal Movement</p>
//                 <p className="text-sm text-gray-600">
//                   Even a 10-minute walk after meals can significantly reduce post-meal glucose spikes.
//                 </p>
//               </div>
//             </li>
            
//             <li className="flex items-start">
//               <div className="bg-purple-100 p-2 rounded-full mr-3">
//                 <FaCalendarAlt className="text-purple-500" />
//               </div>
//               <div>
//                 <p className="font-medium">Consistent Schedule</p>
//                 <p className="text-sm text-gray-600">
//                   Aim for activity at the same times each day to help stabilize glucose patterns.
//                 </p>
//               </div>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   )
// }

// const MedicationTab = ({ timeRange }) => {
//   return (
//     <div className="space-y-6">
//       {/* Medication Overview */}
//       <div className="bg-white p-6 rounded-lg shadow-sm">
//         <h2 className="text-xl font-bold mb-6">Medication Management</h2>
        
//         {/* Current Medications */}
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold mb-4">Current Medications</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="border border-gray-200 rounded-lg p-4">
//               <div className="flex justify-between">
//                 <h4 className="font-medium text-blue-700">Metformin</h4>
//                 <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
//               </div>
//               <p className="text-sm text-gray-600 mt-1">500mg, Twice daily</p>
//               <div className="mt-2 flex items-center text-sm">
//                 <span className="text-gray-500">Last taken: Today, 8:00 AM</span>
//               </div>
//               <div className="mt-3 flex space-x-2">
//                 <button className="px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-sm">View Details</button>
//                 <button className="px-3 py-1 bg-gray-50 text-gray-700 rounded-md text-sm">Set Reminder</button>
//               </div>
//             </div>
            
//             <div className="border border-gray-200 rounded-lg p-4">
//               <div className="flex justify-between">
//                 <h4 className="font-medium text-blue-700">Insulin Glargine</h4>
//                 <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
//               </div>
//               <p className="text-sm text-gray-600 mt-1">10 units, Once daily</p>
//               <div className="mt-2 flex items-center text-sm">
//                 <span className="text-gray-500">Last taken: Yesterday, 9:30 PM</span>
//               </div>
//               <div className="mt-3 flex space-x-2">
//                 <button className="px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-sm">View Details</button>
//                 <button className="px-3 py-1 bg-gray-50 text-gray-700 rounded-md text-sm">Set Reminder</button>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Medication Adherence */}
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold mb-4">Medication Adherence</h3>
//           <div className="bg-blue-50 p-4 rounded-lg">
//             <div className="flex items-center justify-between mb-2">
//               <h4 className="font-medium">Overall Adherence</h4>
//               <span className="text-lg font-bold text-blue-700">92%</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
//               <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "92%" }}></div>
//             </div>
//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <div>
//                 <p className="text-gray-600">Metformin</p>
//                 <div className="flex items-center">
//                   <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
//                     <div className="bg-green-500 h-2 rounded-full" style={{ width: "95%" }}></div>
//                   </div>
//                   <span>95%</span>
//                 </div>
//               </div>
//               <div>
//                 <p className="text-gray-600">Insulin</p>
//                 <div className="flex items-center">
//                   <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
//                     <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "89%" }}></div>
//                   </div>
//                   <span>89%</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Medication Impact */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4">Medication Impact on Glucose</h3>
//           <div className="h-64">
//             {/* <HealthChart /> */}
//           </div>
//         </div>
//       </div>
      
//       {/* Medication Details */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           <h2 className="text-lg font-bold mb-4">Medication Schedule</h2>
//           <div className="space-y-4">
//             <div className="flex items-center p-3 border-l-4 border-blue-500 bg-blue-50">
//               <div className="mr-4">
//                 <p className="font-bold">8:00 AM</p>
//                 <p className="text-xs text-gray-500">Daily</p>
//               </div>
//               <div>
//                 <p className="font-medium">Metformin 500mg</p>
//                 <p className="text-sm text-gray-600">Take with breakfast</p>
//               </div>
//             </div>
            
//             <div className="flex items-center p-3 border-l-4 border-green-500 bg-green-50">
//               <div className="mr-4">
//                 <p className="font-bold">1:00 PM</p>
//                 <p className="text-xs text-gray-500">Daily</p>
//               </div>
//               <div>
//                 <p className="font-medium">Metformin 500mg</p>
//                 <p className="text-sm text-gray-600">Take with lunch</p>
//               </div>
//             </div>
            
//             <div className="flex items-center p-3 border-l-4 border-purple-500 bg-purple-50">
//               <div className="mr-4">
//                 <p className="font-bold">9:00 PM</p>
//                 <p className="text-xs text-gray-500">Daily</p>
//               </div>
//               <div>
//                 <p className="font-medium">Insulin Glargine 10 units</p>
//                 <p className="text-sm text-gray-600">Inject before bedtime</p>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           <h2 className="text-lg font-bold mb-4">Medication Insights</h2>
//           <ul className="space-y-3">
//             <li className="flex items-start">
//               <div className="bg-blue-100 p-2 rounded-full mr-3">
//                 <GiMedicinePills className="text-blue-500" />
//               </div>
//               <div>
//                 <p className="font-medium">Timing Optimization</p>
//                 <p className="text-sm text-gray-600">
//                   Taking Metformin 30 minutes before meals may improve effectiveness.
//                 </p>
//               </div>
//             </li>
            
//             <li className="flex items-start">
//               <div className="bg-yellow-100 p-2 rounded-full mr-3">
//                 <FaExclamationTriangle className="text-yellow-500" />
//               </div>
//               <div>
//                 <p className="font-medium">Potential Interaction</p>
//                 <p className="text-sm text-gray-600">
//                   Vitamin B12 levels should be monitored while on long-term Metformin therapy.
//                 </p>
//               </div>
//             </li>
            
//             <li className="flex items-start">
//               <div className="bg-green-100 p-2 rounded-full mr-3">
//                 <FaChartLine className="text-green-500" />
//               </div>
//               <div>
//                 <p className="font-medium">Insulin Effectiveness</p>
//                 <p className="text-sm text-gray-600">
//                   Your insulin sensitivity appears to be higher in the evening.
//                 </p>
//               </div>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   )
// }

// const ReportsTab = ({ timeRange }) => {
//   return (
//     <div className="space-y-6">
//       {/* Reports Overview */}
//       <div className="bg-white p-6 rounded-lg shadow-sm">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-bold">Health Reports</h2>
//           <button className="flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">
//             <TbReportMedical className="mr-2" /> Generate New Report
//           </button>
//         </div>
        
//         {/* Recent Reports */}
//         <div className="space-y-4">
//           <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h3 className="font-medium">Monthly Health Summary</h3>
//                 <p className="text-sm text-gray-600">Generated on May 1, 2023</p>
//               </div>
//               <div className="flex space-x-2">
//                 <button className="p-2 bg-blue-50 text-blue-700 rounded-md">
//                   <FaDownload />
//                 </button>
//                 <button className="p-2 bg-green-50 text-green-700 rounded-md">
//                   <FaShareAlt />
//                 </button>
//                 <button className="p-2 bg-purple-50 text-purple-700 rounded-md">
//                   <FaPrint />
//                 </button>
//               </div>
//             </div>
//           </div>
          
//           <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h3 className="font-medium">Quarterly A1C Analysis</h3>
//                 <p className="text-sm text-gray-600">Generated on April 15, 2023</p>
//               </div>
//               <div className="flex space-x-2">
//                 <button className="p-2 bg-blue-50 text-blue-700 rounded-md">
//                   <FaDownload />
//                 </button>
//                 <button className="p-2 bg-green-50 text-green-700 rounded-md">
//                   <FaShareAlt />
//                 </button>
//                 <button className="p-2 bg-purple-50 text-purple-700 rounded-md">
//                   <FaPrint />
//                 </button>
//               </div>
//             </div>
//           </div>
          
//           <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h3 className="font-medium">Medication Effectiveness Report</h3>
//                 <p className="text-sm text-gray-600">Generated on March 22, 2023</p>
//               </div>
//               <div className="flex space-x-2">
//                 <button className="p-2 bg-blue-50 text-blue-700 rounded-md">
//                   <FaDownload />
//                 </button>
//                 <button className="p-2 bg-green-50 text-green-700 rounded-md">
//                   <FaShareAlt />
//                 </button>
//                 <button className="p-2 bg-purple-50 text-purple-700 rounded-md">
//                   <FaPrint />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Report Details */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           <h2 className="text-lg font-bold mb-4">Health Metrics Trends</h2>
//           <div className="space-y-4">
//             <div className="p-4 border border-gray-200 rounded-lg">
//               <h3 className="font-medium mb-2">A1C Trend</h3>
//               <div className="flex items-center space-x-2 mb-2">
//                 <span className="text-2xl font-bold text-blue-700">6.2%</span>
//                 <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
//                   <MdTrendingDown className="inline mr-1" />
//                   0.3% from last quarter
//                 </span>
//               </div>
//               <div className="h-32">
//                 {/* <HealthChart /> */}
//               </div>
//             </div>
            
//             <div className="p-4 border border-gray-200 rounded-lg">
//               <h3 className="font-medium mb-2">Weight Trend</h3>
//               <div className="flex items-center space-x-2 mb-2">
//                 <span className="text-2xl font-bold text-blue-700">78 kg</span>
//                 <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
//                   <MdTrendingDown className="inline mr-1" />
//                   2 kg from last quarter
//                 </span>
//               </div>
//               <div className="h-32">
//                 {/* <HealthChart /> */}
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           <h2 className="text-lg font-bold mb-4">Doctor's Recommendations</h2>
//           <div className="space-y-4">
//             <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
//               <div className="flex items-center mb-2">
//                 <FaUserMd className="text-blue-700 mr-2" />
//                 <h3 className="font-medium">Dr. Sarah Johnson</h3>
//               </div>
//               <p className="text-sm text-gray-700 mb-2">
//                 Continue with current medication regimen. Consider increasing physical activity to 45 minutes daily.
//               </p>
//               <p className="text-xs text-gray-500">Last updated: April 10, 2023</p>
//             </div>
            
//             <div className="p-4 border-l-4 border-green-500 bg-green-50">
//               <div className="flex items-center mb-2">
//                 <FaClipboardCheck className="text-green-700 mr-2" />
//                 <h3 className="font-medium">Next Steps</h3>
//               </div>
//               <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
//                 <li>Schedule follow-up appointment in 3 months</li>
//                 <li>Complete blood work 1 week before appointment</li>
//                 <li>Continue monitoring glucose 3 times daily</li>
//                 <li>Consider joining diabetes support group</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Layout




"use client"
import { useState, useEffect } from "react"
import Sidenav from "../../components/sidenav"
import LineGraph from "../../components/LineGraph"
import ChatBot from "../../components/Chatbot"
import BarGraph from "../../components/BarGraph"
import {
FaChartLine, FaChartBar, FaChartPie, FaChartArea,
FaDownload, FaShareAlt, FaCalendarAlt, FaPrint,
FaBell, FaUserMd, FaClipboardList, FaExclamationTriangle
} from "react-icons/fa"
import { TbCalendarStats } from "react-icons/tb"
import { GiMedicinePills } from "react-icons/gi"
import { MdTrendingUp, MdTrendingDown, MdOutlineWaterDrop } from "react-icons/md"

const Layout = () => {
const [activeTab, setActiveTab] = useState("overview")
const [timeRange, setTimeRange] = useState("week")
const [showChatbot, setShowChatbot] = useState(true)
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
// Simulate data loading
const timer = setTimeout(() => {
setIsLoading(false)
}, 1000)
return () => clearTimeout(timer)
}, [])

const handleExportData = () => {
alert("Exporting data report as PDF...")
// Implementation for actual export would go here
}

const handleShareData = () => {
alert("Share feature opened. You can share with your healthcare provider.")
// Implementation for actual sharing would go here
}

const handlePrintReport = () => {
alert("Preparing to print your health report...")
// Implementation for printing would go here
}

// Sample data for different tabs
const tabContent = {
overview: (
<div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
<div className="xl:col-span-3 bg-white p-6 rounded-lg shadow-sm">
<div className="flex justify-between items-center mb-4">
<h2 className="text-xl font-bold">Glucose Monitoring</h2>
<div className="flex space-x-2">
<button className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">Daily</button>
<button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Weekly</button>
<button className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">Monthly</button>
</div>
</div>
<LineGraph />
</div>
<div className="xl:col-span-2 bg-white p-6 rounded-lg shadow-sm">
<BarGraph />
</div>
</div>
),
glucose: (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
<div className="xl:col-span-2 bg-white p-6 rounded-lg shadow-sm">
<h2 className="text-xl font-bold mb-4">Glucose Trends</h2>
<div className="flex justify-between items-center mb-4">
<div>
<span className="text-sm font-medium text-gray-500">Average</span>
<div className="text-2xl font-bold">124 mg/dL</div>
</div>
<div>
<span className="text-sm font-medium text-gray-500">Highest</span>
<div className="text-2xl font-bold text-red-500">182 mg/dL</div>
</div>
<div>
<span className="text-sm font-medium text-gray-500">Lowest</span>
<div className="text-2xl font-bold text-green-500">98 mg/dL</div>
</div>
</div>
<LineGraph />
<div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
<div className="bg-green-50 p-4 rounded-lg">
<div className="flex items-center">
<MdTrendingDown className="text-green-500 text-xl mr-2" />
<span className="text-sm font-medium">Low Events</span>
</div>
<div className="text-2xl font-bold mt-2">2</div>
<div className="text-xs text-gray-500">Last 7 days</div>
</div>
<div className="bg-red-50 p-4 rounded-lg">
<div className="flex items-center">
<MdTrendingUp className="text-red-500 text-xl mr-2" />
<span className="text-sm font-medium">High Events</span>
</div>
<div className="text-2xl font-bold mt-2">5</div>
<div className="text-xs text-gray-500">Last 7 days</div>
</div>
<div className="bg-blue-50 p-4 rounded-lg">
<div className="flex items-center">
<MdOutlineWaterDrop className="text-blue-500 text-xl mr-2" />
<span className="text-sm font-medium">A1C Estimate</span>
</div>
<div className="text-2xl font-bold mt-2">6.2%</div>
<div className="text-xs text-gray-500">Based on 90 days</div>
</div>
</div>
</div>
<div className="bg-white p-6 rounded-lg shadow-sm">
<h2 className="text-xl font-bold mb-4">Daily Patterns</h2>
<div className="space-y-4">
<div>
<h3 className="font-medium text-gray-700">Morning (6 AM - 12 PM)</h3>
<div className="flex items-center mt-1">
<div className="w-full bg-gray-200 rounded-full h-2.5">
<div className="bg-green-500 h-2.5 rounded-full" style={{ width: "85%" }}></div>
</div>
<span className="ml-2 text-sm font-medium">120 mg/dL</span>
</div>
</div>
<div>
<h3 className="font-medium text-gray-700">Afternoon (12 PM - 6 PM)</h3>
<div className="flex items-center mt-1">
<div className="w-full bg-gray-200 rounded-full h-2.5">
<div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "65%" }}></div>
</div>
<span className="ml-2 text-sm font-medium">145 mg/dL</span>
</div>
</div>
<div>
<h3 className="font-medium text-gray-700">Evening (6 PM - 12 AM)</h3>
<div className="flex items-center mt-1">
<div className="w-full bg-gray-200 rounded-full h-2.5">
<div className="bg-red-500 h-2.5 rounded-full" style={{ width: "75%" }}></div>
</div>
<span className="ml-2 text-sm font-medium">160 mg/dL</span>
</div>
</div>
<div>
<h3 className="font-medium text-gray-700">Night (12 AM - 6 AM)</h3>
<div className="flex items-center mt-1">
<div className="w-full bg-gray-200 rounded-full h-2.5">
<div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "55%" }}></div>
</div>
<span className="ml-2 text-sm font-medium">110 mg/dL</span>
</div>
</div>
</div>
<div className="mt-6">
<h3 className="font-medium text-gray-700 mb-2">Recommendations</h3>
<ul className="space-y-2 text-sm">
<li className="flex items-start">
<FaExclamationTriangle className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />
<span>Consider reducing carb intake in the evening meals</span>
</li>
<li className="flex items-start">
<FaExclamationTriangle className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />
<span>Morning readings are stable, maintain current routine</span>
</li>
</ul>
</div>
</div>
</div>
),
activity: (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
<div className="xl:col-span-2 bg-white p-6 rounded-lg shadow-sm">
<h2 className="text-xl font-bold mb-4">Physical Activity</h2>
<div className="flex justify-between items-center mb-4">
<div>
<span className="text-sm font-medium text-gray-500">Weekly Goal</span>
<div className="text-2xl font-bold">150 min</div>
</div>
<div>
<span className="text-sm font-medium text-gray-500">Completed</span>
<div className="text-2xl font-bold text-blue-500">120 min</div>
</div>
<div>
<span className="text-sm font-medium text-gray-500">Remaining</span>
<div className="text-2xl font-bold text-orange-500">30 min</div>
</div>
</div>
<div className="w-full bg-gray-200 rounded-full h-4 mb-6">
<div className="bg-blue-500 h-4 rounded-full" style={{ width: "80%" }}></div>
</div>
<BarGraph />
</div>
<div className="bg-white p-6 rounded-lg shadow-sm">
<h2 className="text-xl font-bold mb-4">Activity Log</h2>
<div className="space-y-4">
<div className="border-l-4 border-green-500 pl-3 py-1">
<p className="font-semibold">Walking</p>
<p className="text-sm text-gray-600">Today, 8:30 AM - 30 minutes</p>
<p className="text-xs text-gray-500">Impact: Glucose -15 mg/dL</p>
</div>
<div className="border-l-4 border-blue-500 pl-3 py-1">
<p className="font-semibold">Swimming</p>
<p className="text-sm text-gray-600">Yesterday, 5:15 PM - 45 minutes</p>
<p className="text-xs text-gray-500">Impact: Glucose -25 mg/dL</p>
</div>
<div className="border-l-4 border-purple-500 pl-3 py-1">
<p className="font-semibold">Yoga</p>
<p className="text-sm text-gray-600">2 days ago, 7:00 AM - 20 minutes</p>
<p className="text-xs text-gray-500">Impact: Glucose -10 mg/dL</p>
</div>
<div className="border-l-4 border-yellow-500 pl-3 py-1">
<p className="font-semibold">Cycling</p>
<p className="text-sm text-gray-600">3 days ago, 6:30 PM - 25 minutes</p>
<p className="text-xs text-gray-500">Impact: Glucose -20 mg/dL</p>
</div>
</div>
<button className="w-full mt-4 bg-blue-50 text-blue-700 py-2 rounded-lg hover:bg-blue-100">
Add Activity
</button>
</div>
</div>
),
medication: (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
<div className="xl:col-span-2 bg-white p-6 rounded-lg shadow-sm">
<h2 className="text-xl font-bold mb-4">Medication Tracking</h2>
<div className="overflow-x-auto">
<table className="min-w-full divide-y divide-gray-200">
<thead className="bg-gray-50">
<tr>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medication</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosage</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Taken</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
</tr>
</thead>
<tbody className="bg-white divide-y divide-gray-200">
<tr>
<td className="px-6 py-4 whitespace-nowrap">Metformin</td>
<td className="px-6 py-4 whitespace-nowrap">500mg</td>
<td className="px-6 py-4 whitespace-nowrap">Twice daily</td>
<td className="px-6 py-4 whitespace-nowrap">Today, 8:00 AM</td>
<td className="px-6 py-4 whitespace-nowrap">
<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
Taken
</span>
</td>
</tr>
<tr>
<td className="px-6 py-4 whitespace-nowrap">Insulin</td>
<td className="px-6 py-4 whitespace-nowrap">10 units</td>
<td className="px-6 py-4 whitespace-nowrap">Before meals</td>
<td className="px-6 py-4 whitespace-nowrap">Today, 12:30 PM</td>
<td className="px-6 py-4 whitespace-nowrap">
<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
Taken
</span>
</td>
</tr>
<tr>
<td className="px-6 py-4 whitespace-nowrap">Glipizide</td>
<td className="px-6 py-4 whitespace-nowrap">5mg</td>
<td className="px-6 py-4 whitespace-nowrap">Once daily</td>
<td className="px-6 py-4 whitespace-nowrap">Yesterday, 9:00 AM</td>
<td className="px-6 py-4 whitespace-nowrap">
<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
Due
</span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
<div className="bg-white p-6 rounded-lg shadow-sm">
<h2 className="text-xl font-bold mb-4">Medication Reminders</h2>
<div className="space-y-4">
<div className="bg-yellow-50 p-4 rounded-lg">
<div className="flex justify-between items-center">
<div className="flex items-center">
<FaBell className="text-yellow-500 mr-2" />
<div>
<p className="font-medium">Metformin 500mg</p>
<p className="text-sm text-gray-600">Due at 8:00 PM</p>
</div>
</div>
<button className="bg-white text-yellow-500 px-3 py-1 rounded-md border border-yellow-500 text-sm">
Snooze
</button>
</div>
</div>
<div className="bg-red-50 p-4 rounded-lg">
<div className="flex justify-between items-center">
<div className="flex items-center">
<FaBell className="text-red-500 mr-2" />
<div>
<p className="font-medium">Glipizide 5mg</p>
<p className="text-sm text-gray-600">Overdue by 2 hours</p>
</div>
</div>
<button className="bg-white text-red-500 px-3 py-1 rounded-md border border-red-500 text-sm">
Take Now
</button>
</div>
</div>
<div className="bg-gray-50 p-4 rounded-lg">
<div className="flex justify-between items-center">
<div className="flex items-center">
<FaBell className="text-gray-400 mr-2" />
<div>
<p className="font-medium">Insulin</p>
<p className="text-sm text-gray-600">Due before dinner</p>
</div>
</div>
<button className="bg-white text-gray-500 px-3 py-1 rounded-md border border-gray-500 text-sm">
Remind
</button>
</div>
</div>
</div>
<button className="w-full mt-4 bg-blue-50 text-blue-700 py-2 rounded-lg hover:bg-blue-100">
Add Medication
</button>
</div>
</div>
),
reports: (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
<div className="xl:col-span-2 bg-white p-6 rounded-lg shadow-sm">
<div className="flex justify-between items-center mb-4">
<h2 className="text-xl font-bold">Health Reports</h2>
<div className="flex space-x-2">
<button onClick={handlePrintReport} className="flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">
<FaPrint className="mr-1" /> Print
</button>
<button onClick={handleExportData} className="flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-lg hover:bg-green-100">
<FaDownload className="mr-1" /> Export
</button>
</div>
</div>
<div className="overflow-x-auto">
<table className="min-w-full divide-y divide-gray-200">
<thead className="bg-gray-50">
<tr>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Type</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Results</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
</tr>
</thead>
<tbody className="bg-white divide-y divide-gray-200">
<tr>
<td className="px-6 py-4 whitespace-nowrap">A1C Test</td>
<td className="px-6 py-4 whitespace-nowrap">Jan 15, 2023</td>
<td className="px-6 py-4 whitespace-nowrap">Dr. Smith</td>
<td className="px-6 py-4 whitespace-nowrap">6.2%</td>
<td className="px-6 py-4 whitespace-nowrap">
<button className="text-blue-600 hover:text-blue-800">View</button>
</td>
</tr>
<tr>
<td className="px-6 py-4 whitespace-nowrap">Lipid Panel</td>
<td className="px-6 py-4 whitespace-nowrap">Feb 22, 2023</td>
<td className="px-6 py-4 whitespace-nowrap">Dr. Johnson</td>
<td className="px-6 py-4 whitespace-nowrap">Normal</td>
<td className="px-6 py-4 whitespace-nowrap">
<button className="text-blue-600 hover:text-blue-800">View</button>
</td>
</tr>
<tr>
<td className="px-6 py-4 whitespace-nowrap">Kidney Function</td>
<td className="px-6 py-4 whitespace-nowrap">Mar 10, 2023</td>
<td className="px-6 py-4 whitespace-nowrap">Dr. Williams</td>
<td className="px-6 py-4 whitespace-nowrap">Normal</td>
<td className="px-6 py-4 whitespace-nowrap">
<button className="text-blue-600 hover:text-blue-800">View</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>
<div className="bg-white p-6 rounded-lg shadow-sm">
<h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
<div className="space-y-4">
<div className="border-l-4 border-blue-500 pl-3 py-1">
<p className="font-semibold">Endocrinologist</p>
<p className="text-sm text-gray-600">Dr. Sarah Johnson</p>
<p className="text-sm text-gray-600">April 15, 2023 - 10:00 AM</p>
<div className="flex space-x-2 mt-2">
<button className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">Reschedule</button>
<button className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded">Cancel</button>
</div>
</div>
<div className="border-l-4 border-green-500 pl-3 py-1">
<p className="font-semibold">Nutritionist</p>
<p className="text-sm text-gray-600">Emily Wilson, RD</p>
<p className="text-sm text-gray-600">April 22, 2023 - 2:30 PM</p>
<div className="flex space-x-2 mt-2">
<button className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">Reschedule</button>
<button className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded">Cancel</button>
</div>
</div>
</div>
<button className="w-full mt-4 bg-blue-50 text-blue-700 py-2 rounded-lg hover:bg-blue-100">
Book New Appointment
</button>
</div>
</div>
),
}

return (
<div className="flex bg-gray-50 min-h-screen">
{showChatbot && <ChatBot />}
<Sidenav />
<div className="flex-1 p-6 overflow-auto">
{isLoading ? (
<div className="flex flex-col items-center justify-center h-full">
<div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
<p className="mt-4 text-gray-600">Loading your health analytics...</p>
</div>
) : (
<>
<div className="mb-8">
<div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
<div>
<h1 className="text-3xl font-bold mb-2">Health Analytics Dashboard</h1>
<p className="text-gray-600">Track your diabetes metrics and stay informed about your health progress</p>
</div>
<div className="flex mt-4 md:mt-0 space-x-3">
<button
                 onClick={handleExportData}
                 className="flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
               >
<FaDownload className="mr-2" /> Export
</button>
<button
                 onClick={handleShareData}
                 className="flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100"
               >
<FaShareAlt className="mr-2" /> Share
</button>
<button
onClick={() => setShowChatbot(!showChatbot)}
className="flex items-center px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100"
>
{showChatbot ? "Hide Assistant" : "Show Assistant"}
</button>
</div>
</div>


          {/* Time Range Selector */}
          <div className="flex items-center mb-6">
            <FaCalendarAlt className="text-gray-500 mr-2" />
            <span className="mr-3 text-gray-700">Time Range:</span>
            <div className="flex border rounded-lg overflow-hidden">
              {["day", "week", "month", "3month", "year"].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 ${
                    timeRange === range ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {range === "day"
                    ? "Day"
                    : range === "week"
                      ? "Week"
                      : range === "month"
                        ? "Month"
                        : range === "3month"
                          ? "3 Months"
                          : "Year"}
                </button>
              ))}
            </div>
          </div>

          {/* Dashboard Tabs */}
          <div className="flex flex-wrap border-b mb-6 overflow-x-auto">
            {[
              { id: "overview", label: "Overview", icon: <FaChartArea /> },
              { id: "glucose", label: "Glucose Trends", icon: <FaChartLine /> },
              { id: "activity", label: "Activity", icon: <FaChartBar /> },
              { id: "medication", label: "Medication", icon: <GiMedicinePills /> },
              { id: "reports", label: "Reports", icon: <TbCalendarStats /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-5 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-b-2 border-blue-500 text-blue-700"
                    : "text-gray-600 hover:text-blue-500"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area - Dynamic based on active tab */}
        {tabContent[activeTab]}

        {/* Additional Analytics Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
          {/* Health Insights Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FaChartPie className="mr-2 text-blue-500" /> Health Insights
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Average Glucose</span>
                <span className="font-semibold">124 mg/dL</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "70%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">Time in Range</span>
                <span className="font-semibold">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "78%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">A1C Estimate</span>
                <span className="font-semibold">6.2%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "62%" }}></div>
              </div>
            </div>
          </div>

          {/* Recent Events Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Recent Events</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-yellow-500 pl-3 py-1">
                <p className="font-semibold">High Glucose Alert</p>
                <p className="text-sm text-gray-600">Today, 2:30 PM - 182 mg/dL</p>
              </div>
              <div className="border-l-4 border-green-500 pl-3 py-1">
                <p className="font-semibold">Workout Completed</p>
                <p className="text-sm text-gray-600">Yesterday, 6:15 PM - 45 minutes</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-3 py-1">
                <p className="font-semibold">Medication Taken</p>
                <p className="text-sm text-gray-600">Yesterday, 8:00 AM - 500mg Metformin</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-3 py-1">
                <p className="font-semibold">Doctor Appointment</p>
                <p className="text-sm text-gray-600">Next Tuesday, 10:00 AM</p>
              </div>
            </div>
          </div>

          {/* Recommendations Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Personalized Recommendations</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <FaChartLine className="text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">Consider post-meal walks</p>
                  <p className="text-sm text-gray-600">
                    Walking for 15 minutes after meals can help reduce post-meal glucose spikes.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <GiMedicinePills className="text-green-500" />
                </div>
                <div>
                  <p className="font-medium">Medication adjustment</p>
                  <p className="text-sm text-gray-600">
                    Based on your morning readings, discuss adjusting your evening insulin with your doctor.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <FaCalendarAlt className="text-purple-500" />
                </div>
                <div>
                  <p className="font-medium">Schedule lab tests</p>
                  <p className="text-sm text-gray-600">
                    It's been 3 months since your last A1C test. Consider scheduling one soon.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </>
    )}
  </div>
</div>

)
}

export default Layout

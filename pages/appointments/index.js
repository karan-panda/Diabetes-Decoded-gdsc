import { FaCalendarAlt, FaVideo, FaUserMd, FaNotesMedical, FaClipboardList, FaBell } from 'react-icons/fa';
import { MdFitnessCenter, MdRestaurant, MdLocalHospital } from 'react-icons/md';

export default function Appointment() {
  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Meera Sharma',
      specialty: 'Endocrinologist',
      date: 'April 28, 2025',
      time: '10:30 AM',
      mode: 'Video Consultation',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
    },
    {
      id: 2,
      doctor: 'Dr. Anjali Rao',
      specialty: 'Nutritionist',
      date: 'May 2, 2025',
      time: '2:00 PM',
      mode: 'In-Person',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg'
    }
  ];

  const appointmentHistory = [
    {
      id: 1,
      specialist: 'Nutritionist: Anjali Rao',
      date: 'March 12, 2025',
      mode: 'In-Person',
      notes: 'Reviewed current diet plan and made adjustments for better glucose control.'
    },
    {
      id: 2,
      specialist: 'Fitness Coach: Karan Desai',
      date: 'Feb 25, 2025',
      mode: 'Virtual',
      notes: 'Created new exercise routine focusing on cardio and strength training.'
    },
    {
      id: 3,
      specialist: 'Endocrinologist: Dr. Meera Sharma',
      date: 'Jan 15, 2025',
      mode: 'Video Consultation',
      notes: 'Adjusted insulin dosage based on recent blood sugar readings.'
    }
  ];

  const specialists = [
    { name: 'Endocrinologist', icon: <MdLocalHospital className="text-blue-500 text-2xl" /> },
    { name: 'Nutritionist', icon: <MdRestaurant className="text-green-500 text-2xl" /> },
    { name: 'Fitness Coach', icon: <MdFitnessCenter className="text-purple-500 text-2xl" /> },
    { name: 'General Physician', icon: <FaUserMd className="text-red-500 text-2xl" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Appointments</h1>
            <p className="text-gray-600 mt-2">Manage your healthcare appointments and consultations</p>
          </div>
          <button className="mt-4 md:mt-0 flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition duration-300 shadow-md">
            <FaCalendarAlt className="mr-2" />
            Schedule New Appointment
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Upcoming Appointments */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <FaBell className="text-yellow-500 mr-2" />
                  Upcoming Appointments
                </h2>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {upcomingAppointments.length} Scheduled
                </span>
              </div>

              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition">
                    <div className="flex items-start">
                      <img 
                        src={appointment.avatar} 
                        alt={appointment.doctor} 
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-lg">{appointment.doctor}</h3>
                            <p className="text-gray-500 text-sm">{appointment.specialty}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            appointment.mode.includes('Video') ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {appointment.mode}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center text-gray-600">
                          <FaCalendarAlt className="mr-2 text-gray-400" />
                          <span>{appointment.date} | {appointment.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-3">
                      <button className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 py-2 rounded-lg transition">
                        Reschedule
                      </button>
                      <button className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 py-2 rounded-lg transition">
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule New Appointment */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <FaCalendarAlt className="text-blue-500 mr-2" />
                Schedule New Appointment
              </h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-gray-700 font-medium">Choose Specialist</label>
                  <div className="grid grid-cols-2 gap-3">
                    {specialists.map((specialist, index) => (
                      <button
                        key={index}
                        type="button"
                        className="border border-gray-200 rounded-lg p-3 flex flex-col items-center hover:border-blue-300 hover:bg-blue-50 transition"
                      >
                        {specialist.icon}
                        <span className="mt-2 text-sm">{specialist.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-gray-700 font-medium">Select Date</label>
                  <input 
                    type="date" 
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700 font-medium">Time</label>
                  <input 
                    type="time" 
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700 font-medium">Mode</label>
                  <select className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Video Consultation</option>
                    <option>In-Person</option>
                    <option>Phone Call</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-2 text-gray-700 font-medium">Reason for Visit</label>
                  <textarea 
                    rows={3}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Briefly describe the reason for your appointment"
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl transition duration-300 shadow-md flex items-center justify-center"
                  >
                    <FaCalendarAlt className="mr-2" />
                    Book Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - History and Tips */}
          <div className="space-y-6">
            {/* Appointment History */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <FaClipboardList className="text-green-500 mr-2" />
                Appointment History
              </h2>
              <div className="space-y-4">
                {appointmentHistory.map((appointment) => (
                  <div key={appointment.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{appointment.specialist}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {appointment.date} | {appointment.mode}
                        </p>
                      </div>
                      <button className="text-blue-500 hover:text-blue-700 flex items-center text-sm">
                        <FaNotesMedical className="mr-1" />
                        View Notes
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                      {appointment.notes}
                    </p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-center text-blue-500 hover:text-blue-700 text-sm font-medium">
                View All History
              </button>
            </div>

            {/* Health Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl shadow-md border border-blue-100">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FaNotesMedical className="text-purple-500 mr-2" />
                Pre-Appointment Preparation
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700">Keep your latest glucose readings and medication list ready</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700">Note down any symptoms or questions you have</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700">Have your fitness tracker data or food logs available</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700">Test your audio/video 10 minutes before virtual appointments</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700">Bring your insurance card and ID for in-person visits</span>
                </li>
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-green-50 text-green-700 hover:bg-green-100 p-3 rounded-lg flex flex-col items-center transition">
                  <FaVideo className="text-xl mb-2" />
                  <span className="text-sm">Join Virtual Visit</span>
                </button>
                <button className="bg-purple-50 text-purple-700 hover:bg-purple-100 p-3 rounded-lg flex flex-col items-center transition">
                  <FaUserMd className="text-xl mb-2" />
                  <span className="text-sm">Find Doctors</span>
                </button>
                <button className="bg-blue-50 text-blue-700 hover:bg-blue-100 p-3 rounded-lg flex flex-col items-center transition">
                  <FaNotesMedical className="text-xl mb-2" />
                  <span className="text-sm">Medical Records</span>
                </button>
                <button className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100 p-3 rounded-lg flex flex-col items-center transition">
                  <MdFitnessCenter className="text-xl mb-2" />
                  <span className="text-sm">Fitness Plan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
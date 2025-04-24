import { FaChalkboardTeacher, FaVideo, FaSearch, FaComments, FaCalendarAlt, FaUserMd } from 'react-icons/fa';
import { GiHealthNormal, GiMedicines } from 'react-icons/gi';
import { MdHealthAndSafety, MdOutlineScience } from 'react-icons/md';

export default function ExpertHelp() {
  const specialists = [
    {
      id: 1,
      name: "Dr. Priya Patel",
      title: "Senior Endocrinologist",
      expertise: "Diabetes Management",
      experience: "15 years",
      available: "Today 2:00 PM",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      badge: "Top Expert"
    },
    {
      id: 2,
      name: "Dr. Rahul Sharma",
      title: "Nutrition Specialist",
      expertise: "Diabetic Diets",
      experience: "10 years",
      available: "Tomorrow 11:00 AM",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      badge: "New"
    },
    {
      id: 3,
      name: "Dr. Ananya Gupta",
      title: "Diabetes Educator",
      expertise: "Lifestyle Management",
      experience: "8 years",
      available: "Today 4:30 PM",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  const services = [
    {
      icon: <FaVideo className="text-blue-500 text-3xl" />,
      title: "Instant Video Consultation",
      description: "Connect immediately with available specialists for urgent concerns"
    },
    {
      icon: <FaCalendarAlt className="text-purple-500 text-3xl" />,
      title: "Scheduled Appointments",
      description: "Book in advance with preferred experts at your convenience"
    },
    {
      icon: <FaComments className="text-green-500 text-3xl" />,
      title: "Q&A Sessions",
      description: "Get answers to specific questions from multiple experts"
    },
    {
      icon: <FaChalkboardTeacher className="text-orange-500 text-3xl" />,
      title: "Educational Webinars",
      description: "Join live sessions on diabetes management topics"
    }
  ];

  const resources = [
    {
      icon: <GiHealthNormal className="text-red-400 text-2xl" />,
      title: "Personalized Care Plans",
      description: "Tailored strategies for your specific health needs"
    },
    {
      icon: <MdOutlineScience className="text-blue-400 text-2xl" />,
      title: "Latest Research Updates",
      description: "Evidence-based information on new treatments"
    },
    {
      icon: <GiMedicines className="text-green-400 text-2xl" />,
      title: "Medication Guides",
      description: "Detailed information about your prescriptions"
    },
    {
      icon: <MdHealthAndSafety className="text-purple-400 text-2xl" />,
      title: "Preventive Care",
      description: "Strategies to avoid diabetes complications"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Expert Diabetes Care
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with specialized healthcare professionals for personalized diabetes management and education
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl shadow-lg transition transform hover:-translate-y-1 flex items-center justify-center">
              <FaSearch className="mr-2" />
              Find an Expert
            </button>
            <button className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-xl shadow-md transition transform hover:-translate-y-1 flex items-center justify-center border border-blue-200">
              <FaVideo className="mr-2" />
              Immediate Help
            </button>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center">
            <MdHealthAndSafety className="mr-2 text-blue-500" />
            Our Expert Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-100">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Specialists */}
        <div className="mb-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaUserMd className="mr-2 text-purple-500" />
              Meet Our Specialists
            </h2>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              View All Specialists →
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specialists.map((specialist) => (
              <div key={specialist.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition transform hover:-translate-y-2">
                <div className="relative">
                  <div className="h-40 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                    <img 
                      src={specialist.avatar} 
                      alt={specialist.name} 
                      className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
                    />
                  </div>
                  {specialist.badge && (
                    <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                      specialist.badge === "Top Expert" 
                        ? "bg-yellow-100 text-yellow-800" 
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {specialist.badge}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">{specialist.name}</h3>
                  <p className="text-blue-600 font-medium">{specialist.title}</p>
                  <div className="my-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Specialty:</span>
                      <span className="font-medium">{specialist.expertise}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Experience:</span>
                      <span className="font-medium">{specialist.experience}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Next Available:</span>
                      <span className="font-medium text-green-600">{specialist.available}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm">
                      Book Now
                    </button>
                    <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg text-sm">
                      Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resources Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Comprehensive Diabetes Resources
          </h2>
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {resources.map((resource, index) => (
                <div 
                  key={index} 
                  className={`p-6 ${index !== resources.length - 1 ? 'border-b md:border-b-0 md:border-r border-gray-100' : ''}`}
                >
                  <div className="flex items-start">
                    <div className="bg-blue-50 p-3 rounded-full mr-4">
                      {resource.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{resource.title}</h3>
                      <p className="text-gray-600 text-sm">{resource.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-12">
          <h2 className="text-2xl font-bold mb-6">Patient Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "The nutritionist helped me completely transform my eating habits and my A1C is now in normal range!",
                name: "Rahul M.",
                result: "A1C reduced from 8.5 to 5.9"
              },
              {
                quote: "My endocrinologist adjusted my medication and I finally have stable glucose levels throughout the day.",
                name: "Priya K.",
                result: "80% fewer glucose spikes"
              },
              {
                quote: "The diabetes educator taught me how to manage my condition and I feel in control for the first time.",
                name: "Arjun S.",
                result: "Gained confidence in self-management"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
                <p className="italic mb-4">&quot;{testimonial.quote}&quot;</p>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-blue-100 text-sm">{testimonial.result}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl shadow-lg p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Take Control of Your Diabetes?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our specialists are here to provide the personalized care and support you need
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-10 py-4 rounded-xl text-lg font-semibold shadow-lg transition transform hover:scale-105">
            Connect With an Expert Today
          </button>
        </div>
      </div>
    </div>
  );
}
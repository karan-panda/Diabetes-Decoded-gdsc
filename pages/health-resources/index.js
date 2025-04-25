import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const HealthResourceCard = ({ title, description, imageUrl, link, logoAlt, category }) => {
  // Color classes based on category
  const getCategoryColorClass = (category) => {
    switch (category) {
      case 'government':
        return 'bg-blue-100 text-blue-700';
      case 'nonprofit':
        return 'bg-green-100 text-green-700';
      case 'research':
        return 'bg-purple-100 text-purple-700';
      case 'international':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl border-t-4 border-emerald-500">
      <div className="h-48 relative overflow-hidden">
        <Image 
          src={imageUrl} 
          alt={logoAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-emerald-700">{title}</h3>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColorClass(category)}`}>
            {category}
          </span>
        </div>
        <p className="text-gray-600 mb-4 h-24 overflow-hidden">{description}</p>
        <Link href={link} legacyBehavior>
          <a 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 w-full text-center"
          >
            Explore Resources
          </a>
        </Link>
      </div>
    </div>
  );
};

export default function HealthResources() {
  const resources = [
    {
      title: "American Heart Association",
      description: "Access diabetes management resources, heart-healthy recipes, and fitness tips specifically designed for people with diabetes to maintain cardiovascular health.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdMnrY17ntr4YRkuUlZBI1tUPEeM0Cx8YBcg&s",
      link: "https://www.heart.org/en/health-topics/diabetes/diabetes-tools--resources",
      logoAlt: "American Heart Association Logo",
      category: "nonprofit"
    },
    {
      title: "NIH National Institute of Diabetes",
      description: "Comprehensive information on diabetes prevention, management, treatment options, and research updates from the National Institutes of Health.",
      imageUrl: "https://cfigroup.com/wp-content/uploads/2017/02/nih-logo.png",
      link: "https://www.niddk.nih.gov/health-information/diabetes",
      logoAlt: "NIH NIDDK Logo",
      category: "government"
    },
    {
      title: "CDC Diabetes Resources",
      description: "Access prevention programs, statistics, management tools, and lifestyle change programs to reduce diabetes risk and improve outcomes.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/CDC_logo_2024.svg/1200px-CDC_logo_2024.svg.png",
      link: "https://www.cdc.gov/diabetes/index.html",
      logoAlt: "CDC Diabetes Logo",
      category: "government"
    },
    {
      title: "World Health Organization (WHO)",
      description: "Global standards and guidelines for diabetes care, prevention strategies, and resources for healthcare professionals and patients worldwide.",
      imageUrl: "https://cdn.who.int/media/images/default-source/infographics/who-emblem.png?sfvrsn=877bb56a_2",
      link: "https://www.who.int/health-topics/diabetes",
      logoAlt: "WHO Logo",
      category: "international"
    },
    {
      title: "Ministry of Health and Family Welfare",
      description: "India's national health programs for diabetes prevention and control, including care guidelines and resources for healthcare providers and patients.",
      imageUrl: "https://www.ngoregistration.org/wp-content/uploads/2014/07/ministry-and-health-family-welfare.png",
      link: "https://mohfw.gov.in/",
      logoAlt: "Ministry of Health and Family Welfare Logo",
      category: "government"
    },
    {
      title: "UNICEF Health Resources",
      description: "Resources for maternal and child health, nutrition, and childhood diabetes prevention that promote healthy development and lifestyle habits.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0quvzuFtddQYtTnJhO8TznGkSc9OtLJVbXg&s",
      link: "https://www.unicef.org/health/resources",
      logoAlt: "UNICEF Logo",
      category: "international"
    },
    {
      title: "International Diabetes Federation",
      description: "Global advocate for diabetes awareness, prevention, and care, offering resources, education, and supporting over 230 diabetes associations worldwide.",
      imageUrl: "https://i.ytimg.com/vi/KT-xaVI4N-8/mqdefault.jpg",
      link: "https://idf.org/",
      logoAlt: "IDF Logo",
      category: "international"
    },
    {
      title: "American Diabetes Association",
      description: "Comprehensive diabetes management tools, food and fitness resources, and the latest research to help people with diabetes lead healthy lives.",
      imageUrl: "https://1000logos.net/wp-content/uploads/2021/04/ADA-logo.png",
      link: "https://diabetes.org/",
      logoAlt: "American Diabetes Association Logo",
      category: "nonprofit"
    },
    {
      title: "NIH Healthy Living with Diabetes",
      description: "Practical guidance for day-to-day diabetes management, including diet, physical activity, and coping strategies to maintain quality of life.",
      imageUrl: "https://cfigroup.com/wp-content/uploads/2017/02/nih-logo.png",
      link: "https://www.niddk.nih.gov/health-information/diabetes/overview/healthy-living-with-diabetes",
      logoAlt: "NIH Healthy Living Logo",
      category: "government"
    }
  ];

  // Resource categories for filtering
  const categories = [
    { name: 'all', label: 'All Resources' },
    { name: 'government', label: 'Government' },
    { name: 'nonprofit', label: 'Non-Profit' },
    { name: 'international', label: 'International' },
    { name: 'research', label: 'Research' }
  ];

  const [activeFilter, setActiveFilter] = React.useState('all');
  const [filteredResources, setFilteredResources] = React.useState(resources);

  React.useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredResources(resources);
    } else {
      setFilteredResources(resources.filter(resource => resource.category === activeFilter));
    }
  }, [activeFilter]);

  return (
    <div className="bg-gradient-to-b from-emerald-50 to-white min-h-screen">
      <Head>
        <title>Diabetes Health Resources | Diabetes Decoded</title>
        <meta name="description" content="Access trusted health resources for diabetes care, prevention, and management" />
      </Head>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-emerald-800 mb-3">Diabetes Health Resources</h1>
          <div className="w-24 h-1 bg-emerald-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Access reliable information from trusted health organizations to help manage and understand diabetes better. These resources provide valuable guidance for prevention, treatment, and living well with diabetes.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveFilter(category.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === category.name
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource, index) => (
            <HealthResourceCard 
              key={index}
              title={resource.title}
              description={resource.description}
              imageUrl={resource.imageUrl}
              link={resource.link}
              logoAlt={resource.logoAlt}
              category={resource.category}
            />
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No resources found for this category.</p>
            <button 
              onClick={() => setActiveFilter('all')} 
              className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium"
            >
              View all resources
            </button>
          </div>
        )}

        <div className="mt-16 bg-white p-8 rounded-lg shadow-md border-l-4 border-emerald-500">
          <h2 className="text-2xl font-bold text-emerald-700 mb-4">Why These Resources Matter</h2>
          <p className="mb-4">
            Managing diabetes effectively requires reliable, evidence-based information. The resources listed above are from trusted organizations dedicated to improving diabetes care and outcomes.
          </p>
          <p className="mb-4">
            Regular visits to these resources can help you stay updated on the latest diabetes research, treatment options, and self-management techniques.
          </p>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg border-t-2 border-blue-400">
              <h3 className="font-semibold text-blue-700 mb-2">Prevention Strategies</h3>
              <p className="text-sm text-gray-600">Find evidence-based approaches to prevent or delay type 2 diabetes through lifestyle modifications and early intervention.</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border-t-2 border-purple-400">
              <h3 className="font-semibold text-purple-700 mb-2">Management Tools</h3>
              <p className="text-sm text-gray-600">Access tools for blood glucose monitoring, medication management, and understanding diabetes complications.</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg border-t-2 border-amber-400">
              <h3 className="font-semibold text-amber-700 mb-2">Lifestyle Resources</h3>
              <p className="text-sm text-gray-600">Discover diet plans, exercise guidelines, and mental health support specifically designed for people with diabetes.</p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded">
            <p className="text-emerald-700 font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Always consult with your healthcare provider before making significant changes to your diabetes management plan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
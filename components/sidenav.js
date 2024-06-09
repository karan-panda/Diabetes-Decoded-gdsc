import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoMdHome, IoIosMenu, IoMdFitness } from "react-icons/io";
import { FaChartLine, FaRunning } from "react-icons/fa";
import { GiFruitBowl, GiWeightLiftingUp } from "react-icons/gi";
import { MdOutlineBloodtype } from "react-icons/md";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { useMediaQuery } from 'react-responsive';

const SideNav = () => {
  const router = useRouter();
  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });
  const [collapsed, setCollapsed] = useState(isSmallScreen);
  useEffect(() => {
    setCollapsed(isSmallScreen);
  }, [isSmallScreen]);

  const navItems = [
    {
      href: '/home',
      title: 'Home',
      icon: <IoMdHome className="text-2xl" />,
    },
    {
      href: '/analysis',
      title: 'Analysis',
      icon: <FaChartLine className="text-2xl" />,
    },
    {
      href: '/diet-plan',
      title: 'Diet and Nutrition',
      icon: <GiFruitBowl className="text-2xl" />,
    },
    {
      href: '/exercise-plan',
      title: 'Exercise',
      icon: <GiWeightLiftingUp className="text-2xl" />,
    },
    {
      href: '/testing',
      title: 'Testing',
      icon: <MdOutlineBloodtype className="text-2xl" />,
    },
  ];

  const handleNavigation = (href) => {
    router.push(href);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const handleSettings = () => {
    console.log('Going to settings...');
  };

  return (
    <nav className={`bg-gray-200 text-black transition-all duration-500 ease-in-out ${collapsed ? 'w-20' : 'w-64'} h-screen relative items-center`}>
      <div className="flex justify-between items-center h-20 px-4">
        <h1 className={`${collapsed ? 'hidden' : 'block'} text-2xl font-bold`}>Dashboard</h1>
        <IoIosMenu className="text-2xl cursor-pointer" onClick={() => setCollapsed(!collapsed)} />
      </div>
      <ul>
        {navItems.map(({ href, title, icon }) => (
          <li key={title} className={`flex space-x-2 p-4 ${router.pathname.includes(href) ? 'bg-rose-900 text-white font-bold' : 'hover:bg-rose-900 hover:text-white'} `} onClick={() => handleNavigation(href)}>
            <div className="flex items-center space-x-2">
              {icon}
            </div>
            <div className={`${collapsed ? 'hidden' : 'block'}`}>{title}</div>
          </li>
        ))}
      </ul>
      {/* Logout and Settings */}
      <ul className="absolute bottom-0 left-0 right-0">
        <li className={`p-4 ${router.pathname.includes('settings') ? 'bg-rose-900 text-white font-bold' : 'hover:bg-rose-900 hover:text-white'}`} onClick={handleSettings}>
          <div className="flex items-center space-x-2">
            <FiSettings className="text-2xl" />
            <Link href="/settings"><span className={`${collapsed ? 'hidden' : 'block'}`}>Settings</span></Link>
          </div>
        </li>
        <li className="p-4 hover:bg-rose-900 hover:text-white" onClick={handleLogout}>
          <div className="flex items-center space-x-2">
            <FiLogOut className="text-2xl" />
            <Link href="/login"><span className={`${collapsed ? 'hidden' : 'block'}`}>Logout</span></Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;

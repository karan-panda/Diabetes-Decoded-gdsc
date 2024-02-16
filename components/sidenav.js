import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoMdHome } from "react-icons/io";
import { FaChartLine } from "react-icons/fa";
import { MdOutlineBloodtype } from "react-icons/md";
import { FiLogOut, FiSettings } from "react-icons/fi";


const SideNav = () => {
  const router = useRouter();

  const navItems = [
    {
      href: '/dashboard',
      title: 'Dashboard',
      icon: <IoMdHome className="text-2xl" />, // Increase icon size
    },
    {
      href: 'analysis',
      title: 'Analysis',
      icon: <FaChartLine className="text-2xl" />, // Increase icon size
    },
    {
      href: 'testing',
      title: 'Testing',
      icon: <MdOutlineBloodtype className="text-2xl" />, // Increase icon size
    },
  ];

  const handleNavigation = (href) => {
    router.push(href);
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
  };

  const handleSettings = () => {
    // Handle settings logic here
    console.log('Going to settings...');
  };

  return (
    <nav className="bg-gray-200 text-black w-64 h-screen relative items-center">
      <div className="flex justify-center items-center h-20">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <ul>
        {navItems.map(({ href, title, icon }) => (
          <li key={title} className={`p-4 hover:bg-rose-900 hover:text-white ${router.pathname === href ? 'font-bold' : ''}`} onClick={() => handleNavigation(href)}>
            <div className="flex items-center space-x-2">
              {icon}
            </div>
          </li>
        ))}
      </ul>
      {/* Logout and Settings */}
      <ul className="absolute bottom-0 left-0 right-0">
        <li className="p-4 hover:bg-rose-900 hover:text-white" onClick={handleSettings}>
          <div className="flex items-center space-x-2">
            <FiSettings className="text-2xl" /> {/* Increase icon size */}
            <span>Settings</span>
          </div>
        </li>
        <li className="p-4 hover:bg-rose-900 hover:text-white" onClick={handleLogout}>
          <div className="flex items-center space-x-2">
            <FiLogOut className="text-2xl" /> {/* Increase icon size */}
            <span>Logout</span>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;

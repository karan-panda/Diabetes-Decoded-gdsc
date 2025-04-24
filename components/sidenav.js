"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { IoMdHome, IoIosMenu } from "react-icons/io"
import { FaChartLine, FaUserMd, FaCalendarCheck, FaQuestionCircle, FaHeadset } from "react-icons/fa"
import { GiFruitBowl, GiWeightLiftingUp } from "react-icons/gi"
import { MdOutlineBloodtype, MdHealthAndSafety } from "react-icons/md"
import { FiLogOut, FiSettings } from "react-icons/fi"
import { useMediaQuery } from "react-responsive"

const SideNav = ({ onToggleCollapse }) => {
  const router = useRouter()
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" })
  const [collapsed, setCollapsed] = useState(isSmallScreen)

  useEffect(() => {
    setCollapsed(isSmallScreen)
    if (onToggleCollapse) {
      onToggleCollapse(isSmallScreen)
    }
  }, [isSmallScreen, onToggleCollapse])

  const navItems = [
    {
      href: "/home",
      title: "Home",
      icon: <IoMdHome className="text-2xl" />,
    },
    {
      href: "/analysis",
      title: "Analysis",
      icon: <FaChartLine className="text-2xl" />,
    },
    {
      href: "/diet-plan",
      title: "Diet and Nutrition",
      icon: <GiFruitBowl className="text-2xl" />,
    },
    {
      href: "/exercise-plan",
      title: "Exercise",
      icon: <GiWeightLiftingUp className="text-2xl" />,
    },
    {
      href: "/test-diabetes",
      title: "Testing",
      icon: <MdOutlineBloodtype className="text-2xl" />,
    },
    {
      href: "/expert-help",
      title: "Expert Help",
      icon: <FaUserMd className="text-2xl" />,
    },
    {
      href: "/appointments",
      title: "Appointments",
      icon: <FaCalendarCheck className="text-2xl" />,
    },
    {
      href: "/health-resources",
      title: "Resources",
      icon: <MdHealthAndSafety className="text-2xl" />,
    },
    {
      href: "/support",
      title: "Support",
      icon: <FaHeadset className="text-2xl" />,
    },
  ]

  const handleNavigation = (href) => {
    router.push(href)
  }

  const handleLogout = () => {
    console.log("Logging out...")
    router.push("/login")
  }

  const handleSettings = () => {
    console.log("Going to settings...")
    router.push("/settings")
  }

  const toggleSidebar = () => {
    const newState = !collapsed
    setCollapsed(newState)
    if (onToggleCollapse) {
      onToggleCollapse(newState)
    }
  }

  return (
    <nav
      className={`bg-gray-100 text-gray-800 transition-all duration-300 ease-in-out h-screen fixed ${collapsed ? "w-20" : "w-64"} shadow-md z-50`}
    >
      <div className="flex justify-between items-center h-16 px-4 bg-rose-800 text-white">
        <h1 className={`${collapsed ? "hidden" : "block"} text-xl font-bold transition-opacity duration-300`}>
          Diabetes Decoded
        </h1>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-rose-700 transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <IoIosMenu className="text-2xl" />
        </button>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-64px)]">
        <div className="py-2">
          {navItems.map(({ href, title, icon }) => (
            <button
              key={title}
              className={`flex items-center w-full px-4 py-3 transition-colors ${
                router.pathname.includes(href)
                  ? "bg-rose-700 text-white font-medium"
                  : "text-gray-700 hover:bg-rose-100"
              }`}
              onClick={() => handleNavigation(href)}
            >
              <div className="flex items-center">
                <div className={`${collapsed ? "mx-auto" : "mr-3"}`}>{icon}</div>
                <span className={`${collapsed ? "hidden" : "block"} transition-opacity duration-300`}>{title}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-2"></div>

        {/* Bottom Actions */}
        <div className="py-2">
          <button
            className={`flex items-center w-full px-4 py-3 transition-colors ${
              router.pathname.includes("/settings")
                ? "bg-rose-700 text-white font-medium"
                : "text-gray-700 hover:bg-rose-100"
            }`}
            onClick={handleSettings}
          >
            <div className="flex items-center">
              <div className={`${collapsed ? "mx-auto" : "mr-3"}`}>
                <FiSettings className="text-2xl" />
              </div>
              <span className={`${collapsed ? "hidden" : "block"} transition-opacity duration-300`}>Settings</span>
            </div>
          </button>

          <button
            className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-rose-100 transition-colors"
            onClick={handleLogout}
          >
            <div className="flex items-center">
              <div className={`${collapsed ? "mx-auto" : "mr-3"}`}>
                <FiLogOut className="text-2xl" />
              </div>
              <span className={`${collapsed ? "hidden" : "block"} transition-opacity duration-300`}>Logout</span>
            </div>
          </button>
        </div>

        {/* Help Section */}
        {!collapsed && (
          <div className="p-4 m-4 bg-blue-50 rounded-lg">
            <div className="flex items-center mb-2">
              <FaQuestionCircle className="text-blue-500 mr-2" />
              <h3 className="font-medium text-blue-700">Need Help?</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">Have questions about using the app?</p>
            <button className="w-full bg-blue-500 text-white text-sm py-1 px-2 rounded hover:bg-blue-600 transition-colors">
              View Tutorial
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default SideNav


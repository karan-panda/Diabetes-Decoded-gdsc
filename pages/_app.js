import { useState } from "react";
import "@/styles/globals.css";
import 'regenerator-runtime/runtime';
import '../components/Calendar.css';

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/next';

import Sidenav from "../components/sidenav";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const hideSidebarRoutes = ['/login', '/'];
  const hideSidebar = hideSidebarRoutes.includes(router.pathname);

  return (
    <>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        {!hideSidebar && (
          <div className="fixed z-50">
            <Sidenav onToggleCollapse={setIsSidebarCollapsed} />
          </div>
        )}

        <div
          className={`
            transition-all duration-300 flex-1 overflow-y-auto
            ${!hideSidebar ? (isSidebarCollapsed ? "ml-20" : "ml-64") : ""}
          `}
        >
          <Component {...pageProps} />
        </div>
      </div>

      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default MyApp;

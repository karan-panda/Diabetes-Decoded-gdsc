import ExercisePlan from "../../components/ExercisePlan";
import React from 'react';
import SideNav from "../../components/sidenav";
import ChatBot from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidenav */}
      <ChatBot></ChatBot>
      <div className="w-1/4">
        <SideNav />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-scroll bg-gray-50">
        <ExercisePlan />
      </div>
    </div>
  )
}

export default Index;

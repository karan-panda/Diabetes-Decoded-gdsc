import React from 'react';
import Sidenav from '../../components/sidenav';
import Graph from '../../components/LineGraph';
import ChatBot from '../../components/Chatbot'; // Import the AlanAssistant component

const Layout = () => {
  return (
    <div className="flex bg-white">
      <ChatBot /> 
      <Sidenav />
      <div className='p-4 '>
        <Graph /> 
        
      </div>
    </div>
  );
};

export default Layout;

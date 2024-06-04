import React from 'react';
import Sidenav from '../../components/sidenav';
import Graph from '../../components/LineGraph';
import AlanAssistant from '../../components/Chatbot'; // Import the AlanAssistant component

const Layout = () => {
  return (
    <div className="flex bg-white">
      <AlanAssistant /> 
      <Sidenav />
      <div className='p-4 '>
        <Graph /> 
        
      </div>
    </div>
  );
};

export default Layout;

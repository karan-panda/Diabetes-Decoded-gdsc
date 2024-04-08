import React from 'react';
import Sidenav from '../../components/sidenav';
import Graph from '../../components/graph';
import AlanAssistant from '../../components/Chatbot'; // Import the AlanAssistant component

const Layout = () => {
  return (
    <div className="flex bg-white">
      <AlanAssistant /> {/* Render the AlanAssistant component */}
      <Sidenav />
      <div className=''>
        <Graph /> 
      </div>
    </div>
  );
};

export default Layout;

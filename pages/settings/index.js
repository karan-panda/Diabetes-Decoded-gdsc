import React from 'react';
import Sidenav from '../../components/sidenav';
import ProfileSettings from '../../components/ProfileSettings'; // corrected import path

export default function Layout() {
  return (
    <div className="flex bg-white">
      <Sidenav />
      <div className='flex flex-col w-full'>
        
        <ProfileSettings/> {/* Rendering ProfileSettings component */}
      </div>
    </div>
  );
}

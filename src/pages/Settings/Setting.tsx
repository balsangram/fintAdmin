import React, { useState } from 'react';
import Profile from '../Profile/Profile';
import Security from './Security';

import { CgProfile } from "react-icons/cg";
import { MdOutlineSecurity } from "react-icons/md";

function Setting() {
  const [activeTab, setActiveTab] = useState('profile'); // Default tab

  return (
    <div className=" max-w-6xl flex gap-1 ">
      {/* Sidebar Navigation */}
      <div className=" bg-white  sm:p-4">
        <ul className="space-y-4 mt-[2rem] w-min-[3rem] sm:min-w-[8rem]">
          <li
            onClick={() => setActiveTab('profile')}
            className={`cursor-pointer px-3 py-2 rounded-md transition flex gap-2 items-center border bottom-1 ${
              activeTab === 'profile'
                ? 'bg-[#0E0955] text-white font-semibold'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <CgProfile />
            <span className='sm:block hidden'>
            My Profile
            </span>
          </li>
          <li
            onClick={() => setActiveTab('security')}
            className={`cursor-pointer px-3 py-2 rounded-md transition  flex gap-2 items-center border bottom-1 ${
              activeTab === 'security'
                ? 'bg-[#0E0955] text-white font-semibold'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <MdOutlineSecurity />
            <span className='sm:block hidden'>
            Security
            </span>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className=" bg-gray-50 sm:p-6 w-full">
        {activeTab === 'profile' && <Profile />}
        {activeTab === 'security' && <Security />}
      </div>
    </div>
  );
}

export default Setting;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Security() {
  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState('bal@gmail.com');
  const [inputEmail, setInputEmail] = useState(email);
  const [error, setError] = useState('');
const Navigate = useNavigate();
  const existingEmails = ['admin@gmail.com', 'userr@gmail.com', 'bal@gmail.com']; // simulate DB

  const handleSave = () => {
    if (inputEmail.trim() === '') {
      setError('❌ Email cannot be empty');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail)) {
      setError('❌ Please enter a valid email address');
    } else if (existingEmails.includes(inputEmail) && inputEmail !== email) {
      setError('❌ This email already exists');
    } else {
      setEmail(inputEmail);
      setEditMode(false);
      setError('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-serif text-gray-800 mb-8 border-b-2 border-gray-300 pb-2">
          Account Security
        </h1>

  

        {/* Email Section */}
        <div className="bg-white border border-gray-300 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-lg font-serif text-gray-800">Email Address</h2>
              <p className="text-sm text-gray-600 mt-1">
                The email address associated with your account.
              </p>
              {!editMode && (
                <div className="mt-3 flex items-center flex-wrap gap-2">
                  {/* <span className="text-sm font-serif text-gray-700">{email}</span> */}
                    {/* <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-serif bg-red-100 text-red-800">
                      Unverified
                    </span> */}
                </div>
              )}
            </div>

            {editMode ? (
              <div className="w-full md:w-auto">
                <div className="flex flex-col gap-3">
                  <input
                    type="email"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 text-sm font-serif focus:outline-none focus:border-black"
                    placeholder="Enter your email"
                  />
                  {error && <p className="text-red-600 text-sm font-serif">{error}</p>}
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="bg-black text-white px-4 py-2 text-sm font-serif hover:bg-gray-800 focus:outline-none"
                    >
                      Save changes
                    </button>
                    <button
                      onClick={() => {
                        setEditMode(false);
                        setInputEmail(email);
                        setError('');
                      }}
                      className="bg-white border border-gray-300 text-gray-800 px-4 py-2 text-sm font-serif hover:bg-gray-100 focus:outline-none"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // <button
              //   onClick={() => setEditMode(true)}
              //   className="bg-black text-white px-4 py-2 text-sm font-serif hover:bg-gray-800 focus:outline-none"
              // >
              //   Change email
              // </button>
              <>
               <span className="text-sm font-serif text-gray-700">{email}</span></>
            )}
          </div>
        </div>

        {/* Password Section */}
        <div className="bg-white border border-gray-300 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-lg font-serif text-gray-800">Password</h2>
              <p className="text-sm text-gray-600 mt-1">
                Set a unique password to protect your account.
              </p>
              <p className="text-xs text-gray-500 mt-2">Last changed 3 months ago</p>
            </div>
            <button
              className="bg-black text-white px-4 py-2 text-sm font-serif hover:bg-gray-800 focus:outline-none"
              onClick={()=>{
                Navigate('/change-password')
              }}
            >
              Change password
            </button>
          </div>
        </div>

        {/* 2-Step Verification */}
        <div className="bg-white border border-gray-300 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-lg font-serif text-gray-800">Two-factor authentication (2FA)</h2>
              <p className="text-sm text-gray-600 mt-1">
                Add an extra layer of security to your account. You'll need to enter a code from
                your authenticator app when signing in.
              </p>
            </div>
            <div className="flex items-center">
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                <span className="ml-3 text-sm font-serif text-gray-700">Enable 2FA</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Security;
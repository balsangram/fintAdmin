import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { resetPasswordAdmin } from '../../api/all.api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Password() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError('');
    setSuccess('');

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('❌ All fields are required');
      // setError('❌ All fields are required');
      return;
    }

    if (newPassword.length < 8) {
      // setError('❌ New password must be at least 8 characters long');
       toast.error('❌ New password must be at least 8 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      // setError('❌ New password and confirm password do not match');
        toast.error('❌ New password and confirm password do not match');
      return;
    }

    // try {
    const response = await resetPasswordAdmin({
      oldPassword,
      newPassword,
    });

    console.log("✅ Password changed:", response);
     toast.success('✅ Password changed successfully');
    // setSuccess('✅ Password changed successfully');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => {
      setSuccess('');
      navigate("/setting");
    }, 3000);


    // } catch (err: any) {
    //   console.error("❌ Password change failed:", err);
    //   setError(err.message || '❌ Something went wrong');
    // }
  };


  return (
    <div className="min-h-[70h] bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-serif text-gray-800 mb-8 border-b-2 border-gray-300 pb-2">
          Change Password
        </h1>

        <div className="bg-white border border-gray-300 p-6">
          <div className="flex flex-col gap-6">
            <div>
              <label
                htmlFor="oldPassword"
                className="block text-sm font-serif text-gray-700 mb-1"
              >
                Old Password
              </label>
              <div className="relative">
                <input
                  id="oldPassword"
                  type={showOldPassword ? 'text' : 'password'}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 text-sm font-serif focus:outline-none focus:border-black"
                  placeholder="Enter your old password"
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
                  aria-label={showOldPassword ? 'Hide password' : 'Show password'}
                >
                  {showOldPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-serif text-gray-700 mb-1"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 text-sm font-serif focus:outline-none focus:border-black"
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
                  aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                >
                  {showNewPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-serif text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 text-sm font-serif focus:outline-none focus:border-black"
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-600 text-sm font-serif">{error}</p>}
            {success && <p className="text-green-600 text-sm font-serif">{success}</p>}

            <div className="flex gap-4">
              <button
                onClick={handleSubmit}
                className="bg-black text-white px-4 py-2 text-sm font-serif hover:bg-gray-800 focus:outline-none"
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setOldPassword('');
                  setNewPassword('');
                  setConfirmPassword('');
                  setError('');
                  setSuccess('');
                }}
                className="bg-white border border-gray-300 text-gray-800 px-4 py-2 text-sm font-serif hover:bg-gray-100 focus:outline-none"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Password;
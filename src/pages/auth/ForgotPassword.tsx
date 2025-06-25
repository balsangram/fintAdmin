import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const ForgotPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [showPassword, setShowPassword] = useState<{
    new: boolean;
    confirm: boolean;
  }>({
    new: false,
    confirm: false,
  });

  const togglePassword = (field: 'new' | 'confirm') => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = () => {
    setError('');
    setSuccess('');

    if (!newPassword || !confirmPassword) {
      return setError('❌ Both fields are required');
    }

    if (newPassword.length < 8) {
      return setError('❌ New password must be at least 8 characters long');
    }

    if (newPassword !== confirmPassword) {
      return setError('❌ New password and confirm password do not match');
    }

    // ✅ TODO: Integrate with API to submit new password
    setSuccess('✅ Password changed successfully');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleClear = () => {
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
  };

  return (
    <div className="min-h-[70vh] bg-gray-100 p-6 absolute w-full h-full top-0 left-0 z-50 flex justify-center pt-[20vh] ">
      <div className="max-w-xl mx-auto">
        <h1 className="text-center sm:text-left text-3xl font-serif text-gray-800 mb-6 border-b pb-2">
          Reset Password
        </h1>

        <div className="bg-white border border-gray-300 p-6 rounded-md shadow min-w-[95vw] sm:min-w-[25rem]">
          <div className="flex flex-col gap-6">
            {/* New Password */}
            <div>
              <label htmlFor="newPassword" className=" block text-sm font-serif text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showPassword.new ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 text-sm font-serif focus:outline-none focus:border-black"
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  onClick={() => togglePassword('new')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
                  aria-label="Toggle new password visibility"
                >
                  {showPassword.new ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-serif text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showPassword.confirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 text-sm font-serif focus:outline-none focus:border-black"
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  onClick={() => togglePassword('confirm')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
                  aria-label="Toggle confirm password visibility"
                >
                  {showPassword.confirm ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
                </button>
              </div>
            </div>

            {/* Feedback */}
            {error && <p className="text-red-600 text-sm font-serif">{error}</p>}
            {success && <p className="text-green-600 text-sm font-serif">{success}</p>}

            {/* Buttons */}
            <div className="flex gap-4 justify-between">
              <button
                onClick={handleSubmit}
                className="bg-black text-white px-4 py-2 text-sm font-serif hover:bg-gray-800 focus:outline-none"
              >
                Submit
              </button>
              <button
                onClick={handleClear}
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
};

export default ForgotPassword;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import img from '../../../public/assets/fintImg/logo/fint.jpg';
import logoText from '../../../public/assets/fintImg/logo/logoText.jpg';
import { setLogin } from '../../store/authSlice';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = () => {
    setError('');

    if (!email || !password) {
      setError('❌ All fields are required');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('❌ Please enter a valid email address');
      return;
    }

    if (password.length < 5) {
      setError('❌ Password must be at least 5 characters long');
      return;
    }

    // Simulate login
    const fakeToken = 'faketoken123';
    const fakeUser = { email };

    localStorage.setItem('token', fakeToken);
    localStorage.setItem('user', JSON.stringify(fakeUser));
    dispatch(setLogin({ token: fakeToken, user: fakeUser }));

    toast.success('Sign-in successful');

    setTimeout(() => {
      Navigate('/');
    }, 2000);
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col md:flex-row h-screen w-screen absolute top-0 left-0 z-50">
        {/* Left Image */}
        <div className="hidden md:flex flex-col w-1/2 h-screen bg-[#010101] items-center justify-center">
          <img src={img} alt="Fint Logo" className="max-h-[20rem]" onError={(e) => (e.currentTarget.src = '/fallback-logo.png')} />
          <img src={logoText} alt="Logo Text" className="max-h-[10rem]" onError={(e) => (e.currentTarget.src = '/fallback-logo.png')} />
        </div>

        {/* Login Form */}
        <div className="w-full h-full md:w-1/2 flex items-center justify-center bg-gray-100">
          <div className="max-w-md w-full p-6 bg-white rounded-2xl shadow">
            <h1 className="text-3xl font-serif text-gray-800 mb-4">Login</h1>
            <p className="text-sm font-serif text-gray-600 mb-6">Welcome back! Please log in to your account.</p>

            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-serif text-gray-700 mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-serif focus:outline-none focus:border-black"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-serif text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-serif focus:outline-none focus:border-black"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && <p className="text-red-600 text-sm font-serif">{error}</p>}

              <button
                onClick={handleSignIn}
                className="w-full bg-black text-white px-4 py-2 rounded-md text-sm font-serif hover:bg-gray-800"
              >
                Sign In
              </button>

              <Link to="/forgot-password" className="text-sm font-serif text-gray-600 hover:text-black text-center">
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;

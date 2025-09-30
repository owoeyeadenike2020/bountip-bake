'use client';
import React, { useState } from 'react';
import InputField from '../../UI/inputField/InputField';
import Image from 'next/image';
import { FaRegEnvelope } from 'react-icons/fa';
import { TbLockPassword } from 'react-icons/tb';



// Main Login Page Component
export default function LoginPage() {
  const [email, setEmail] = useState('youremail@gmail.com');
  const [password, setPassword] = useState('**************');
  const [rememberMe, setRememberMe] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log('Login submitted:', { email, password, rememberMe });
    // Add your login logic here
  };

  return (
    <div className='h-screen'>
    <div className="flex flex-col lg:flex-row">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative h-screen">
        <Image
          src="/images/bakery/loginbg.jpg"
          alt="Bakery display"
          className="w-auto h-auto object-cover"
          width={800}
        height={400}
        />
        {/* <div className="absolute inset-0 bg-black bg-opacity-20"></div> */}
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 w-1/2 lg:w-1/2 flex items-center justify-center p-6 bg-white ">
        <div className="w-full h-full max-w-lg">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Hello
            </h1>
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4">
              Welcome Back!
            </h2>
            <p className="text-gray-500 text-lg">
              Hello, continue your amazing Journey with us!
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <InputField
              type="email"
              label="Email Address"
              icon={FaRegEnvelope}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="youremail@gmail.com"
            />

            {/* Password Input */}
            <InputField
              type="password"
              label="Password"
              icon={TbLockPassword}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              showPasswordToggle={true}
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mb-8">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-5 h-5 text-green-500 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="ml-2 text-green-600 font-medium">Remember me</span>
              </label>
              <a href="#" className="text-green-600 font-medium hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-lg transition-colors duration-200 mb-8"
            >
              Sign Up to Bountip
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-gray-600 mt-16">
              Don&apos;t have an account?{' '}
              <a href="#" className="text-green-600 font-semibold hover:underline">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}

// Export the InputField component for reuse
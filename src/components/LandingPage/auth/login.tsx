// 'use client';
// import React, { useState } from 'react';
// import InputField from '../../UI/inputField/InputField';
// import Image from 'next/image';
// import { FaRegEnvelope } from 'react-icons/fa';
// import { TbLockPassword } from 'react-icons/tb';
// import { FaUser } from 'react-icons/fa6';



// // Main Login Page Component
// export default function LoginPage() {
//   const [email, setEmail] = useState('youremail@gmail.com');
//   const [password, setPassword] = useState('**************');
//   const [rememberMe, setRememberMe] = useState(true);

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const handleSubmit = (e:any) => {
//     e.preventDefault();
//     console.log('Login submitted:', { email, password,rememberMe });
//     // Add your login logic here
//   };

//   return (
//     <div className='h-screen'>
//     <div className="flex flex-col lg:flex-row">
//       {/* Left Side - Image */}
//       <div className="hidden lg:block lg:w-1/2 relative h-screen">
//         <Image
//           src="/images/bakery/loginbg2.jpg"
//           alt="Bakery display"
//           className="w-auto h-auto object-cover"
//           width={800}
//         height={400}
//         />
//         {/* <div className="absolute inset-0 bg-black bg-opacity-20"></div> */}
//       </div>

//       {/* Right Side - Login Form */}
//       <div className="flex-1 w-1/2 lg:w-1/2 flex items-center justify-center p-6 bg-white ">
//         <div className="w-full h-full max-w-lg">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
//               Hello
//             </h1>
//             <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4">
//               Welcome <span className='text-green-600'>Back!</span >
//             </h2>
//             <p className="text-gray-500 text-lg">
//               Hello, continue your amazing Journey with us!
//             </p>
//           </div>

//           {/* Login Form */}
//           <form onSubmit={handleSubmit}>
//             {/* Email Input */}
//             <InputField
//               type="email"
//               label="Email Address"
//               icon={FaRegEnvelope}
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="youremail@gmail.com"
//             />

//             {/* Password Input */}
//             <InputField
//               type="password"
//               label="Password"
//               icon={TbLockPassword}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               showPasswordToggle={true}
//             />

//             {/* Remember Me & Forgot Password */}
//             <div className="flex items-center justify-between mb-8">
//               <label className="flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                   className="w-5 h-5 text-green-500 border-gray-300 rounded focus:ring-green-500"
//                 />
//                 <span className="ml-2 text-green-600 font-medium">Remember me</span>
//               </label>
//               <a href="#" className="text-green-600 font-medium hover:underline">
//                 Forgot Password?
//               </a>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-lg transition-colors duration-200 mb-8"
//             >
//               Sign Up to Bountip
//             </button>

//             {/* Sign Up Link */}
//             <p className="text-center text-gray-600 mt-16">
//               Don&apos;t have an account?{' '}
//               <a href="#" className="text-green-600 font-semibold hover:underline">
//                 Sign up
//               </a>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }

// // Export the InputField component for reuse





'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '../../UI/inputField/InputField';
import Image from 'next/image';
import { FaRegEnvelope } from 'react-icons/fa';
import { TbLockPassword } from 'react-icons/tb';
import { AuthService, type LoginRequest  } from '@/service/authService';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      console.warn('[LoginPage] Validation failed: Missing email or password');
      return;
    }

    setIsLoading(true);
    console.log('[LoginPage] Submitting login form for:', email);

    try {
      const credentials: LoginRequest = {
        email: email.trim(),
        password: password,
      };

      const response = await AuthService.login(credentials);
      console.log('[LoginPage] Login response received:', response);
      
      console.log('[LoginPage] Login successful, redirecting to dashboard');
      
      // Redirect to dashboard or home page after successful login
      router.push('/main');
      
    } catch (error) {
      console.error('[LoginPage] Login failed:', error);
      // Error handling is done in the AuthService with toast notifications
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen'>
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Image */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <Image
            src="/images/bakery/loginbg2.jpg"
            alt="Bakery display"
            className="w-full h-full object-cover"
            width={800}
            height={800}
            priority
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 lg:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 bg-white">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Hello
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Welcome <span className='text-green-600'>Back!</span>
              </h2>
              <p className="text-gray-500 text-sm sm:text-base lg:text-lg">
                Hello, continue your amazing Journey with us!
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
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
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-6 sm:mb-8 pt-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 border-gray-300 rounded focus:ring-green-500"
                    disabled={isLoading}
                  />
                  <span className="ml-2 text-sm sm:text-base text-green-600 font-medium">
                    Remember me
                  </span>
                </label>
                <a 
                  href="/forgot-password" 
                  className="text-sm sm:text-base text-green-600 font-medium hover:underline"
                  onClick={(e) => isLoading && e.preventDefault()}
                >
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors duration-200 mb-6 sm:mb-8 text-sm sm:text-base ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Signing in...' : 'Sign In to Bountip'}
              </button>

              {/* Sign Up Link */}
              <p className="text-center text-gray-600 text-sm sm:text-base">
                Don&apos;t have an account?{' '}
                <a 
                  href="/signup" 
                  className="text-green-600 font-semibold hover:underline"
                  onClick={(e) => isLoading && e.preventDefault()}
                >
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
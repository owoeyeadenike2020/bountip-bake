// 'use client';
// import React, { useState } from 'react';
// import InputField from '../../UI/inputField/InputField';
// import Image from 'next/image';
// import { FaRegEnvelope } from 'react-icons/fa';
// import { TbLockPassword } from 'react-icons/tb';
// import { FaUser } from 'react-icons/fa6';



// // Main Login Page Component
// export default function SignupPage() {
//   const [email, setEmail] = useState('youremail@gmail.com');
//   const [username, setUsername] = useState('yourusername');
//   const [password, setPassword] = useState('**************');
//   const [rememberMe, setRememberMe] = useState(true);

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const handleSubmit = (e:any) => {
//     e.preventDefault();
//     console.log('Login submitted:', { email, password, username,rememberMe });
//     // Add your login logic here
//   };

//   return (
//     <div className='h-screen'>
//     <div className="flex flex-col lg:flex-row">
//       {/* Left Side - Image */}
//       <div className="hidden lg:block lg:w-1/2 relative h-screen">
//         <Image
//           src="/images/bakery/loginbg.jpg"
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
//               Welcome  <span className='text-green-600'>Back!</span >
//             </h2>
//             <p className="text-gray-500 text-lg">
//               Hello, continue your amazing Journey with us!
//             </p>
//           </div>

//           {/* Login Form */}
//           <form onSubmit={handleSubmit}>
//             {/* Username Input */}
//             <InputField
//               type="text"
//               label="Username"
//               icon={FaUser}
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Enter your username"
//             />
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
import { FaUser } from 'react-icons/fa6';
import { AuthService, type SignupRequest } from '@/service/authService';
import toast from 'react-hot-toast';

export default function EnhancedSignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Password strength validation
  const validatePassword = (pwd: string): { isValid: boolean; message: string } => {
    if (pwd.length < 8) {
      return { isValid: false, message: 'Password must be at least 8 characters long' };
    }
    if (!/[A-Z]/.test(pwd)) {
      return { isValid: false, message: 'Password must contain at least one uppercase letter' };
    }
    if (!/[a-z]/.test(pwd)) {
      return { isValid: false, message: 'Password must contain at least one lowercase letter' };
    }
    if (!/[0-9]/.test(pwd)) {
      return { isValid: false, message: 'Password must contain at least one number' };
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) {
      return { isValid: false, message: 'Password must contain at least one special character' };
    }
    return { isValid: true, message: 'Strong password' };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !username || !password || !confirmPassword) {
      console.warn('[SignupPage] Validation failed: Missing required fields');
      toast.error('Please fill in all required fields');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn('[SignupPage] Validation failed: Invalid email format');
      toast.error('Please enter a valid email address');
      return;
    }

    // Username validation
    if (username.length < 3) {
      console.warn('[SignupPage] Validation failed: Username too short');
      toast.error('Username must be at least 3 characters long');
      return;
    }

    // Password strength validation
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      console.warn('[SignupPage] Validation failed:', passwordValidation.message);
      toast.error(passwordValidation.message);
      return;
    }

    // Password confirmation validation
    if (password !== confirmPassword) {
      console.warn('[SignupPage] Validation failed: Passwords do not match');
      toast.error('Passwords do not match. Please try again.');
      return;
    }

    // Terms acceptance validation
    if (!acceptTerms) {
      console.warn('[SignupPage] Validation failed: Terms not accepted');
      toast.error('Please accept the Terms & Conditions to continue');
      return;
    }

    setIsLoading(true);
    console.log('[SignupPage] Submitting signup form for:', email);

    try {
      const userData: SignupRequest = {
        email: email.trim(),
        name: username.trim(),
        password: password,
        phoneNumber: '', // Optional, can be added later
        // orderId is optional based on your API docs
      };

      const response = await AuthService.signup(userData);
      console.log('[SignupPage] Signup response received:', response);

      // localStorage.setItem('orderId', response.id);
    //   try {
    //   // localStorage.setItem('customerId', response.userid);
    //   // localStorage.setItem('userId', response.userid);
      
    //   // console.log('[SignupPage] Customer ID stored successfully:', response.user.id);
    // } catch (error) {
    //   console.error('[SignupPage] Failed to store customerId:', error);
    //   toast.error('Failed to save customer ID. Please try again.');
    // }
      console.log('[SignupPage] Signup successful, redirecting to dashboard');
      
      // Redirect to dashboard or onboarding page after successful signup
      router.push('/auth/login');
      
    } catch (error) {
      console.error('[SignupPage] Signup failed:', error);
      // Error handling is done in the AuthService with toast notifications
    } finally {
      setIsLoading(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = (): { strength: string; color: string; width: string } => {
    if (!password) return { strength: '', color: '', width: '0%' };
    
    validatePassword(password);
    let score = 0;
    
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
    
    if (score <= 2) return { strength: 'Weak', color: 'bg-red-500', width: '33%' };
    if (score <= 4) return { strength: 'Medium', color: 'bg-yellow-500', width: '66%' };
    return { strength: 'Strong', color: 'bg-green-500', width: '100%' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className='h-screen overflow-y-auto'>
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Image */}
        <div className="hidden lg:block lg:w-1/2 relative h-screen sticky top-0">
          <Image
            src="/images/bakery/loginbg.jpg"
            alt="Bakery display"
            className="w-full h-full object-cover"
            width={800}
            height={800}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="flex-1 lg:w-1/2 flex items-center justify-center p-6 bg-white">
          <div className="w-full max-w-lg py-8">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Create Account
              </h1>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                Join <span className='text-green-600'>Bountip</span> Today!
              </h2>
              <p className="text-gray-500 text-base">
                Start your amazing journey with us!
              </p>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Input */}
              <InputField
                type="text"
                label="Username"
                icon={FaUser}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                // disabled={isLoading}
                // required
              />

              {/* Email Input */}
              <InputField
                type="email"
                label="Email Address"
                icon={FaRegEnvelope}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="youremail@gmail.com"
                // disabled={isLoading}
                // required
              />

              {/* Password Input */}
              <div>
                <InputField
                  type="password"
                  label="Password"
                  icon={TbLockPassword}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  showPasswordToggle={true}
                  // disabled={isLoading}
                  // required
                />
                
                {/* Password Strength Indicator */}
                {password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Password Strength:</span>
                      <span className={`text-xs font-medium ${
                        passwordStrength.strength === 'Weak' ? 'text-red-600' :
                        passwordStrength.strength === 'Medium' ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {passwordStrength.strength}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{ width: passwordStrength.width }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Use 8+ characters with uppercase, lowercase, numbers & symbols
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password Input */}
              <InputField
                type="password"
                label="Confirm Password"
                icon={TbLockPassword}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                showPasswordToggle={true}
                // disabled={isLoading}
                // required
              />

              {/* Password Match Indicator */}
              {confirmPassword && (
                <div className="flex items-center gap-2 text-sm">
                  {password === confirmPassword ? (
                    <>
                      <span className="text-green-600">✓</span>
                      <span className="text-green-600">Passwords match</span>
                    </>
                  ) : (
                    <>
                      <span className="text-red-600">✗</span>
                      <span className="text-red-600">Passwords do not match</span>
                    </>
                  )}
                </div>
              )}

              {/* Terms & Conditions Checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-5 h-5 text-green-500 border-gray-300 rounded focus:ring-green-500 mt-0.5"
                  disabled={isLoading}
                  required
                />
                <label htmlFor="acceptTerms" className="text-sm text-gray-600 cursor-pointer">
                  I agree to the{' '}
                  <a 
                    href="/terms" 
                    target="_blank"
                    className="text-green-600 font-medium hover:underline"
                    onClick={(e) => isLoading && e.preventDefault()}
                  >
                    Terms & Conditions
                  </a>
                  {' '}and{' '}
                  <a 
                    href="/privacy" 
                    target="_blank"
                    className="text-green-600 font-medium hover:underline"
                    onClick={(e) => isLoading && e.preventDefault()}
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !acceptTerms}
                className={`w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-lg transition-colors duration-200 mt-6 ${
                  (isLoading || !acceptTerms) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Creating your account...' : 'Sign Up to Bountip'}
              </button>

              {/* Login Link */}
              <p className="text-center text-gray-600 mt-6">
                Already have an account?{' '}
                <a 
                  href="/auth/login" 
                  className="text-green-600 font-semibold hover:underline"
                  onClick={(e) => isLoading && e.preventDefault()}
                >
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
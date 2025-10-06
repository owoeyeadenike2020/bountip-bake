import React, { useState } from 'react';
import {  Eye, EyeOff } from 'lucide-react';

// Separate Input Component
interface InputFieldProps {
  type?: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  showPasswordToggle?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ 
  type = "text", 
  label, 
  icon: Icon, 
  value, 
  onChange, 
  placeholder,
  showPasswordToggle = false 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const inputType = showPasswordToggle ? (showPassword ? "text" : "password") : type;

  return (
    <div className="mb-6">
      <label className="block text-gray-600 text-sm mb-2">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 border-r border-gray-300 pr-3">
          <Icon size={25} />
        </div>
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-14 pr-22 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800"
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};
export default InputField;
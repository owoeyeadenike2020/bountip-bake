import { MessageCircle } from 'lucide-react';
import { FaTwitter, FaInstagram ,FaFacebook } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#FFFFFF]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Contact Us Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black mb-6 tracking-tight">
            CONTACT US
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            You can send us a direct message via the following social networks
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center items-center space-x-8 mb-16">
          {/* WhatsApp */}
          <a
            href="https://wa.me/your-number"
            className="group relative"
            aria-label="Contact us on WhatsApp"
          >
            <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-green-50 group-hover:scale-110 group-hover:shadow-lg">
              <MessageCircle className="h-7 w-7 text-gray-600 group-hover:text-green-600 transition-colors duration-300" />
            </div>
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com/your-page"
            className="group relative"
            aria-label="Follow us on Facebook"
          >
            <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-blue-50 group-hover:scale-110 group-hover:shadow-lg">
              <FaFacebook className="h-7 w-7 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
            </div>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/your-profile"
            className="group relative"
            aria-label="Follow us on Instagram"
          >
            <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-pink-50 group-hover:scale-110 group-hover:shadow-lg">
              <FaInstagram className="h-7 w-7 text-gray-600 group-hover:text-pink-600 transition-colors duration-300" />
            </div>
          </a>

          {/* X (Twitter) */}
          <a
            href="https://x.com/your-profile"
            className="group relative"
            aria-label="Follow us on X"
          >
            <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-gray-200 group-hover:scale-110 group-hover:shadow-lg">
              <FaTwitter className="h-6 w-6 text-gray-600 group-hover:text-gray-800 transition-colors duration-300"/>
                
            </div>
          </a>
        </div>
        <div className="text-center mb-12">
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            2025. All Rights Reserved © Bobs Bakery
          </p>
        </div>

      </div>

     
    </footer>
  );
}
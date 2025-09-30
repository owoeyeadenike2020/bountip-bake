// import React, { useEffect, useState } from "react";
// import { X } from "lucide-react";
// import Image, { StaticImageData } from "next/image";
// import getWidthClass from "@/utils/getWidthClass";

// interface ModalProps {
//   image?: StaticImageData;
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   subtitle?: string;
//   children: React.ReactNode;
//   size?: "sm" | "md" | "lg" | "xl" | "full" | number; // Added size prop
//   zIndex?: number;
// }

// export const Modal: React.FC<ModalProps> = ({
//   image,
//   isOpen,
//   onClose,
//   title,
//   subtitle,
//   children,
//   size = "sm", // Default size
//   zIndex = 99999999,
// }) => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     if (isOpen) {
//       setIsVisible(true);
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//       const timeout = setTimeout(() => setIsVisible(false), 300);
//       return () => clearTimeout(timeout);
//     }

//     return () => {
//       document.body.style.overflow = ""; // cleanup on unmount
//     };
//   }, [isOpen]);

//   // Function to get width based on size prop

//   if (!isOpen && !isVisible) return null;

//   return (
//     <div
//       className={`fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-end z-[${zIndex}] transition-opacity duration-300 ease-in-out`}
//     >
//       <div
//         className={`bg-white shadow-xl rounded-l-lg ${getWidthClass(
//           size
//         )} h-full overflow-hidden transform transition-all duration-300 ease-in-out
//           ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
//         `}
//       >
//         {/* Modal Header */}
//         <div className="flex items-center justify-between px-5 pt-4  border-gray-200">
//           <div className="flex gap-4 items-center">
//             {image && (
//               <div className="p-2.5 rounded-full border border-[#15BA5C] bg-white">
//                 <Image
//                   src={image || ""}
//                   alt="Modal Icon"
//                   className="object-contain h-[20px] w-[20px]"
//                 />
//               </div>
//             )}

//             <div>
//               <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
//               <p className="text-sm text-gray-500">{subtitle}</p>
//             </div>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer"
//             aria-label="Close"
//           >
//             <X className="w-5 h-5 text-gray-600" />
//           </button>
//         </div>

//         {/* Scrollable Modal Content */}
//         <div className=" overflow-y-auto max-h-[calc(100vh-80px)]">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };




import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface ModalProps {
  image?: StaticImageData;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full" | number;
  zIndex?: number;
}

// Updated getWidthClass function for centered modal
const getWidthClass = (size: "sm" | "md" | "lg" | "xl" | "full" | number) => {
  if (typeof size === 'number') return `w-[${size}px]`;
  
  switch (size) {
    case "sm": return "w-full max-w-md";
    case "md": return "w-full max-w-2xl";
    case "lg": return "w-full max-w-4xl";
    case "xl": return "w-full max-w-6xl";
    case "full": return "w-full max-w-7xl";
    default: return "w-full max-w-md";
  }
};

export const Modal: React.FC<ModalProps> = ({
  image,
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  size = "lg",
  zIndex = 99999,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Create or get the modal root element
    let root = document.getElementById('modal-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'modal-root';
      root.style.position = 'relative';
      root.style.zIndex = '99999';
      document.body.appendChild(root);
    }
    setModalRoot(root);

    return () => {
      // Cleanup if this is the last modal
      if (root && root.children.length === 0 && root.parentNode) {
        root.parentNode.removeChild(root);
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "17px"; // Prevent layout shift
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      const timeout = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timeout);
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;
  if (!modalRoot) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div
      className={`fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-end z-[${zIndex}] transition-opacity duration-300 ease-in-out`}
      style={{ zIndex }}
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white shadow-2xl rounded-lg ${getWidthClass(size)} h-full overflow-hidden transform transition-all duration-300 ease-in-out
          ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header - Fixed at top */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="flex gap-4 items-center">
            {image && (
              <div className="p-2.5 rounded-full border border-green-500 bg-white flex-shrink-0">
                <Image
                  src={image}
                  alt="Modal Icon"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
            )}

            <div>
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
              {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer flex-shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(95vh - 80px)' }}>
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, modalRoot);
};

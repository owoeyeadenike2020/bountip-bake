// import React from 'react';
// import CategoryTab from './Catergorytab';
// interface Category {
//   id: string;
//   name: string;
//   icon: string;
// }

// interface CategoryTabsProps {
//   categories: Category[];
//   selectedCategory: string;
//   onCategoryChange: (categoryId: string | number) => void;
// }

// const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, selectedCategory, onCategoryChange }) => {
//   return (
//     <div className="w-full bg-white py-4">
//       <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide px-4">
//         <CategoryTab
//           category={{ id: 'all', name: 'All', icon: '🍽️' }}
//           isSelected={selectedCategory === 'all'}
//           onClick={onCategoryChange}
//         />
        
//         {categories.map((category: Category) => (
//           <CategoryTab
//             key={category.id}
//             category={category}
//             isSelected={selectedCategory === category.id}
//             onClick={onCategoryChange}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryTabs;


// import React from 'react';
// import CategoryTab from './Catergorytab';
// import type { CategoryTabsProps } from '../../../types';
import React, {  useRef } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';

type Category = {
  id: string | number;
  name: string;
  image: string;
};

interface CategoryTabsProps {
  categories: Category[];
  selectedCategory: string | number;
  onCategoryChange: (categoryId: string | number) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, selectedCategory, onCategoryChange }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
      <div className="relative py-4">
        <div 
          ref={scrollRef}
          className="flex items-center gap-4 md:gap-16 lg:gap-16 sm:gap-4  overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category: Category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex flex-col items-center justify-center min-w-[80px] p-3 rounded-lg transition-all ${
                selectedCategory === category.id
                  ? 'bg-orange-50'
                  : 'bg-[fffff]'
              }`}
            >
              <div className="w-16 h-16 mb-2 rounded-full overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={60}
                  height={60}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-base font-medium text-gray-700 text-center">
                {category.name}
              </span>
            </button>
          ))}
        </div>
        
        {/* Scroll Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-50 z-10"
        >
          <FaChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
};
export default CategoryTabs;
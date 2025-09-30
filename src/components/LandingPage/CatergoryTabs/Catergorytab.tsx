// // import React from 'react';
// // import CategoryTab from './CategoryTab';

// // const CategoryTabs = ({ categories, selectedCategory, onCategoryChange }) => {
// //   return (
// //     <div className="w-full bg-white py-4">
// //       <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide px-4">
// //         <CategoryTab
// //           category={{ id: 'all', name: 'All', icon: '🍽️' }}
// //           isSelected={selectedCategory === 'all'}
// //           onClick={onCategoryChange}
// //         />
        
// //         {categories.map((category) => (
// //           <CategoryTab
// //             key={category.id}
// //             category={category}
// //             isSelected={selectedCategory === category.id}
// //             onClick={onCategoryChange}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default CategoryTabs;



// import React from 'react';

// type Category = {
//   id: string | number;
//   icon: React.ReactNode;
//   name: string;
// };

// interface CategoryTabProps {
//   category: Category;
//   isSelected: boolean;
//   onClick: (id: string | number) => void;
// }

// const CategoryTab: React.FC<CategoryTabProps> = ({ category, isSelected, onClick }) => {
//   return (
//     <button
//       onClick={() => onClick(category.id)}
//       className={`flex flex-col items-center justify-center min-w-[80px] p-3 rounded-lg transition-all ${
//         isSelected
//           ? 'bg-orange-50 border-2 border-orange-200'
//           : 'bg-gray-50 hover:bg-gray-100'
//       }`}
//     >
//       <span className="text-2xl mb-1">{category.icon}</span>
//       <span className="text-xs font-medium text-gray-700">{category.name}</span>
//     </button>
//   );
// };

// export default CategoryTab;


import React from 'react';
import type { Category } from '../../../types';

interface CategoryTabProps {
  category: Category;
  isSelected: boolean;
  onClick: (categoryId: string) => void; // Consistent with parent component
}

const CategoryTab: React.FC<CategoryTabProps> = ({ category, isSelected, onClick }) => {
  const handleClick = () => {
    onClick(category.id); // category.id is always string based on our type definition
  };

  return (
    <button
      onClick={handleClick}
      className={`flex flex-col items-center justify-center min-w-[80px] p-3 rounded-lg transition-all ${
        isSelected
          ? 'bg-orange-50 border-2 border-orange-200'
          : 'bg-gray-50 hover:bg-gray-100'
      }`}
    >
      <span className="text-2xl mb-1">{category.icon}</span>
      <span className="text-xs font-medium text-gray-700">{category.name}</span>
    </button>
  );
};

export default CategoryTab;

import React from 'react';
import GlitchText from './GlitchText';

interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-8 border-y border-[rgba(0,255,65,0.2)] py-4">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`uppercase text-sm md:text-base transition-colors duration-200 ${
            activeCategory === category 
              ? 'text-[#00ff41]' 
              : 'text-gray-500 hover:text-white'
          }`}
        >
          <GlitchText>{`[ ${category} ]`}</GlitchText>
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
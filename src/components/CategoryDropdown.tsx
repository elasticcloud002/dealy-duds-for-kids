
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

interface CategoryDropdownProps {
  category: string;
  subcategories: string[];
}

export const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  category,
  subcategories,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Generate a URL-friendly category ID
  const categoryId = category.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="px-3 py-2 flex items-center text-foreground hover:bg-secondary rounded-md transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{category}</span>
        <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-60 bg-white rounded-md shadow-lg ring-1 ring-black/5 z-50 py-1 animate-scale-in">
          <div className="p-2">
            <Link 
              to={`/category/${categoryId}`}
              className="block p-2 text-sm font-medium hover:bg-secondary rounded-md hover-underline"
              onClick={() => setIsOpen(false)}
            >
              View All
            </Link>
            <div className="h-px bg-border my-1"></div>
            {subcategories.map((subcategory) => (
              <Link
                key={subcategory}
                to={`/category/${categoryId}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
                className="block p-2 text-sm hover:bg-secondary rounded-md hover-underline"
                onClick={() => setIsOpen(false)}
              >
                {subcategory}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

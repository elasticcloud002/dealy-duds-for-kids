
import React from 'react';
import { categories } from '@/utils/dealUtils';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Categories = () => {
  return (
    <div className="py-12 animate-slide-in">
      <h2 className="text-2xl md:text-3xl font-serif font-medium mb-8 text-center">Shop by Category</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((category, index) => (
          <Link 
            key={category.id}
            to={`/category/${category.id}`}
            className="group flex flex-col items-center p-4 rounded-xl border transition-all duration-300 hover:shadow-md hover:border-primary/20 hover:-translate-y-1"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="w-16 h-16 mb-4 flex items-center justify-center text-3xl text-primary/80">
              {getCategoryIcon(category.id)}
            </div>
            
            <h3 className="text-center text-sm font-medium mb-2">{category.name}</h3>
            
            <span className="text-xs text-muted-foreground flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
              Explore <ChevronRight className="h-3 w-3 ml-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Helper function to get category icons
function getCategoryIcon(categoryId: string) {
  switch (categoryId) {
    case 'kids':
      return '👕';
    case 'women':
      return '👗';
    case 'men':
      return '👔';
    case 'home':
      return '🏠';
    case 'hot':
      return '🔥';
    case 'gifts':
      return '🎁';
    default:
      return '📦';
  }
}

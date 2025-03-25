
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CategoryDropdown } from './CategoryDropdown';
import { categories } from '@/utils/dealUtils';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // In a real app, this would trigger a search
    setIsSearchOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/d5a7d255-409f-41b7-be6e-8b90229d0550.png" 
              alt="Best Kids Finds" 
              className="h-12 md:h-14 w-auto object-contain" 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {categories.map((category) => (
              <CategoryDropdown 
                key={category.id} 
                category={category.name} 
                subcategories={category.subcategories} 
              />
            ))}
          </nav>

          {/* Search & Cart */}
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSearchOpen(true)}
              className="hover:bg-secondary transition-colors duration-200"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-secondary transition-colors duration-200"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden hover:bg-secondary transition-colors duration-200"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* Search Overlay */}
          {isSearchOpen && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-20 px-4 animate-fade-in">
              <div className="w-full max-w-3xl bg-white rounded-lg shadow-2xl overflow-hidden animate-scale-in">
                <div className="flex items-center p-4 border-b">
                  <Search className="h-5 w-5 text-muted-foreground mr-2" />
                  <form onSubmit={handleSearch} className="flex-1 flex items-center">
                    <input
                      type="text"
                      placeholder="Search for deals..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1 border-none outline-none text-lg"
                      autoFocus
                    />
                    <Button type="submit" className="ml-2">
                      Search
                    </Button>
                  </form>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(false)}
                    className="ml-2"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="p-4 bg-secondary/50">
                  <p className="text-sm text-muted-foreground">
                    Popular searches: girls dresses, boys pajamas, baby onesies, toddler shoes
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-black/80 z-50 flex flex-col animate-fade-in">
              <div className="flex justify-between items-center p-4">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <img 
                    src="/lovable-uploads/d5a7d255-409f-41b7-be6e-8b90229d0550.png" 
                    alt="Best Kids Finds" 
                    className="h-12 w-auto object-contain" 
                  />
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-6">
                <div className="space-y-6">
                  {categories.map((category) => (
                    <div key={category.id} className="space-y-2">
                      <h3 className="text-white text-lg font-semibold">{category.name}</h3>
                      <ul className="space-y-2 pl-4">
                        {category.subcategories.map((subcategory) => (
                          <li key={subcategory}>
                            <Link
                              to={`/category/${category.id}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
                              className="text-white/80 hover:text-white text-sm"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subcategory}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

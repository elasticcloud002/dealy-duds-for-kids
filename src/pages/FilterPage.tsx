
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronLeft, Filter, SlidersHorizontal } from 'lucide-react';
import { mockDeals, filterDeals, categories, Deal } from '@/utils/dealUtils';
import { DealCard } from '@/components/DealCard';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const FilterPage = () => {
  const { categoryId, subcategoryId } = useParams();
  const navigate = useNavigate();
  
  // State for filters
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(categoryId);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    subcategoryId ? [subcategoryId] : []
  );
  const [priceRange, setPriceRange] = useState<string>("all");
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  
  // Find the current category
  const currentCategory = categories.find(cat => cat.id === categoryId);
  
  // Filter deals when parameters change
  useEffect(() => {
    // Set default category if not specified
    if (!selectedCategory && categories.length > 0) {
      setSelectedCategory(categories[0].id);
    }
    
    // Apply filters
    const filteredDeals = filterDeals(mockDeals, {
      category: currentCategory?.name,
      subcategory: selectedSubcategories.length === 1 ? selectedSubcategories[0] : undefined,
      maxPrice: priceRange === "under20" ? 20 : 
                priceRange === "under50" ? 50 : 
                priceRange === "under100" ? 100 : undefined,
      minDiscount: selectedDiscounts.includes("over25") ? 25 :
                  selectedDiscounts.includes("over50") ? 50 : undefined
    });
    
    // setDeals(filteredDeals);
    setDeals(mockDeals);
    setTotalResults(filteredDeals.length);
  }, [categoryId, subcategoryId, selectedCategory, selectedSubcategories, priceRange, selectedDiscounts]);
  
  // Handle subcategory checkbox change
  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategories(prev => {
      if (prev.includes(subcategory)) {
        return prev.filter(sc => sc !== subcategory);
      } else {
        return [...prev, subcategory];
      }
    });
  };
  
  // Handle discount toggle change
  const handleDiscountChange = (value: string) => {
    setSelectedDiscounts(prev => {
      if (prev.includes(value)) {
        return prev.filter(d => d !== value);
      } else {
        // Make it single selection
        return [value];
      }
    });
  };

  const resetFilters = () => {
    setSelectedSubcategories(subcategoryId ? [subcategoryId] : []);
    setPriceRange("all");
    setSelectedDiscounts([]);
  };
  
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 mt-8">
        {/* Breadcrumb */}
        <div className="flex items-center mb-4 mt-6 text-sm">
          <Button variant="ghost" size="sm" className="p-0 mr-2" onClick={() => navigate('/')}>
            Home
          </Button>
          <ChevronLeft className="h-4 w-4 mx-1" />
          <Button variant="ghost" size="sm" className="p-0 mr-2" onClick={() => navigate(`/category/${categoryId}`)}>
            {currentCategory?.name || 'Category'}
          </Button>
          {subcategoryId && (
            <>
              <ChevronLeft className="h-4 w-4 mx-1" />
              <span className="font-medium">{subcategoryId}</span>
            </>
          )}
        </div>
        
        <h1 className="text-2xl font-medium mb-1">
          {subcategoryId || currentCategory?.name || 'Products'}
        </h1>
        
        {/* Results count */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-base">{totalResults.toLocaleString()} Results</p>
          <div className="flex items-center">
            <span className="mr-2 text-sm">Sort: Best Match</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
        
        {/* Horizontal filters */}
        <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
          <Button variant="outline" size="sm" className="rounded-full flex items-center gap-1 border-gray-300">
            Size
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
          <Button variant="outline" size="sm" className="rounded-full flex items-center gap-1 border-gray-300">
            Color
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
          <Button variant="outline" size="sm" className="rounded-full flex items-center gap-1 border-gray-300">
            Material
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
          <Button variant="outline" size="sm" className="rounded-full flex items-center gap-1 border-gray-300">
            Brand
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
          <Button variant="outline" size="sm" className="rounded-full flex items-center gap-1 border-gray-300">
            Department
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
          <Button variant="outline" size="sm" className="rounded-full flex items-center gap-1 border-gray-300">
            Condition
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
          <Button variant="outline" size="sm" className="rounded-full flex items-center gap-1 border-gray-300">
            Price
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
          <Button variant="outline" size="sm" className="rounded-full flex items-center gap-1 border-gray-300">
            Buying Format
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </div>

        {/* Mobile filters toggle */}
        <div className="md:hidden mb-4">
          <Button 
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            variant="outline" 
            className="w-full justify-between"
          >
            Filters 
            <SlidersHorizontal className="h-4 w-4 ml-2" />
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <div className={`w-full md:w-64 flex-shrink-0 ${showMobileFilters ? 'block' : 'hidden md:block'}`}>
            <div className="border border-gray-200 rounded-md mb-4">
              <div className="bg-gray-100 p-3 font-semibold text-gray-800 border-b border-gray-200">
                Shop by Category
              </div>
              
              <div className="p-3">
                <div className="mb-3">
                  <div className="font-medium text-black mb-2">Women</div>
                  
                  {currentCategory && (
                    <div className="ml-2">
                      <div className="font-medium text-red-600 mb-2">{currentCategory.name}</div>
                      
                      <div className="space-y-1.5 ml-2">
                        {currentCategory.subcategories.map((subcategory) => (
                          <div key={subcategory} className="text-sm hover:underline cursor-pointer">
                            {subcategory}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-1">
                  {categories.filter(cat => cat.id !== categoryId).map((category) => (
                    <div 
                      key={category.id} 
                      className="text-blue-600 hover:underline cursor-pointer"
                      onClick={() => navigate(`/category/${category.id}`)}
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Price filter */}
            <div className="border border-gray-200 rounded-md mb-4">
              <div className="bg-gray-100 p-3 font-semibold text-gray-800 border-b border-gray-200">
                Price
              </div>
              <div className="p-3">
                <RadioGroup value={priceRange} onValueChange={setPriceRange} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="price-all" className="text-red-500 border-red-500" />
                    <Label htmlFor="price-all" className="text-sm cursor-pointer">All Prices</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="under20" id="price-under20" className="text-red-500 border-red-500" />
                    <Label htmlFor="price-under20" className="text-sm cursor-pointer">Under $20</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="under50" id="price-under50" className="text-red-500 border-red-500" />
                    <Label htmlFor="price-under50" className="text-sm cursor-pointer">Under $50</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="under100" id="price-under100" className="text-red-500 border-red-500" />
                    <Label htmlFor="price-under100" className="text-sm cursor-pointer">Under $100</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            {/* Discount filter */}
            <div className="border border-gray-200 rounded-md mb-4">
              <div className="bg-gray-100 p-3 font-semibold text-gray-800 border-b border-gray-200">
                Discount
              </div>
              <div className="p-3 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="discount-over25"
                    checked={selectedDiscounts.includes('over25')}
                    onCheckedChange={() => handleDiscountChange('over25')}
                    className="border-red-500 text-red-500 h-4 w-4 data-[state=checked]:bg-red-500 data-[state=checked]:text-white rounded-sm"
                  />
                  <Label htmlFor="discount-over25" className="text-sm cursor-pointer">
                    25% Off or More
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="discount-over50"
                    checked={selectedDiscounts.includes('over50')}
                    onCheckedChange={() => handleDiscountChange('over50')}
                    className="border-red-500 text-red-500 h-4 w-4 data-[state=checked]:bg-red-500 data-[state=checked]:text-white rounded-sm"
                  />
                  <Label htmlFor="discount-over50" className="text-sm cursor-pointer">
                    50% Off or More
                  </Label>
                </div>
                
                <Button variant="link" size="sm" onClick={resetFilters} className="text-blue-600 p-0 h-auto">
                  Reset All Filters
                </Button>
              </div>
            </div>
          </div>
          
          {/* Product grid */}
          <div className="flex-1">
            {deals.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or check back later for new deals.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {deals.map((deal, index) => (
                  <DealCard key={deal.id} deal={deal} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FilterPage;

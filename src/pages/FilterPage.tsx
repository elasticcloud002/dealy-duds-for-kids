import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Filter, SlidersHorizontal } from 'lucide-react';
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
    
    setDeals(filteredDeals);
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center mb-6 text-sm">
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
        
        <h1 className="text-3xl font-serif font-medium mb-2">
          {subcategoryId || currentCategory?.name || 'Products'}
        </h1>
        <p className="text-muted-foreground mb-8">
          Find the best deals on {subcategoryId || currentCategory?.name || 'products'} for your family
        </p>

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
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    Reset
                  </Button>
                </div>
                
                {/* Category filters */}
                {currentCategory && (
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Subcategories</h4>
                    <div className="space-y-2">
                      {currentCategory.subcategories.map((subcategory) => (
                        <div key={subcategory} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`subcategory-${subcategory}`}
                            checked={selectedSubcategories.includes(subcategory)}
                            onCheckedChange={() => handleSubcategoryChange(subcategory)}
                          />
                          <Label 
                            htmlFor={`subcategory-${subcategory}`}
                            className="text-sm cursor-pointer"
                          >
                            {subcategory}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Price range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <RadioGroup value={priceRange} onValueChange={setPriceRange}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="price-all" />
                      <Label htmlFor="price-all" className="text-sm cursor-pointer">All Prices</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="under20" id="price-under20" />
                      <Label htmlFor="price-under20" className="text-sm cursor-pointer">Under $20</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="under50" id="price-under50" />
                      <Label htmlFor="price-under50" className="text-sm cursor-pointer">Under $50</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="under100" id="price-under100" />
                      <Label htmlFor="price-under100" className="text-sm cursor-pointer">Under $100</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {/* Discount range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Discount</h4>
                  <ToggleGroup type="single" variant="outline" className="flex flex-col space-y-2">
                    <ToggleGroupItem 
                      value="over25" 
                      className={`justify-start ${selectedDiscounts.includes('over25') ? 'bg-gray-100' : ''}`}
                      onClick={() => handleDiscountChange('over25')}
                    >
                      25% Off or More
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="over50" 
                      className={`justify-start ${selectedDiscounts.includes('over50') ? 'bg-gray-100' : ''}`}
                      onClick={() => handleDiscountChange('over50')}
                    >
                      50% Off or More
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </CardContent>
            </Card>
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

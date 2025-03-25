
import { useState, useEffect } from 'react';

export interface Deal {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  dealPrice: number;
  discount: number;
  category: string;
  subcategory: string;
  imageUrl: string;
  affiliateLink: string;
  isNew: boolean;
  isHot: boolean;
  isFeatured: boolean;
  createdAt: Date;
}

// Mock data for demonstration
export const mockDeals: Deal[] = [
  {
    id: "1",
    title: "Organic Cotton Baby Onesie Set",
    description: "Set of 3 organic cotton onesies in neutral colors, perfect for babies 0-12 months.",
    originalPrice: 29.99,
    dealPrice: 19.99,
    discount: 33,
    category: "Kids' Clothing",
    subcategory: "Baby (0–24 months)",
    imageUrl: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?q=80&w=1000&auto=format&fit=crop",
    affiliateLink: "https://amazon.com",
    isNew: true,
    isHot: false,
    isFeatured: true,
    createdAt: new Date()
  },
  {
    id: "2",
    title: "Toddler Girl's Summer Dress Collection",
    description: "Set of 2 adorable summer dresses with floral patterns for girls 2T-5T.",
    originalPrice: 39.99,
    dealPrice: 24.99,
    discount: 38,
    category: "Kids' Clothing",
    subcategory: "Toddlers (2T–5T)",
    imageUrl: "https://images.unsplash.com/photo-1626150953625-a42d9897557d?q=80&w=1000&auto=format&fit=crop",
    affiliateLink: "https://amazon.com",
    isNew: true,
    isHot: true,
    isFeatured: true,
    createdAt: new Date()
  },
  {
    id: "3",
    title: "Boys' Dinosaur Pajama Set",
    description: "Soft cotton pajama set with fun dinosaur print for boys ages 5-8.",
    originalPrice: 24.99,
    dealPrice: 14.99,
    discount: 40,
    category: "Kids' Clothing",
    subcategory: "Boys (5–18)",
    imageUrl: "https://images.unsplash.com/photo-1617244147046-07a6eadacad9?q=80&w=1000&auto=format&fit=crop",
    affiliateLink: "https://amazon.com",
    isNew: false,
    isHot: false,
    isFeatured: true,
    createdAt: new Date(Date.now() - 86400000) // Yesterday
  },
  {
    id: "4",
    title: "Girls' Unicorn Sneakers",
    description: "Light-up unicorn sneakers with comfortable cushioning, sizes 12-4.",
    originalPrice: 34.99,
    dealPrice: 19.99,
    discount: 43,
    category: "Kids' Clothing",
    subcategory: "Shoes & Accessories",
    imageUrl: "https://images.unsplash.com/photo-1514063527718-f5e0f4108c8d?q=80&w=1000&auto=format&fit=crop",
    affiliateLink: "https://amazon.com",
    isNew: false,
    isHot: true,
    isFeatured: false,
    createdAt: new Date(Date.now() - 172800000) // 2 days ago
  },
  {
    id: "5",
    title: "Modest Summer Maxi Dress",
    description: "Elegant floral print maxi dress with long sleeves, perfect for summer occasions.",
    originalPrice: 59.99,
    dealPrice: 39.99,
    discount: 33,
    category: "Women's Clothing",
    subcategory: "Modest Fashion",
    imageUrl: "https://images.unsplash.com/photo-1618413512517-0a451e0f9f87?q=80&w=1000&auto=format&fit=crop",
    affiliateLink: "https://amazon.com",
    isNew: true,
    isHot: false,
    isFeatured: true,
    createdAt: new Date()
  },
  {
    id: "6",
    title: "Men's Classic Oxford Shirt",
    description: "Timeless Oxford shirt in light blue, perfect for any occasion.",
    originalPrice: 45.99,
    dealPrice: 29.99,
    discount: 35,
    category: "Men's Clothing",
    subcategory: "Tops & Shirts",
    imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop",
    affiliateLink: "https://amazon.com",
    isNew: false,
    isHot: false,
    isFeatured: false,
    createdAt: new Date(Date.now() - 259200000) // 3 days ago
  },
  {
    id: "7",
    title: "Silicone Baby Feeding Set",
    description: "Complete feeding set with plate, spoon, and cup in soft silicone.",
    originalPrice: 32.99,
    dealPrice: 21.99,
    discount: 33,
    category: "Home & Lifestyle",
    subcategory: "Kitchen & Dining",
    imageUrl: "https://images.unsplash.com/photo-1571211468362-33f20cb1982f?q=80&w=1000&auto=format&fit=crop",
    affiliateLink: "https://amazon.com",
    isNew: true,
    isHot: false,
    isFeatured: true,
    createdAt: new Date()
  },
  {
    id: "8",
    title: "Kids' Educational Wooden Toy Set",
    description: "Set of 5 wooden puzzles to help develop fine motor skills and problem-solving.",
    originalPrice: 29.99,
    dealPrice: 17.99,
    discount: 40,
    category: "Kids' Clothing",
    subcategory: "Toys",
    imageUrl: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1000&auto=format&fit=crop",
    affiliateLink: "https://amazon.com",
    isNew: false,
    isHot: true,
    isFeatured: true,
    createdAt: new Date(Date.now() - 86400000) // Yesterday
  }
];

// Categories structure
export const categories = [
  {
    id: "kids",
    name: "Kids' Clothing",
    subcategories: [
      "Baby (0–24 months)",
      "Toddlers (2T–5T)",
      "Girls (5–18)",
      "Boys (5–18)",
      "Shoes & Accessories",
      "Matching Sets / Outfits",
      "Toys",
      "Back to School",
      "Yomtov & Holidays"
    ]
  },
  {
    id: "women",
    name: "Women's Clothing",
    subcategories: [
      "Dresses",
      "Tops & Blouses",
      "Skirts",
      "Modest Fashion",
      "Maternity / Postpartum",
      "Activewear",
      "Lounge & Pajamas",
      "Shoes",
      "Accessories"
    ]
  },
  {
    id: "men",
    name: "Men's Clothing",
    subcategories: [
      "Tops & Shirts",
      "Bottoms",
      "Shoes",
      "Accessories"
    ]
  },
  {
    id: "home",
    name: "Home & Lifestyle",
    subcategories: [
      "Home Essentials",
      "Kitchen & Dining",
      "Decor",
      "Tech & Gadgets"
    ]
  },
  {
    id: "hot",
    name: "Hot Deals / Limited Time",
    subcategories: [
      "Daily Picks",
      "Under $20",
      "Trending Now"
    ]
  },
  {
    id: "gifts",
    name: "Gift Ideas",
    subcategories: [
      "Baby Shower",
      "Birthdays",
      "New Moms"
    ]
  }
];

// Filter deals based on various criteria
export const filterDeals = (
  deals: Deal[],
  filters: {
    category?: string;
    subcategory?: string;
    isNew?: boolean;
    isHot?: boolean;
    isFeatured?: boolean;
    maxPrice?: number;
    minDiscount?: number;
    searchTerm?: string;
  }
) => {
  return deals.filter(deal => {
    // Category filter
    if (filters.category && deal.category !== filters.category) return false;
    
    // Subcategory filter
    if (filters.subcategory && deal.subcategory !== filters.subcategory) return false;
    
    // New deals filter
    if (filters.isNew && !deal.isNew) return false;
    
    // Hot deals filter
    if (filters.isHot && !deal.isHot) return false;
    
    // Featured deals filter
    if (filters.isFeatured && !deal.isFeatured) return false;
    
    // Max price filter
    if (filters.maxPrice && deal.dealPrice > filters.maxPrice) return false;
    
    // Min discount filter
    if (filters.minDiscount && deal.discount < filters.minDiscount) return false;
    
    // Search term filter
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      return (
        deal.title.toLowerCase().includes(term) ||
        deal.description.toLowerCase().includes(term) ||
        deal.category.toLowerCase().includes(term) ||
        deal.subcategory.toLowerCase().includes(term)
      );
    }
    
    return true;
  });
};

// Get today's deals
export const getTodaysDeals = (deals: Deal[]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return deals.filter(deal => {
    const dealDate = new Date(deal.createdAt);
    dealDate.setHours(0, 0, 0, 0);
    return dealDate.getTime() === today.getTime();
  });
};

// Custom hook to get deals and refresh them every 24 hours
export function useDeals() {
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [todaysDeals, setTodaysDeals] = useState<Deal[]>([]);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  
  // Function to check if deals need to be refreshed
  const checkForRefresh = () => {
    const now = new Date();
    const lastRefreshDate = new Date(lastRefreshed);
    
    // Set both dates to midnight for comparison
    now.setHours(0, 0, 0, 0);
    lastRefreshDate.setHours(0, 0, 0, 0);
    
    // If it's a new day, refresh the deals
    if (now.getTime() > lastRefreshDate.getTime()) {
      console.log("Refreshing deals for new day");
      setLastRefreshed(new Date());
      // In a real app, this would fetch new deals from an API
      // For now, we're just filtering the mock data to simulate new day's deals
      setTodaysDeals(getTodaysDeals(mockDeals));
    }
  };
  
  // Initialize today's deals
  useEffect(() => {
    setTodaysDeals(getTodaysDeals(mockDeals));
    
    // Set up a timer to check for refresh
    const timer = setInterval(checkForRefresh, 60000); // Check every minute
    
    // Clear the timer when component unmounts
    return () => clearInterval(timer);
  }, []);
  
  return { deals, todaysDeals };
}

// Format currency
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

// Share deal to WhatsApp
export const shareToWhatsApp = (deal: Deal) => {
  const text = `Check out this amazing deal: ${deal.title} - ${formatCurrency(deal.dealPrice)} (${deal.discount}% off)! ${deal.affiliateLink}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(whatsappUrl, '_blank');
};

// Testimonials
export const testimonials = [
  {
    id: "1",
    text: "I've saved hundreds of dollars on my kids' clothes thanks to these deals! The daily alerts are a game-changer for my budget.",
    author: "Sarah M.",
    location: "New York",
    rating: 5
  },
  {
    id: "2",
    text: "As a mom of three, I don't have time to hunt for deals. This site does all the work for me and I just pick what I need. Love it!",
    author: "Rebecca L.",
    location: "Chicago",
    rating: 5
  },
  {
    id: "3",
    text: "The WhatsApp sharing feature is brilliant! I can easily send deals to my mom groups and we all benefit from the savings.",
    author: "Jennifer K.",
    location: "Los Angeles",
    rating: 4
  },
  {
    id: "4",
    text: "I've been following these deals for months and my daughter's wardrobe has never looked better. Quality clothes at amazing prices!",
    author: "David R.",
    location: "Boston",
    rating: 5
  }
];

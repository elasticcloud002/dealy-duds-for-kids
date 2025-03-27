
import React, { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { FeaturedDeals } from '@/components/FeaturedDeals';
import { Categories } from '@/components/Categories';
import { Testimonials } from '@/components/Testimonials';
import { Newsletter } from '@/components/Newsletter';
import { Footer } from '@/components/Footer';
import { useDeals, getTodaysDeals, filterDeals } from '@/utils/dealUtils';
import { ArrowDown } from 'lucide-react';
import {TodaysDeals} from "@/components/TodayDeals";

const Index = () => {
  const { deals, todaysDeals } = useDeals();
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Filter deals for different sections
  const hotDeals = filterDeals(deals, { isHot: true });
  const newArrivals = filterDeals(deals, { isNew: true });
  const featuredDeals = filterDeals(deals, { isFeatured: true });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-4 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 md:mb-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-serif font-medium mb-6 tracking-tight">
              Discover Amazing Deals on Clothing
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Handpicked discounts from your favorite brands, refreshed daily for savvy parents.
            </p>
            
            <div className="mt-12 flex justify-center">
              <a 
                href="#today" 
                className="flex flex-col items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="mb-2">Scroll to see today's deals</span>
                <ArrowDown className="h-5 w-5 animate-pulse-soft" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute -top-40 -left-40 h-96 w-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 h-64 w-64 bg-primary/5 rounded-full blur-3xl"></div>
        </div>
      </section>
      
      {/* Today's Fresh Deals */}
      <section id="today" className="py-4 px-4">
        <div className="container mx-auto max-w-6xl">
          <TodaysDeals
            title="Today's Fresh Deals"
            description="New deals posted today, refreshed every 24 hours."
            deals={todaysDeals.length > 0 ? todaysDeals : featuredDeals.slice(0, 4)}
            viewAllLink="/todays-deals"
          />
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <Categories />
        </div>
      </section>
      
      {/* Hot Deals Section */}
      <section className="py-12 px-4 bg-secondary">
        <div className="container mx-auto max-w-6xl">
          <FeaturedDeals
            title="Hot Deals"
            description="Limited-time offers you don't want to miss."
            deals={hotDeals.slice(0, 4)}
            viewAllLink="/hot-deals"
          />
        </div>
      </section>
      
      {/* New Arrivals Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <FeaturedDeals
            title="New Arrivals"
            description="The latest discounts added to our collection."
            deals={newArrivals.slice(0, 4)}
            viewAllLink="/new-arrivals"
          />
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <Testimonials />
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <Newsletter />
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;

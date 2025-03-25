
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { testimonials } from '@/utils/dealUtils';
import { Button } from '@/components/ui/button';

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  const nextTestimonial = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <div className="bg-secondary py-16 px-6 rounded-3xl overflow-hidden relative">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-serif font-medium mb-8 text-center">What Our Community Says</h2>
        
        <div className="relative">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`transition-all duration-500 ${
                index === activeIndex 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 absolute inset-0 translate-x-16'
              }`}
            >
              <div className="text-center">
                <div className="mb-6 flex justify-center">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star 
                      key={starIndex} 
                      className={`h-5 w-5 ${
                        starIndex < testimonial.rating 
                          ? 'text-yellow-500 fill-yellow-500' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                
                <blockquote className="text-lg md:text-xl font-serif italic mb-6">
                  "{testimonial.text}"
                </blockquote>
                
                <div className="font-medium">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{testimonial.location}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-8 gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === activeIndex 
                  ? 'bg-primary w-8' 
                  : 'bg-muted w-2 hover:bg-muted-foreground'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 flex justify-between pointer-events-none">
          <Button 
            variant="secondary" 
            size="icon" 
            onClick={prevTestimonial}
            className="h-10 w-10 rounded-full pointer-events-auto opacity-70 hover:opacity-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="secondary" 
            size="icon" 
            onClick={nextTestimonial}
            className="h-10 w-10 rounded-full pointer-events-auto opacity-70 hover:opacity-100"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

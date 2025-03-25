
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "You've been subscribed to our daily deals newsletter.",
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="py-16 px-4 md:px-8 glass-effect rounded-3xl relative overflow-hidden">
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <Bell className="h-10 w-10 mx-auto mb-4 text-primary animate-pulse-soft" />
        <h2 className="text-2xl md:text-3xl font-serif font-medium mb-3">Never Miss a Deal</h2>
        <p className="text-muted-foreground mb-6">
          Subscribe to receive our daily picks directly to your inbox. Be the first to know about exclusive discounts and flash sales.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <Button type="submit" disabled={isSubmitting} className="sm:flex-shrink-0">
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
        
        <p className="text-xs text-muted-foreground mt-4">
          By subscribing, you agree to receive marketing emails from us. Don't worry, we hate spam too!
        </p>
      </div>

      {/* Background elements */}
      <div className="absolute -top-20 -right-20 h-64 w-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 h-64 w-64 bg-primary/5 rounded-full blur-3xl"></div>
    </div>
  );
};

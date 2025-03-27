
import React from 'react';
import { ExternalLink, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Deal, formatCurrency, shareToWhatsApp } from '@/utils/dealUtils';

interface DealCardProps {
  deal: Deal;
  index?: number;
}

export const DealCard: React.FC<DealCardProps> = ({ deal, index = 0 }) => {
  const openAffiliateLink = () => {
    window.open(deal.affiliateLink, '_blank');
  };

  const animationDelay = index * 0.1; // Stagger the animations

  return (
    <div 
      className="deal-card bg-white rounded-xl border shadow-sm"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        {/* Image */}
        <img 
          src={deal.imageUrl} 
          alt={deal.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        
        {/* Tags */}
        <div className="absolute top-3 left-3 flex gap-2">
          {deal.isNew && (
            <span className="bg-deal-new text-white text-xs font-medium px-2 py-1 rounded-full">
              New
            </span>
          )}
          {deal.isHot && (
            <span className="bg-deal-hot text-white text-xs font-medium px-2 py-1 rounded-full">
              Hot
            </span>
          )}
          <span className="bg-deal-sale text-white text-xs font-medium px-2 py-1 rounded-full">
            {deal.discount}% Off
          </span>
        </div>
        
        {/* Buttons overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Button 
            variant="secondary" 
            size="icon" 
            className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button 
            variant="secondary" 
            size="icon" 
            className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={() => shareToWhatsApp(deal)}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium mb-1 line-clamp-2">{deal.title}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{deal.description}</p>
        
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">{formatCurrency(deal.dealPrice)}</span>
              <span className="text-muted-foreground line-through text-sm">{formatCurrency(deal.originalPrice)}</span>
            </div>
            <p className="text-xs text-muted-foreground">{deal.category} • {deal.subcategory}</p>
          </div>
        </div>
        
        <Button 
          className="w-full gap-2" 
          onClick={openAffiliateLink}
        >
          Shop Now <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

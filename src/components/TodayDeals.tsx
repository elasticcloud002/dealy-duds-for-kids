
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { DealCard } from './DealCard';
import { Deal } from '@/utils/dealUtils';
import { Button } from '@/components/ui/button';

interface TodaysDealsProps {
    title: string;
    description?: string;
    deals: Deal[];
    viewAllLink?: string;
}

export const TodaysDeals: React.FC<TodaysDealsProps> = ({
    title,
    description,
    deals,
    viewAllLink
}) => {
    return (
        <div className="animate-slide-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h2 className="text-2xl md:text-3xl font-serif font-medium mb-2">{title}</h2>
                    {description && <p className="text-muted-foreground">{description}</p>}
                </div>
                {viewAllLink && (
                    <Button
                        variant="ghost"
                        className="hover-underline mt-2 md:mt-0"
                        asChild
                    >
                        <a href={viewAllLink}>
                            View All <ChevronRight className="h-4 w-4 ml-1" />
                        </a>
                    </Button>
                )}
            </div>

            <div className="overflow-x-auto sm:overflow-visible">
                <div className="flex sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {deals.map((deal, index) => (
                        <div key={deal.id} className="w-full flex-shrink-0 sm:w-auto">
                            <DealCard deal={deal} index={index} />
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
};

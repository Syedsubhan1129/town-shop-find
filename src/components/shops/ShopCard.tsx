
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Shop } from "@/utils/data";

interface ShopCardProps {
  shop: Shop;
}

const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
  return (
    <Link to={`/shop/${shop.id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-all h-full">
        <div className="aspect-video overflow-hidden relative">
          <img 
            src={shop.image} 
            alt={shop.name} 
            className="object-cover w-full h-full transition-transform hover:scale-105"
          />
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-xl mb-1">{shop.name}</h3>
          <div className="flex items-start text-muted-foreground text-sm">
            <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
            <p>{shop.address}</p>
          </div>
          <p className="mt-2 text-sm line-clamp-2 text-gray-600">
            {shop.description}
          </p>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <span className="text-sm text-brand-blue font-medium">
            View Products →
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ShopCard;

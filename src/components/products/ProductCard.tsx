
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/utils/data";

interface ProductCardProps {
  product: Product;
  showShopInfo?: boolean;
  shopName?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showShopInfo = false, shopName }) => {
  const discountedPrice = 
    product.discount > 0 
      ? Math.round(product.price - (product.price * product.discount / 100)) 
      : product.price;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md animate-fade-in">
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="object-cover w-full h-full transition-transform hover:scale-105" 
        />
        {product.discount > 0 && (
          <Badge className="absolute top-2 right-2 bg-brand-orange text-white">
            {product.discount}% OFF
          </Badge>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="outline" className="text-white border-white text-lg font-semibold">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
          {showShopInfo && shopName && (
            <p className="text-sm text-muted-foreground">{shopName}</p>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 h-10">
          {product.description}
        </p>
        
        <div className="flex items-baseline mt-2">
          <span className="text-lg font-semibold">₹{discountedPrice}</span>
          {product.discount > 0 && (
            <span className="ml-2 text-sm text-muted-foreground line-through">
              ₹{product.price}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          disabled={!product.inStock}
          variant={product.inStock ? "default" : "outline"}
        >
          {product.inStock ? "Add to Cart" : "Notify Me"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

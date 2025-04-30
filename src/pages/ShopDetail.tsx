
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getShopById, getProductsByShop } from "@/utils/data";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, Search, ArrowLeft } from "lucide-react";

const ShopDetail = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  const shop = shopId ? getShopById(shopId) : undefined;
  const products = shopId ? getProductsByShop(shopId) : [];

  // If shop isn't found, redirect to browse
  useEffect(() => {
    if (!shop) {
      navigate("/browse");
    }
  }, [shop, navigate]);

  // Extract unique categories from shop products
  const categories = Array.from(
    new Set(products.map(product => product.category))
  );

  // Filter products by search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === "" || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = categoryFilter === "" || 
      product.category === categoryFilter;
      
    return matchesSearch && matchesCategory;
  });

  if (!shop) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-6 pl-0" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="relative rounded-xl overflow-hidden h-64 md:h-80 mb-8">
        <img 
          src={shop.image} 
          alt={shop.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-6 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{shop.name}</h1>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <p>{shop.address}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <p className="text-muted-foreground">{shop.description}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold mb-4">Shop Information</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <MapPin className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
              <div>
                <p className="font-medium">Address</p>
                <p className="text-muted-foreground">{shop.address}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-muted-foreground">+91 9876543210</p>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-muted-foreground">{shop.name.toLowerCase().replace(/\s+/g, '')}@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Products</h2>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={categoryFilter === "" ? "default" : "outline"}
              onClick={() => setCategoryFilter("")}
              className="whitespace-nowrap"
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={categoryFilter === category ? "default" : "outline"}
                onClick={() => setCategoryFilter(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">
              Try changing your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopDetail;

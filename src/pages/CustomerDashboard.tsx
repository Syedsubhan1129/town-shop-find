
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "@/contexts/LocationContext";
import { useAuth } from "@/contexts/AuthContext";
import { getShopsByCity, getProductsByShop, shops, products } from "@/utils/data";
import ShopCard from "@/components/shops/ShopCard";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Store, Tag } from "lucide-react";

const CustomerDashboard = () => {
  const { selectedCity, setSelectedCity } = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  
  const cityShops = getShopsByCity(selectedCity);
  
  // Get all products for shops in the city
  const allCityProducts = cityShops.flatMap(shop => 
    getProductsByShop(shop.id)
  );
  
  // Filter products by search term and category
  const filteredProducts = allCityProducts.filter(product => {
    const matchesSearch = searchTerm === "" || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = categoryFilter === "" || 
      product.category === categoryFilter;
      
    return matchesSearch && matchesCategory;
  });
  
  // Extract unique categories
  const categories = Array.from(
    new Set(allCityProducts.map(product => product.category))
  );

  // Set user's city if they don't have a selected city
  useEffect(() => {
    if (!selectedCity && user?.city) {
      setSelectedCity(user.city);
    }
  }, [selectedCity, user, setSelectedCity]);

  // Redirect to location selection if no city is selected
  useEffect(() => {
    if (!selectedCity && !user?.city) {
      navigate("/");
    }
  }, [selectedCity, user, navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Discover in {selectedCity}
        </h1>
        <p className="text-muted-foreground">
          Find great products from local shops near you
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
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
      
      <Tabs defaultValue="products">
        <TabsList className="mb-6">
          <TabsTrigger value="products">
            <Tag className="h-4 w-4 mr-2" />
            Products
          </TabsTrigger>
          <TabsTrigger value="shops">
            <Store className="h-4 w-4 mr-2" />
            Shops
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="products">
          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product) => {
                const productShop = shops.find(s => s.id === product.shopId);
                return (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    showShopInfo={true}
                    shopName={productShop?.name}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground">
                Try changing your search or filter criteria
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="shops">
          {cityShops.length > 0 ? (
            <div className="shop-grid">
              {cityShops.map((shop) => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">No shops found</h3>
              <p className="text-muted-foreground">
                There are no shops registered in {selectedCity} yet
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerDashboard;

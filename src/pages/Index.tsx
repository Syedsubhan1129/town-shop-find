
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cities } from "@/utils/data";
import { useLocation } from "@/contexts/LocationContext";
import { Store, ShoppingBag, MapPin } from "lucide-react";

const Index = () => {
  const { selectedCity, setSelectedCity } = useLocation();
  const navigate = useNavigate();
  const [searchCity, setSearchCity] = useState("");

  const filteredCities = searchCity.trim() === "" 
    ? cities 
    : cities.filter(city => 
        city.name.toLowerCase().includes(searchCity.toLowerCase())
      );

  const handleContinue = () => {
    if (selectedCity) {
      navigate("/browse");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brand-blue to-blue-500 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Discover Local Shops Around You
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Shop from your favorite local stores and discover new ones in your city.
              Support local businesses while enjoying the convenience of online shopping.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-brand-blue hover:bg-gray-100"
                onClick={() => navigate("/register")}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop as Customer
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate("/register")}
              >
                <Store className="mr-2 h-5 w-5" />
                Register Your Shop
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* City Selection Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Select Your City to Start Shopping
            </h2>
            <p className="text-muted-foreground">
              We'll show you shops and products available in your area.
            </p>
          </div>

          <div className="mb-8">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for your city..."
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredCities.map((city) => (
              <button
                key={city.id}
                className={`p-4 rounded-lg border text-center transition-all
                  ${
                    selectedCity === city.name
                      ? "bg-brand-blue text-white border-brand-blue"
                      : "border-gray-200 hover:border-brand-blue hover:text-brand-blue"
                  }
                `}
                onClick={() => setSelectedCity(city.name)}
              >
                {city.name}
              </button>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button 
              size="lg" 
              disabled={!selectedCity} 
              onClick={handleContinue}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Why Shop with TownShop?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-brand-lightblue rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Shopping</h3>
              <p className="text-muted-foreground">
                Support businesses in your community and get products from stores you trust.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-brand-lightblue rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover Products</h3>
              <p className="text-muted-foreground">
                Find unique items from local shops all in one convenient place.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-brand-lightblue rounded-full flex items-center justify-center mx-auto mb-4">
                <Store className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">For Shop Owners</h3>
              <p className="text-muted-foreground">
                Easily list your products and reach more customers in your area.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

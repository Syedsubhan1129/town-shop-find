
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cities } from "@/utils/data";
import { useLocation } from "@/contexts/LocationContext";
import { Store, ShoppingBag, MapPin } from "lucide-react";

// Custom CSS styles directly in the component
const styles = {
  heroSection: `
    background: linear-gradient(90deg, #1a56db 0%, #3b82f6 100%);
    color: white;
    padding: 4rem 1rem;
    text-align: center;
  `,
  container: `
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  `,
  heroTitle: `
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  `,
  heroText: `
    font-size: 1.125rem;
    margin-bottom: 2rem;
    opacity: 0.9;
    max-width: 42rem;
    margin-left: auto;
    margin-right: auto;
  `,
  buttonGroup: `
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  `,
  customerButton: `
    background-color: white;
    color: #1a56db;
    display: flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    font-weight: 500;
    border-radius: 0.375rem;
    transition: all 0.3s ease;
    &:hover {
      background-color: #f9fafb;
      transform: translateY(-2px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
  `,
  shopButton: `
    background-color: transparent;
    color: #3b82f6;
    border: 1px solid white;
    display: flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    font-weight: 500;
    border-radius: 0.375rem;
    transition: all 0.3s ease;
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
  `,
  citySection: `
    padding: 4rem 1rem;
  `,
  cityHeading: `
    text-align: center;
    font-size: 1.875rem;
    font-weight: bold;
    margin-bottom: 1rem;
  `,
  citySubheading: `
    text-align: center;
    color: #6b7280;
    margin-bottom: 2rem;
  `,
  searchInput: `
    width: 100%;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    margin-bottom: 2rem;
    transition: all 0.3s ease;
    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
    }
  `,
  citiesGrid: `
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 1rem;
  `,
  cityButton: `
    padding: 1rem;
    text-align: center;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
    cursor: pointer;
    &:hover {
      border-color: #3b82f6;
      color: #3b82f6;
    }
  `,
  cityButtonSelected: `
    background-color: #1a56db;
    color: white;
    border-color: #1a56db;
    &:hover {
      background-color: #1e40af;
      color: white;
      border-color: #1e40af;
    }
  `,
  continueButton: `
    display: block;
    width: auto;
    margin: 2rem auto 0;
    padding: 0.75rem 2rem;
    background-color: #1a56db;
    color: white;
    border-radius: 0.375rem;
    font-weight: 500;
    transition: all 0.3s ease;
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    &:not(:disabled):hover {
      background-color: #1e40af;
      transform: translateY(-2px);
    }
  `,
  featuresSection: `
    background-color: #f9fafb;
    padding: 4rem 1rem;
  `,
  featureHeading: `
    text-align: center;
    font-size: 1.875rem;
    font-weight: bold;
    margin-bottom: 3rem;
  `,
  featureGrid: `
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  `,
  featureCard: `
    background-color: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    text-align: center;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
  `,
  featureIconWrapper: `
    width: 4rem;
    height: 4rem;
    background-color: #eef2ff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
  `,
  featureTitle: `
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  `,
  featureDescription: `
    color: #6b7280;
  `
};

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
    <div>
      {/* Hero Section with custom styles */}
      <div style={{background: "linear-gradient(90deg, #1a56db 0%, #3b82f6 100%)", color: "white", padding: "4rem 1rem"}}>
        <div style={{maxWidth: "1200px", margin: "0 auto", padding: "0 1rem"}}>
          <div style={{maxWidth: "768px", margin: "0 auto", textAlign: "center"}}>
            <h1 style={{fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1.5rem"}}>
              Discover Local Shops Around You
            </h1>
            <p style={{fontSize: "1.125rem", marginBottom: "2rem", opacity: "0.9"}}>
              Shop from your favorite local stores and discover new ones in your city.
              Support local businesses while enjoying the convenience of online shopping.
            </p>
            <div style={{display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap"}}>
              <Button 
                size="lg" 
                className="bg-white text-brand-blue hover:bg-gray-100"
                onClick={() => navigate("/register")}
                style={{display: "flex", alignItems: "center"}}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop as Customer
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white hover:bg-white/10"
                onClick={() => navigate("/register")}
                style={{display: "flex", alignItems: "center", color: "#3b82f6"}}
              >
                <Store className="mr-2 h-5 w-5" />
                Register Your Shop
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* City Selection Section */}
      <div style={{padding: "4rem 1rem"}}>
        <div style={{maxWidth: "1200px", margin: "0 auto"}}>
          <div style={{textAlign: "center", marginBottom: "2rem"}}>
            <h2 style={{fontSize: "1.875rem", fontWeight: "bold", marginBottom: "1rem"}}>
              Select Your City to Start Shopping
            </h2>
            <p style={{color: "#6b7280"}}>
              We'll show you shops and products available in your area.
            </p>
          </div>

          <div style={{marginBottom: "2rem", position: "relative", maxWidth: "600px", margin: "0 auto"}}>
            <MapPin style={{position: "absolute", left: "12px", top: "12px", height: "20px", width: "20px", color: "#6b7280"}} />
            <input
              type="text"
              placeholder="Search for your city..."
              style={{
                width: "100%", 
                paddingLeft: "40px", 
                paddingRight: "16px", 
                paddingTop: "12px", 
                paddingBottom: "12px", 
                border: "1px solid #e5e7eb", 
                borderRadius: "8px",
                outline: "none"
              }}
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
            />
          </div>

          <div 
            style={{
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", 
              gap: "1rem"
            }}
          >
            {filteredCities.map((city) => (
              <button
                key={city.id}
                style={{
                  padding: "1rem",
                  textAlign: "center",
                  border: "1px solid",
                  borderColor: selectedCity === city.name ? "#1a56db" : "#e5e7eb",
                  borderRadius: "8px",
                  backgroundColor: selectedCity === city.name ? "#1a56db" : "transparent",
                  color: selectedCity === city.name ? "white" : "inherit",
                  transition: "all 0.2s ease",
                  cursor: "pointer"
                }}
                onClick={() => setSelectedCity(city.name)}
              >
                {city.name}
              </button>
            ))}
          </div>

          <div style={{textAlign: "center", marginTop: "2rem"}}>
            <Button 
              size="lg" 
              disabled={!selectedCity} 
              onClick={handleContinue}
              style={{
                opacity: !selectedCity ? 0.5 : 1,
                cursor: !selectedCity ? "not-allowed" : "pointer"
              }}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{backgroundColor: "#f9fafb", padding: "4rem 1rem"}}>
        <div style={{maxWidth: "1200px", margin: "0 auto"}}>
          <h2 style={{fontSize: "1.875rem", fontWeight: "bold", textAlign: "center", marginBottom: "3rem"}}>
            Why Shop with TownShop?
          </h2>
          
          <div 
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem"
            }}
          >
            <div 
              style={{
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "8px",
                textAlign: "center",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease"
              }}
              className="feature-card"
            >
              <div 
                style={{
                  width: "4rem",
                  height: "4rem",
                  backgroundColor: "#eef2ff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem"
                }}
              >
                <MapPin style={{height: "2rem", width: "2rem", color: "#1a56db"}} />
              </div>
              <h3 style={{fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem"}}>Local Shopping</h3>
              <p style={{color: "#6b7280"}}>
                Support businesses in your community and get products from stores you trust.
              </p>
            </div>
            
            <div 
              style={{
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "8px",
                textAlign: "center",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease"
              }}
              className="feature-card"
            >
              <div 
                style={{
                  width: "4rem",
                  height: "4rem",
                  backgroundColor: "#eef2ff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem"
                }}
              >
                <ShoppingBag style={{height: "2rem", width: "2rem", color: "#1a56db"}} />
              </div>
              <h3 style={{fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem"}}>Discover Products</h3>
              <p style={{color: "#6b7280"}}>
                Find unique items from local shops all in one convenient place.
              </p>
            </div>
            
            <div 
              style={{
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "8px",
                textAlign: "center",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease"
              }}
              className="feature-card"
            >
              <div 
                style={{
                  width: "4rem",
                  height: "4rem",
                  backgroundColor: "#eef2ff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem"
                }}
              >
                <Store style={{height: "2rem", width: "2rem", color: "#1a56db"}} />
              </div>
              <h3 style={{fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem"}}>For Shop Owners</h3>
              <p style={{color: "#6b7280"}}>
                Easily list your products and reach more customers in your area.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom JavaScript for hover effects */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            const featureCards = document.querySelectorAll('.feature-card');
            
            featureCards.forEach(card => {
              card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
              });
              
              card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
              });
            });
          });
        `
      }} />
    </div>
  );
};

export default Index;

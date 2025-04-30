
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "@/contexts/LocationContext";
import { MapPin, User, LogOut, ShoppingBag, Store } from "lucide-react";
import { cities } from "@/utils/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { selectedCity, setSelectedCity } = useLocation();

  return (
    <nav className="bg-white shadow-sm px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-2">
            <Store className="h-6 w-6 text-brand-blue" />
            <span className="text-xl font-bold text-brand-blue">TownShop</span>
          </Link>
          
          {selectedCity && (
            <div className="hidden md:flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Delivering to: {selectedCity}</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {!selectedCity && !user?.city && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Select City
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {cities.map((city) => (
                  <DropdownMenuItem key={city.id} onClick={() => setSelectedCity(city.name)}>
                    {city.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {user ? (
            <div className="flex items-center space-x-4">
              <Link to={user.role === "shop_owner" ? "/shop-dashboard" : "/browse"}>
                <Button variant="ghost" className="flex items-center space-x-1">
                  {user.role === "shop_owner" ? (
                    <Store className="h-4 w-4" />
                  ) : (
                    <ShoppingBag className="h-4 w-4" />
                  )}
                  <span>{user.role === "shop_owner" ? "My Shops" : "Browse"}</span>
                </Button>
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    {user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="default">Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

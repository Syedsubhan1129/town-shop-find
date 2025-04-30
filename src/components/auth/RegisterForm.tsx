
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { cities } from "@/utils/data";

interface RegisterFormProps {
  onLoginClick: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onLoginClick }) => {
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Register form state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerRole, setRegisterRole] = useState<"customer" | "shop_owner">("customer");
  const [registerCity, setRegisterCity] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterLoading(true);
    
    try {
      const success = await register(
        registerName, 
        registerEmail, 
        registerPassword, 
        registerRole,
        registerCity || undefined
      );
      
      if (success) {
        toast({
          title: "Registration Successful",
          description: "Welcome to TownShop!",
        });
        navigate(registerRole === "shop_owner" ? "/shop-dashboard" : "/browse");
      } else {
        toast({
          title: "Registration Failed",
          description: "Email already in use",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Registration Error",
        description: "An error occurred during registration",
        variant: "destructive",
      });
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>
      <p className="text-muted-foreground text-center">
        Join TownShop to start shopping or selling
      </p>
      
      <form onSubmit={handleRegister} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={registerName}
            onChange={(e) => setRegisterName(e.target.value)}
            required
            className="border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="register-email">Email</Label>
          <Input
            id="register-email"
            type="email"
            placeholder="you@example.com"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            required
            className="border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="register-password">Password</Label>
          <Input
            id="register-password"
            type="password"
            placeholder="••••••••"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            required
            className="border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Select value={registerCity} onValueChange={setRegisterCity}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city.id} value={city.name}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>I want to:</Label>
          <RadioGroup
            value={registerRole}
            onValueChange={(value) => setRegisterRole(value as "customer" | "shop_owner")}
            className="flex flex-col space-y-3"
          >
            <div className="flex items-center space-x-3 bg-blue-50 p-3 rounded-md hover:bg-blue-100 transition-colors cursor-pointer">
              <RadioGroupItem value="customer" id="customer" className="text-brand-blue" />
              <Label htmlFor="customer" className="cursor-pointer font-medium">Shop as a Customer</Label>
            </div>
            <div className="flex items-center space-x-3 bg-orange-50 p-3 rounded-md hover:bg-orange-100 transition-colors cursor-pointer">
              <RadioGroupItem value="shop_owner" id="shop-owner" className="text-brand-orange" />
              <Label htmlFor="shop-owner" className="cursor-pointer font-medium">Sell as a Shop Owner</Label>
            </div>
          </RadioGroup>
        </div>
        
        <Button 
          type="submit" 
          className={`w-full ${registerRole === "customer" ? "bg-brand-blue hover:bg-blue-600" : "bg-brand-orange hover:bg-brand-darkorange"} transition-colors`}
          disabled={registerLoading}
        >
          {registerLoading ? "Creating Account..." : registerRole === "shop_owner" ? 
            "Register your shop" : "Register as customer"}
        </Button>
      </form>
      
      <div className="text-center mt-4">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <button
            onClick={onLoginClick}
            className="text-brand-blue font-semibold hover:text-blue-600 hover:underline transition-colors"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;

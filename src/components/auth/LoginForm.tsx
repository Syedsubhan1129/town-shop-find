
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  onRegisterClick: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onRegisterClick }) => {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    
    try {
      const success = await login(loginEmail, loginPassword);
      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome back to TownShop!",
        });
        // User role is determined from the logged in user data
        const userRole = localStorage.getItem("townshop_user") 
          ? JSON.parse(localStorage.getItem("townshop_user")!).role 
          : "customer";
        navigate(userRole === "shop_owner" ? "/shop-dashboard" : "/browse");
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back</h2>
      <p className="text-muted-foreground text-center">
        Sign in to your account to continue
      </p>
      
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
            className="border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
            className="border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-brand-blue hover:bg-blue-600 transition-colors" 
          disabled={loginLoading}
        >
          {loginLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
      
      <div className="text-center mt-4">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <button
            onClick={onRegisterClick}
            className="text-brand-blue font-semibold hover:text-blue-600 hover:underline transition-colors"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;


import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthModal: React.FC<{ defaultTab?: string }> = ({ 
  defaultTab = "login" 
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md animate-fade-in">
      <Tabs defaultValue={defaultTab} value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login" className="text-base">Login</TabsTrigger>
          <TabsTrigger value="register" className="text-base">Register</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <LoginForm onRegisterClick={() => setActiveTab("register")} />
        </TabsContent>
        
        <TabsContent value="register">
          <RegisterForm onLoginClick={() => setActiveTab("login")} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthModal;


import React from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-600">
                &copy; {new Date().getFullYear()} TownShop. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-sm text-gray-600 hover:text-brand-blue">Terms</a>
              <a href="#" className="text-sm text-gray-600 hover:text-brand-blue">Privacy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-brand-blue">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

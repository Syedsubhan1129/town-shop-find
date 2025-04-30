
// Simple in-memory database service that reads from JSON files
// In a real application, this would be replaced with actual database calls

import usersData from '../utils/database/users.json';
import productsData from '../utils/database/products.json';
import shopsData from '../utils/database/shops.json';

// In-memory storage
let users = [...usersData];
let products = [...productsData];
let shops = [...shopsData];

// User Service
export const userService = {
  // Get all users
  getAllUsers: () => {
    return [...users];
  },
  
  // Get user by ID
  getUserById: (id) => {
    return users.find(user => user.id === id);
  },
  
  // Get user by email
  getUserByEmail: (email) => {
    return users.find(user => user.email.toLowerCase() === email.toLowerCase());
  },
  
  // Create user
  createUser: (userData) => {
    const newUser = {
      id: String(users.length + 1),
      ...userData,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    return newUser;
  },
  
  // Update user
  updateUser: (id, userData) => {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) return null;
    
    const updatedUser = { ...users[index], ...userData };
    users[index] = updatedUser;
    return updatedUser;
  },
  
  // Delete user
  deleteUser: (id) => {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) return false;
    
    users.splice(index, 1);
    return true;
  },
  
  // Authenticate user
  authenticate: (email, password) => {
    const user = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    
    if (user) {
      // Create a sanitized version without the password
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    
    return null;
  }
};

// Product Service
export const productService = {
  // Get all products
  getAllProducts: () => {
    return [...products];
  },
  
  // Get products by shop ID
  getProductsByShopId: (shopId) => {
    return products.filter(product => product.shopId === shopId);
  },
  
  // Get product by ID
  getProductById: (id) => {
    return products.find(product => product.id === id);
  },
  
  // Create product
  createProduct: (productData) => {
    const newProduct = {
      id: String(products.length + 1),
      ...productData,
      createdAt: new Date().toISOString()
    };
    
    products.push(newProduct);
    return newProduct;
  },
  
  // Update product
  updateProduct: (id, productData) => {
    const index = products.findIndex(product => product.id === id);
    if (index === -1) return null;
    
    const updatedProduct = { ...products[index], ...productData };
    products[index] = updatedProduct;
    return updatedProduct;
  },
  
  // Delete product
  deleteProduct: (id) => {
    const index = products.findIndex(product => product.id === id);
    if (index === -1) return false;
    
    products.splice(index, 1);
    return true;
  }
};

// Shop Service
export const shopService = {
  // Get all shops
  getAllShops: () => {
    return [...shops];
  },
  
  // Get shop by ID
  getShopById: (id) => {
    return shops.find(shop => shop.id === id);
  },
  
  // Get shops by owner ID
  getShopsByOwnerId: (ownerId) => {
    return shops.filter(shop => shop.ownerId === ownerId);
  },
  
  // Get shops by city
  getShopsByCity: (city) => {
    return shops.filter(shop => shop.city.toLowerCase() === city.toLowerCase());
  },
  
  // Create shop
  createShop: (shopData) => {
    const newShop = {
      id: String(shops.length + 1),
      ...shopData,
      createdAt: new Date().toISOString()
    };
    
    shops.push(newShop);
    return newShop;
  },
  
  // Update shop
  updateShop: (id, shopData) => {
    const index = shops.findIndex(shop => shop.id === id);
    if (index === -1) return null;
    
    const updatedShop = { ...shops[index], ...shopData };
    shops[index] = updatedShop;
    return updatedShop;
  },
  
  // Delete shop
  deleteShop: (id) => {
    const index = shops.findIndex(shop => shop.id === id);
    if (index === -1) return false;
    
    shops.splice(index, 1);
    return true;
  }
};

// Export a single database service that includes all the individual services
const databaseService = {
  users: userService,
  products: productService,
  shops: shopService,
};

export default databaseService;

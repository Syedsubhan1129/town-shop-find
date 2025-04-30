
// Simple in-memory database adapter for JSON files
class DatabaseService {
  constructor() {
    // Initialize with data from JSON files
    this.users = [
      {
        "id": "1",
        "name": "Demo Customer",
        "email": "customer@example.com",
        "password": "password123",
        "role": "customer",
        "city": "Mumbai",
        "createdAt": "2025-04-29T10:00:00.000Z"
      },
      {
        "id": "2",
        "name": "Demo Shop Owner",
        "email": "shop@example.com",
        "password": "password123",
        "role": "shop_owner",
        "city": "Delhi",
        "createdAt": "2025-04-29T10:00:00.000Z"
      }
    ];
    
    this.shops = [
      {
        "id": "1",
        "name": "Urban Threads",
        "description": "Locally made, sustainable clothing and accessories",
        "ownerId": "2",
        "logoUrl": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2xvdGhpbmclMjBzdG9yZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        "coverImageUrl": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2xvdGhpbmclMjBzdG9yZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        "address": "123 Main St, Mumbai",
        "city": "Mumbai",
        "contactEmail": "contact@urbanthreads.com",
        "contactPhone": "9876543210",
        "categories": ["Clothing", "Accessories"],
        "rating": 4.7,
        "createdAt": "2025-04-29T10:00:00.000Z"
      },
      {
        "id": "2",
        "name": "Earthen Wares",
        "description": "Handcrafted pottery and ceramics",
        "ownerId": "3",
        "logoUrl": "https://images.unsplash.com/photo-1607606116242-357a0bd4404f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG90dGVyeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        "coverImageUrl": "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cG90dGVyeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        "address": "456 Park Ave, Delhi",
        "city": "Delhi",
        "contactEmail": "hello@earthenwares.com",
        "contactPhone": "9876543211",
        "categories": ["Home", "Decor", "Gifts"],
        "rating": 4.9,
        "createdAt": "2025-04-29T10:00:00.000Z"
      },
      {
        "id": "3",
        "name": "Harvest Fresh",
        "description": "Locally sourced organic produce and food products",
        "ownerId": "4",
        "logoUrl": "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JvY2VyeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        "coverImageUrl": "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZmFybWVycyUyMG1hcmtldHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        "address": "789 Farm Rd, Bangalore",
        "city": "Bangalore",
        "contactEmail": "info@harvestfresh.com",
        "contactPhone": "9876543212",
        "categories": ["Food", "Grocery", "Organic"],
        "rating": 4.8,
        "createdAt": "2025-04-29T10:00:00.000Z"
      }
    ];

    this.products = [
      {
        "id": "1",
        "name": "Organic Cotton T-Shirt",
        "description": "Soft, comfortable t-shirt made from 100% organic cotton",
        "price": 599,
        "discountedPrice": 499,
        "imageUrl": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dCUyMHNoaXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        "category": "Clothing",
        "shopId": "1",
        "stock": 50,
        "rating": 4.5,
        "createdAt": "2025-04-29T10:00:00.000Z"
      },
      {
        "id": "2",
        "name": "Handcrafted Ceramic Mug",
        "description": "Beautiful handcrafted ceramic mug made by local artisans",
        "price": 399,
        "discountedPrice": 349,
        "imageUrl": "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2VyYW1pYyUyMG11Z3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        "category": "Home",
        "shopId": "2",
        "stock": 30,
        "rating": 4.8,
        "createdAt": "2025-04-29T10:00:00.000Z"
      },
      {
        "id": "3",
        "name": "Organic Honey",
        "description": "Local, organic honey produced from wildflowers",
        "price": 299,
        "discountedPrice": 299,
        "imageUrl": "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG9uZXl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        "category": "Food",
        "shopId": "3",
        "stock": 100,
        "rating": 5.0,
        "createdAt": "2025-04-29T10:00:00.000Z"
      }
    ];
  }

  // User methods
  getUserByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  authenticate(email, password) {
    const user = this.getUserByEmail(email);
    if (user && user.password === password) {
      // Create a sanitized version without password
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  createUser(userData) {
    const newUser = {
      ...userData,
      id: (this.users.length + 1).toString(),
      createdAt: new Date().toISOString()
    };
    this.users.push(newUser);
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  updateUser(userId, userData) {
    const index = this.users.findIndex(user => user.id === userId);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...userData };
      return this.users[index];
    }
    return null;
  }

  // Shop methods
  getShops() {
    return this.shops;
  }

  getShopsByCity(city) {
    if (!city) return this.shops;
    return this.shops.filter(shop => shop.city === city);
  }

  getShopsByOwner(ownerId) {
    return this.shops.filter(shop => shop.ownerId === ownerId);
  }

  getShopById(shopId) {
    return this.shops.find(shop => shop.id === shopId);
  }

  // Product methods
  getProducts() {
    return this.products;
  }

  getProductsByShop(shopId) {
    return this.products.filter(product => product.shopId === shopId);
  }

  getProductsByCategory(category) {
    if (!category) return this.products;
    return this.products.filter(product => product.category === category);
  }

  searchProducts(query) {
    if (!query) return this.products;
    const lowercaseQuery = query.toLowerCase();
    return this.products.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) || 
      product.description.toLowerCase().includes(lowercaseQuery)
    );
  }

  searchShops(query) {
    if (!query) return this.shops;
    const lowercaseQuery = query.toLowerCase();
    return this.shops.filter(shop => 
      shop.name.toLowerCase().includes(lowercaseQuery) || 
      shop.description.toLowerCase().includes(lowercaseQuery)
    );
  }
}

// Create a global instance of the database service
const db = new DatabaseService();

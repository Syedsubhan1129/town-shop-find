export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'shop_owner';
  city?: string;  // Added the city property as optional
}

export interface Shop {
  id: string;
  name: string;
  ownerId: string;
  city: string;
  address: string;
  description: string;
  image: string;
}

export interface Product {
  id: string;
  shopId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  discount: number;
  inStock: boolean;
  category: string;
}

export interface City {
  id: string;
  name: string;
}

// Sample data
export const cities: City[] = [
  { id: "1", name: "Mumbai" },
  { id: "2", name: "Delhi" },
  { id: "3", name: "Bangalore" },
  { id: "4", name: "Chennai" },
  { id: "5", name: "Hyderabad" },
  { id: "6", name: "Kolkata" },
  { id: "7", name: "Pune" },
  { id: "8", name: "Ahmedabad" },
  { id: "9", name: "Jaipur" },
  { id: "10", name: "Lucknow" },
  { id: "11", name: "Kanpur" },
  { id: "12", name: "Nagpur" },
  { id: "13", name: "Patna" },
  { id: "14", name: "Indore" },
  { id: "15", name: "Thane" },
  { id: "16", name: "Bhopal" },
  { id: "17", name: "Visakhapatnam" },
  { id: "18", name: "Vadodara" },
  { id: "19", name: "Coimbatore" },
  { id: "20", name: "Ludhiana" },
  { id: "21", name: "Kochi" },
  { id: "22", name: "Agra" },
  { id: "23", name: "Madurai" },
  { id: "24", name: "Varanasi" },
  { id: "25", name: "Meerut" },
  { id: "26", name: "Nashik" },
  { id: "27", name: "Rajkot" },
  { id: "28", name: "Surat" },
  { id: "29", name: "Amritsar" },
  { id: "30", name: "Allahabad" },
  { id: "31", name: "Ranchi" },
  { id: "32", name: "Howrah" },
  { id: "33", name: "Jabalpur" },
  { id: "34", name: "Gwalior" },
  { id: "35", name: "Vijayawada" },
  { id: "36", name: "Chandigarh" },
  { id: "37", name: "Mysore" },
  { id: "38", name: "Noida" },
  { id: "39", name: "Ghaziabad" },
  { id: "40", name: "Faridabad" },
  { id: "41", name: "Srinagar" },
  { id: "42", name: "Aurangabad" },
  { id: "43", name: "Dhanbad" },
  { id: "44", name: "Jodhpur" },
  { id: "45", name: "Tiruchirappalli" },
  { id: "46", name: "Salem" },
  { id: "47", name: "Guwahati" },
  { id: "48", name: "Shimla" },
  { id: "49", name: "Dehradun" },
  { id: "50", name: "Puducherry" },
  // Small towns and villages
  { id: "51", name: "Almora" },
  { id: "52", name: "Pushkar" },
  { id: "53", name: "Hampi" },
  { id: "54", name: "Darjeeling" },
  { id: "55", name: "Munnar" },
  { id: "56", name: "Jaisalmer" },
  { id: "57", name: "Orchha" },
  { id: "58", name: "Varkala" },
  { id: "59", name: "Khajuraho" },
  { id: "60", name: "Bir" },
  { id: "61", name: "Kasol" },
  { id: "62", name: "Dharamshala" },
  { id: "63", name: "McLeod Ganj" },
  { id: "64", name: "Tawang" },
  { id: "65", name: "Ziro" },
  { id: "66", name: "Majuli" },
  { id: "67", name: "Cherrapunji" },
  { id: "68", name: "Tirthan Valley" },
  { id: "69", name: "Spiti Valley" },
  { id: "70", name: "Kalpa" },
  { id: "71", name: "Kasar Devi" },
  { id: "72", name: "Munsiyari" },
  { id: "73", name: "Binsar" },
  { id: "74", name: "Nainital" },
  { id: "75", name: "Ranikhet" },
];

export const users: User[] = [
  {
    id: "1",
    name: "Amit Kumar",
    email: "amit@example.com",
    role: "shop_owner",
  },
  {
    id: "2",
    name: "Priya Singh",
    email: "priya@example.com",
    role: "shop_owner",
  },
  {
    id: "3",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    role: "customer",
    city: "Mumbai"
  },
  {
    id: "4",
    name: "Neha Gupta",
    email: "neha@example.com",
    role: "customer",
    city: "Delhi"
  },
];

export const shops: Shop[] = [
  {
    id: "1",
    name: "Fashion Hub",
    ownerId: "1",
    city: "Mumbai",
    address: "123 Market Street, Mumbai",
    description: "Latest fashion trends at affordable prices",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Tech World",
    ownerId: "1",
    city: "Mumbai",
    address: "456 Gadget Lane, Mumbai",
    description: "All your tech needs in one place",
    image: "https://images.unsplash.com/photo-1518655061710-5ccf392c275a?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Home Essentials",
    ownerId: "2",
    city: "Delhi",
    address: "789 Home Avenue, Delhi",
    description: "Everything you need for your home",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Organic Grocers",
    ownerId: "2",
    city: "Bangalore",
    address: "101 Green Street, Bangalore",
    description: "Farm-fresh organic produce",
    image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=1000&auto=format&fit=crop",
  },
];

export const products: Product[] = [
  {
    id: "1",
    shopId: "1",
    name: "Cotton T-Shirt",
    description: "Comfortable cotton t-shirt for everyday wear",
    price: 599,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
    discount: 10,
    inStock: true,
    category: "Clothing"
  },
  {
    id: "2",
    shopId: "1",
    name: "Denim Jeans",
    description: "Classic blue denim jeans",
    price: 1299,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000&auto=format&fit=crop",
    discount: 15,
    inStock: true,
    category: "Clothing"
  },
  {
    id: "3",
    shopId: "2",
    name: "Wireless Earbuds",
    description: "High-quality wireless earbuds with noise cancellation",
    price: 2999,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1000&auto=format&fit=crop",
    discount: 5,
    inStock: true,
    category: "Electronics"
  },
  {
    id: "4",
    shopId: "2",
    name: "Bluetooth Speaker",
    description: "Portable bluetooth speaker with deep bass",
    price: 1899,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop",
    discount: 0,
    inStock: false,
    category: "Electronics"
  },
  {
    id: "5",
    shopId: "3",
    name: "Bedsheet Set",
    description: "Cotton bedsheet set with pillow covers",
    price: 999,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e7?q=80&w=1000&auto=format&fit=crop",
    discount: 20,
    inStock: true,
    category: "Home"
  },
  {
    id: "6",
    shopId: "3",
    name: "Kitchen Utensil Set",
    description: "Stainless steel kitchen utensil set",
    price: 1499,
    image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=1000&auto=format&fit=crop",
    discount: 10,
    inStock: true,
    category: "Home"
  },
  {
    id: "7",
    shopId: "4",
    name: "Organic Apples",
    description: "Fresh organic apples (1 kg)",
    price: 199,
    image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?q=80&w=1000&auto=format&fit=crop",
    discount: 0,
    inStock: true,
    category: "Groceries"
  },
  {
    id: "8",
    shopId: "4",
    name: "Brown Rice",
    description: "Organic brown rice (5 kg)",
    price: 399,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1000&auto=format&fit=crop",
    discount: 5,
    inStock: true,
    category: "Groceries"
  },
];

// Helper functions for working with the data
export const getShopsByCity = (city: string) => {
  return shops.filter(shop => shop.city.toLowerCase() === city.toLowerCase());
};

export const getProductsByShop = (shopId: string) => {
  return products.filter(product => product.shopId === shopId);
};

export const getShopById = (shopId: string) => {
  return shops.find(shop => shop.id === shopId);
};

export const getProductById = (productId: string) => {
  return products.find(product => product.id === productId);
};

export const getShopsByOwner = (ownerId: string) => {
  return shops.filter(shop => shop.ownerId === ownerId);
};

export const updateProduct = (productId: string, updatedProduct: Partial<Product>) => {
  const index = products.findIndex(product => product.id === productId);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    return products[index];
  }
  return null;
};


// Main application JavaScript

// DOM Elements
const shopsContainer = document.getElementById('shops-container');
const productsContainer = document.getElementById('products-container');
const searchInput = document.getElementById('search-input');
const cityFilter = document.getElementById('city-filter');
const searchBtn = document.getElementById('search-btn');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const authModal = document.getElementById('auth-modal');
const closeModal = document.querySelector('.close');
const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const userMenu = document.getElementById('user-menu');
const loginError = document.getElementById('login-error');
const registerError = document.getElementById('register-error');
const shopsLink = document.getElementById('shops-link');
const productsLink = document.getElementById('products-link');

// State management
let currentUser = null;

// Check if user is already logged in (from localStorage)
function checkLoggedInUser() {
  const storedUser = localStorage.getItem('townshop_user');
  if (storedUser) {
    currentUser = JSON.parse(storedUser);
    updateUserInterface();
  }
}

// Update UI based on login state
function updateUserInterface() {
  if (currentUser) {
    // Create user menu HTML
    const userMenuHTML = `
      <div class="dropdown-menu">
        <div class="user-info">
          <div class="user-avatar">${currentUser.name.charAt(0)}</div>
          <span>${currentUser.name}</span>
        </div>
        <div class="dropdown-content">
          <a href="#" class="dropdown-item" id="dashboard-link">Dashboard</a>
          <a href="#" class="dropdown-item" id="profile-link">Profile</a>
          <a href="#" class="dropdown-item" id="logout-link">Logout</a>
        </div>
      </div>
    `;
    userMenu.innerHTML = userMenuHTML;
    
    // Add event listeners for new menu items
    document.getElementById('logout-link').addEventListener('click', handleLogout);
    document.getElementById('dashboard-link').addEventListener('click', () => {
      navigateToPage(currentUser.role === 'shop_owner' ? 'shop-dashboard' : 'customer-dashboard');
    });
  } else {
    // Reset to login/register buttons
    userMenu.innerHTML = `
      <button id="login-btn" class="btn">Login</button>
      <button id="register-btn" class="btn btn-primary">Register</button>
    `;
    
    // Re-attach event listeners
    document.getElementById('login-btn').addEventListener('click', openLoginModal);
    document.getElementById('register-btn').addEventListener('click', openRegisterModal);
  }
}

// Handle logout
function handleLogout(e) {
  e.preventDefault();
  localStorage.removeItem('townshop_user');
  currentUser = null;
  updateUserInterface();
  navigateToPage('home');
}

// Modal functions
function openModal() {
  authModal.style.display = 'block';
}

function closeModalHandler() {
  authModal.style.display = 'none';
  loginForm.reset();
  registerForm.reset();
  loginError.textContent = '';
  registerError.textContent = '';
}

function openLoginModal() {
  showLoginTab();
  openModal();
}

function openRegisterModal() {
  showRegisterTab();
  openModal();
}

function showLoginTab() {
  loginTab.classList.add('active');
  registerTab.classList.remove('active');
  loginForm.style.display = 'flex';
  registerForm.style.display = 'none';
}

function showRegisterTab() {
  registerTab.classList.add('active');
  loginTab.classList.remove('active');
  registerForm.style.display = 'flex';
  loginForm.style.display = 'none';
}

// Authentication handlers
function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  
  // Validate inputs
  if (!email || !password) {
    loginError.textContent = 'Please enter email and password';
    return;
  }
  
  // Authenticate with the database
  const user = db.authenticate(email, password);
  
  if (user) {
    currentUser = user;
    localStorage.setItem('townshop_user', JSON.stringify(user));
    updateUserInterface();
    closeModalHandler();
    
    // Redirect based on role
    if (user.role === 'shop_owner') {
      // Show shop owner dashboard
      navigateToPage('shop-dashboard');
    } else {
      // Show customer dashboard or home
      navigateToPage('customer-dashboard');
    }
  } else {
    loginError.textContent = 'Invalid email or password';
  }
}

function handleRegister(e) {
  e.preventDefault();
  
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const city = document.getElementById('register-city').value;
  const role = document.getElementById('register-role').value;
  
  // Validate inputs
  if (!name || !email || !password) {
    registerError.textContent = 'Please fill all required fields';
    return;
  }
  
  // Check if user already exists
  if (db.getUserByEmail(email)) {
    registerError.textContent = 'User with this email already exists';
    return;
  }
  
  // Register in the database
  const newUser = db.createUser({
    name,
    email,
    password,
    city,
    role
  });
  
  if (newUser) {
    currentUser = newUser;
    localStorage.setItem('townshop_user', JSON.stringify(newUser));
    updateUserInterface();
    closeModalHandler();
    
    // Redirect based on role
    if (newUser.role === 'shop_owner') {
      navigateToPage('shop-dashboard');
    } else {
      navigateToPage('customer-dashboard');
    }
  } else {
    registerError.textContent = 'Registration failed';
  }
}

// Navigation functions
function navigateToPage(page) {
  // Clear main content and show appropriate content
  // This would be expanded in a real application with more complex routing
  
  // Simple example of conditional content display
  document.querySelectorAll('section').forEach(section => {
    section.style.display = 'none';
  });
  
  // Show specific page content
  // In a real app, would load different HTML or change routes
  if (page === 'home' || page === '') {
    document.querySelector('.hero').style.display = 'block';
    document.querySelector('.featured-shops').style.display = 'block';
    document.querySelector('.featured-products').style.display = 'block';
    loadFeaturedShops();
    loadPopularProducts();
  } else if (page === 'shops') {
    // Show all shops
    document.querySelector('.hero').style.display = 'block';
    document.querySelector('.featured-shops').style.display = 'block';
    loadAllShops();
  } else if (page === 'products') {
    // Show all products
    document.querySelector('.hero').style.display = 'block';
    document.querySelector('.featured-products').style.display = 'block';
    loadAllProducts();
  }
  
  // In a real app, would handle more pages and authenticate routes
}

// Data loading functions
function loadFeaturedShops() {
  // Get shops from database
  const shops = db.getShops().slice(0, 3); // Just take first 3 for featured
  renderShops(shops);
}

function loadAllShops() {
  const shops = db.getShops();
  renderShops(shops);
}

function loadPopularProducts() {
  const products = db.getProducts().slice(0, 3); // Just take first 3 for popular
  renderProducts(products);
}

function loadAllProducts() {
  const products = db.getProducts();
  renderProducts(products);
}

// Rendering functions
function renderShops(shops) {
  if (!shopsContainer) return;
  
  if (shops.length === 0) {
    shopsContainer.innerHTML = '<p>No shops found.</p>';
    return;
  }
  
  shopsContainer.innerHTML = '';
  shops.forEach(shop => {
    const shopCard = document.createElement('div');
    shopCard.className = 'card';
    shopCard.innerHTML = `
      <div class="card-image" style="background-image: url('${shop.logoUrl}')"></div>
      <div class="card-content">
        <h3 class="card-title">${shop.name}</h3>
        <p class="card-description">${shop.description}</p>
        <div class="card-footer">
          <div class="card-location">${shop.city}</div>
          <div class="card-rating">★ ${shop.rating.toFixed(1)}</div>
        </div>
      </div>
    `;
    
    // Add click event to show shop details
    shopCard.addEventListener('click', () => {
      // In a real app, would navigate to shop detail page
      console.log('Shop clicked:', shop.id);
    });
    
    shopsContainer.appendChild(shopCard);
  });
}

function renderProducts(products) {
  if (!productsContainer) return;
  
  if (products.length === 0) {
    productsContainer.innerHTML = '<p>No products found.</p>';
    return;
  }
  
  productsContainer.innerHTML = '';
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'card';
    productCard.innerHTML = `
      <div class="card-image" style="background-image: url('${product.imageUrl}')"></div>
      <div class="card-content">
        <h3 class="card-title">${product.name}</h3>
        <p class="card-description">${product.description}</p>
        <div class="card-footer">
          <div class="card-price">
            ${product.discountedPrice < product.price 
              ? `<span style="text-decoration: line-through; color: #888; margin-right: 8px;">₹${product.price}</span>₹${product.discountedPrice}`
              : `₹${product.price}`}
          </div>
          <div class="card-rating">★ ${product.rating.toFixed(1)}</div>
        </div>
      </div>
    `;
    
    // Add click event for product details
    productCard.addEventListener('click', () => {
      // In a real app, would show product details
      console.log('Product clicked:', product.id);
    });
    
    productsContainer.appendChild(productCard);
  });
}

// Search functionality
function handleSearch() {
  const query = searchInput.value.trim();
  const city = cityFilter.value;
  
  // Filter shops based on search and city
  let filteredShops = db.searchShops(query);
  if (city) {
    filteredShops = filteredShops.filter(shop => shop.city === city);
  }
  
  // Filter products based on search
  const filteredProducts = db.searchProducts(query);
  
  // Update UI with filtered results
  renderShops(filteredShops);
  renderProducts(filteredProducts);
}

// Initialize the application
function initApp() {
  // Check for logged in user
  checkLoggedInUser();
  
  // Load initial data
  loadFeaturedShops();
  loadPopularProducts();
  
  // Set up event listeners
  loginBtn.addEventListener('click', openLoginModal);
  registerBtn.addEventListener('click', openRegisterModal);
  closeModal.addEventListener('click', closeModalHandler);
  loginTab.addEventListener('click', showLoginTab);
  registerTab.addEventListener('click', showRegisterTab);
  loginForm.addEventListener('submit', handleLogin);
  registerForm.addEventListener('submit', handleRegister);
  searchBtn.addEventListener('click', handleSearch);
  
  // Navigation event listeners
  shopsLink.addEventListener('click', (e) => {
    e.preventDefault();
    navigateToPage('shops');
  });
  
  productsLink.addEventListener('click', (e) => {
    e.preventDefault();
    navigateToPage('products');
  });
  
  // Close modal when clicking outside of it
  window.addEventListener('click', (e) => {
    if (e.target === authModal) {
      closeModalHandler();
    }
  });
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

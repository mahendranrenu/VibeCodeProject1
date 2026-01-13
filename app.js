// Sample dataset of 10 fruit products
const products = [
  { id: 1, name: 'Apple', emoji: '🍎', description: 'Fresh, crisp apples', price: 1.5, unit: 'lb' },
  { id: 2, name: 'Banana', emoji: '🍌', description: 'Sweet, ripe bananas', price: 0.99, unit: 'lb' },
  { id: 3, name: 'Orange', emoji: '🍊', description: 'Juicy oranges', price: 1.2, unit: 'lb' },
  { id: 4, name: 'Strawberry', emoji: '🍓', description: 'Fresh strawberries', price: 2.5, unit: 'lb' },
  { id: 5, name: 'Grapes', emoji: '🍇', description: 'Seedless grapes', price: 2.0, unit: 'lb' },
  { id: 6, name: 'Watermelon', emoji: '🍉', description: 'Juicy watermelon', price: 0.59, unit: 'lb' },
  { id: 7, name: 'Pineapple', emoji: '🍍', description: 'Tropical pineapple', price: 3.0, unit: 'each' },
  { id: 8, name: 'Lemon', emoji: '🍋', description: 'Zesty lemons', price: 0.75, unit: 'each' },
  { id: 9, name: 'Peach', emoji: '🍑', description: 'Sweet peaches', price: 1.8, unit: 'lb' },
  { id: 10, name: 'Cherry', emoji: '🍒', description: 'Fresh cherries', price: 3.5, unit: 'lb' }
];


let cart = [];
let currentPage = 'Products';
let selectedProductId = null;
let notification = '';
let notificationTimeout = null;

function showNotification(msg, duration = 2000) {
  notification = msg;
  renderNotification();
  if (notificationTimeout) clearTimeout(notificationTimeout);
  notificationTimeout = setTimeout(() => {
    notification = '';
    renderNotification();
  }, duration);
}

function renderNotification() {
  let notifElem = document.getElementById('notification-banner');
  if (!notifElem) {
    notifElem = document.createElement('div');
    notifElem.id = 'notification-banner';
    document.body.appendChild(notifElem);
  }
  notifElem.textContent = notification;
  notifElem.style.display = notification ? 'block' : 'none';
}

function renderNav() {
  const collapsed = window.innerWidth < 600;
  const navItems = [
    { key: 'Products', label: 'Products', abbr: 'P' },
    { key: 'ProductDetails', label: 'ProductDetails', abbr: 'PD' },
    { key: 'ShoppingCart', label: 'ShoppingCart', abbr: 'SC' },
    { key: 'Checkout', label: 'Checkout', abbr: 'CO' }
  ];
  // Add cart badge for ShoppingCart nav item
  return `<nav class="${collapsed ? 'collapsed' : ''}"><ul>`
    + navItems.map(item => {
      let badge = '';
      if (item.key === 'ShoppingCart' && cart.length > 0) {
        const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
        badge = `<span class="cart-badge">${totalItems}</span>`;
      }
      return `
        <li class="${currentPage === item.key ? 'active' : ''}" onclick="navigate('${item.key}')">
          <span class="full">${item.label}</span><span class="abbr" style="display:${collapsed ? 'inline':'none'}">${item.abbr}</span>${badge}
        </li>`;
    }).join('') +
    '</ul></nav>';
}

function renderProducts() {
  return `<main><h2>Products</h2><div class="product-list">` +
    products.map(product => `
      <div class="product-card">
        <div class="emoji">${product.emoji}</div>
        <div><b>${product.name}</b></div>
        <div>$${product.price.toFixed(2)}/${product.unit}</div>
        <button onclick="showProductDetails(${product.id})">Details</button>
        <input type="number" id="qty-${product.id}" min="1" value="1" style="width:50px; margin-top:8px;" />
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `).join('') + '</div></main>';
}

function renderProductDetails() {
  const product = products.find(p => p.id === selectedProductId);
  if (!product) return '<main><p>Product not found.</p></main>';
  return `<main><h2>Product Details</h2>
    <div class="product-card">
      <div class="emoji">${product.emoji}</div>
      <div><b>${product.name}</b></div>
      <div>${product.description}</div>
      <div>$${product.price.toFixed(2)}/${product.unit}</div>
      <button onclick="navigate('Products')">Back to Products</button>
    </div>
  </main>`;
}

function renderCart() {
  if (cart.length === 0) return '<main><h2>Shopping Cart</h2><p>Your cart is empty.</p></main>';
  return `<main><h2>Shopping Cart</h2>
    <table class="cart-list">
      <tr><th>Product</th><th>Qty</th><th>Total</th><th>Actions</th></tr>
      ${cart.map(item => {
        const product = products.find(p => p.id === item.productId);
        return `<tr>
          <td>${product.emoji} ${product.name}</td>
          <td><input type="number" min="1" value="${item.qty}" onchange="updateCart(${item.productId}, this.value)" style="width:40px;" /></td>
          <td>$${(product.price * item.qty).toFixed(2)}</td>
          <td><button onclick="removeFromCart(${item.productId})">Remove</button></td>
        </tr>`;
      }).join('')}
    </table>
    <button onclick="navigate('Checkout')">Checkout</button>
  </main>`;
}

function renderCheckout() {
  if (cart.length === 0) return '<main><h2>Checkout</h2><p>No items to checkout.</p></main>';
  let total = 0;
  return `<main><h2>Checkout</h2><table class="checkout-list">
          <tr><th>Product</th><th>Qty</th><th>Total</th></tr>
          ${cart.map(item => {
              const product = products.find(p => p.id === item.productId);
              const itemTotal = product.price * item.qty;
              total += itemTotal;
              return `<tr>
          <td>${product.emoji} ${product.name}</td>
          <td>${item.qty}</td>
          <td>$${itemTotal.toFixed(2)}</td>
        </tr>`;
          }).join('')}
      </table><div style="font-weight:bold; margin-bottom:16px;">Total: $${total.toFixed(2)}</div><button onclick="processOrder()">Process Order</button>
  </main>`;
}

function renderApp() {
  let html = '<div id="container">' + renderNav();
  switch (currentPage) {
    case 'Products':
      html += renderProducts(); break;
    case 'ProductDetails':
      html += renderProductDetails(); break;
    case 'ShoppingCart':
      html += renderCart(); break;
    case 'Checkout':
      html += renderCheckout(); break;
    default:
      html += '<main><p>Page not found.</p></main>';
  }
  html += '</div>';
  document.getElementById('app').innerHTML = html;
}

function navigate(page) {
  currentPage = page;
  if (page !== 'ProductDetails') selectedProductId = null;
  renderApp();
}

function showProductDetails(id) {
  selectedProductId = id;
  currentPage = 'ProductDetails';
  renderApp();
}

function addToCart(id) {
  const qtyInput = document.getElementById('qty-' + id);
  const qty = parseInt(qtyInput.value) || 1;
  const existing = cart.find(item => item.productId === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ productId: id, qty });
  }
  showNotification('Added to cart!');
  renderApp();
}

function updateCart(id, qty) {
  const item = cart.find(i => i.productId === id);
  if (item) {
    item.qty = parseInt(qty) || 1;
    if (item.qty < 1) item.qty = 1;
  }
  renderApp();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.productId !== id);
  renderApp();
}

function processOrder() {
  cart = [];
  navigate('Products');
  showNotification('Thank you for your order!');
}

window.addEventListener('resize', renderApp);
window.onload = function() {
  renderApp();
  renderNotification();
};

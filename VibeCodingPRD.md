# Product Requirements Document (PRD): Fruit Shop Prototype App

## 1. App Overview
A client-side web app for online shoppers to browse, select, and order fruit products. The prototype demonstrates core e-commerce concepts with a dynamic, visually appealing interface.

## 2. Target Audience
- Online shoppers interested in purchasing fruit products.
- Users on both desktop and mobile devices.

## 3. Key Features & Pages

### Products Page
- Displays a list of 10 fruit products (name, price per unit, emoji image).
- Allows users to select quantity and add products to the shopping cart.

### ProductDetails Page
- Shows detailed info for a selected product: name, description, price per unit, emoji image.
- Option to return to Products page.

### ShoppingCart Page
- Lists products added to the cart (name, quantity, total price per product).
- Allows updating quantity or removing products.

### Checkout Page
- Summarizes products in the cart (name, quantity, price).
- Displays total price and a “Process Order” button.

### Navigation Menu
- Left-side navigation for all pages.
- Collapses to abbreviations when width < 300px.

## 4. Use Cases
- Browse products and view details.
- Add products to cart and update quantities.
- Remove products from cart.
- Review order and process checkout.

## 5. Sample Data
- 10 fruit products, each with:
  - Name (e.g., Apple)
  - Description (e.g., “Fresh, crisp apples”)
  - Price per unit (e.g., $1.50/lb)
  - Emoji image (e.g., 🍎)

## 6. Technical Requirements
- Technologies: HTML, CSS, JavaScript (client-side only).
- No backend, authentication, or database.
- Responsive layout for desktop and mobile.
- Left-side navigation menu with collapse behavior.

## 7. Styling & UI Guidelines
- Clean, simple, visually appealing.
- Not fully polished or production-ready.
- Navigation menu collapses for small screens.

## 8. Out of Scope
- User authentication.
- Payment processing.
- Persistent storage or backend/database integration.

## 9. Acceptance Criteria
- All pages and navigation implemented.
- Sample dataset of 10 fruits displayed.
- Basic add-to-cart, update, and remove functionality works.
- UI adapts to different screen sizes.
- Navigation menu collapses below 300px width.

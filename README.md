<p align="center">
  <img src="https://readme-typing-svg.demolab.com/?font=Fira+Code&size=24&duration=3000&pause=1000&color=6366F1&center=true&vCenter=true&width=650&lines=Welcome+to+Product+Management+App!;Manage+Products+and+Inventory!;Add%2C+Edit%2C+Search+and+Delete+Products!;Made+with+React%2C+TypeScript+%26+Vite" alt="Typing SVG" />
</p>

<p align="center">
  <strong>Name:</strong> Gineva Edma <br>
  <strong>Section:</strong> BSIT 3D
  <strong>Section:</strong> PRE-Final
</p>

<h1 align="center">📦 Product Management App</h1>

<p align="center">
  <strong>Product Management App</strong> is a frontend inventory management website built with <strong>React, TypeScript, and Vite</strong>. It provides a dashboard for viewing inventory statistics, a searchable product catalog, product creation and deletion, stock quantity controls, detailed product pages, and a shopping cart. Its responsive neo-brutalist interface uses bold borders, modern typography, interactive animations, and browser-based storage.
</p>

## ✨ Features

- 🏠 Dashboard home page with an inventory hero section and quick navigation
- 📊 Dashboard statistics for inventory value, stock quantities, and cart activity
- 📦 Browse products with images, descriptions, prices, ratings, and stock information
- ➕ Add new products with validated information and image selection or upload
- 🗑️ Delete products from the inventory
- 🔍 Search products by name, category, description, or SKU
- 🗂️ Filter the product catalog by category
- 📋 Switch between grid and table product views
- 📝 Open individual product pages to see detailed information and specifications
- 🔢 Increase, decrease, or set product stock quantities
- 📉 Identify low-stock and out-of-stock products
- 💰 Display prices and inventory values in Philippine pesos (₱)
- 🛒 Add products to the shopping cart with stock-limit checks
- 🧾 Adjust cart quantities, remove items, and view the cart total
- 🔄 Reset the inventory to its sample products
- 💬 Show toast notifications for product and cart actions
- 💾 Save product and cart data in browser localStorage
- ✨ Animated product cards and interactive UI elements
- 📱 Responsive layout with desktop navigation rail and mobile navigation
- 🎨 Neo-brutalist visual design with bold borders and geometric accents

## 🛠️ Technologies Used

- ⚛️ React 19
- 📘 TypeScript
- ⚡ Vite
- 🎨 CSS (global, responsive, and animation styles)
- 🧭 React Router DOM
- 🧩 React Context API
- 🎭 Motion (`motion/react`) for animations
- 🖼️ Phosphor Icons (`@phosphor-icons/react`)
- 🔔 Sonner for toast notifications
- 💾 Browser localStorage
- 🔍 Oxlint for code linting

## 📂 Project Structure

```text
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   ├── cart/
│   │   │   ├── CartItem.tsx
│   │   │   └── CartSummary.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── MobileNavigation.tsx
│   │   │   └── NavigationRail.tsx
│   │   ├── products/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductFilters.tsx
│   │   │   ├── ProductForm.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   └── QuantityControl.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── EmptyState.tsx
│   │       ├── StatPanel.tsx
│   │       └── StockBadge.tsx
│   ├── context/
│   │   └── ProductContext.tsx
│   ├── data/
│   │   └── defaultProducts.ts
│   ├── hooks/
│   │   └── useLocalStorage.ts
│   ├── pages/
│   │   ├── AddProduct.tsx
│   │   ├── Cart.tsx
│   │   ├── Dashboard.tsx
│   │   ├── NotFound.tsx
│   │   ├── ProductDetails.tsx
│   │   └── Products.tsx
│   ├── styles/
│   │   ├── animations.css
│   │   ├── global.css
│   │   └── responsive.css
│   ├── types/
│   │   └── product.ts
│   ├── utils/
│   │   ├── calculations.ts
│   │   └── currency.ts
│   ├── App.tsx
│   └── main.tsx
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

## 🚀 How to Run

1. Open the extracted `JASARENO` project folder in VS Code.

2. Open the terminal in that folder and install dependencies:

   ```powershell
   npm.cmd install
   ```

3. Start the development server:

   ```powershell
   npm.cmd run dev
   ```

4. Open the local URL shown in the terminal, usually `http://localhost:5173`.

5. To check the production build, run:

   ```powershell
   npm.cmd run build
   ```

## 🌐 Live Demo

🚀 [View Product Management App](https://pm-app-pre-final-edma.vercel.app/)

## 📌 Note

This project was created for a school activity and uses sample product information for demonstration purposes. It is a frontend application that runs locally without a backend server or external database.

Products and cart items are saved in browser `localStorage`. Data is specific to the browser and device being used and may be lost if the browser's stored site data is cleared.

---

<p align="center">
  <strong>Product Management App — Manage Products, Track Inventory, Stay Organized! 📦📊</strong>
</p>

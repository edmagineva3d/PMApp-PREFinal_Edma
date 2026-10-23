import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import { NavigationRail } from './components/layout/NavigationRail';
import { Header } from './components/layout/Header';
import { MobileNavigation } from './components/layout/MobileNavigation';
import { Dashboard } from './pages/Dashboard';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { AddProduct } from './pages/AddProduct';
import { Cart } from './pages/Cart';
import { NotFound } from './pages/NotFound';
import { Toaster } from 'sonner';

export const App: React.FC = () => {
  return (
    <ProductProvider>
      <BrowserRouter>
        <div className="app-shell">
          {/* Desktop Left Icon Rail */}
          <NavigationRail />

          {/* Main Content Area with Header */}
          <div className="main-wrapper">
            <Header />
            <main className="content-area">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>

          {/* Mobile Navigation Bar */}
          
        </div>

        {/* Global Notifications Toaster */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#FFFFFF',
              color: '#171717',
              border: '2px solid #202020',
              boxShadow: '4px 4px 0px #202020',
              borderRadius: '6px',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 600,
            },
          }}
        />
      </BrowserRouter>
    </ProductProvider>
  );
};

export default App;
